export interface YocoSuccessResponse {
  id: string;
  status: string;
  amount: number;
  currency: string;
  redirectUrl: string;
  paymentId: string | null;
  successUrl: string;
  cancelUrl: string;
  failureUrl: string;
  metadata: Record<string, any> | null;
  merchantId: string;
  totalDiscount: number | null;
  totalTaxAmount: number | null;
  subtotalAmount: number | null;
  lineItems: any[] | null;
  externalId: string | null;
  processingMode: "live" | "test";
}
