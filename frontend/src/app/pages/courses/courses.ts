import {
  Component,
  inject,
  OnInit,
  signal
} from "@angular/core";

import { FormsModule } from "@angular/forms";

import { CourseService } from "../../core/services/course";

import type { Course, CreateCourseInput } from "../../models/course";

@Component({
  selector: "app-courses",
  imports: [
    FormsModule
  ],
  templateUrl: "./courses.html",
  styleUrl: "./courses.css"
})
export class Courses implements OnInit {

  private readonly courseService = inject(CourseService);

  courses = signal<Course[]>([]);

  loading = signal(false);

  message = signal("");

  editingCourseId = signal<string | null>(null);

  form: CreateCourseInput = {
    title: "",
    description: "",
    durationHours: 1,
    price: 0,
    level: "Beginner",
    active: true
  };

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {

    this.loading.set(true);
    this.message.set("");

    this.courseService
      .getCourses()
      .subscribe({

        next: (response) => {

          this.courses.set(response.data);

          this.loading.set(false);
        },

        error: () => {

          this.message.set("Could not load courses");

          this.loading.set(false);
        }
      });
  }

  resetForm(): void {
    this.form = {
      title: "",
      description: "",
      durationHours: 1,
      price: 0,
      level: "Beginner",
      active: true
    };
  }

  saveCourse(): void {

    this.message.set("");

    const editingId = this.editingCourseId();

    if (editingId) {

      this.courseService.updateCourse(editingId,this.form)
        .subscribe({
          next: () => {
            this.message.set(
              "Course updated successfully"
            );
            this.cancelEdit();
            this.loadCourses();
          },

          error: () => {
            this.message.set(
              "Could not update course"
            );
          }
        });

      return;
    }

    this.courseService.createCourse(this.form).subscribe({
        next: () => {
          this.message.set("Course created successfully");
          this.resetForm();
          this.loadCourses();
        },

        error: () => {
          this.message.set(
            "Could not create course"
          );
        }
      });
  }

  deleteCourse(id: string): void {

    const confirmed =
      window.confirm(
        "Delete this course?"
      );

    if (!confirmed) {
      return;
    }

    this.courseService.deleteCourse(id).subscribe({
        next: () => {
          this.message.set(
            "Course deleted"
          );

          this.loadCourses();
        },
        error: () => {

          this.message.set(
            "Could not delete course"
          );
        }
      });
  }

  startEdit(course: Course): void {

      this.editingCourseId.set(course._id);
      this.form = {
        title: course.title,
        description:course.description,
        durationHours:course.durationHours,
        price: course.price,
        level: course.level,
        active: course.active
      };
  }

  cancelEdit(): void {

  this.editingCourseId.set(null);

  this.resetForm();
}


}