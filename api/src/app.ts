import express from "express";
import cors from "cors";
import courseRouter
  from "./routes/course.routes";

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

app.use(
  "/api/courses",
  courseRouter
);

export default app;