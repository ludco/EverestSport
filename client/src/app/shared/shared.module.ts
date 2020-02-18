import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatCardModule, MatAutocompleteModule, MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule, MatMenuModule, MatSnackBarModule, MatInputModule, MatSelectModule } from '@angular/material';

const matModules = [
  MatFormFieldModule,
  MatAutocompleteModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatMenuModule,
  MatSnackBarModule,
  MatInputModule,
  MatSelectModule,
  ]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...matModules
    
  ],
  exports :[
    ReactiveFormsModule,
    ...matModules]
})
export class SharedModule { }
