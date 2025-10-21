import { PaymentResponse } from "../model/paymentModels.js";

function getPaymentById(id: string): Promise<PaymentResponse | null> {
  return new Promise((resolve, reject) => {});
}

function createPaymentDocument(payment: PaymentResponse): Promise<string> {
  return new Promise((resolve, reject) => {});
}

export { getPaymentById, createPaymentDocument };
