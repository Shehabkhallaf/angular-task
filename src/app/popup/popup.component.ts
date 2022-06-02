import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import coursesData from '../../assets/json/courses.json';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  @ViewChild('addForm') addForm!: NgForm;
  submitForm: EventEmitter<any> = new EventEmitter();
  closeModal: EventEmitter<any> = new EventEmitter();
  modalMode?: string;
  type?: string;
  data?: any;
  courses = coursesData;
  constructor(public bsModalRef: BsModalRef) {
  
  }
  add(){
    this.submitForm.emit(this.addForm.value);
  }
  cancel() {
    this.closeModal.emit(true);
  }
  ngOnInit(): void {
    console.log(this.data);
  }
}
