import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { UploadFileService } from '../services/uploadFiles.services';
import { GLOBAL } from '../services/global';

@Component({
  selector: 'user-edit',
  templateUrl: '../views/user-edit.html',
  providers: [UserService, UploadFileService]
})

export class UserEditComponent implements OnInit {

  public titulo: string;
  public user: User;
  public identity;
  public token;
  public alertMessaage: string;
  public filesToUpload: Array<File>;
  public url: string;

  constructor(private _userServices: UserService, private _uploadService: UploadFileService) {
    this.titulo = 'Actualizar mis datos';

    //localStorage
    this.identity = this._userServices.getIdentity();
    this.token = this._userServices.getToken();
    this.user = this.identity;
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('user-edit.component.ts cargado');
  }

  /**
   * onSubmit
   */
  public onSubmit() {
    this._userServices.updateUser(this.user).subscribe({
      next: (response) => {
        if (response.user) {
          this.alertMessaage = '';
        } else {
          document.getElementById('identityName').innerHTML = this.user.name;
          if (this.filesToUpload) {
            this._uploadService.makeFileReq(this.url + 'upload-image-user/' + this.user._id, this.filesToUpload, this.token, 'image').then(
              (result: any) => {
                this.user.image = result.image;
              }
            );
          }
          localStorage.setItem('identity', JSON.stringify(this.user));

          this.alertMessaage = 'Se actualizaron los datos con exito';
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  /**
   fileChangeEvent
   */
  public fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
