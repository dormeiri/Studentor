import { BaseFormHelper } from "src/app/helpers/basic-form/base-form-helper";
import { Course } from 'src/app/models/course.model';

export class UpdateCourseFormHelper extends BaseFormHelper<Course> {

    private data: Course;


    public submit(successFn: (_: any) => void) {
        if (this.form.invalid) {
            return;
        }

        this.setDataFromForm();
        console.log(this.data);
        this.subs = this.crudService.put(this.data).subscribe(
            (data) => {
                this.notifyService.showSuccess('Success', 'Course Update');
                successFn(data);
            },
            (err) => {
                this.notifyService.showError(err, 'Course');
            }
        );
    }

    public loadData(id: string): void {
        this.subs = this.crudService.get(id).subscribe(
            (data: Course) => {
                this.data = data;
                this.setFormFromData();
            },
            (err) => {
                this.notifyService.showError(err, 'Course');
            });
    }

    private setFormFromData(): void {
        this.form.controls['name'].setValue(this.data.name);
        this.form.controls['info'].setValue(this.data.info);
    }

    private setDataFromForm(): void {
        this.data.name = this.form.value.name;
        this.data.info = this.form.value.info;
    }


}