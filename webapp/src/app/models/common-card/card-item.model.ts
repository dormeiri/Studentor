import { CardActionItem } from './card-action-item.model';

export class CardItem {
    public constructor(
        public value: String,
        public title: String,
        public info: String[],
        public smallInfo: String[],
        public actionItem: CardActionItem) { }
}
