import { PrismaClient } from '@prisma/client';
import { LeaveRequests, AdjustLeaveRequestParams } from '../types/leaveManagementTypes';

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

const getEmployee = async (employeeId: number) => {
    const employee = await prisma.personalInfo.findUnique({
        where: { id: employeeId },
    });
    if (!employee) throw new Error(`Employee with ID ${employeeId} does not exist.`);
    return employee;
};

const createPaidHoliday = async (employeeId: number, leaveValidity: any) => {
    return await prisma.paidHolidays.create({
        data: {
            employeeId,
            totalLeave: leaveValidity.totalLeave,
            usedLeave: 0,
            remainingLeave: leaveValidity.totalLeave,
            leaveStart: leaveValidity.startDate,
            leaveEnd: leaveValidity.endDate,
            lastUpdated: new Date(),
            isValid: leaveValidity.isValid,
        },
    });
};

const updatePaidHolidayValidity = async (paidHolidayId: number) => {
    await prisma.paidHolidays.update({
        where: { id: paidHolidayId },
        data: { isValid: false },
    });
};

export const createOrUpdatePaidHolidays = async (employeeId: number, joinDate: Date, currentUsedLeave: number = 0) => {
    const leaveValidity = calculateLeaveValidity(joinDate);

    await prisma.paidHolidays.updateMany({
        where: { employeeId, isValid: true },
        data: { isValid: false },
    });

    await prisma.paidHolidays.create({
        data: {
            employeeId,
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

export const checkAndUpdateLeaveValidity = async (employeeId: number) => {
    let paidHoliday = await prisma.paidHolidays.findFirst({
        where: { employeeId, isValid: true },
    });

    const now = new Date();

    if (!paidHoliday) {
        const employee = await getEmployee(employeeId);
        const leaveValidity = calculateLeaveValidity(employee.joinDate);
        paidHoliday = await createPaidHoliday(employeeId, leaveValidity);
    } else if (paidHoliday.leaveEnd < now) {
        await updatePaidHolidayValidity(paidHoliday.id);
        const employee = await getEmployee(employeeId);
        const leaveValidity = calculateLeaveValidity(employee.joinDate);
        paidHoliday = await createPaidHoliday(employeeId, leaveValidity);
    }

    return paidHoliday.id;
};

export const createInitialLeaveRequest = async (leaveRequest: { employeeId: number; totalDays: number; salaryMonth: number; salaryYear: number }) => {
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
            salaryMonth: leaveRequest.salaryMonth,
            salaryYear: leaveRequest.salaryYear,
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

export const adjustLeaveRequest = async (params: AdjustLeaveRequestParams) => {
    const { employeeId, newTotalDays, salaryMonth, salaryYear } = params;

    const leaveRequest = await findLatestLeaveRequest(employeeId, salaryMonth, salaryYear);

    if (!leaveRequest) {
        throw new Error('Leave request not found');
    }

    const difference = calculateDifference(newTotalDays, leaveRequest.totalDays);
    const updatedLeaveRequest = await updateLeaveRequest(leaveRequest.id, newTotalDays);

    const paidHoliday = await findValidPaidHoliday(leaveRequest.employeeId);

    if (!paidHoliday) {
        throw new Error(`PaidHolidays entry for employee ID ${leaveRequest.employeeId} does not exist.`);
    }

    await adjustPaidHolidays(paidHoliday.id, difference);

    return updatedLeaveRequest;
};

const findLatestLeaveRequest = async (employeeId: number, salaryMonth: number, salaryYear: number) => {
    return await prisma.leaveRequests.findFirst({
        where: {
            employeeId,
            salaryMonth,
            salaryYear,
        },
        orderBy: {
            requestDate: 'desc',
        },
        take: 1,
    });
};

const calculateDifference = (newTotalDays: number, previousTotalDays: number) => {
    return newTotalDays - previousTotalDays;
};

const updateLeaveRequest = async (leaveRequestId: number, newTotalDays: number) => {
    return await prisma.leaveRequests.update({
        where: { id: leaveRequestId },
        data: {
            adjustedDays: newTotalDays,
            totalDays: newTotalDays,
        },
    });
};

const findValidPaidHoliday = async (employeeId: number) => {
    return await prisma.paidHolidays.findFirst({
        where: { employeeId, isValid: true },
    });
};

const adjustPaidHolidays = async (paidHolidayId: number, difference: number) => {
    if (difference > 0) {
        await prisma.paidHolidays.update({
            where: { id: paidHolidayId },
            data: {
                usedLeave: { increment: difference },
                remainingLeave: { decrement: difference },
                lastUpdated: new Date(),
            },
        });
    } else if (difference < 0) {
        await prisma.paidHolidays.update({
            where: { id: paidHolidayId },
            data: {
                usedLeave: { decrement: -difference },
                remainingLeave: { increment: -difference },
                lastUpdated: new Date(),
            },
        });
    }
};