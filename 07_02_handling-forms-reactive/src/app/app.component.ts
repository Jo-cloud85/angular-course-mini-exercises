import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  genders = ['Male', 'Female'];
  signupForm: FormGroup;
  hobbiesArray: FormArray; // used for Method 2
  forbiddenUsernames = ['Chris', 'Anna'];

  // Method 1 ----------------------------
  // ngOnInit(): void {
  //   this.signupForm = new FormGroup({
  //     username: new FormGroup({
  //       firstname: new FormControl(null, [Validators.required,  Validators.minLength(3)]),
  //       lastname: new FormControl(null, [Validators.required,  Validators.minLength(3)]),
  //     }),
  //     email: new FormControl(null, [Validators.required, Validators.email]),
  //     gender: new FormControl('Male'),
  //     hobbies: new FormArray([])
  //   })
  // }

  // Method 2 ----------------------------
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.hobbiesArray = this.fb.array([])
    this.signupForm = this.fb.group({
      username: this.fb.group({
        firstname: this.fb.control<string>(
          '', [Validators.required, Validators.minLength(3), this.forbiddenNames.bind(this)]),
        lastname: this.fb.control<string>(
          '', [Validators.required, Validators.minLength(3)])
      }),
      email: this.fb.control<string>(
        '', [Validators.required, Validators.email], this.forbiddenEmails),
      gender: this.fb.control<string>('Male'),
      hobbies: this.hobbiesArray
    })
    // Angular gives us 2 observables that we can listen to: statusChanges & valueChanges, thus we can use 
    // subscribe() -------
    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // )
    // this.signupForm.statusChanges.subscribe(
    //   (status) => console.log(status)
    // )
    // Pre-populating data (creating entire new data) ----------------
    // this.signupForm.setValue({
    //   username: {
    //     firstname: 'Max',
    //     lastname: 'Lee'
    //   },
    //   email: 'maxlee@gmail.com',
    //   gender: 'Male',
    //   hobbies: ['coding', 'hiking']
    // });
    // Pre-populating data (patching/partial data) -------------------
    // this.signupForm.patchValue({
    //   username: {
    //     firstname: 'Jason',
    //     lastname: 'Ng'
    //   },
    // });
  }

  onSubmit() {
    console.log(this.signupForm.value);
    let formData = this.printFormGroupValue(this.signupForm); // See below for printFormGroupValue method
    alert(formData);
    this.hobbiesArray.clear(); // you have to clear the array manually
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  // Creating custom validator
  forbiddenNames(control: FormControl): {[s: string] : boolean} {
    // -1 means true
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden':true};
    }
    return null; //DON'T return {'nameIsForbidden':false}. It should be null or simply omit the return
  }

  // Creating custom async validator
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  // Just a helper method for printing data
  printFormGroupValue(formGroup: FormGroup | FormArray): string {
      let formData = "";
      Object.keys(formGroup.controls).forEach(key => {
          const control = formGroup.get(key);
          if (control instanceof FormGroup || control instanceof FormArray) {
              formData += `${key}: \n${this.printFormGroupValue(control)}\n`;
          } else {
              formData += `${key}: ${control.value}\n`;
          }
      });
      return formData;
  }
}

// ------------------------------------------------------------------------------------------------------
// const forbiddenUsernames = ['Chris', 'Anna'];

// const forbiddenNames = (control: AbstractControl) => {
//   if (forbiddenUsernames.indexOf(control.value)) {
//     return {'nameIsForbidden':true} as ValidationErrors;
//   }
//   return (null); //DON'T return {'nameIsForbidden':false}. It should be null or simply omit the return
// }