import { BaseFormHelper } from "src/app/helpers/basic-form/base-form-helper";
import { Exam } from 'src/app/models/exam.model';

export class UpdateExamFormHelper extends BaseFormHelper<Exam> {

    private data: Exam;


    public submit(successFn: (_: any) => void) {
        if (this.form.invalid) {
            return;
        }

        this.setDataFromForm();
        this.subs = this.crudService.put(this.data).subscribe(
            (data) => {
                this.notifyService.showSuccess('Success', 'Exam Update');
                successFn(data);
            },
            (err) => {
                this.notifyService.showError(err, 'Exam');
            }
        );
    }

    public loadData(id: string): void {
        this.subs = this.crudService.get(id).subscribe(
            (data: Exam) => {
                this.data = data;
                this.setFormFromData();
            },
            (err) => {
                this.notifyService.showError(err, 'Exam');
            });
    }

    private setFormFromData(): void {
        this.form.controls['title'].setValue(this.data.title);
        this.form.controls['info'].setValue(this.data.info);
        this.form.controls['date'].setValue(!this.data.date ? null : new Date(this.data.date));
        this.form.controls['grade'].setValue(this.data.grade);
    }

    private setDataFromForm(): void {
        this.data.title = this.form.value.title;
        this.data.info = this.form.value.info;
        this.data.date = this.form.value.date;
        this.data.grade = this.form.value.grade;
    }
}