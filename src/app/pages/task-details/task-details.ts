import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task-service';

@Component({
  imports: [],
  selector: 'app-task-details',
  styleUrl: './task-details.css',
  templateUrl: './task-details.html',
})
export class TaskDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly taskService = inject(TaskService);

  private readonly taskId = Number(this.route.snapshot.paramMap.get('id'));

  protected readonly task = this.taskService.getTaskById(this.taskId);
}
