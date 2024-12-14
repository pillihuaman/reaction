import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {
  @Input() control: AbstractControl | null = null;
  @Input() errorMessages?:  string[];
  @Input() isValidObjectId: ((value: string) => boolean) | undefined; // Input to accept the validation method
  isArray: boolean = false; // Property to indicate if errorMessages is an array

  private statusChangesSubscription: Subscription | null = null;

  constructor() { 

console.log(this.control)
console.log(this.errorMessages)


  }

  ngOnInit(): void {
  
    if (this.control) {
      console.log('Control Status:', this.control.status);
      this.statusChangesSubscription = this.control.statusChanges.subscribe(() => {
        this.isArray = Array.isArray(this.errorMessages);
        console.log(this.control);
      });
    }
  }
  ngOnDestroy(): void {
    if (this.statusChangesSubscription) {
      this.statusChangesSubscription.unsubscribe();
    }
  }

}
