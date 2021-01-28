import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { UploadFileService } from '../services/uploadFiles.services';
import { Artist } from '../models/artist';

@Component({
    selector:'artist-edit',
    templateUrl: '../views/artist-add.html',
    providers: [UserService, ArtistService, UploadFileService]
})

export class ArtistEditComponent implements OnInit{

    public titulo : string;
    public artist : Artist;
    public identity;
    public token;
    public url : string;
    public alertMessaage : string;
    public filesToUpload : Array<File>;
    public myVar = "";

    constructor(
        private _route: ActivatedRoute,
        private _router : Router,
        private _userService : UserService,
        private _artistService : ArtistService,
        private _uploadFileService : UploadFileService
    ){
        this.titulo ='Editar Artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist('','','');

    }

    ngOnInit(){
        console.log('artista-edit.component.ts cargado');
        this.getArtists();
    }

    getArtists(){
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._artistService.getArtist(this.token, id).subscribe(
                response => {
                    if(!response.artist){
                        this._router.navigate(['/']);
                    }else{
                        this.artist = response.artist;
                        console.log('La respuesta es : ' + this.artist.image);
                    }
                },
                error => {
                    this.alertMessaage = error.message;
                });
        });
    }

    public onSubmit(){
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._artistService.updateArtist(this.artist,this.token, id).subscribe(
                response => {
                    if(!response.artist){
                        this.alertMessaage = 'Ocurrio un error al actualizar al artista';
                    }else{
                        this.alertMessaage = 'Se actualizó el artista correctamente';
                        this._uploadFileService.makeFileReq(this.url + 'artist/upload-image-artist/' + id,[],this.filesToUpload,this.token,'image')
                        .then(
                            result => {
                                this._router.navigate(['/artist',1]);
                            },
                            error => {
                                this.alertMessaage = error;
                            }
                        );
                    }
                },
                error => {
                    this.alertMessaage = error.message;
                }
            );
        });
    }


    public fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

}
