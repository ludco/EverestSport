import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Product } from 'src/app/shared/product';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-admin-product-create',
  templateUrl: './admin-product-create.component.html',
  styleUrls: ['./admin-product-create.component.scss']
})
export class AdminProductCreateComponent implements OnInit {

  createProdForm = this.fb.group({
    name: [''],
    description: [''],
    priceTTC: [''],
    photo: [''],
    promo: [''],
    category: [''],
    bigPromo: [''],
  });

  SERVER_URL = "http://localhost:3000/upload";
  uploadForm: FormGroup;

  newProduct: Product = new Product();

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      photo: ['']
    });
  }

  /**
  * Set the file
  * @param event 
  */
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('photo').setValue(file);
    }
  }

  /**
   * Submit form to upload image
   */
  onSubmit() {
    const formData = new FormData();
    formData.append('photo', this.uploadForm.get('photo').value);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => {
        console.log(res);
        this.newProduct.photo = `http://localhost:3000/uploads/${res.data.name}`;
        this.saveProduct();

      },
      (err) => { console.log(err) }
    );


  }
  /**
   * Save the new product to post it in dB
   */
  saveProduct() {
    this.newProduct.name = this.createProdForm.value.name;
    this.newProduct.description = this.createProdForm.value.description;
    this.newProduct.priceTTC = this.createProdForm.value.priceTTC;
    this.newProduct.promo = this.createProdForm.value.promo;
    this.newProduct.category = this.createProdForm.value.category;
    this.newProduct.bigPromo = this.createProdForm.value.bigPromo;



    this.productService.createProduct(this.newProduct).subscribe(
      result => {
        location.reload();

      });
  }

}
