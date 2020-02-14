import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { ProductService } from 'src/app/shared/product.service';
import { Category } from 'src/app/shared/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  winterCategories : Category[];
  summerCategories : Category[];

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getCategories().subscribe(categories => {
      this.winterCategories =  categories.filter(category=>category.season==='Hiver');
      this.summerCategories = categories.filter(category=>category.season==='Été');
    })
   
  }

}
