export type OnPeakPeriod = {
  start: string;
  end: string;
};

export type SessionPeriod = {
  start: Date;
  end: Date;
};

export enum StationStatus {
  online = "Online",
  offline = "Offline",
}

export enum ChargerStatus {
  plugged = "Plugged",
  unplugged = "Unplugged",
}

export enum V2GStatus {
  join = "Join",
  unjoin = "Unjoin",
}

export interface SystemConfig {
  dayOffList: Date[];
  onPeak: OnPeakPeriod;
}

export interface Station {
  id: string;
  status: StationStatus;
}

export interface Vehicle {
  id: string;
  socLevel: number;
  status: V2GStatus;
}

export interface Session {
  id: string;
  date: Date;
  period: SessionPeriod;
  duration: number;
  chargerStatus: ChargerStatus;
  station: Station;
  vehicle: Vehicle;
  system: { config: SystemConfig };
}
