import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shared/product';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/shared/product.service';
import { Category } from 'src/app/shared/category';

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.scss']
})
export class AdminProductDetailComponent implements OnInit {

  @Input() product: Product;
  @Input() categories: Category[];
  @Output() modifyProductEvent = new EventEmitter<Product>();
  @Output() deleteProductEvent = new EventEmitter<Product>();
  editMode: boolean = false;

  editProdForm = this.fb.group({
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
  photochanged: boolean = false;
  bigPromoProduct: Product;
  modifiedProduct: Product = new Product();
  showBigPromo: boolean;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private productService: ProductService
  ) { }

  ngOnInit() {

    for (let category of this.categories) {
      if (category.id === this.product.categoryId) {
        this.product.categoryName = category.name;
      }
    }
    this.uploadForm = this.fb.group({
      photo: ['']
    });
    this.productService.getBigPromo().subscribe(product => {
    this.bigPromoProduct = product;
      if (this.product.id === this.bigPromoProduct.id) {
        this.showBigPromo = true;
        console.log(this.product)
        console.log(this.showBigPromo)
      }
    })
  }

  modifyProductClicked() {
    this.editMode = true;
  }
  return() {
    this.editMode = false;
  }

  /**
   * Set the file
   * @param event 
   */
  onFileSelect(event) {
    this.photochanged = true;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('photo').setValue(file);
    }
  }

  /**
   * Emit an event to modify product
   * @param product 
   */
  modifyProductConfirm(product) {
    this.modifyProductEvent.emit(product);
  }

  /**
   * Emit an event to delete product
   * @param product 
   */
  deleteProductClicked(product) {
    this.deleteProductEvent.emit(product);
  }

  /**
   * Submit form to save new image of the modified product if it has changed
   * @param product 
   */
  onSubmit(product) {
    this.modifiedProduct = product;

    if (this.photochanged) {
      const formData = new FormData();
      formData.append('photo', this.uploadForm.get('photo').value);

      this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
        (res) => {
          console.log(res);
          this.modifiedProduct.photo = `http://localhost:3000/uploads/${res.data.name}`;
          this.editProduct();

        },
        (err) => { console.log(err) }
      );
    }
    else {
      this.editProduct()
    }


  }
  /**
   * Save new attributes for the modified product to update it in dB
   */
  editProduct() {
    if (this.editProdForm.value.name) {
      this.modifiedProduct.name = this.editProdForm.value.name;
    }
    if (this.editProdForm.value.description) {
      this.modifiedProduct.description = this.editProdForm.value.description;
    }
    if (this.editProdForm.value.priceTTC) {
      this.modifiedProduct.priceTTC = this.editProdForm.value.priceTTC;
    }

    if (this.editProdForm.value.category) {
      for (let category of this.categories) {
        if (category.name === this.editProdForm.value.category) {
          this.modifiedProduct.categoryId = category.id;
        }
      }
    }
    if (this.editProdForm.value.bigPromo) {
      this.modifiedProduct.bigPromo = true;
      this.bigPromoProduct.bigPromo = false;
      this.productService.editProduct(this.bigPromoProduct).subscribe(product => console.log('edit', product))
    }
    else {
      this.modifiedProduct.bigPromo = false;
    }
    console.log(this.editProdForm.value.promo)
    if (this.editProdForm.value.promo) {
      this.modifiedProduct.promo = parseInt(this.editProdForm.value.promo)
    };

    console.log('prod', this.modifiedProduct)
    this.productService.editProduct(this.modifiedProduct).subscribe(
      result => {
        console.log(result)
        location.reload();

      });
  }

}
