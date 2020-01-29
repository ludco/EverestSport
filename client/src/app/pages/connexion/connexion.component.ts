import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  constructor( private authService : AuthService) { }

  ngOnInit() {
  }

  /**
   * logout button clicked
   */
  logoutClicked(){
    this.authService.logout();
  }
}
