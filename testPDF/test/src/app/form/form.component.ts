import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  user: any = {};
  fileToUpload: File | null = null;

  constructor(private http: HttpClient) { }

  registerUser() {
    const formData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    //formData.append('name', this.user.name);
    //formData.append('email', this.user.email);
    if (this.fileToUpload) {
      formData.append('file', this.fileToUpload, this.fileToUpload.name);
    }

    this.http.post('http://localhost:8081/admin/clients/upload', formData, {
      headers,
      responseType: 'text'
    }).subscribe(
      response => {
        // Handle success response
        console.log('Registration success:', response);
      },
      error => {
        // Handle error response
        console.error('Registration error:', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
  }

}
