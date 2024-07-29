import { PrismaClient } from '@prisma/client';
import { LeaveRequests } from '../types/leaveRequests';

const prisma = new PrismaClient();

const calculateLeaveValidity = (joinDate: Date) => {
    const now = new Date();
    const sixMonthsLater = new Date(joinDate);
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

    const oneYearLater = new Date(joinDate);
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

    if (now < sixMonthsLater) {
        return { startDate: joinDate, endDate: sixMonthsLater, totalLeave: 10, isValid: true };
    } else if (now < oneYearLater) {
        return { startDate: sixMonthsLater, endDate: oneYearLater, totalLeave: 10, isValid: true };
    } else {
        return { startDate: oneYearLater, endDate: new Date(oneYearLater.getFullYear() + 1, oneYearLater.getMonth(), oneYearLater.getDate()), totalLeave: 20, isValid: true };
    }
};

export const createOrUpdatePaidHolidays = async (employeeId: number, joinDate: Date, currentUsedLeave: number = 0) => {
    const leaveValidity = calculateLeaveValidity(joinDate);

    await prisma.paidHolidays.updateMany({
        where: { employeeId: employeeId, isValid: true },
        data: { isValid: false },
    });

    await prisma.paidHolidays.create({
        data: {
            employeeId: employeeId,
            totalLeave: leaveValidity.totalLeave,
            usedLeave: currentUsedLeave,
            remainingLeave: leaveValidity.totalLeave - currentUsedLeave,
            leaveStart: leaveValidity.startDate,
            leaveEnd: leaveValidity.endDate,
            lastUpdated: new Date(),
            isValid: leaveValidity.isValid,
        },
    });
};

const checkAndUpdateLeaveValidity = async (employeeId: number) => {
    let paidHoliday = await prisma.paidHolidays.findFirst({
        where: { employeeId: employeeId, isValid: true },
    });

    const now = new Date();

    if (!paidHoliday) {
        const employee = await prisma.personalInfo.findUnique({
            where: { id: employeeId },
        });
        if (!employee) throw new Error(`Employee with ID ${employeeId} does not exist.`);

        const leaveValidity = calculateLeaveValidity(employee.joinDate);

        paidHoliday = await prisma.paidHolidays.create({
            data: {
                employeeId: employeeId,
                totalLeave: leaveValidity.totalLeave,
                usedLeave: 0,
                remainingLeave: leaveValidity.totalLeave,
                leaveStart: leaveValidity.startDate,
                leaveEnd: leaveValidity.endDate,
                lastUpdated: new Date(),
                isValid: leaveValidity.isValid,
            },
        });
    } else if (paidHoliday.leaveEnd < now) {
        await prisma.paidHolidays.update({
            where: { id: paidHoliday.id },
            data: { isValid: false },
        });

        const employee = await prisma.personalInfo.findUnique({
            where: { id: employeeId },
        });
        if (!employee) throw new Error(`Employee with ID ${employeeId} does not exist.`);

        const leaveValidity = calculateLeaveValidity(employee.joinDate);

        paidHoliday = await prisma.paidHolidays.create({
            data: {
                employeeId: employeeId,
                totalLeave: leaveValidity.totalLeave,
                usedLeave: 0,
                remainingLeave: leaveValidity.totalLeave,
                leaveStart: leaveValidity.startDate,
                leaveEnd: leaveValidity.endDate,
                lastUpdated: new Date(),
                isValid: leaveValidity.isValid,
            },
        });
    }

    return paidHoliday.id;
};

export const createInitialLeaveRequest = async (leaveRequest: { employeeId: number; totalDays: number }) => {
    const employee = await prisma.personalInfo.findUnique({
        where: { id: leaveRequest.employeeId, isDeleted: false },
    });

    if (!employee) {
        throw new Error(`Employee with ID ${leaveRequest.employeeId} does not exist.`);
    }

    const paidHolidayId = await checkAndUpdateLeaveValidity(leaveRequest.employeeId);
    const newLeaveRequest = await prisma.leaveRequests.create({
        data: {
            employeeId: leaveRequest.employeeId,
            initialDays: leaveRequest.totalDays,
            adjustedDays: leaveRequest.totalDays,
            totalDays: leaveRequest.totalDays,
            requestDate: new Date(),
            createdAt: new Date(),
        },
    });

    const updatedPaidHolidays = await prisma.paidHolidays.update({
        where: { id: paidHolidayId },
        data: {
            usedLeave: { increment: leaveRequest.totalDays },
            remainingLeave: { decrement: leaveRequest.totalDays },
            lastUpdated: new Date(),
        },
    });

    return { newLeaveRequest, updatedPaidHolidays };
};

// export const adjustLeaveRequest = async (id: number, newTotalDays: number) => {
//     // Fetch the existing leave request
//     const leaveRequest = await prisma.leaveRequests.findUnique({
//         where: { id: id },
//     });

//     if (!leaveRequest) {
//         throw new Error('Leave request not found');
//     }

//     const adjustedDays = newTotalDays;
//     const previousTotalDays = leaveRequest.totalDays;
//     const difference = adjustedDays - previousTotalDays;

//     // Update the leave request
//     const updatedLeaveRequest = await prisma.leaveRequests.update({
//         where: { id: id },
//         data: {
//             adjustedDays,
//             totalDays: adjustedDays,
//         },
//     });

//     // Adjust leave in PaidHolidays
//     if (difference > 0) {
//         // Increase used leave and decrease remaining leave
//         await prisma.paidHolidays.update({
//             where: { employeeId: leaveRequest.employeeId },
//             data: {
//                 usedLeave: { increment: difference },
//                 remainingLeave: { decrement: difference },
//                 lastUpdated: new Date(),
//             },
//         });
//     } else if (difference < 0) {
//         // Decrease used leave and increase remaining leave
//         await prisma.paidHolidays.update({
//             where: { employeeId: leaveRequest.employeeId },
//             data: {
//                 usedLeave: { decrement: -difference },
//                 remainingLeave: { increment: -difference },
//                 lastUpdated: new Date(),
//             },
//         });
//     }

//     return updatedLeaveRequest;
// };