import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { HttpRequestsService } from '../shared/services/http-requests.service';
import { ProductsService } from '../shared/services/products.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatTableDataSource } from '@angular/material/table';

@UntilDestroy()
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {

  @Input() todo: any;
  public dataSource: any;

  constructor(
    public dialog: MatDialog,
    private httpService: HttpRequestsService,
    public productsService: ProductsService) { }

  ngOnInit(): void {

    this.productsService.product$
      .pipe(untilDestroyed(this))
      .subscribe((products) => {

        this.dataSource = new MatTableDataSource<any>(products);
      });

    this.httpService.getAllProducts()
      .pipe(first())
      .subscribe((response) => {

        this.productsService.setProducts(response);

      });
  }

  displayedColumns: string[] = ['id', 'name', 'actions'];

  openDialogProduct() {

    this.dialog.open(ProductDialogComponent, {
      width: '250px',
    });
  }

  onDeleteClick(id: number) {

    this.httpService.removeProduct(id)
      .pipe(first())
      .subscribe(() => {
        this.productsService.deleteProduct(id);
      });
  }
}
