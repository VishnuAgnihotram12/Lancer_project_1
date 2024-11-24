import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpservice: HttpClient) { }

  public register(signup: any){
    const payload = {
        username: signup.username,
        password: signup.password,
        is_admin: true
      }
      return this.httpservice.post("http://127.0.0.1:5000/register",payload)
  }

  public login(signIn: any){
    const payload = {
      username: signIn.emailOrUsername,
      password: signIn.password
    }
    return this.httpservice.post("http://127.0.0.1:5000/login",payload);
  }

  public addOragnisation(add_org: any){
    const payload = {
      org_name: add_org.organizationName,
      user_id: localStorage.getItem("UserId")
    }
    return this.httpservice.post("http://127.0.0.1:5000/add_organization",payload);
  }

  public oragnisationList(user_id: any){
    const payload = {
      user_id: user_id
    }
    return this.httpservice.post("http://127.0.0.1:5000/organizations",payload);
  }

  public add_user(user_data: any){
    const formData = new FormData();
    formData.append('newusername', user_data.userId);
    formData.append('newuserid', user_data.userName);
    return this.httpservice.post("http://127.0.0.1:5000/add",formData);
  }

  public attendanceAPI(){
    return this.httpservice.get("http://127.0.0.1:5000/start");
   }

}
