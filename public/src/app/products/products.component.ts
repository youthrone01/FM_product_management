import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {
  all_products;
  constructor(private _productsService:ProductsService, private _route:Router) { }

  editProduct(id){
    this._route.navigate(['products','edit',id]);
  }

  deleteProduct(id){
    this._productsService.deletePro(id);
    this._productsService.getProducts((res)=>{
      this.all_products = res;
    })
  }

  ngOnInit() {
    this._productsService.getProducts((res)=>{
      this.all_products = res;
    });
    this._productsService.getProducts((res)=>{
      this.all_products = res;
    })
  }

}
