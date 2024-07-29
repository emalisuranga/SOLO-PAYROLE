export interface LeaveRequests {
  id?: number;
  employeeId: number;
  initialDays: number;
  adjustedDays: number;
  totalDays: number;
  requestDate?: Date;
  createdAt?: Date;
}