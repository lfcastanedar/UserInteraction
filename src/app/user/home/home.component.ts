import { Component } from '@angular/core';
import { ButtonTypes } from 'src/core/enums/buttonTypes';
import { MainOption } from 'src/core/enums/mainOptions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public requestForProcessNumber: boolean = false;
  public buttonTypes = ButtonTypes;
  public mainOption = MainOption;
  public optionSelected: number = MainOption.Main;


  submit(){}

  selectOption(option: number){
    this.optionSelected = option;
  }
}
