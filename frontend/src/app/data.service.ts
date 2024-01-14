import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:8000/submit-form';
  private imageData: any = null;

  constructor(private http: HttpClient) {}

  submitFormData(formData: any): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  storeImageData(data: any) {
    this.imageData = data;
  }

  getImageData() {
    return this.imageData;
  }
}
