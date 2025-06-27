import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../core/services/productos.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  cantidadFacturas: number = 0;
  productos = this.productosService.productos$;
  nuevoProducto: string = '';
  nuevoPrecio: number | null = null;
  mostrarModalTipoProducto = false;
  tipoSeleccionado: string | null = null;
  nombreEliminar: string = '';
  mensajeEliminar: string = '';

  constructor(private router: Router, private productosService: ProductosService) {
    const data = localStorage.getItem('facturasFinalizadas');
    this.cantidadFacturas = data ? JSON.parse(data).length : 0;
  }

  seleccionarTipo(tipo: string) {
    this.tipoSeleccionado = tipo;
  }

  agregarProductoModal() {
    if (this.nuevoProducto.trim() && this.nuevoPrecio !== null && this.nuevoPrecio > 0 && this.tipoSeleccionado) {
      this.productosService.agregarProducto({ nombre: this.nuevoProducto.trim(), tipo: this.tipoSeleccionado, precio: this.nuevoPrecio });
      this.cerrarModal();
    }
  }

  quitarProducto(index: number) {
    this.productosService.quitarProducto(index);
  }

  cerrarModal() {
    this.mostrarModalTipoProducto = false;
    this.tipoSeleccionado = null;
    this.nuevoProducto = '';
    this.nuevoPrecio = null;
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToFacturas() {
    this.router.navigate(['/facturas-finalizadas']);
  }

  eliminarProductoPorNombre() {
    const productos = this.productosService.getProductos();
    const index = productos.findIndex(p => p.nombre.trim().toLowerCase() === this.nombreEliminar.trim().toLowerCase());
    if (index > -1) {
      this.productosService.quitarProducto(index);
      this.mensajeEliminar = 'Producto eliminado correctamente.';
    } else {
      this.mensajeEliminar = 'No se encontró un producto con ese nombre.';
    }
    setTimeout(() => this.mensajeEliminar = '', 2000);
    this.nombreEliminar = '';
  }
}
