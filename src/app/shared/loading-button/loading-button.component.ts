import { Component, OnInit, Input } from '@angular/core';
import { ButtonTypes } from 'src/core/enums/buttonTypes';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html'
})
export class LoadingButtonComponent implements OnInit {

  public buttonType: number | undefined;
  public buttonTypes = ButtonTypes;

  @Input()
  set type(type: number){
    this.buttonType = type;
  }

  @Input() requestIsSending: boolean | undefined  = false;
  @Input() title: string | undefined;
  @Input() icon: string | undefined;

  constructor() { }

  ngOnInit(): void {
    console.log(this.title)
    console.log(this.buttonType)
  }

}
