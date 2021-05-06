import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  compte:any=[];
  compteCo=null;
  url:string='http://localhost:8080/compte/';
  
  constructor(private http:HttpClient) {
   }

  getCompte(username){
    return this.http.get(this.url+"find/"+username)
  }

  setCompteCo(compteCo){
    this.compteCo=compteCo;
  }

  getCompteCo(){
    return this.compteCo;
  }
}
