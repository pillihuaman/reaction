import { Routes } from '@angular/router';
import { LoginComponent } from './@presentation/auth/login/login.component';
import { UserRegisterComponent } from './@presentation/auth/user-register/user-register.component';
import { AuthGuard } from './@data/interceptors/auth.guard';
import { AuthComponent } from './@presentation/auth/auth.component';
import { EmployeeComponent } from './@presentation/pages/support/employee/employee.component';
export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent, // Ruta que apunta al componente standalone,
    children: [
      { path: 'login', component: LoginComponent }, // Ruta hija
      {
        path: 'user-register',
        component: UserRegisterComponent,
      },
    ],
  },
  
    {
      path: 'pages',
      loadComponent: () =>
        import('./@presentation/pages/page.component').then((c) => c.PageComponent),
       canActivate: [AuthGuard],
      children: [
        {
          path: 'employee',
          component: EmployeeComponent,
        }
      /*  {
          path: 'register-product',
          component: RegisterProductComponent,
        },
        {
          path: 'register-imagen-product',
          component: RegisterImageByProductComponent,
        },
        {
          path: 'register-product-stock',
          component: RegisterStockComponent,
        },
        {
          path: 'register-control',
          component: RegisterControlComponent,
        },
        {
          path: 'register-parameter',
          component: ParametersComponent,
        },
        {
          path: 'register-system',
          component: RegisterSystemComponent,
        },
        {
          path: 'register-page',
          component: RegisterPageComponent,
        },
        {
          path: 'generate-random-color-imagen',
          component: CreateRandonImagenColorComponent,
        },
        {
          path: 'system',
          component: SystemManagementComponent,
        },
        {
          path: 'employee',
          component: EmployeeComponent,
        },  
        {
          path: 'stock',
          component: StockComponent,
        },*/
      ],
      
    },
   /* {
      path: 'auth',
      loadComponent: () =>
        import('./@presentation/auth/auth.component').then((c) => c.AuthComponent),
      // canActivate: [NotauthGuard],
    },*/
  ];