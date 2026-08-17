import express from "express";
import cors from "cors";

import courseRouter
  from "./routes/course.routes";
import studentRouter
  from "./routes/student.routes";

const app = express();

app.use(express.json());

app.use(cors({
      origin: "http://localhost:4200"
}));

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

app.use(
  "/api/students",
  studentRouter
);


export default app;