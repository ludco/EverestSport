import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-dashbar',
  templateUrl: './dashbar.component.html',
  styleUrls: ['./dashbar.component.scss']
})
export class DashbarComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
  }

}
