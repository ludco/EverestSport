import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/shared/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productId: number;
  product: Product;

  constructor(private route: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit() {
    // Get the product Id in param
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = parseInt(params.get('productId'));
    
    });

    this.productService.getAllProducts().subscribe(
      products => {
      this.product = products.filter(product => product.id === this.productId)[0]
        
      }
    )
    console.log(this.product)
  }
  
    
  


}
