import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId!:string;
  product!:Product;
  productFormGroup!:FormGroup;
  fb!:FormBuilder;
  
  constructor(private route:ActivatedRoute,public prodService:ProductService) {
    this.productId=this.route.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.prodService.getProduct(this.productId).subscribe({
      next:(product:Product)=>{
        this.product=product;
        this.productFormGroup=this.fb.group({
          name:this.fb.control(this.product.name,[Validators.required,Validators.minLength(4)]),
          price:this.fb.control(this.product.price,[Validators.required,Validators.min(200)]),
          promotion:this.fb.control(this.product.promotion,[Validators.required])
    
        })
      },
      error:err=>{
      console.log(err);
      }
    })
    
  }

  handleUpdateProduct(){
     let p=this.productFormGroup.value;
     p.id=this.product.id;
     this.prodService.updateProduct(p).subscribe({
      next:(data:Product)=>{
      alert("Products Updated successfully")
      this.productFormGroup.reset();
      },error:err=>{
        console.log(err)
      }
     
    })
  }

}
