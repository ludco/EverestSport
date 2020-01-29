import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/shared/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})


export class SignupComponent implements OnInit {

  signUpForm = this.fb.group({
    email: [''],
    password: [''],
    passwordBis: [''],
  });

  noMatch: boolean = false;

  private user: User = new User();

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private authService : AuthService) { }

  ngOnInit() {
  }

  submitSignUp() {
    this.user.email = this.signUpForm.value.identifiant;
    this.user.password = this.signUpForm.value.password;
    let passwordBis: string = this.signUpForm.value.passwordBis;
    if (this.user.password === passwordBis) {

      //SIGN UP  
      this.authService.createUser(this.user).subscribe(
        (result) => {
          if (result) {
            let snackBarRef = this._snackBar.open('Votre compte a été créé avec succés !', '', {
              duration: 1500,
            });
            this.router.navigateByUrl('/admin/signin');
          }
        },
        (error) => {
          if (error) {
            let snackBarRef = this._snackBar.open('Un problème est survenu... Veuillez ré-essayer', '', {
              duration: 1500
            });
          }
        }
      );
    }
    else {
      this.noMatch = true
    }




  }
}
