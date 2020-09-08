import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserEditComponent } from './components/user-edit.component';

//configuracion de rutas
//con path:'' carga un componente por defecto
const appRoutes : Routes = [
    {path:'',   component: UserEditComponent},
    {path:'mis-datos',   component: UserEditComponent},
    {path:'**',   component: UserEditComponent}
];

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);