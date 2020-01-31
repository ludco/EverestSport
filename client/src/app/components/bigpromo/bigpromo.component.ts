import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/shared/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bigpromo',
  templateUrl: './bigpromo.component.html',
  styleUrls: ['./bigpromo.component.scss']
})
export class BigpromoComponent implements OnInit {

  product : Product;

  constructor( private productService : ProductService,
    private router : Router ) { }

  ngOnInit() {
    this.productService.getBigPromo().subscribe(response => {
      this.product = response;
    
    });
    
  }
  goToProduct(){
    this.router.navigate([`/products/${this.product.id}`]);
  }

}
