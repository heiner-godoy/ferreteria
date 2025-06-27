import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {
  proveedores = [
    { nombre: 'Juan Pérez', empresa: 'Ferretería Central' },
    { nombre: 'Ana Gómez', empresa: 'Materiales y Herramientas López' },
    { nombre: 'Carlos Ruiz', empresa: 'Comercializadora El Tornillo' }
  ];
}
