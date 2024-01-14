import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createai',
  templateUrl: './createai.component.html',
  styleUrls: ['./createai.component.css'],
})
export class CreateaiComponent implements OnInit {
  formData = {
    name: '',
    age: '',
    hairColor: '',
    bodyType: '',
    eyeColor: '',
    hairType: '',
    skinColor: '',
    ethnicity: '',
    gender: '',
  };

  isFormValid() {
    return (
      this.formData.name &&
      this.formData.age &&
      this.formData.hairColor &&
      this.formData.bodyType &&
      this.formData.eyeColor &&
      this.formData.hairType &&
      this.formData.skinColor &&
      this.formData.ethnicity &&
      this.formData.gender
    );
  }

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {}

  submitForm() {
    console.log(this.formData);
    this.dataService.submitFormData(this.formData).subscribe((response) => {
      this.dataService.storeImageData(response.data);
      this.router.navigate(['/chat-ui']);
    });
  }
}
