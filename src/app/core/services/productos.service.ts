import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Producto {
  nombre: string;
  tipo: string;
  precio: number;
}

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private productosSubject = new BehaviorSubject<Producto[]>(this.cargarProductos());
  productos$ = this.productosSubject.asObservable();

  private cargarProductos(): Producto[] {
    const data = localStorage.getItem('productosDashboard');
    return data ? JSON.parse(data) : [];
  }

  getProductos(): Producto[] {
    return this.productosSubject.value;
  }

  agregarProducto(producto: Producto) {
    const productos = [...this.productosSubject.value, producto];
    localStorage.setItem('productosDashboard', JSON.stringify(productos));
    this.productosSubject.next(productos);
  }

  quitarProducto(index: number) {
    const productos = [...this.productosSubject.value];
    productos.splice(index, 1);
    localStorage.setItem('productosDashboard', JSON.stringify(productos));
    this.productosSubject.next(productos);
  }
}
