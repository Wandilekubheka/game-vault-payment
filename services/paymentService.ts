//  This service handles payment-related operations
import { stat } from "fs";
import {
  PaymentRequest,
  PaymentResponse,
  PaymentResponseError,
} from "../model/paymentModels.js";
import TransactionStatus from "../model/transactionStatus.js";
import { YocoSuccessResponse } from "../model/yocoResponses.js";
import {
  getAccountDetails,
  getUserByToken,
} from "../repository/paymentRepository.js";
import { log } from "console";

// client calls this to create a payment intent
async function createPaymentIntent(
  request: PaymentRequest
): Promise<PaymentResponse | PaymentResponseError> {
  const url = "https://payments.yoco.com/api/checkouts";
  const paymentKey = "sk_test_960bfde0VBrLlpK098e4ffeb53e1";

  try {
    // use the uid and account details to create doc
    const userId = await getUserByToken(request.userToken);
    const accountDetails = await getAccountDetails(request.productId);
    if (!accountDetails) {
      const paymentErrorResponse: PaymentResponseError = {
        error: "Account not found",
        statusCode: 404,
      };
      return paymentErrorResponse;
    }
    log("Creating payment intent for user:", userId);
    log("Account details:", accountDetails.price);
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paymentKey}`,
        "Content-Type": "application/json",
      },
      // TODO: do price conversion
      body: JSON.stringify({
        amount: accountDetails.price * 100, // amount in cents
        currency: request.currency,
        successUrl: "https://mystore.com/payment/success",
        cancelUrl: "https://mystore.com/payment/failed",
        failureUrl: "https://mystore.com/payment/failed",
      }),
    };
    const response = await fetch(url, options);
    if (response.status == 200) {
      // all data should be present if yoco API doesn't do me wrong.
      const data = (await response.json()) as YocoSuccessResponse;
      const paymentResponseData = {
        paymentId: data.id,
        status: data.status as TransactionStatus,
        createdAt: new Date(),
        paymentUrl: data.redirectUrl,
        statusCode: response.status,
      };

      return paymentResponseData;
    } else if (response.status >= 400 && response.status < 500) {
      const errorData: any = await response.json();
      const paymentErrorResponse: PaymentResponseError = {
        error: errorData.message || "Unknown error",
        statusCode: response.status,
        description: errorData.description,
      };
      return paymentErrorResponse;
    } else if (response.status >= 500) {
      const paymentErrorResponse: PaymentResponseError = {
        error: "Payment provider error",
        statusCode: response.status,
      };
      return paymentErrorResponse;
    }
    const paymentErrorResponse: PaymentResponseError = {
      error: "Unexpected error",
      statusCode: response.status,
    };
    return paymentErrorResponse;
  } catch (error: any) {
    // errors not within the payment service but within domain
    const paymentErrorResponse: PaymentResponseError = {
      error: error.message,
      statusCode: 500,
    };
    return paymentErrorResponse;
  }
}

export { createPaymentIntent };
