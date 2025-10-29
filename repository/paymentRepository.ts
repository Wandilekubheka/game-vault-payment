import { auth } from "../config/firebase.js";
import { db } from "../config/firebase.js";
import { AccountModel } from "../model/accountModel.js";
import { PaymentResponse } from "../model/paymentModels.js";

function getPaymentById(id: string): Promise<PaymentResponse | null> {
  return new Promise((resolve, reject) => {});
}

async function createPaymentDocument(
  payment: PaymentResponse
): Promise<string> {
  try {
    const docRef = db.collection("payments").doc(payment.paymentId);
    await docRef.set(payment);
    return docRef.id;
  } catch (error) {
    throw Error("Failed to create payment document: " + error);
  }
}

// Decode user token to get user id
async function getUserByToken(userToken: string): Promise<string> {
  try {
    const user = await auth.verifyIdToken(userToken);
    return user.uid;
  } catch (error) {
    throw Error("Invalid user token");
  }
}

// Retrieve account details by account ID
async function getAccountDetails(productId: string): Promise<AccountModel> {
  try {
    const doc = await db.collection("accounts").doc(productId).get();
    if (doc.exists) {
      return doc.data() as AccountModel;
    }
    throw Error("Failed to retrieve account details: " + productId);
  } catch (error) {
    throw Error("Failed to retrieve account details: " + error);
  }
}

export {
  getPaymentById,
  createPaymentDocument,
  getUserByToken,
  getAccountDetails,
};
