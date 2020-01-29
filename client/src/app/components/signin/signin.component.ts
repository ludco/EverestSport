import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/shared/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  credentials = this.fb.group({
    email: [''],
    password: [''],
  });


  private user: User = new User();

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  submitSignIn() {
    this.user.email = this.credentials.value.email;
    this.user.password = this.credentials.value.password;

    this.authService.signin(this.user).subscribe(
      results => {
        this.userService.loadUser().subscribe(result => {
          this.router.navigateByUrl('/admin');
          this.authService.displayConnect();
        
        })
      },
      error => {
        if(error){
        let snackBarRef = this._snackBar.open("L'identifiant ou le mot de pase sont incorrects", '', {
          duration: 1500
        });}
      }
    );
  }
}
