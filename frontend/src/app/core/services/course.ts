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

}
