import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/product';
import { ProductService } from 'src/app/shared/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @Input() product : Product;

  constructor(private router : Router) { }

  ngOnInit() {
  }
  goToProduct(){
    this.router.navigate([`/products/${this.product.id}`]);
  }

}
