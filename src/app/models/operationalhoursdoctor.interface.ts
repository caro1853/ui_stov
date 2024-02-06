import { IOperationalHours } from "./operationalhours.interface";

export interface IOperationalHoursDoctor {
    doctorId: number;
    OperationalHours: IOperationalHours[];
}