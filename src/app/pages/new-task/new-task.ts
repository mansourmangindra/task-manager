import { Component } from '@angular/core';
import { TaskForm } from '../../components/task-form/task-form';

@Component({
  imports: [TaskForm],
  selector: 'app-new-task',
  styleUrl: './new-task.css',
  templateUrl: './new-task.html',
})
export class NewTask {}
