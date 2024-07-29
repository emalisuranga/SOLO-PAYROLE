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

const checkAndUpdateLeaveValidity = async (employeeId: number) => {
    // Find the current valid PaidHolidays entry for the employee
    let paidHoliday = await prisma.paidHolidays.findFirst({
        where: { employeeId: employeeId, isValid: true },
    });

    const now = new Date();

    if (!paidHoliday) {
        // Calculate leave validity based on the employee's join date
        const employee = await prisma.personalInfo.findUnique({
            where: { id: employeeId },
        });
        if (!employee) throw new Error(`Employee with ID ${employeeId} does not exist.`);

        const leaveValidity = calculateLeaveValidity(employee.joinDate);

        // Create a new PaidHolidays entry
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
        // Update the current row to set isValid to false
        await prisma.paidHolidays.update({
            where: { id: paidHoliday.id },
            data: { isValid: false },
        });

        // Calculate leave validity based on the employee's join date
        const employee = await prisma.personalInfo.findUnique({
            where: { id: employeeId },
        });
        if (!employee) throw new Error(`Employee with ID ${employeeId} does not exist.`);

        const leaveValidity = calculateLeaveValidity(employee.joinDate);

        // Create a new PaidHolidays entry
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

export const updatePaidHolidaysForNewJoinDate = async (employeeId: number, newJoinDate: Date) => {
    const currentPaidHoliday = await prisma.paidHolidays.findFirst({
        where: { employeeId: employeeId, isValid: true },
    });

    const currentUsedLeave = currentPaidHoliday ? currentPaidHoliday.usedLeave : 0;

    await prisma.paidHolidays.updateMany({
        where: { employeeId: employeeId, isValid: true },
        data: { isValid: false },
    });

    const leaveValidity = calculateLeaveValidity(newJoinDate);

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

export const createInitialLeaveRequest = async (leaveRequest: LeaveRequests) => {
    const employee = await prisma.personalInfo.findUnique({
        where: { id: leaveRequest.employeeId, isDeleted: false },
    });

    if (!employee) {
        throw new Error(`Employee with ID ${leaveRequest.employeeId} does not exist.`);
    }

    const paidHolidayId = await checkAndUpdateLeaveValidity(leaveRequest.employeeId);
    const newLeaveRequest = await prisma.leaveRequests.create({ data: leaveRequest });

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