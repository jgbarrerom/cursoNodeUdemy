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
        //let identity = response.user;
        console.log('RESPONSE ' + response);
      }, error => {
        var errorMsg = <any>error;
        if(errorMsg != null){
        console.log(errorMsg);
      }
    });
  }
}
