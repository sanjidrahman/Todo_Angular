import { CrudService } from './../../service/crud.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private service: CrudService) {}

  ngOnInit(): void {
    this.addTaskValue = '';
    this.editTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = []
    this.getAllTask();
  }

  getAllTask() {
    this.service.allTask().subscribe(
      (res) => {
        this.taskArr = res;
      },
      (err) => {
        alert(err);
      }
    );
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.service.addTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
        this.addTaskValue = '';
      },
      (err) => {
        alert(err);
      }
    );
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.service.editTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('Failure');
      }
    );
  }

  deleteTask(task: Task) {
    this.service.deleteTask(task).subscribe(
      (res) => {
        this.ngOnInit();
      }, err => {
        alert('Failed to delete');
      }
    );
  }

  call(task: Task) {
    this.taskObj = task;
    this.editTaskValue = task.task_name;
  }

  clear() {
    this.taskArr = []
  }
}
