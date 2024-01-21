import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ChatRequest } from './chat-request.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private formDataSource = new BehaviorSubject<any>(null);
  formData$ = this.formDataSource.asObservable();
  private currentFormData: any = null;
  private submitFormUrl = 'http://localhost:8000/submit-form'; // URL for form submission
  private chatApiUrl = 'http://localhost:8000/chat'; // URL for chat messages
  private imageData: any = null;

  private aiNameSource = new BehaviorSubject<string>('Assistant'); // Initialize with default name
  aiName$ = this.aiNameSource.asObservable(); // Expose as observable

  constructor(private http: HttpClient) {}

  storeFormData(formData: any) {
    this.formDataSource.next(formData);
    this.currentFormData = formData;
  }

  storeAiName(name: string) {
    this.aiNameSource.next(name); // Update the name
  }

  submitFormData(formData: any): Observable<any> {
    return this.http.post(this.submitFormUrl, formData);
  }

  storeImageData(data: any) {
    this.imageData = data;
  }

  getImageData() {
    return this.imageData;
  }

  getCurrentFormData() {
    return this.currentFormData;
  }

  sendChatMessage(chatRequest: ChatRequest): Observable<any> {
    return this.http.post(this.chatApiUrl, chatRequest);
  }
}
