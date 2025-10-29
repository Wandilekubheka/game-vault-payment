import express from "express";
import { createPaymentIntent } from "../services/paymentService.js";
import {
  PaymentRequest,
  PaymentResponse,
  PaymentResponseError,
} from "../model/paymentModels.js";
import { log } from "console";

const router = express.Router();
router.post("/create-payment", async (req: any, res) => {
  log("Received create-payment request:", req.body);
  try {
    const paymentRequest: PaymentRequest = {
      userToken: `${req.headers.authorization?.split(" ")[1]}`,
      productId: req.body.productId,
      currency: req.body.currency,
    };
    if (!paymentRequest.userToken) {
      // client didnt pass bearer token
      res.status(401).json({ error: "Unauhtorized" });
      log("Unauthorized request: missing user token");
      return;
    }
    if (!paymentRequest.productId) {
      // item being purchased
      res.status(400).json({ error: "Product ID is required" });
      log("Bad request: missing product ID");
      return;
    }
    if (!paymentRequest.currency) {
      // default currency
      paymentRequest.currency = "ZAR";
    }
    // payment logic happens here
    const paymentResponse = await createPaymentIntent(paymentRequest);
    if (paymentResponse.statusCode == 200) {
      res.json(paymentResponse as PaymentResponse);
      log("Payment created successfully:", paymentResponse);
    } else {
      res
        .status((paymentResponse as PaymentResponseError).statusCode)
        .json(paymentResponse as PaymentResponseError);
      log("Payment creation failed:", paymentResponse);
    }
  } catch (error) {
    log("Error occurred while creating payment:", error);
    // temp error handling
    res.status(500).json({ error: "Failed to create payment" });
  }
});

export { router };
