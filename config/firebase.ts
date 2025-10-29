import admin from "firebase-admin";
import serviceAccount from "./flick-value-firebase-adminsdk-r7dto-259b8149bf.json" with { type: "json" };

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

const db = admin.firestore(app);
const auth = admin.auth(app);

export { db, auth };
