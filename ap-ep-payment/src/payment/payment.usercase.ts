import { ISessionRepository } from "./payment.repository";
import { PaymentCalculator, PaymentConditions } from "./payment.service";

export interface CalculatePaymentRequest {
  sessionId: string;
}

export interface CalculatePaymentResponse {
  sessionId: string;
  APAmount: number;
  // EPAmount: number;
}

export class CalculatePaymentUseCase {
  constructor(
    private readonly repo: ISessionRepository,
    private readonly validator: PaymentConditions,
    private readonly calculator: PaymentCalculator
  ) {}

  async execute(
    request: CalculatePaymentRequest
  ): Promise<CalculatePaymentResponse> {
    const session = await this.repo.getById(request.sessionId);
    if (!session) throw new Error("Transaction not found");

    if (!this.validator.isValidSession(session)) {
      throw new Error("Session invalid");
    }

    const APAmount = this.calculator.calculateAvailabilityPayment(
      session.duration
    );

    // const { APAmount, EPAmount } = this.calculator.calculate(session);
    return { sessionId: session.id, APAmount };
  }
}
