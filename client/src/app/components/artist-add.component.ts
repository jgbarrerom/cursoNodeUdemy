import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';

@Component({
    selector:'artist-add',
    templateUrl: '../views/artist-add.html',
    providers: [UserService,ArtistService]
})

export class ArtistAddComponent implements OnInit{

    public titulo : string;
    public artist : Artist;
    public identity;
    public token;
    public url : string;
    public alertMessaage : string;
    public filesToUpload : Array<File>;
    public btnText = 'Agregar Artista';


    constructor(
        private _route: ActivatedRoute,
        private _router : Router,
        private _userService : UserService,
        private _artistService : ArtistService
    ){
        this.titulo ='Crear Artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist('','','','');

    }

    ngOnInit(){
        console.log('artista-add.component.ts cargado');
    }

    public onSubmit(){
      this._artistService.addArtist(this.artist, this.token).subscribe({
        next: (response) => {
          if(!response.artist){
            this.alertMessaage = 'Ocurrio un error al crear al artista';
        }else{
            this.alertMessaage = 'Se creo el artista correctamente';
            this.artist = response.artist;

            this._router.navigate(['/edit-artist',this.artist._id]);
        }
        },
        error: (e) => this.alertMessaage = e
      });
    }


    public fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
