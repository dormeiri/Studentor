import { BaseFormHelper } from "src/app/helpers/basic-form/base-form-helper";
import { Assignment } from 'src/app/models/assignment.model';

export class CreateAssignmentFormHelper extends BaseFormHelper<Assignment> {
    public submit() {
        if (this.form.invalid) {
            return;
        }

        let values = this.form.value;
        let entity = new Assignment(values.course_id, values.due, values.title, values.info);
        if(!entity.due) {
            entity.due = null;
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