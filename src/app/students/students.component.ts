import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { PopupComponent } from '../popup/popup.component';
import coursesData from '../../assets/json/courses.json';
import studentsData from '../../assets/json/students.json';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  courses = coursesData;
  students: Student[] = studentsData;
  filteredStudents: Student[] = [...this.students];
  bsModalRef?: BsModalRef;
  modalRef?: BsModalRef;
  selectedCourse = '';
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
  }
  openStudentModal(modalMode: string, i?:number){
    const initialState: ModalOptions = {
      initialState: {
        modalMode: modalMode ,
        type: 'student',
        data: i != undefined? this.filteredStudents[i]: '' 
      }
    };
    this.bsModalRef = this.modalService.show(PopupComponent, initialState);
    this.bsModalRef?.content.submitForm.subscribe((data:any) => {
      if(modalMode === 'edit' && i != undefined) {
        this.filteredStudents.splice(i, 1, data);
        // this.students[i] = data;
      } else {
        this.filteredStudents.push(data);
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
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  deleteStudent(StudentIndex: number){
    this.filteredStudents.splice(StudentIndex,1);
    this.closeConfirmation();
  }
  closeConfirmation(){
    this.modalRef?.hide();
  }
  filterStudents() {
    console.log(this.students, this.selectedCourse);
    this.filteredStudents = this.students.filter(student => student.course.toLowerCase() == this.selectedCourse.toLowerCase());
    console.log(this.filteredStudents);
  }
}

export interface Student{
  name:string,
  grade:string,
  course:string,
}
