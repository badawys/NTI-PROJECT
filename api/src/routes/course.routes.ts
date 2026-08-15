import {
  Router
} from "express";

import {
  createCourse,
  deleteCourse,
  getCourseById,
  getCourses,
  updateCourse
} from "../controllers/course.controller";

const router = Router();

router.post(
  "/",
  createCourse
);

router.get(
  "/",
  getCourses
);

router.get(
  "/:id",
  getCourseById
);

router.patch(
  "/:id",
  updateCourse
);

router.delete(
  "/:id",
  deleteCourse
);

export default router;
