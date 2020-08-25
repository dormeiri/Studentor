import { BaseFormHelper } from "src/app/helpers/basic-form/base-form-helper";
import { Exam } from 'src/app/models/exam.model';

export class CreateExamFormHelper extends BaseFormHelper<Exam> {
    public submit() {
        if (this.form.invalid) {
            return;
        }

        let values = this.form.value;
        let entity = new Exam(values.course_id, values.date, values.title, values.info, values.grade);
        this.subs = this.crudService.post(entity).subscribe(
            (data) => {
                this.notifyService.showSuccess('Exam created', 'Exam');
                this.form.reset(this.resetConfig);
            },
            (err) => {
                this.notifyService.showError(err, 'Exam');
            }
        );
    }
}