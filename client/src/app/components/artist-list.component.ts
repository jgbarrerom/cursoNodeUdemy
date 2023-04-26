import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { Artist } from '../models/artist';
import { ArtistService } from '../services/artist.service';

@Component({
    selector:'artist-list',
    templateUrl: '../views/artist-list.html',
    providers: [UserService, ArtistService]
})

export class ArtistListComponent implements OnInit{

    public titulo : string;
    public artists : Artist[];
    public identity;
    public token;
    public url : string;


    constructor(
        private _route: ActivatedRoute,
        private _router : Router,
        private _userService : UserService,
        private _artistService : ArtistService
    ){
        this.titulo ='Artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

    }

    ngOnInit(){
        this._artistService.getArtists(this.token,'1').subscribe({
          next: (resp) => {
            //console.log(resp.artist);
            this.artists = resp.artist;
          }
        });
    }
}
