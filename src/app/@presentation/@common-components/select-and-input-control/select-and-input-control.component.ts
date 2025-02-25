import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-and-input-control',
  templateUrl: './select-and-input-control.component.html',
  styleUrls: ['./select-and-input-control.component.scss'],
  standalone: true,
    imports: [
      CommonModule,FormsModule 
    ],
})
export class SelectAndInputControlComponent implements OnInit {
  
  @Input() isInput: boolean = false;
  @Input() isSelect: boolean = false;
  @Input() data?: any;
  inputValue: any = '';

  constructor() {}

  ngOnInit(): void {
    if (this.isInput && this.data !== undefined) {
      this.inputValue = this.data;
    }
  }

  handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.inputValue = target.value;
    console.log('Input value:', this.inputValue);
  }

  handleSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    console.log('Selected value:', target.value);
  }
}
