import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/shared/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  products : Product[];

  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      response => {this.products = response;}
    );
  }

  modifyProduct(product){
    this.productService.editProduct(product);

  }

  deleteProduct(product){
    this.productService.delProduct(product).subscribe(response=>location.reload());
  }

}
