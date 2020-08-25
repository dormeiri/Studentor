import { BaseFormHelper } from "src/app/helpers/basic-form/base-form-helper";
import { Course } from 'src/app/models/course.model';

export class CreateCourseFormHelper extends BaseFormHelper<Course> {
    public submit() {
        if (this.form.invalid) {
            return;
        }

        let values = this.form.value;
        let entity = new Course(values.name, values.info);
        this.subs = this.crudService.post(entity).subscribe(
            (data) => {
                this.notifyService.showSuccess('Course created', 'Course');
                this.form.reset(this.resetConfig);
            },
            (err) => {
                this.notifyService.showError(err, 'Course');
            }
        );
    }
}