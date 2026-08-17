import {
  Component,
  inject,
  OnInit
} from "@angular/core";

import {
  FormsModule
} from "@angular/forms";

import {
  CourseService
} from "../../core/services/course";

import type {
  Course,
  CreateCourseInput
} from "../../models/course";

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

  courses: Course[] = [];

  loading = false;

  message = "";

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {

    this.loading = true;

    this.message = "";

    this.courseService
      .getCourses()
      .subscribe({

        next: (response) => {

          this.courses = response.data;

          this.loading = false;
        },

        error: () => {

          this.message = "Could not load courses";

          this.loading = false;
        }
      });
  }

}

