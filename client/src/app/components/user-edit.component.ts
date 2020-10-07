import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import { GLOBAL } from '../services/global';

@Component({
    selector:'user-edit',
    templateUrl:'../views/user-edit.html',
    providers:[UserService]
})

export class UserEditComponent implements OnInit{

    public titulo : string;
    public user : User;
    public identity;
    public token;
    public alertMessaage : string;
    public filesToUpload : Array<File>;
    public url : string;

    constructor(private _userServices : UserService){
        this.titulo = 'Actualizar mis datos';

        //localStorage
        this.identity = this._userServices.getIdentity();
        this.token = this._userServices.getToken();
        this.user = this.identity;
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        console.log('user-edit.component.ts cargado');
    }

    /**
     * onSubmit
     */
    public onSubmit() {
        this._userServices.updateUser(this.user).subscribe(
            response=>{
                debugger
                if(!response.user){
                    this.alertMessaage = 'Ocurrio un error en la actualizacion de los datos'
                }else{
                    //this.user = response.user;
                    document.getElementById('identityName').innerHTML = this.user.name;
                    if(this.filesToUpload){
                        this.makeFileReq(this.url+'upload-image-user/'+this.user._id,[],this.filesToUpload).then(
                            (result: any) => {
                                this.user.image = result.image;
                                console.log(this.user);
                            }
                        );
                    }else{
                        //redireccionar
                    }
                    localStorage.setItem('identity',JSON.stringify(this.user));

                    this.alertMessaage = 'Se actualizaron los datos con exito';
                }
            },
            error => {
                
            }
        );
    }

    /**
     fileChangeEvent
     */
    public fileChangeEvent( fileInput : any) {
        this.filesToUpload = <Array<File>> fileInput.target.files;
    }

    /**
     * makeFileReq
     */
    private makeFileReq(url : string, params : Array<string>, files : Array<File>) {
        var token = this.token;
        return new Promise(function(resolve, reject){
            var formData : any = new FormData();
            var xhr = new XMLHttpRequest();
            for(var i=0; i<files.length; i++){
                formData.append('image',files[i], files[i].name);
            }
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4 && xhr.status == 200){
                    resolve(JSON.parse(xhr.response));
                }else{
                    reject(xhr.response);
                }
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization',token);
            xhr.send(formData);
        });
    }
}