import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.get(
  "/api/health",
  (_request, response) => {

    response.json({
      success: true,
      message: "API is running"
    });
  }
);

export default app;