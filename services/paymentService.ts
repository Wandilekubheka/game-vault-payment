//  This service handles payment-related operations
import { PaymentResponse } from "../model/paymentModels.js";
import TransactionStatus from "../model/transactionStatus.js";
import {
  createPaymentDocument,
  getPaymentById,
} from "../repository/paymentRepository.js";

// client calls this to create a payment intent
function createPaymentIntent(): Promise<PaymentResponse> {
  return new Promise(async (resolve, reject) => {});
}

// called by webhook to validate payment
function validatePayment(paymentId: string): Promise<TransactionStatus> {
  return new Promise(async (resolve, reject) => {});
}

export { createPaymentIntent, validatePayment };
