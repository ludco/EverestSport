import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/shared/product';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.scss']
})
export class SearchingComponent implements OnInit {

  searching = new FormControl();
  options: Product[];

  filteredOptions: Observable<Product[]>;


  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(response => {
      this.options = response;

      console.log(this.options)
      this.filteredOptions = this.searching.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.options.slice())
        );
    });
  }
  displayFn(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }

  private _filter(name: string): Product[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  goToProduct() {
    this.router.navigate([`/products/${this.searching.value.id}`]);
  }
}
