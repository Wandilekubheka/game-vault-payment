import router from "./routes/paymentRoutes";
import express from "express";

const app = express();
app.use(express.json());

app.use("/payments", router);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
