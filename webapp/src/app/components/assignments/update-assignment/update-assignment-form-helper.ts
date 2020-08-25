import { BaseFormHelper } from "src/app/helpers/basic-form/base-form-helper";
import { Assignment } from 'src/app/models/assignment.model';

export class UpdateAssignmentFormHelper extends BaseFormHelper<Assignment> {

    private data: Assignment;


    public submit(successFn: (_: any) => void) {
        if (this.form.invalid) {
            return;
        }

        this.setDataFromForm();
        this.subs = this.crudService.put(this.data).subscribe(
            (data) => {
                this.notifyService.showSuccess('Success', 'Assignment Update');
                successFn(data);
            },
            (err) => {
                this.notifyService.showError(err, 'Assignment');
            }
        );
    }

    public loadData(id: string): void {
        this.subs = this.crudService.get(id).subscribe(
            (data: Assignment) => {
                this.data = data;
                this.setFormFromData();
            },
            (err) => {
                this.notifyService.showError(err, 'Assignment');
            });
    }

    private setFormFromData(): void {
        this.form.controls['title'].setValue(this.data.title);
        this.form.controls['info'].setValue(this.data.info);
        this.form.controls['due'].setValue(!this.data.due ? null : new Date(this.data.due));
    }

    private setDataFromForm(): void {
        this.data.title = this.form.value.title;
        this.data.info = this.form.value.info;
        this.data.due = this.form.value.due;
    }
}