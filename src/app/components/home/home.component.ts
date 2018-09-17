import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  sesion: boolean = false;
  title: string = '';
  role: string = ''

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {
    if (JSON.parse(localStorage.getItem('sesion'))) {
      this.sesion = true;
    }
    if (JSON.parse(localStorage.getItem('role')) != null)  {
      this.role = JSON.parse(localStorage.getItem('role'));
    }
  }

  logout(){
    this.sesion= false;
    this.title = '';
    this.role = '';
    localStorage.setItem('sesion', JSON.stringify(this.sesion));
    localStorage.setItem('role', JSON.stringify(this.role));

  }

}
