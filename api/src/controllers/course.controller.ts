import type {
  Request,
  Response
} from "express";

import {
  Course
} from "../models/course.model";

// Create a new course
export async function createCourse(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const course =
      await Course.create(
        request.body
      );

    response.status(201).json({
      success: true,
      data: course
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not create course"
    });

  }
}
// Get all courses
export async function getCourses(
  _request: Request,
  response: Response
): Promise<void> {

  try {

    const courses =
      await Course
        .find()
        .sort({
          createdAt: -1
        });

    response.json({
      success: true,
      count: courses.length,
      data: courses
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: "Could not load courses"
    });

  }
}
// Get a single course by id
export async function getCourseById(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const course =
      await Course.findById(
        request.params.id
      );

    if (!course) {

      response.status(404).json({
        success: false,
        message: "Course not found"
      });

      return;
    }

    response.json({
      success: true,
      data: course
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message: "Invalid course id"
    });

  }
}
// Update a course by id
export async function updateCourse(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const course =
      await Course.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!course) {

      response.status(404).json({
        success: false,
        message: "Course not found"
      });

      return;
    }

    response.json({
      success: true,
      data: course
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not update course"
    });

  }
}
// Delete a course by id
export async function deleteCourse(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const course =
      await Course.findByIdAndDelete(
        request.params.id
      );

    if (!course) {

      response.status(404).json({
        success: false,
        message: "Course not found"
      });

      return;
    }

    response.json({
      success: true,
      message: "Course deleted"
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message: "Invalid course id"
    });

  }
}
