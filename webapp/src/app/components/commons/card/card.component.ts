import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardItem } from 'src/app/models/common-card/card-item.model';
import { CardActionItem } from 'src/app/models/common-card/card-action-item.model';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() isMarked: boolean;
  @Input() data: CardItem;
  @Output() action = new EventEmitter<CardItem>();


  constructor() { }


  callAction(): void {
    // Fix: should work seperatly for each action item.
    this.action.emit(this.data);
  }
}
