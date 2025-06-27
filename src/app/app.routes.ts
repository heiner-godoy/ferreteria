import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      // Página de inicio con dashboard
      {
        path: 'inicio',
        loadComponent: () => import('./business/dashboard/dashboard.component').then(m => m.DashboardComponent),
        children: [
          {
            path: 'herramientas',
            loadComponent: () => import('./business/tools/tools.component').then(m => m.ToolsComponent)
          }
        ]
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./business/dashboard/dashboard.component').then(m => m.DashboardComponent),
        children: [
          {
            path: 'herramientas',
            loadComponent: () => import('./business/tools/tools.component').then(m => m.ToolsComponent)
          }
        ]
      },
      // Perfil de usuario
      {
        path: 'profile',
        loadComponent: () => import('./business/profile/profile.component').then(m => m.ProfileComponent)
      },
      // Tabla de productos
      {
        path: 'producto',
        loadComponent: () => import('./business/tables/tables.component').then(m => m.TablesComponent)
      },
      // Página de factura
      {
        path: 'factura',
        loadComponent: () => import('./business/factura/factura.component').then(m => m.FacturaComponent)
      },
      // Página de facturas finalizadas
      {
        path: 'facturas-finalizadas',
        loadComponent: () => import('./business/factura/facturas-list.component').then(m => m.FacturasListComponent)
      },
      // Página de proveedores
      {
        path: 'proveedores',
        loadComponent: () => import('./business/proveedores/proveedores.component').then(m => m.ProveedoresComponent)
      },
      // Página de características
      {
        path: 'caracteristicas',
        loadComponent: () => import('./business/caracteristicas/caracteristicas.component').then(m => m.CaracteristicasComponent)
      },
      // Página de clientes
      {
        path: 'clientes',
        loadComponent: () => import('./business/clientes/clientes.component').then(m => m.ClientesComponent)
      },
      // Redirección por defecto cuando se accede a la raíz
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
  },

  // Página de login (fuera del layout)
  {
    path: 'login',
    loadComponent: () => import('./business/authentication/login/login.component').then(m => m.LoginComponent)
  },

  // Página de registro (fuera del layout)
  {
    path: 'register',
    loadComponent: () => import('./business/authentication/register/register.component').then(m => m.RegisterComponent)
  },

  // Página no encontrada (opcional: crea este componente si no lo tienes aún)
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
