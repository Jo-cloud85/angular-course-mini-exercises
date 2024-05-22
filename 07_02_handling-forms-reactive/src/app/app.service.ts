import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

// Creating custom validator
/* Use AbstractControl instead of FormControl for better flexibility. This allows your validator to be used 
with other types of form controls like FormGroup and FormArray */
export function forbiddenNames(control: AbstractControl): ValidationErrors | null {
  const forbiddenUsernames: string[] = ['Chris', 'Anna'];

  if (control && control.value && forbiddenUsernames.includes(control.value)) {
    return { nameIsForbidden: true };
  }
  return null;
}

// Creating custom async validator - I used AbstractControl instead of FormControl
export function forbiddenEmails(control: AbstractControl): Promise<any> | Observable<any> {
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