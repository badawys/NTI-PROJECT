import {
  inject,
  Injectable
} from "@angular/core";

import {
  HttpClient
} from "@angular/common/http";

import {
  Observable
} from "rxjs";

import {
  API_BASE_URL
} from "../api.config";

import type {
  ApiResponse
} from "../../models/api-response";

import type {
  Course,
  CreateCourseInput,
  UpdateCourseInput
} from "../../models/course";

@Injectable({
  providedIn: "root"
})
export class CourseService {

    private readonly http =
        inject(HttpClient);

    private readonly url = `${API_BASE_URL}/courses`;


    getCourses(): Observable<ApiResponse<Course[]>> {
      return this.http.get<ApiResponse<Course[]>>(this.url);
    };

    getCourseById(id: string): Observable<ApiResponse<Course>> {
      return this.http.get<ApiResponse<Course>>(`${this.url}/${id}`);
    };

    createCourse(course: CreateCourseInput): Observable<ApiResponse<Course>> {
      return this.http.post<ApiResponse<Course>>(this.url,course);
    }

    deleteCourse(id: string): Observable<{success: boolean; message: string;}> {
      return this.http.delete<{success: boolean; message: string; }>(`${this.url}/${id}`);
    }

    updateCourse(id: string, updates: UpdateCourseInput): Observable<ApiResponse<Course>> {
      return this.http.patch<ApiResponse<Course>>(`${this.url}/${id}`,updates);
    }


}
