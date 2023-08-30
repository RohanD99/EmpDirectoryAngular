import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class Utility {
  constructor() {}

  generateAlphabets(): string[] {
    const characters: string[] = [];
    const startCharCode = 'A'.charCodeAt(0);
    const endCharCode = 'Z'.charCodeAt(0);

    for (let charCode = startCharCode; charCode <= endCharCode; charCode++) {
      const character = String.fromCharCode(charCode);
      characters.push(character);
    }

    return characters;
  }

  generateUniqueId(employee: Employee): number {
    const currentTimestamp = new Date().getTime();
    const maxId = employee && employee.id ? employee.id : 0;
    const uniqueId = Math.max(maxId + 1, currentTimestamp);
    return uniqueId;
  }

  getFormControlValue(formGroup: FormGroup, controlName: string): any {
    const control: AbstractControl | null = formGroup.get(controlName);
    return control ? control.value : null;
  }
}
