import prisma from '../config/prismaClient';
import { AdjustLeaveRequestParams } from '../types/leaveManagement';
import {
    calculateLeaveValidity,
    calculateDifference
} from '../utils/leaveCalculations';
import {
    findEmployeeById,
    createPaidHoliday,
    createLeaveRequest,
    updatePaidHolidayValidity,
    findLatestLeaveRequest,
    updateLeaveRequest,
    findValidPaidHoliday,
    adjustPaidHolidays
} from '../utils/leaveQueries';

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
        const employee = await findEmployeeById(employeeId);
        const leaveValidity = calculateLeaveValidity(employee.joinDate);
        paidHoliday = await createPaidHoliday(employeeId, leaveValidity);
    } else if (paidHoliday.leaveEnd < now) {
        await updatePaidHolidayValidity(paidHoliday.id);
        const employee = await findEmployeeById(employeeId);
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
    const newLeaveRequest = await createLeaveRequest({
        employeeId: leaveRequest.employeeId,
        newTotalDays: leaveRequest.totalDays,
        salaryMonth: leaveRequest.salaryMonth,
        salaryYear: leaveRequest.salaryYear,
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

    let leaveRequest = await findLatestLeaveRequest(employeeId, salaryMonth, salaryYear);

    if (!leaveRequest) {
        leaveRequest = await createLeaveRequest(params);
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

