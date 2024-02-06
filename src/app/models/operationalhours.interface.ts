export interface IOperationalHours {
    day: number;
    available: boolean;
    hours?: Hour[];
}

export interface Hour{
    schedule: number;
    available: boolean;
}