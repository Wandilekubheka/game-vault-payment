//  This service handles payment-related operations
import { PaymentResponse } from "../model/paymentModels";
import TransactionStatus from "../model/transactionStatus";
import {
  createPaymentDocument,
  getPaymentById,
} from "../repository/paymentRepository";

// client calls this to create a payment intent
function createPaymentIntent(): Promise<PaymentResponse> {
  return new Promise(async (resolve, reject) => {});
}

// called by webhook to validate payment
function validatePayment(paymentId: string): Promise<TransactionStatus> {
  return new Promise(async (resolve, reject) => {});
}

export { createPaymentIntent, validatePayment };
