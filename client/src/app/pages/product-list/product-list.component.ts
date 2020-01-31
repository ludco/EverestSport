import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/shared/product';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  category: string;
  productId: number;
  product : Product;
  infos : boolean ;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.category = params.get('category');
      this.productId = parseInt(params.get('productId'));
    });
   
      this.productService.getProductsByCat(this.category).subscribe(response => {
        this.products = response;
        this.infos = false;
      });
    
  }
}
