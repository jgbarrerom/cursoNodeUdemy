import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';

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
    public alertUpdate : string;

    constructor(private _userServices : UserService){
        this.titulo = 'Actualizar mis datos';

        //localStorage
        this.identity = this._userServices.getIdentity();
        this.token = this._userServices.getToken();
        this.user = this.identity;
    }

    ngOnInit(){
        console.log('user-edit.component.ts cargado');
    }

    /**
     * onSubmit
     */
    public onSubmit() {
        console.log(this.user);
    }
}