import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/shared/product';
import { Category } from 'src/app/shared/category';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  products: Product[];
  categories: Category[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProductsAndCategories().subscribe(
      result => {
        this.products = result[0];
        this.categories = result[1];

      })
  }

  modifyProduct(product) {
    this.productService.editProduct(product);

  }

  deleteProduct(product) {
    this.productService.delProduct(product).subscribe(response => location.reload());
  }

}
