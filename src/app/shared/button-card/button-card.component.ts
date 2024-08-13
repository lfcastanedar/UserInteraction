import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button-card',
  templateUrl: './button-card.component.html'
})
export class ButtonCardComponent {
  @Input() title: string | undefined;
  @Input() buttonClass: string | undefined;
  @Input() iconType: string | undefined;
  @Input() option: string | undefined;

  @Output() buttonClicked = new EventEmitter<any>();

  clickButton(){
    this.buttonClicked.emit({
      option: this.option
    });
  }
}
