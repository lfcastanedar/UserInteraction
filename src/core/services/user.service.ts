import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private environment = environment;

  constructor(private http: HttpClient) { }

  login(user: any){
    return this.http.post(`${ environment.url }/login`, {user: user}).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  register(user: any){
    return this.http.post(`${ environment.url }/signup`, {user: user}).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  getSidebar(){
    return this.http.get(`${ environment.url }/api/users/get_sidebar`);
  }

  getEtherAccount(){
    return this.http.get(`${ environment.url }/api/users/get_ether_account`);
  }

  getAccount(){
    return this.http.get(`${ environment.url }/api/users/get_account`);
  }

  getProfile(user_id: string){
    return this.http.get(`${ environment.url }/api/users/get_profile/${ user_id }`);
  }

  getAllUsers(){
    return this.http.get(`${ environment.url }/api/users/get_all_user`);
  }

  getUsersGroupByRoles(){
    return this.http.get(`${ environment.url }/api/users/get_user_group_by_roles`);
  }

  getUserRoles(){
    return this.http.get(`${ environment.url }/api/users/get_user_roles`);
  }

  postUpdatePassword(data: any) {
    return this.http.post(`${ environment.url }/api/users/update_password`, data).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  putEditProfile(user_id: string, data: any) {
    return this.http.put(`${ environment.url }/api/users/edit_profile/${ user_id }`, data).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  getProfileNavbar(){
    return JSON.parse(localStorage.getItem('_user') ?? '')
  }
}
