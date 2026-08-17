import {
  Routes
} from "@angular/router";

import {
  Courses
} from "./pages/courses/courses";

import {
  Students
} from "./pages/students/students";

export const routes: Routes = [

  {
    path: "",
    redirectTo: "courses",
    pathMatch: "full"
  },

  {
    path: "courses",
    component: Courses
  },

  {
    path: "students",
    component: Students
  },

  {
    path: "**",
    redirectTo: "courses"
  }
];
