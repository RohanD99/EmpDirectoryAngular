import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

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

  getFormControlValue(formGroup: FormGroup, controlName: string): any {
    const control: AbstractControl | null = formGroup.get(controlName);
    return control ? control.value : null;
  }

  private isOpenSubject = new Subject<boolean>();

  isOpen$ = this.isOpenSubject.asObservable();

  openForm() {
    this.isOpenSubject.next(true);
  }

  closeForm() {
    this.isOpenSubject.next(false);
  }
}
