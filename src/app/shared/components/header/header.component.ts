import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CarritoService, ProductoCarrito } from '../../../core/services/carrito.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  mostrarCarrito = false;

  constructor(
    private authService: AuthService,
    public carritoService: CarritoService
  ) { }

  logout(): void {
    this.authService.logout();
  }

  toggleCarrito(): void {
    this.mostrarCarrito = !this.mostrarCarrito;
  }

  get cantidadCarrito(): number {
    return this.carritoService.getCarrito().reduce((acc, p) => acc + p.cantidad, 0);
  }

  agregarAlCarrito(producto: ProductoCarrito) {
    const index = this.carritoService.getCarrito().findIndex(p => p.nombre === producto.nombre);
    if (index > -1) {
      if (this.carritoService.getCarrito()[index].cantidad < 50) {
        this.carritoService.getCarrito()[index].cantidad++;
      }
    } else {
      this.carritoService.getCarrito().push({ ...producto, cantidad: 1 });
    }
  }

  quitarDelCarrito(producto: ProductoCarrito) {
    const index = this.carritoService.getCarrito().findIndex(p => p.nombre === producto.nombre);
    if (index > -1) {
      this.carritoService.getCarrito().splice(index, 1);
    }
  }

  cambiarCantidad(producto: ProductoCarrito, event: any) {
    const value = Number(event.target.value);
    const index = this.carritoService.getCarrito().findIndex(p => p.nombre === producto.nombre);
    if (index > -1) {
      this.carritoService.getCarrito()[index].cantidad = Math.max(1, Math.min(50, value));
    }
  }

  aumentarCantidad(producto: ProductoCarrito) {
    if (producto.cantidad < 50) {
      producto.cantidad++;
    }
  }

  disminuirCantidad(producto: ProductoCarrito) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    } else {
      this.quitarDelCarrito(producto);
    }
  }

  get totalCarrito(): number {
    return this.carritoService.getTotal();
  }
}
