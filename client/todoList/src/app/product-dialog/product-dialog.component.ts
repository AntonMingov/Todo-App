import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs';
import { HttpRequestsService } from '../shared/services/http-requests.service';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  public productName!: string;

  constructor(
    public dialogRef: MatDialogRef<TodoListComponent>,
    private httpService: HttpRequestsService,
    public productsService: ProductsService) { }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  addProduct() {

    this.httpService.addProduct(this.productName)
      .pipe(first())
      .subscribe((response) => {
        const newProduct = { id: Number(response.id), name: this.productName };
        this.productsService.addProduct(newProduct);

        this.productName = "";
        this.dialogRef.close();
      });
  }

}
