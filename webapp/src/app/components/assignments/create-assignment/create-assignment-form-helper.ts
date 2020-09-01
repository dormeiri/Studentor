import { BaseFormHelper } from "src/app/helpers/basic-form/base-form-helper";
import { Assignment } from 'src/app/models/assignment.model';

export class CreateAssignmentFormHelper extends BaseFormHelper<Assignment> {
    public submit() {
        if (this.form.invalid) {
            return;
        }

        let values = this.form.value;
        let entity = new Assignment(values.title, values.grade, values.date, values.info, values.course);
        if (!entity.date) {
            entity.date = null;
        }
        this.subs = this.crudService.post(entity).subscribe(
            (data) => {
                this.notifyService.showSuccess('Assignment created', 'Assignment');
                this.form.reset(this.resetConfig);
            },
            (err) => {
                this.notifyService.showError(err, 'Assignment');
            }
        );
    }
}