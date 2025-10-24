import { PaymentConditions } from "../../../src/payment/payment.service";

describe("Payment Service - Check Date Type", () => {
  it("It should return false If Session Date is 13th Oct and the 13th is Day Off", () => {
    // Arrange
    const expected = false;
    const dayOffList = ["2025-10-13"];
    const formattedDayOffList = dayOffList.map((date) => new Date(`${date}`));
    const sessionDate = new Date("2025-10-13");
    const paymentService = new PaymentConditions();

    // Act
    const actual = paymentService.isRegularDay(
      sessionDate,
      formattedDayOffList
    );

    // Assert
    expect(actual).toEqual(expected);
  });

  it("It should return true If Session Date is 16th Oct and the 13th is Day Off", () => {
    // Arrange
    const expected = true;
    const dayOffList = ["2025-10-16"];
    const formattedDayOffList = dayOffList.map((date) => new Date(`${date}`));
    const sessionDate = new Date("2025-10-13");
    const paymentService = new PaymentConditions();

    // Act
    const actual = paymentService.isRegularDay(
      sessionDate,
      formattedDayOffList
    );

    // Assert
    expect(actual).toEqual(expected);
  });
});

describe("Payment Service - Check Time Period", () => {
  it("TC1: It should return false If Session started at 07:00 and ended at 07:00", () => {
    // Arrange
    const expected = [
      {
        isValid: false,
        actualDuration: "0:00",
        totalHours: 0,
      },
    ];
    const onPeakPeriod = {
      start: "09:00:00",
      end: "22:00:00",
    };
    const sessionPeriod = {
      start: new Date("2025-10-21T07:00:00+07:00"),
      end: new Date("2025-10-21T07:00:00+07:00"),
    };
    const paymentService = new PaymentConditions();

    // Act
    const actual = paymentService.isOnPeak(onPeakPeriod, sessionPeriod);

    // Assert
    expect(actual).toEqual(expected);
  });

  it("TC2: It should return false If Session started at 08:30 and ended at 09:00", () => {
    // Arrange
    const expected = [
      {
        isValid: false,
        actualDuration: "0:30",
        totalHours: 0,
      },
      {
        isValid: false,
        actualDuration: "0:00",
        totalHours: 0,
      },
    ];
    const onPeakPeriod = {
      start: "09:00:00",
      end: "22:00:00",
    };
    const sessionPeriod = {
      start: new Date("2025-10-21T08:30:00+07:00"),
      end: new Date("2025-10-21T09:00:00+07:00"),
    };
    const paymentService = new PaymentConditions();

    // Act
    const actual = paymentService.isOnPeak(onPeakPeriod, sessionPeriod);

    // Assert
    expect(actual).toEqual(expected);
  });

  it("TC3: It should return true If Session started at 08:00 and ended at 10:30", () => {
    // Arrange
    const expected = [
      {
        isValid: false,
        actualDuration: "1:00",
        totalHours: 1,
      },
      {
        isValid: true,
        actualDuration: "1:30",
        totalHours: 1,
      },
    ];
    const onPeakPeriod = {
      start: "09:00:00",
      end: "22:00:00",
    };
    const sessionPeriod = {
      start: new Date("2025-10-21T08:00:00+07:00"),
      end: new Date("2025-10-21T10:30:00+07:00"),
    };
    const paymentService = new PaymentConditions();

    // Act
    const actual = paymentService.isOnPeak(onPeakPeriod, sessionPeriod);

    // Assert
    expect(actual).toEqual(expected);
  });

  it("TC4: It should return true If Session started at 06:00 and ended at 20:00", () => {
    // Arrange
    const expected = [
      {
        isValid: false,
        actualDuration: "3:00",
        totalHours: 3,
      },
      {
        isValid: true,
        actualDuration: "11:00",
        totalHours: 11,
      },
    ];
    const onPeakPeriod = {
      start: "09:00:00",
      end: "22:00:00",
    };
    const sessionPeriod = {
      start: new Date("2025-10-21T06:00:00+07:00"),
      end: new Date("2025-10-21T20:00:00+07:00"),
    };
    const paymentService = new PaymentConditions();

    // Act
    const actual = paymentService.isOnPeak(onPeakPeriod, sessionPeriod);

    // Assert
    expect(actual).toEqual(expected);
  });

  it("TC5: It should return true If Session started at 06:30 and ended at 22:00", () => {
    // Arrange
    const expected = [
      {
        isValid: false,
        actualDuration: "2:30",
        totalHours: 2,
      },
      {
        isValid: true,
        actualDuration: "13:00",
        totalHours: 13,
      },
      {
        isValid: false,
        actualDuration: "0:00",
        totalHours: 0,
      },
    ];
    const onPeakPeriod = {
      start: "09:00:00",
      end: "22:00:00",
    };
    const sessionPeriod = {
      start: new Date("2025-10-21T06:30:00+07:00"),
      end: new Date("2025-10-21T22:00:00+07:00"),
    };
    const paymentService = new PaymentConditions();

    // Act
    const actual = paymentService.isOnPeak(onPeakPeriod, sessionPeriod);

    // Assert
    expect(actual).toEqual(expected);
  });

  it("TC6: It should return true If Session started at 07:45 and ended at 23:30", () => {
    // Arrange
    const expected = [
      {
        isValid: false,
        actualDuration: "1:15",
        totalHours: 1,
      },
      {
        isValid: true,
        actualDuration: "13:00",
        totalHours: 13,
      },
      {
        isValid: false,
        actualDuration: "1:30",
        totalHours: 1,
      },
    ];
    const onPeakPeriod = {
      start: "09:00:00",
      end: "22:00:00",
    };
    const sessionPeriod = {
      start: new Date("2025-10-21T07:45:00+07:00"),
      end: new Date("2025-10-21T23:30:00+07:00"),
    };
    const paymentService = new PaymentConditions();

    // Act
    const actual = paymentService.isOnPeak(onPeakPeriod, sessionPeriod);

    // Assert
    expect(actual).toEqual(expected);
  });

  it("TC8: It should return false If Session started at 09:00 and ended at 09:00", () => {
    // Arrange
    const expected = [
      {
        isValid: false,
        actualDuration: "0:00",
        totalHours: 0,
      },
    ];
    const onPeakPeriod = {
      start: "09:00:00",
      end: "22:00:00",
    };
    const sessionPeriod = {
      start: new Date("2025-10-21T09:00:00+07:00"),
      end: new Date("2025-10-21T09:00:00+07:00"),
    };
    const paymentService = new PaymentConditions();

    // Act
    const actual = paymentService.isOnPeak(onPeakPeriod, sessionPeriod);

    // Assert
    expect(actual).toEqual(expected);
  });

  it("TC9: It should return false If Session started at 09:00 and ended at 12:00", () => {
    // Arrange
    const expected = [
      {
        isValid: false,
        actualDuration: "0:00",
        totalHours: 0,
      },
      {
        isValid: true,
        actualDuration: "3:00",
        totalHours: 3,
      },
    ];
    const onPeakPeriod = {
      start: "09:00:00",
      end: "22:00:00",
    };
    const sessionPeriod = {
      start: new Date("2025-10-21T09:00:00+07:00"),
      end: new Date("2025-10-21T12:00:00+07:00"),
    };
    const paymentService = new PaymentConditions();

    // Act
    const actual = paymentService.isOnPeak(onPeakPeriod, sessionPeriod);

    // Assert
    expect(actual).toEqual(expected);
  });

  it("TC10: It should return false If Session started at 09:00 and ended at 13:00", () => {
    // Arrange
    const expected = [
      {
        isValid: false,
        actualDuration: "0:00",
        totalHours: 0,
      },
      {
        isValid: true,
        actualDuration: "4:00",
        totalHours: 4,
      },
    ];
    const onPeakPeriod = {
      start: "09:00:00",
      end: "22:00:00",
    };
    const sessionPeriod = {
      start: new Date("2025-10-21T09:00:00+07:00"),
      end: new Date("2025-10-21T13:00:00+07:00"),
    };
    const paymentService = new PaymentConditions();

    // Act
    const actual = paymentService.isOnPeak(onPeakPeriod, sessionPeriod);

    // Assert
    expect(actual).toEqual(expected);
  });

  it("TC11: It should return false If Session started at 09:00 and ended at 22:00", () => {
    // Arrange
    const expected = [
      {
        isValid: false,
        actualDuration: "0:00",
        totalHours: 0,
      },
      {
        isValid: true,
        actualDuration: "13:00",
        totalHours: 13,
      },
      {
        isValid: false,
        actualDuration: "0:00",
        totalHours: 0,
      },
    ];
    const onPeakPeriod = {
      start: "09:00:00",
      end: "22:00:00",
    };
    const sessionPeriod = {
      start: new Date("2025-10-21T09:00:00+07:00"),
      end: new Date("2025-10-21T22:00:00+07:00"),
    };
    const paymentService = new PaymentConditions();

    // Act
    const actual = paymentService.isOnPeak(onPeakPeriod, sessionPeriod);

    // Assert
    expect(actual).toEqual(expected);
  });
});
