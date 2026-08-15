import type {
  Request,
  Response
} from "express";

import {
  Course
} from "../models/course.model";


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
