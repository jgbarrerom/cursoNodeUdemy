import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Artist } from '../models/artist';

@Injectable()
export class ArtistService{

    public url : string;


    constructor(private _http : HttpClient){
        this.url = GLOBAL.url;
    }

    updateArtist(artist : Artist, token, id : string) : Observable<any>{
        let headers = new HttpHeaders()
            .set('Content-Type','application/json')
            .set('Authorization', token);
        let params = JSON.stringify(artist);
        return this._http.put(this.url + 'artist/' + id, params, {headers: headers});
    }

    getArtists(token, page) : Observable<any>{
        let headers = new HttpHeaders()
            .set('Content-Type','application/json')
            .set('Authorization', token);
        return this._http.get(this.url + 'artists/' + page, {headers : headers});
    }
    
    getArtist(token, id : string) : Observable<any>{
        let headers = new HttpHeaders()
            .set('Content-Type','application/json')
            .set('Authorization', token);
        return this._http.get(this.url + 'artist/' + id, {headers : headers});
    }

    addArtist(artist : Artist, token) : Observable<any>{
        let headers = new HttpHeaders()
            .set('Content-Type','application/json')
            .set('Authorization', token);
        let params = JSON.stringify(artist);
        return this._http.post(this.url + 'artist', params, {headers : headers});
    }
    
    deleteArtist(token, id: string) : Observable<any>{
        let headers = new HttpHeaders()
            .set('Content-Type','application/json')
            .set('Authorization', token);
        return this._http.delete(this.url + 'artist/' + id, {headers : headers});
    }
} 