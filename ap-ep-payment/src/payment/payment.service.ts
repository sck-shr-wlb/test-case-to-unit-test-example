import {
  getTimeDiffInFormatHHMM,
  getTimeDiffInHour,
  parseTimeStringToDate,
  normalizeToTimeOnly,
} from "../helper";
import { Session } from "./payment.entity";

type OnPeakPeriod = {
  start: string;
  end: string;
};

type SessionPeriod = {
  start: Date;
  end: Date;
};

enum StationStatus {
  online = "Online",
  offline = "Offline",
}

enum ChargerStatus {
  plugged = "Plugged",
  unplugged = "Unplugged",
}

enum V2GStatus {
  join = "Join",
  unjoin = "Unjoin",
}

export class PaymentConditions {
  isValidSession(session: Session) {
    return (
      this.isRegularDay(session.date, session.system.config.dayOffList) &&
      this.isOnline(session.station.status) &&
      this.isPlugged(session.chargerStatus) &&
      this.ableToJoin(session.vehicle.socLevel) &&
      this.isJoin(session.vehicle.status) &&
      this.isOnPeak(session.system.config.onPeak, session.period)
    );
  }

  isRegularDay(sessionDate: Date, dayOffList: Date[]): boolean {
    const isDayOff = dayOffList.some(
      (dayOff) => dayOff.getTime() === sessionDate.getTime()
    );
    return !isDayOff;
  }

  isOnline(stationStatus: StationStatus) {
    return stationStatus === StationStatus.online;
  }

  isPlugged(chargerStatus: string) {
    return chargerStatus === ChargerStatus.plugged;
  }

  ableToJoin(socLevel: number) {
    const MINIMUM_SOC_LEVEL_BEFORE_JOIN = 20;
    return socLevel >= MINIMUM_SOC_LEVEL_BEFORE_JOIN;
  }

  isJoin(V2Gstatus: V2GStatus) {
    return V2Gstatus === V2GStatus.join;
  }

  ableToDischarge(socLevel: number) {
    const MINIMUM_REMAINING_SOC_LEVEL = 10;
    return socLevel > MINIMUM_REMAINING_SOC_LEVEL;
  }

