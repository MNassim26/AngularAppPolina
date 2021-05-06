import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LoginService } from 'src/app/services/login/login.service'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from "@angular/router"
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private breakpointObserver: BreakpointObserver,private loginService:LoginService,private router: Router ) { }

  ngOnInit() {
    if (this.loginService.getCompteCo() == null )
       this.router.navigate(['/login']);
  }

  deconnect(){
    this.loginService.setCompteCo(null);
  }

}
