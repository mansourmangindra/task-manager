import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-task-list',
  styleUrl: './task-list.css',
  templateUrl: './task-list.html',
})
export class TaskList {
  private readonly taskService = inject(TaskService);

  protected readonly tasks = this.taskService.tasks;
  protected readonly taskCount = this.taskService.taskCount;

  protected toggleCompletion(taskId: number): void {
    this.taskService.toggleTaskCompletion(taskId);
  }

  protected readonly errorMessage = this.taskService.errorMessage;

  protected deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }
}
