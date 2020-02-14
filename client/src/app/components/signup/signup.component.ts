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
    firstname : [''],
    lastname : [''],
    credentials : this.fb.group({
      email : [''],
      password : [''],
      passwordBis : [''],
    }),
    address : [''],
    zip : [''],
    city : [''],
   
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

  /**
   * Submit form ton register new user
   */
  submitSignUp() {
    this.user.firstname = this.signUpForm.value.firstname;
    this.user.lastname = this.signUpForm.value.lastname;
    this.user.email = this.signUpForm.value.credentials.email;
    // check if password are equal
    this.user.password = this.signUpForm.value.credentials.password;
    let passwordBis: string = this.signUpForm.value.credentials.passwordBis;
    //
    this.user.address = this.signUpForm.value.address;
    this.user.zip = this.signUpForm.value.zip;
    this.user.city = this.signUpForm.value.city;

    if (this.user.password === passwordBis) {

      //SIGN UP  
      this.authService.createUser(this.user).subscribe(
        (result) => {
          if (result) {
            let snackBarRef = this._snackBar.open('Votre compte a été créé avec succés !', '', {
              duration: 1500,
            });
            this.router.navigateByUrl('/account');
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
