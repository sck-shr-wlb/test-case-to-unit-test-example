import { PaymentCalculator } from "../../../src/payment/payment.service";

describe("Payment Service - AP amount per Session", () => {
  it("It should return 0.00 if Joined time is 59 mins", () => {
    // Arrange
    const expectedAPAmount = 0.0;
    const paymentService = new PaymentCalculator();
    // Act
    const actualAPAmount = paymentService.calculateAvailabilityPayment(59);

    // Assert
    expect(actualAPAmount).toEqual(expectedAPAmount);
  });

  it("It should return 4.00 if Joined time is 60 mins", () => {
    // Arrange
    const expectedAPAmount = 4.0;
    const paymentService = new PaymentCalculator();

    // Act
    const actualAPAmount = paymentService.calculateAvailabilityPayment(60);

    // Assert
    expect(actualAPAmount).toEqual(expectedAPAmount);
  });

  it("It should return 4.00 if Joined time is 101 mins", () => {
    // Arrange
    const expectedAPAmount = 4.0;
    const paymentService = new PaymentCalculator();

    // Act
    const actualAPAmount = paymentService.calculateAvailabilityPayment(101);

    // Assert
    expect(actualAPAmount).toEqual(expectedAPAmount);
  });

  it("It should return 8.00 if Joined time is 120 mins", () => {
    // Arrange
    const expectedAPAmount = 8.0;
    const paymentService = new PaymentCalculator();

    // Act
    const actualAPAmount = paymentService.calculateAvailabilityPayment(120);

    // Assert
    expect(actualAPAmount).toEqual(expectedAPAmount);
  });

  it("It should return 8.00 if Joined time is 121 mins", () => {
    // Arrange
    const expectedAPAmount = 8.0;
    const paymentService = new PaymentCalculator();

    // Act
    const actualAPAmount = paymentService.calculateAvailabilityPayment(121);

    // Assert
    expect(actualAPAmount).toEqual(expectedAPAmount);
  });

  it("It should return 24.00 if Joined time is 180 mins", () => {
    // Arrange
    const expectedAPAmount = 24.0;
    const paymentService = new PaymentCalculator();

    // Act
    const actualAPAmount = paymentService.calculateAvailabilityPayment(180);

    // Assert
    expect(actualAPAmount).toEqual(expectedAPAmount);
  });

  it("It should return 24.00 if Joined time is 181 mins", () => {
    // Arrange
    const expectedAPAmount = 24.0;
    const paymentService = new PaymentCalculator();

    // Act
    const actualAPAmount = paymentService.calculateAvailabilityPayment(181);

    // Assert
    expect(actualAPAmount).toEqual(expectedAPAmount);
  });

  it("It should return 40.00 if Joined time is 240 mins", () => {
    // Arrange
    const expectedAPAmount = 40.0;
    const paymentService = new PaymentCalculator();

    // Act
    const actualAPAmount = paymentService.calculateAvailabilityPayment(240);

    // Assert
    expect(actualAPAmount).toEqual(expectedAPAmount);
  });

  it("It should return 56.00 if Joined time is 300 mins", () => {
    // Arrange
    const expectedAPAmount = 56.0;
    const paymentService = new PaymentCalculator();

    // Act
    const actualAPAmount = paymentService.calculateAvailabilityPayment(300);

    // Assert
    expect(actualAPAmount).toEqual(expectedAPAmount);
  });

  it("It should return 184.00 if Joined time is 780 mins", () => {
    // Arrange
    const expectedAPAmount = 184.0;
    const paymentService = new PaymentCalculator();

    // Act
    const actualAPAmount = paymentService.calculateAvailabilityPayment(780);

    // Assert
    expect(actualAPAmount).toEqual(expectedAPAmount);
  });
});

describe("Payment Service - EP amount per Session", () => {
  it("It should return 2.50 if purchased energy is 0.5 kWh", () => {
    // Arrange
    const expectedEPAmount = 2.5;
    const paymentService = new PaymentCalculator();

    // Act
    const actualEPAmount = paymentService.calculateEnergyPayment(0.5);

    // Assert
    expect(actualEPAmount).toEqual(expectedEPAmount);
  });

  it("It should return 5.0 if purchased energy is 1 kWh", () => {
    // Arrange
    const expectedEPAmount = 5.0;
    const paymentService = new PaymentCalculator();

    // Act
    const actualEPAmount = paymentService.calculateEnergyPayment(1);

    // Assert
    expect(actualEPAmount).toEqual(expectedEPAmount);
  });

  it("It should return 7.5 if purchased energy is 1.5 kWh", () => {
    // Arrange
    const expectedEPAmount = 7.5;
    const paymentService = new PaymentCalculator();

    // Act
    const actualEPAmount = paymentService.calculateEnergyPayment(1.5);

    // Assert
    expect(actualEPAmount).toEqual(expectedEPAmount);
  });
});
