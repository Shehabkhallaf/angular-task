import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { PopupComponent } from '../popup/popup.component';
import coursesDate from '../../assets/json/courses.json';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses = coursesDate;
  bsModalRef?: BsModalRef;
  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}
  openCourseModal(modalMode:string, i?:number) {
    const initialState: ModalOptions = {
      initialState: {
        modalMode: modalMode ,
        type: 'course',
        data: i != undefined? {name: this.courses[i]}: '' 
      }
    };
    this.bsModalRef = this.modalService.show(PopupComponent, initialState);
    this.bsModalRef?.content.submitForm.subscribe((data:any) => {
      if(modalMode === 'edit' && i != undefined) {
        this.courses.splice(i, 1, data.name);
        // this.courses[i] = data;
      } else {
        this.courses.push(data.name);
      }
      this.bsModalRef?.hide();
    });
    this.bsModalRef.content.closeModal.subscribe((data:any) => {
      if(data) {
        this.bsModalRef?.hide();
      }
    });
  }
  openConfirmationmodal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  deleteCourse(courseIndex: number) {
    this.courses.splice(courseIndex, 1);
    this.cancelConfirmation();
  }
  cancelConfirmation() {
    this.modalRef?.hide();
  }
}
