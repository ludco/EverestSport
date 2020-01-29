import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/shared/product';

@Component({
  selector: 'app-bigpromo',
  templateUrl: './bigpromo.component.html',
  styleUrls: ['./bigpromo.component.scss']
})
export class BigpromoComponent implements OnInit {

  product : Product;

  constructor( private productService : ProductService ) { }

  ngOnInit() {
    this.productService.getBigPromo().subscribe(response => {
      console.log(response)
      this.product = response;
    
    });
    
  }

}
