import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

    // url:string = "https://fast-scrubland-71875.herokuapp.com/profile";
    url:string = "http://localhost:8080/image";

  constructor(private http:HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFiles():Observable<any> {
    return this.http.get(`${this.url}/files`);
  }

  deleteFile(filename: string){
    return this.http.get(`${this.url}/delete/${filename}`)
  }
}
