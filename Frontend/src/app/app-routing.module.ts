import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormProductsComponent } from './components/Contenidos/form-products/form-products.component';
import { ProductsComponent } from './components/Contenidos/products/products.component';
import { ContenidoComponent } from './components/Contenidos/contenido/contenido.component';
import { PadminComponent } from './components/Contenidos/padmin/padmin.component';


const routes: Routes = [
  { path:'padmin', component: PadminComponent },
  { path:'contenido', component: ContenidoComponent },
  { path:'products', component: ProductsComponent },
  { path:'products/editar/:id', component: FormProductsComponent },
  { path:'products/agregar', component: FormProductsComponent },
  { path: '**', redirectTo: '/contenido' , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
