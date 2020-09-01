import { BaseCrudModel } from './base-crud-model';

export class Course extends BaseCrudModel {
    name: String;
    info: String;
    owner: String;

    public constructor(name: String, info: String) {
        super();
        this.name = name;
        this.info = info;
    }
}
