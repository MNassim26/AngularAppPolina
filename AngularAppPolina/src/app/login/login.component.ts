import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service'
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  compte:any={}
  c:any={}
  erreur=false;
  constructor(private loginService:LoginService,private router: Router) { }

  ngOnInit() {
    
  }

  login(){
    this.loginService.getCompte(this.compte.username).subscribe(
      (data)=>{
        this.c=data;
        if(data!=null){
          if( this.compte.password == this.c.password){
            this.router.navigate(['/home']);
            this.loginService.setCompteCo(this.c);
          }
          else
          this.erreur=true;
        }
        else 
        this.erreur=true;
      },
      (err)=>{
        console.log("erreur")
      }
    )
  }


}
