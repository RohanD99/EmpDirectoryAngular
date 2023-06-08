import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  characters: string[] = [];
  isFormVisible: boolean = false;

  showEmployeeForm() {
    this.isFormVisible = true;
  }

  hideEmployeeForm() {
    this.isFormVisible = false;
  }
  constructor() {
    this.generateAlphabet();
  }

  generateAlphabet() {
    const startCharCode = 'A'.charCodeAt(0);
    const endCharCode = 'Z'.charCodeAt(0);
    
    for (let charCode = startCharCode; charCode <= endCharCode; charCode++) {
      const character = String.fromCharCode(charCode);
      this.characters.push(character);
    }
  }
  
  onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.value) {
      const value = target.value;
    }
  }



}
