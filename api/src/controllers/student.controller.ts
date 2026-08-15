import type {
  Request,
  Response
} from "express";

import {
  Student
} from "../models/student.model";

// Create a new student
export async function createStudent(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const student =
      await Student.create(
        request.body
      );

    response.status(201).json({
      success: true,
      data: student
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not create student"
    });

  }
}
// Get all students
export async function getStudents(
  _request: Request,
  response: Response
): Promise<void> {

  const students =
    await Student
      .find()
      .sort({
        createdAt: -1
      });

  response.json({
    success: true,
    count: students.length,
    data: students
  });
}
// Get a student by ID
export async function getStudentById(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const student =
      await Student.findById(
        request.params.id
      );

    if (!student) {

      response.status(404).json({
        success: false,
        message: "Student not found"
      });

      return;
    }

    response.json({
      success: true,
      data: student
    });

  } catch {

    response.status(400).json({
      success: false,
      message: "Invalid student id"
    });

  }
}
// Update a student by ID
export async function updateStudent(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const student =
      await Student.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!student) {

      response.status(404).json({
        success: false,
        message: "Student not found"
      });

      return;
    }

    response.json({
      success: true,
      data: student
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not update student"
    });

  }
}
// Delete a student by ID
export async function deleteStudent(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const student =
      await Student.findByIdAndDelete(
        request.params.id
      );

    if (!student) {

      response.status(404).json({
        success: false,
        message: "Student not found"
      });

      return;
    }

    response.json({
      success: true,
      message: "Student deleted"
    });

  } catch {

    response.status(400).json({
      success: false,
      message: "Invalid student id"
    });

  }
}



