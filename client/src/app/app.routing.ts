import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserEditComponent } from './components/user-edit.component';
import { ArtistListComponent } from './components/artist-list.component';
import { ArtistAddComponent } from './components/artist-add.component';
import { HomeComponent } from './components/home.component';
//configuracion de rutas
//con path:'' carga un componente por defecto
const appRoutes : Routes = [
    {path:'',   component: HomeComponent},
    {path:'artist/:page' , component: ArtistListComponent},
    {path:'artist-add' , component: ArtistAddComponent},
    {path:'mis-datos',   component: UserEditComponent},
    {path:'**',   component: HomeComponent}
];

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);