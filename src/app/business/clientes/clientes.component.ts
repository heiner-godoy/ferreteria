import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  clientes = [
    { nombre: 'Pedro Ramírez', empresa: 'Construcciones del Norte' },
    { nombre: 'Lucía Torres', empresa: 'Ferretería El Martillo' },
    { nombre: 'Miguel Díaz', empresa: 'Obras y Reformas S.A.' }
  ];
}
