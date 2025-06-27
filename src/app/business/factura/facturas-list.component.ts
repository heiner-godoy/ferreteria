import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FacturaFinalizada {
  numero: number;
  fecha: string;
  metodoPago: string;
  total: number;
  productos: { nombre: string; cantidad: number; precio: number }[];
}

@Component({
  selector: 'app-facturas-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facturas-list.component.html',
  styleUrl: './facturas-list.component.css'
})
export class FacturasListComponent {
  facturas: FacturaFinalizada[] = [];

  ngOnInit() {
    const data = localStorage.getItem('facturasFinalizadas');
    this.facturas = data ? JSON.parse(data) : [];
  }
}
