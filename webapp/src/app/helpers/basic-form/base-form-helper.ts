import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Course } from 'src/app/models/course.model';
import { BaseCrudService } from 'src/app/services/base-crud-service';
import { NotifyService } from 'src/app/services/notify.service';
import { BaseCrudModel } from 'src/app/models/base-crud-model';

export abstract class BaseFormHelper<T extends BaseCrudModel> {

    public form: FormGroup;
    protected subs: Subscription;
    protected resetConfig: any;


    public constructor(
        private controlsConfig: any,
        protected crudService: BaseCrudService<T>,
        protected notifyService: NotifyService,
        private formBuilder: FormBuilder) {
        this.resetConfig = this.getResetConfig();
    }


    public init() {
        this.form = this.formBuilder.group(this.controlsConfig);
    }

    public destroy() {
        this.subs?.unsubscribe();
    }

    public abstract submit(successFn?: (_: any) => void, failFn?: (_: any) => void): void;

    private getResetConfig() {
        return Object.keys(this.controlsConfig).reduce(
            (result, key) => {
                result[key] = this.controlsConfig[key][0];
                return result;
            },
            {}
        );
    }
}
