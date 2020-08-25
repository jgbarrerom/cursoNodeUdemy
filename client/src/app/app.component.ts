import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
  providers: [UserService]
})

export class AppComponent implements OnInit{
  title = 'Musify';
  public user: User;
  public identity;
  public token;
  public errorMenssage;

  constructor(
    private _userServices: UserService
  ){
    this.user = new User('','','','','','ROLE_USER','');
  }

  /**
   * Metodo que se ejecuta al cargar el componente
   */
  ngOnInit(){
    
  }

  public onSubmit(){
    this._userServices.signup(this.user).subscribe(
      response => {
        this.identity = response.user._id;
        this.errorMenssage='';
        if(!this.identity){
          alert('El usuario no está correctamente identificado');
        }else{
          //se crea sesion en el localstorage para tener al usuario en sesion
          //conseguir token para enviarlo en cada peticion
          this._userServices.signup(this.user,'token').subscribe(
            response => {
              //console.log('RESPOSE DE TOKEN ' + response.token);
              this.token = response.token;
              if(this.token <= 0){
                alert('El token no se ha generado correctamente');
              }else{
                console.log('TOKEN = ' + this.token);
                console.log('ID = ' + this.identity);
              }
            },
            error=>{

            })
        }
      }, error => {
        var errorMsg = <any>error.error;
        if(errorMsg != null){
          this.errorMenssage = errorMsg.message;
      }
    });
  }
}
