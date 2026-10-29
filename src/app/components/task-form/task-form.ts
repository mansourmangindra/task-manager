import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-task-form',
  styleUrl: './task-form.css',
  templateUrl: './task-form.html',
})
export class TaskForm {
  private readonly taskService = inject(TaskService);

  protected readonly taskForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
    status: new FormControl<'todo' | 'in-progress' | 'completed'>('todo', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    dueDate: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected submitTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const { title, description, status, dueDate } = this.taskForm.getRawValue();

    this.taskService.addTask({
      title: title ?? '',
      description: description ?? '',
      status: status ?? 'todo',
      dueDate: dueDate ?? '',
    });

    this.taskForm.reset({
      title: '',
      description: '',
      status: 'todo',
      dueDate: '',
    });
  }
}
