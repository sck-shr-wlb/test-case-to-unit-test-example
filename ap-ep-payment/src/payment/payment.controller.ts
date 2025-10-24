import { CalculatePaymentUseCase } from "./payment.usercase";

export class PaymentController {
  constructor(
    private readonly calculatePaymentUseCase: CalculatePaymentUseCase
  ) {}
}
