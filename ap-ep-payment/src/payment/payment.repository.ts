import {
  ChargerStatus,
  Session,
  StationStatus,
  V2GStatus,
} from "./payment.entity";

export interface ISessionRepository {
  getById(id: string): Session | null;
}

export const sessionRepository: ISessionRepository = {
  getById(id: string) {
    // Simulate mock data
    const now = new Date();

    const mockSession: Session = {
      id,
      date: now,
      period: {
        start: now,
        end: now,
      },
      duration: 120,
      chargerStatus: ChargerStatus.plugged,
      station: {
        id: "station-001",
        status: StationStatus.online,
      },
      vehicle: {
        id: "vehicle-101",
        socLevel: 60,
        status: V2GStatus.join,
      },
      system: {
        config: {
          dayOffList: [new Date("2025-10-13")],
          onPeak: {
            start: "09:00:00",
            end: "22:00:00",
          },
        },
      },
    };

    return mockSession;
  },
};
