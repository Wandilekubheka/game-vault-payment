import TransactionStatus from "./transactionStatus.js";

// we won't accept amount in the request body for security reasons
type PaymentRequest = {
  currency: string;
  //TODO: decode user token to get user id
  userToken: string;
  // product id to identify what is being purchased so we can look up the amount on the server
  productId: string;
};

// haven't really thought about what to return here
type PaymentResponse = {
  paymentId: string;
  status: TransactionStatus;
  createdAt: Date;
  paymentUrl: string;
  statusCode: number;
};

type PaymentResponseError = {
  error: string;
  statusCode: number;
  description?: string;
};

export { PaymentRequest, PaymentResponse, PaymentResponseError };