  isOnPeak(
    onPeakPeriod: OnPeakPeriod,
    sessionPeriod: SessionPeriod
  ): { isValid: boolean; actualDuration: string; totalHours: number }[] {
    let totalTimePeriodRanges = [];
    const onPeakStart = parseTimeStringToDate(onPeakPeriod.start);
    const onPeakEnd = parseTimeStringToDate(onPeakPeriod.end);

    const sessionStart = normalizeToTimeOnly(sessionPeriod.start);
    const sessionEnd = normalizeToTimeOnly(sessionPeriod.end);

    const overlapStartPoint = Math.max(
      onPeakStart.getTime(),
      sessionStart.getTime()
    );
    const overlapEndPoint = Math.min(onPeakEnd.getTime(), sessionEnd.getTime());

    // ### S1
    let isSessionStartBeforeOnPeak = false;
    // ### S2
    let isSessionStartAtOnPeakStart = false;
    // ### S3 && S4
    let isSessionStartInBetweenOnPeakPeriod = false;
    // ### S5
    let isSessionStartAtOnPeakEnd = false;
    // ### S5
    let isSessionStartAfterOnPeakEnd = false;

    switch (true) {
      case sessionStart.getTime() < onPeakStart.getTime():
        isSessionStartBeforeOnPeak = true;
        break;
      case sessionStart.getTime() === onPeakStart.getTime():
        isSessionStartAtOnPeakStart = true;
        break;
      case sessionStart.getTime() > onPeakStart.getTime() &&
        sessionStart.getTime() < onPeakEnd.getTime():
        isSessionStartInBetweenOnPeakPeriod = true;
        break;
      case sessionStart.getTime() === onPeakEnd.getTime():
        isSessionStartAtOnPeakEnd = true;
        break;
      case sessionStart.getTime() > onPeakEnd.getTime():
        isSessionStartAfterOnPeakEnd = true;
        break;
    }

    // ### E1
    let isSessionEndBeforeOnPeakStart = false;
    // ### E2
    let isSessionEndAtOnPeakStart = false;
    // ### E3 && E4
    let isSessionEndInBetweenOnPeakPeriod = false;
    // ### E5
    let isSessionEndAtOnPeakEnd = false;
    // ### E6
    let isSessionEndAfterOnPeakEnd = false;

    switch (true) {
      case sessionEnd.getTime() < onPeakStart.getTime():
        isSessionEndBeforeOnPeakStart = true;
        break;
      case sessionEnd.getTime() === onPeakStart.getTime():
        isSessionEndAtOnPeakStart = true;
        break;
      case sessionEnd.getTime() > onPeakStart.getTime() &&
        sessionEnd.getTime() < onPeakEnd.getTime():
        isSessionEndInBetweenOnPeakPeriod = true;
        break;
      case sessionEnd.getTime() === onPeakEnd.getTime():
        isSessionEndAtOnPeakEnd = true;
        break;
      case sessionEnd.getTime() > onPeakEnd.getTime():
        isSessionEndAfterOnPeakEnd = true;
        break;
    }

    // TC#1
    if (isSessionStartBeforeOnPeak && isSessionEndBeforeOnPeakStart) {
      const beforeOnPeakPeriod = {
        isValid: false,
        actualDuration: getTimeDiffInFormatHHMM(sessionStart, sessionEnd),
        totalHours: getTimeDiffInHour(sessionStart, sessionEnd),
      };

      totalTimePeriodRanges.push(beforeOnPeakPeriod);

      return totalTimePeriodRanges;
    }

    // TC#2
    if (isSessionStartBeforeOnPeak && isSessionEndAtOnPeakStart) {
      const beforeOnPeakPeriod = {
        isValid: false,
        actualDuration: getTimeDiffInFormatHHMM(sessionStart, onPeakStart),
        totalHours: getTimeDiffInHour(sessionStart, onPeakStart),
      };

      const atOnPeakStartEdge = {
        isValid: false,
        actualDuration: getTimeDiffInFormatHHMM(onPeakStart, onPeakStart),
        totalHours: getTimeDiffInHour(onPeakStart, onPeakStart),
      };

      totalTimePeriodRanges.push(beforeOnPeakPeriod);
      totalTimePeriodRanges.push(atOnPeakStartEdge);

      return totalTimePeriodRanges;
    }

    // TC#3
    if (isSessionStartBeforeOnPeak && isSessionEndInBetweenOnPeakPeriod) {
      const beforeOnPeakPeriod = {
        isValid: false,
        actualDuration: getTimeDiffInFormatHHMM(sessionStart, onPeakStart),
        totalHours: getTimeDiffInHour(sessionStart, onPeakStart),
      };

      const afterOnPeakStartPeriod = {
        isValid: true,
        actualDuration: getTimeDiffInFormatHHMM(
          new Date(overlapStartPoint),
          sessionEnd
        ),
        totalHours: getTimeDiffInHour(new Date(overlapStartPoint), sessionEnd),
      };

      totalTimePeriodRanges.push(beforeOnPeakPeriod);
      totalTimePeriodRanges.push(afterOnPeakStartPeriod);

      return totalTimePeriodRanges;
    }

    // TC#4
    if (isSessionStartBeforeOnPeak && isSessionEndInBetweenOnPeakPeriod) {
      const beforeOnPeakPeriod = {
        isValid: false,
        actualDuration: getTimeDiffInFormatHHMM(sessionStart, onPeakStart),
        totalHours: getTimeDiffInHour(sessionStart, onPeakStart),
      };

      const atOnPeakStartEdge = {
        isValid: false,
        actualDuration: getTimeDiffInFormatHHMM(onPeakStart, onPeakStart),
        totalHours: getTimeDiffInHour(onPeakStart, onPeakStart),
      };

      const afterOnPeakStartPeriod = {
        isValid: true,
        actualDuration: getTimeDiffInFormatHHMM(
          new Date(overlapStartPoint),
          sessionEnd
        ),
        totalHours: getTimeDiffInHour(new Date(overlapStartPoint), sessionEnd),
      };

      totalTimePeriodRanges.push(beforeOnPeakPeriod);
      totalTimePeriodRanges.push(atOnPeakStartEdge);
      totalTimePeriodRanges.push(afterOnPeakStartPeriod);

      return totalTimePeriodRanges;
    }

    // TC#5
    if (isSessionStartBeforeOnPeak && isSessionEndAtOnPeakEnd) {
      const beforeOnPeakPeriod = {
        isValid: false,
        actualDuration: getTimeDiffInFormatHHMM(sessionStart, onPeakStart),
        totalHours: getTimeDiffInHour(sessionStart, onPeakStart),
      };

      const afterOnPeakStartPeriod = {
        isValid: true,
        actualDuration: getTimeDiffInFormatHHMM(
          new Date(overlapStartPoint),
          onPeakEnd
        ),
        totalHours: getTimeDiffInHour(new Date(overlapStartPoint), onPeakEnd),
      };

      const atOnPeakEndEdge = {
        isValid: false,
        actualDuration: getTimeDiffInFormatHHMM(onPeakEnd, onPeakEnd),
        totalHours: getTimeDiffInHour(onPeakEnd, onPeakEnd),
      };

      totalTimePeriodRanges.push(beforeOnPeakPeriod);
      totalTimePeriodRanges.push(afterOnPeakStartPeriod);
      totalTimePeriodRanges.push(atOnPeakEndEdge);

      return totalTimePeriodRanges;
    }

    // TC#6
    if (isSessionStartBeforeOnPeak && isSessionEndAfterOnPeakEnd) {
      const beforeOnPeakPeriod = {
        isValid: false,
        actualDuration: getTimeDiffInFormatHHMM(sessionStart, onPeakStart),
        totalHours: getTimeDiffInHour(sessionStart, onPeakStart),
      };

      const afterOnPeakStartPeriod = {
        isValid: true,
        actualDuration: getTimeDiffInFormatHHMM(
          new Date(overlapStartPoint),
          onPeakEnd
        ),
        totalHours: getTimeDiffInHour(new Date(overlapStartPoint), onPeakEnd),
      };

      const afterOnPeakEndPeriod = {
        isValid: false,
        actualDuration: getTimeDiffInFormatHHMM(onPeakEnd, sessionEnd),
        totalHours: getTimeDiffInHour(onPeakEnd, sessionEnd),
      };

      totalTimePeriodRanges.push(beforeOnPeakPeriod);
      totalTimePeriodRanges.push(afterOnPeakStartPeriod);
      totalTimePeriodRanges.push(afterOnPeakEndPeriod);

      return totalTimePeriodRanges;
    }

    // TC#9 && TC#10
    if (isSessionStartAtOnPeakStart && isSessionEndInBetweenOnPeakPeriod) {
      const atOnPeakStartEdge = {
        isValid: false,
        actualDuration: getTimeDiffInFormatHHMM(onPeakStart, onPeakStart),
        totalHours: getTimeDiffInHour(onPeakStart, onPeakStart),
      };
      const afterOnPeakStartPeriod = {
        isValid: true,
        actualDuration: getTimeDiffInFormatHHMM(
          new Date(overlapStartPoint),
          sessionEnd
        ),
        totalHours: getTimeDiffInHour(new Date(overlapStartPoint), sessionEnd),
      };

      totalTimePeriodRanges.push(atOnPeakStartEdge);
      totalTimePeriodRanges.push(afterOnPeakStartPeriod);

      return totalTimePeriodRanges;
    }

    // TC#11
    if (isSessionStartAtOnPeakStart && isSessionEndAtOnPeakEnd) {
      const atOnPeakStartEdge = {
        isValid: false,
        actualDuration: getTimeDiffInFormatHHMM(onPeakStart, onPeakStart),
        totalHours: getTimeDiffInHour(onPeakStart, onPeakStart),
      };
      const afterOnPeakStartPeriod = {
        isValid: true,
        actualDuration: getTimeDiffInFormatHHMM(
          new Date(overlapStartPoint),
          sessionEnd
        ),
        totalHours: getTimeDiffInHour(new Date(overlapStartPoint), sessionEnd),
      };
      const atOnPeakEndEdge = {
        isValid: false,
        actualDuration: getTimeDiffInFormatHHMM(onPeakEnd, onPeakEnd),
        totalHours: getTimeDiffInHour(onPeakEnd, onPeakEnd),
      };

      totalTimePeriodRanges.push(atOnPeakStartEdge);
      totalTimePeriodRanges.push(afterOnPeakStartPeriod);
      totalTimePeriodRanges.push(atOnPeakEndEdge);

      return totalTimePeriodRanges;
    }

    const INVALID_CASE = [
      {
        isValid: false,
        actualDuration: "0:00",
        totalHours: 0,
      },
    ];

    return INVALID_CASE;
  }
}

export class PaymentCalculator {
  calculateAvailabilityPayment(periodInMinutes: number) {
    const FIRST_HOUR_RATE = 4.0;
    const SECOND_HOUR_RATE = 4.0;
    const BASE_RATE = 16.0;

    const numberOfHours = Math.floor(periodInMinutes / 60);
    const tiedRates = [FIRST_HOUR_RATE, SECOND_HOUR_RATE];
    let totalAmount = 0.0;

    if (numberOfHours > 0) {
      const remainingHours = Math.max(0, numberOfHours - tiedRates.length);
      totalAmount =
        tiedRates
          .slice(0, numberOfHours)
          .reduce((total, rate) => total + rate, 0) +
        remainingHours * BASE_RATE;
    }

    return totalAmount;
  }

  calculateEnergyPayment(units: number) {
    const BASE_RATE = 5.0;
    return units * BASE_RATE;
  }
}
