import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Product } from 'src/app/shared/product';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/product.service';
import { Category } from 'src/app/shared/category';

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
    categoryName: [''],
    bigPromo: [''],
  });

  @Input() categories: Category[];

  SERVER_URL = "http://localhost:3000/upload";
  uploadForm: FormGroup;

  newProduct: Product = new Product();
  bigPromoProduct: Product;
  checked : boolean;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      photo: ['']
    });
    this.productService.getBigPromo().subscribe(product => this.bigPromoProduct = product)
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
    if (!this.createProdForm.value.promo) {
      this.newProduct.promo = 0;
    }
    else {
      this.newProduct.promo = this.createProdForm.value.promo;
    }
    for (let category of this.categories) {
      if (category.name === this.createProdForm.value.categoryName) {
        this.newProduct.categoryId = category.id;
      }
    }
    if(this.createProdForm.value.bigPromo){
      this.newProduct.bigPromo = true;
      this.bigPromoProduct.bigPromo = false;
      this.productService.editProduct(this.bigPromoProduct).subscribe(product => console.log('edit',product))
    }
    else{
      this.newProduct.bigPromo = false;
    }
    console.log('new',this.newProduct)
    

    this.productService.createProduct(this.newProduct).subscribe(
      result => {
        console.log('res',result)
        //location.reload();

      });
  }

}
