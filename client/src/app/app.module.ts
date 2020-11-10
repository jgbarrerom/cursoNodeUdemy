import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import {UserEditComponent} from './components/user-edit.component';
import {ArtistListComponent} from './components/artist-list.component';
import {ArtistAddComponent} from './components/artist-add.component';
import {HomeComponent} from './components/home.component';

import { routing, appRoutingProviders } from './app.routing';  

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    ArtistListComponent,
    ArtistAddComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [ appRoutingProviders ],
  bootstrap: [AppComponent]
})
export class AppModule { }
