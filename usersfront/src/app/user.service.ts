import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { User } from './util/User';
import { UserType } from './util/UserType';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly USERS_API_URL: string = "http://localhost:8080/api/users";
  readonly USERTYPE_API_URL: string = "http://localhost:8080/api/user_types";


  constructor(private httpClient : HttpClient) { }

  /* /api/users CALLS */
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.USERS_API_URL);
  }

  createUser(user : User) : Observable<User> {
    return this.httpClient.post<User>(this.USERS_API_URL, user);
  }

  deleteUser(user : User) : Observable<any> {
    let body = new HttpParams();
    body.append("id", user.id.toString());
    console.log(user.id);
    return this.httpClient.delete<any>(this.USERS_API_URL, {params: new HttpParams().set("id",""+user.id)});
  }

  editUser(user : User) : Observable<any> {
    return this.httpClient.put<any>(this.USERS_API_URL, user);
  }

  /* /api/user_types CALLS */
  getUserTypes(): Observable<UserType[]> {
    return this.httpClient.get<UserType[]>(this.USERTYPE_API_URL);
  }

  createUserType(userType : UserType) : Observable<UserType> {
    return this.httpClient.post<UserType>(this.USERTYPE_API_URL, userType);
  }

  deleteUserType(userType : UserType): Observable<any> {
    let args = new HttpParams();
    args.set("id", userType.id.toString());
    console.log("Service deleteUserType() " + userType.id);
    return this.httpClient.delete<any>(this.USERTYPE_API_URL, {params: new HttpParams().set("id",""+userType.id)});
  }

  editUserType(userType : UserType) : Observable<UserType> {
    return this.httpClient.put<any>(this.USERTYPE_API_URL, userType);
  }

}
