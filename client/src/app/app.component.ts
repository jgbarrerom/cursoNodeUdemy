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

  ngOnInit(){
    var texto = this._userServices.signup();
    console.log(texto);
  }

  public onSubmit(){
    console.log(this.user);
  }
}
