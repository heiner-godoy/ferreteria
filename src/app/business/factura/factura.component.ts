import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarritoService, ProductoCarrito } from '../../core/services/carrito.service';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent {
  metodoPago: string = '';
  facturaGenerada: boolean = false;
  numeroFactura: number = Math.floor(10000 + Math.random() * 90000);
  fecha: string = this.obtenerFechaActual();

  constructor(public carritoService: CarritoService) {}

  get productosSeleccionados() {
    return this.carritoService.getCarrito();
  }

  get total() {
    return this.carritoService.getTotal();
  }

  obtenerFechaActual(): string {
    const hoy = new Date();
    return hoy.toISOString().slice(0, 10);
  }

  generarFactura() {
    if (this.metodoPago && this.productosSeleccionados.length > 0) {
      this.facturaGenerada = true;
    }
  }

  finalizarCompra() {
    // Guardar la factura finalizada en localStorage
    const nuevaFactura = {
      numero: this.numeroFactura,
      fecha: this.fecha,
      metodoPago: this.metodoPago,
      total: this.total,
      productos: this.productosSeleccionados.map(p => ({ nombre: p.nombre, cantidad: p.cantidad, precio: p.precio }))
    };
    const data = localStorage.getItem('facturasFinalizadas');
    const facturas = data ? JSON.parse(data) : [];
    facturas.push(nuevaFactura);
    localStorage.setItem('facturasFinalizadas', JSON.stringify(facturas));
    alert('¡Compra finalizada con éxito!');
  }
}
