import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  /**
   * Get all users
   * @returns list of all users
   */
  getUsers(): Observable<User[]> {
    return this.httpClient
      .get<{ users: User[]; total: number; skip: number; limit: number }>(
        this.apiUrl
      )
      .pipe(
        map((response) =>
          response.users
        )
      );
  }

  /**
   * Get a single user by his/her id
   * @param id of the user
   * @returns user
   */
  getUser(id: number): Observable<User> {
    return this.httpClient
      .get<User>(this.apiUrl + '/' + id);
  }

  /**
   * Add an user
   * @param user
   * @returns
   */
  addUser(user: User): Observable<User> {
    return this.httpClient
      .post<User>(this.apiUrl + '/add', user, { headers: this.headers });
  }

  /**
   * Update user data
   * @param user
   * @returns updated user
   */
  updateUser(user: User): Observable<User> {
    return this.httpClient
      .put<User>(this.apiUrl + '/' + user.id, user, { headers: this.headers });
  }

  /**
   * Delete an user by his id
   * @param id
   * @returns user with a isdeleted field
   */
  deleteUser(id: number): Observable<User> {
    return this.httpClient
      .delete<User>(this.apiUrl + '/' + id);
  }
}
