import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarritoService, ProductoCarrito } from '../../core/services/carrito.service';
import { ProductosService, Producto } from '../../core/services/productos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export class TablesComponent implements OnInit, OnDestroy {
  search: string = '';
  mensajeAgregado: string = '';
  herramientasManuales: Array<{ nombre: string; precio: number; icon: string; esAgregado?: boolean }> = [
    { nombre: 'Llaves', precio: 18000, icon: 'https://img.icons8.com/ios-filled/50/000000/wrench.png' },
    { nombre: 'Alicates', precio: 15500, icon: 'https://img.icons8.com/ios-filled/50/000000/pliers.png' },
    { nombre: 'Destornilladores', precio: 8000, icon: 'https://img.icons8.com/ios-filled/50/000000/screwdriver.png' },
    { nombre: 'Martillos', precio: 13000, icon: 'https://img.icons8.com/ios-filled/50/000000/hammer.png' },
    { nombre: 'Serruchos', precio: 22000, icon: 'https://img.icons8.com/ios-filled/50/000000/saw-blade.png' },
    { nombre: 'Cinceles', precio: 7500, icon: 'https://img.icons8.com/ios-filled/50/000000/chisel.png' },
    { nombre: 'Cepillos', precio: 9000, icon: 'https://img.icons8.com/ios-filled/50/000000/paint-brush.png' },
    { nombre: 'Limas', precio: 6500, icon: 'https://img.icons8.com/ios-filled/50/000000/file.png' },
    { nombre: 'Flexómetros', precio: 11000, icon: 'https://img.icons8.com/ios-filled/50/000000/tape-measure.png' },
    { nombre: 'Niveles', precio: 18500, icon: 'https://img.icons8.com/ios-filled/50/000000/level.png' },
    { nombre: 'Escuadras', precio: 7000, icon: 'https://img.icons8.com/ios-filled/50/000000/square.png' },
    { nombre: 'Cúters', precio: 4500, icon: 'https://img.icons8.com/ios-filled/50/000000/utility-knife.png' },
    { nombre: 'Tijeras', precio: 5500, icon: 'https://img.icons8.com/ios-filled/50/000000/scissors.png' },
    { nombre: 'Pinzas', precio: 6000, icon: 'https://img.icons8.com/ios-filled/50/000000/pincers.png' },
    { nombre: 'Tenazas', precio: 7800, icon: 'https://img.icons8.com/ios-filled/50/000000/nippers.png' },
    { nombre: 'Producto Genérico', precio: 10000, icon: 'https://img.icons8.com/ios-filled/50/000000/toolbox.png' },
  ];
  herramientasElectricas: Array<{ nombre: string; precio: number; icon: string; esAgregado?: boolean }> = [
    { nombre: 'Taladros', precio: 120000, icon: 'https://img.icons8.com/ios-filled/50/000000/drill.png' },
    { nombre: 'Lijadoras', precio: 95000, icon: 'https://img.icons8.com/ios-filled/50/000000/sander.png' },
    { nombre: 'Amoladoras', precio: 110000, icon: 'https://img.icons8.com/ios-filled/50/000000/grinder.png' },
    { nombre: 'Sierras', precio: 130000, icon: 'https://img.icons8.com/ios-filled/50/000000/jigsaw.png' },
    { nombre: 'Cepillos eléctricos', precio: 105000, icon: 'https://img.icons8.com/ios-filled/50/000000/planer.png' },
    { nombre: 'Fresadoras', precio: 150000, icon: 'https://img.icons8.com/ios-filled/50/000000/router.png' },
    { nombre: 'Pistolas de calor', precio: 60000, icon: 'https://img.icons8.com/ios-filled/50/000000/heat-gun.png' },
    { nombre: 'Soldadores', precio: 35000, icon: 'https://img.icons8.com/ios-filled/50/000000/soldering-iron.png' },
    { nombre: 'Aspiradoras', precio: 140000, icon: 'https://img.icons8.com/ios-filled/50/000000/vacuum-cleaner.png' },
    { nombre: 'Compresores de aire', precio: 210000, icon: 'https://img.icons8.com/ios-filled/50/000000/air-compressor.png' },
    { nombre: 'Generadores', precio: 350000, icon: 'https://img.icons8.com/ios-filled/50/000000/generator.png' },
    { nombre: 'Multímetros', precio: 28000, icon: 'https://img.icons8.com/ios-filled/50/000000/multimeter.png' },
    { nombre: 'Cautines', precio: 18000, icon: 'https://img.icons8.com/ios-filled/50/000000/soldering-iron.png' },
    { nombre: 'Producto Eléctrico Genérico', precio: 50000, icon: 'https://img.icons8.com/ios-filled/50/000000/electrical.png' },
  ];

  productosSub!: Subscription;

  constructor(public carritoService: CarritoService, private productosService: ProductosService) {}

  ngOnInit() {
    this.productosSub = this.productosService.productos$.subscribe(productos => {
      // Limpiar productos agregados previamente
      this.herramientasManuales = this.herramientasManuales.filter(p => !p['esAgregado']);
      this.herramientasElectricas = this.herramientasElectricas.filter(p => !p['esAgregado']);
      for (const prod of productos) {
        if (prod.tipo === 'Manual') {
          this.herramientasManuales.push({ nombre: prod.nombre, precio: prod.precio, icon: 'https://img.icons8.com/ios-filled/50/000000/toolbox.png', esAgregado: true });
        } else if (prod.tipo === 'Eléctrica') {
          this.herramientasElectricas.push({ nombre: prod.nombre, precio: prod.precio, icon: 'https://img.icons8.com/ios-filled/50/000000/electrical.png', esAgregado: true });
        }
      }
    });
  }

  ngOnDestroy() {
    this.productosSub.unsubscribe();
  }

  get herramientasManualesFiltradas() {
    return this.herramientasManuales.filter(h => h.nombre.toLowerCase().includes(this.search.toLowerCase()));
  }
  get herramientasElectricasFiltradas() {
    return this.herramientasElectricas.filter(h => h.nombre.toLowerCase().includes(this.search.toLowerCase()));
  }

  agregarAlCarrito(producto: any) {
    const index = this.carrito.findIndex(p => p.nombre === producto.nombre);
    if (index > -1) {
      if (this.carrito[index].cantidad < 50) {
        this.carrito[index].cantidad++;
      }
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }
    this.mensajeAgregado = producto.nombre;
    setTimeout(() => {
      this.mensajeAgregado = '';
    }, 1500);
  }

  quitarDelCarrito(producto: any) {
    const index = this.carrito.findIndex(p => p.nombre === producto.nombre);
    if (index > -1) {
      this.carrito.splice(index, 1);
    }
  }

  cambiarCantidad(producto: any, event: any) {
    const value = Number(event.target.value);
    const index = this.carrito.findIndex(p => p.nombre === producto.nombre);
    if (index > -1) {
      this.carrito[index].cantidad = Math.max(1, Math.min(50, value));
    }
  }

  aumentarCantidad(producto: any) {
    if (producto.cantidad < 50) {
      producto.cantidad++;
    }
  }

  disminuirCantidad(producto: any) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    } else {
      this.quitarDelCarrito(producto);
    }
  }

  get carrito() {
    return this.carritoService.getCarrito();
  }
  get totalCarrito() {
    return this.carritoService.getTotal();
  }

  getCantidadSeleccionada(nombre: string): number {
    const prod = this.carrito.find(p => p.nombre === nombre);
    return prod ? prod.cantidad : 0;
  }

  getProductoCarrito(nombre: string) {
    return this.carrito.find(p => p.nombre === nombre);
  }
}
