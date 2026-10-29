import { Component } from '@angular/core';
import { TaskList } from '../../components/task-list/task-list';
import { TaskSummary } from '../../components/task-summary/task-summary';

@Component({
  imports: [TaskSummary, TaskList],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {}
