import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
  providers: [UserService]
})

export class AppComponent implements OnInit{
  title = 'Musify';
  public user: User;
  public userRegiser: User;
  public identity;
  public token;
  public errorMenssage;
  public alertRegister;
  public url: string;

  constructor(
    private _userServices: UserService
  ){
    this.user = new User('','','','','','ROLE_USER','');
    this.userRegiser = new User('','','','','','ROLE_USER','');
    this.url = GLOBAL.url;
  }

  /**
   * Metodo que se ejecuta al cargar el componente
   */
  ngOnInit(){
    this.identity = this._userServices.getIdentity();
    this.token = this._userServices.getToken();
    //console.log(this.identity);
    //console.log(this.token);
  }

  public onSubmit(){
    this._userServices.signup(this.user).subscribe(
      response => {
        var userResp = <any>response;
        this.identity = userResp.user;
        this.errorMenssage='';
        if(!this.identity._id){
          alert('El usuario no está correctamente identificado');
        }else{
          //se crea sesion en el localstorage para tener al usuario en sesion
          //conseguir token para enviarlo en cada peticion
          localStorage.setItem('identity',JSON.stringify(this.identity));
          this._userServices.signup(this.user,'token').subscribe(
            response => {
              //console.log('RESPOSE DE TOKEN ' + response.token);
              var tokenResp = <any>response;
              this.token = tokenResp.token;
              if(this.token <= 0){
                alert('El token no se ha generado correctamente');
              }else{
                localStorage.setItem('token',this.token);
                this.user = new User('','','','','','ROLE_USER','');
              }
            },
            error => {
              alert('Se esta presentando un error en la validacion del usuario');
            })
        }
      }, error => {
        var errorMsg = <any>error.error;
        if(errorMsg != null){
          this.errorMenssage = errorMsg.message;
      }
    });
  }

  /**
   * onSubmitRegister
   */
  public onSubmitRegister() {
    this._userServices.register(this.userRegiser).subscribe(
      response => {
        let user = response.user;
        this.userRegiser = user;
        if(!user._id){
          this.alertRegister = 'Error al registrarse';
        }else{
          this.alertRegister = 'El registro se ha realizado correctamente. Identificado con ' + this.userRegiser.email;
          this.userRegiser = new User('','','','','','ROLE_USER','');
        }
      },
      error => {
        this.alertRegister = error;
      }
    );
  }

  /**
   * logout
   */
  public logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this.user = new User('','','','','','ROLE_USER','');
  }
}
