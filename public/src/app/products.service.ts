import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class ProductsService {

  constructor(private _http: Http) { }

  getProducts(callback){
    this._http.get('http://localhost:8000/products').subscribe(
      (response)=>{
          callback(response.json());
      },
      (err)=>{
        console.log("error 1 ");
      }
    )
  }

  createProduct(data){
    this._http.post('http://localhost:8000/products', data).subscribe(
      (response)=>{
        console.log("success 1 ");
      },
      (err)=>{
        console.log("error 2 ");
      }
    )
  }

  updateProduct(id, data){
    this._http.put('http://localhost:8000/products/edit/'+id, data).subscribe(
      (response)=>{
        console.log("success 2 ");
      },
      (err)=>{
        console.log("error 3 ");
      }
    )
  }

  deletePro(id){
    this._http.delete('http://localhost:8000/products/destroy/'+id).subscribe(
      (res)=>{
        console.log("success 3 ");
      },
      (err)=>{
        console.log("error 4 ");
      }
    )
  }

  getPro(id, callback){
    this._http.get('http://localhost:8000/products/'+id).subscribe(
      (res)=>{
        console.log("success 3 ");
        callback(res.json());
      },
      (err)=>{
        console.log("error 4 ");
      }
    )
  }

}
