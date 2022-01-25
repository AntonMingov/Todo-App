import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productSource = new BehaviorSubject<{ id: number, name: string }[]>([]);
  public product$ = this.productSource.asObservable();

  constructor() { }

  public setProducts(products: { id: number, name: string }[]) {
    this.productSource.next(products);
  }

  public addProduct(product: { id: number, name: string }) {
    this.productSource.next([...this.productSource.getValue(), product]);
  }

  public deleteProduct(id: number) {
    let products = this.productSource.getValue();
    const index = products.findIndex(product => product.id == id);

    if (index >= 0) {
      products.splice(index, 1);
      this.productSource.next(products);
    }
  }

}
