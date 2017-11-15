import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditComponent implements OnInit {
  product ={
    title:"",
    price:0,
    imgurl:""
  }

  id;
  constructor(private _router:Router, private _productsService:ProductsService, private _route: ActivatedRoute) { }

  onSubmit(){
    this._productsService.updateProduct(this.id, this.product);
    this._router.navigate(['products']);
    this.product={
      title:"",
      price:0,
      imgurl:""
    }
  }

  deleteProduct(id){
    this._productsService.deletePro(id);
    this._router.navigate(['products']);
  }

  ngOnInit() {
    this._route.paramMap.subscribe((params)=>{
      this.id = params.get('id');
      console.log(this.id);
      this._productsService.getPro(this.id,(res)=>{
        this.product = res;
      })
    })
    
  }

}
