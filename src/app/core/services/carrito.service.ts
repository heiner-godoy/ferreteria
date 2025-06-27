import { Injectable } from '@angular/core';

export interface ProductoCarrito {
  nombre: string;
  precio: number;
  icon: string;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private productos: ProductoCarrito[] = [];

  getCarrito(): ProductoCarrito[] {
    return this.productos;
  }

  agregarProducto(producto: ProductoCarrito) {
    const index = this.productos.findIndex(p => p.nombre === producto.nombre);
    if (index > -1) {
      this.productos[index].cantidad += producto.cantidad;
    } else {
      this.productos.push({ ...producto });
    }
  }

  limpiarCarrito() {
    this.productos = [];
  }

  getTotal(): number {
    return this.productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  }
}
