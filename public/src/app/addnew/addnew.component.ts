import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddnewComponent implements OnInit {
  product={
    title:"",
    price:0,
    imgurl:""
  }
  constructor(private _router:Router, private _productsService:ProductsService ) { }

  onSubmit(){
    this._productsService.createProduct(this.product);
    this._router.navigate(['products']);
    this.product={
      title:"",
      price:0,
      imgurl:""
    }
  }
  ngOnInit() {
  }

}
