import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task-service';

@Component({
  imports: [],
  selector: 'app-task-summary',
  styleUrl: './task-summary.css',
  templateUrl: './task-summary.html',
})
export class TaskSummary {
  private readonly taskService = inject(TaskService);

  protected readonly totalTasks = this.taskService.taskCount;
  protected readonly activeTasks = this.taskService.activeCount;
  protected readonly completedTasks = this.taskService.completedCount;
}
