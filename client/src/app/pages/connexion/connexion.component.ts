import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  connectedUser: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.loadUser().subscribe(user => {
      this.connectedUser = user;
    })
  }

  /**
   * logout button clicked
   */
  logoutClicked() {
    this.authService.logout();
  }
}
