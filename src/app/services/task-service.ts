import { Service, computed, signal, inject } from '@angular/core';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';

@Service()
export class TaskService {
  private readonly taskState = signal<Task[]>([]);

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/tasks';

  readonly errorMessage = signal('');

  readonly tasks = this.taskState.asReadonly();
  readonly taskCount = computed(() => this.taskState().length);

  readonly completedCount = computed(
    () => this.taskState().filter((task) => task.status === 'completed').length,
  );

  readonly activeCount = computed(
    () => this.taskState().filter((task) => task.status !== 'completed').length,
  );

  constructor() {
    this.loadTask();
  }

  loadTask(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe((tasks) => {
      this.taskState.set(tasks);
    });
  }

  deleteTask(taskId: number): void {
    this.errorMessage.set('');

    this.http.delete(`${this.apiUrl}/${taskId}`).subscribe({
      next: () => {
        this.taskState.update((tasks) => tasks.filter((task) => task.id !== taskId));
      },
      error: () => {
        this.errorMessage.set('Unable to delete the tasks. Please try again.');
      },
    });
  }

  toggleTaskCompletion(taskId: number): void {
    const currentTask = this.taskState().find((task) => task.id === taskId);

    if (!currentTask) {
      return;
    }

    const newStatus = currentTask.status === 'completed' ? 'todo' : 'completed';

    this.http
      .patch<Task>(`${this.apiUrl}/${taskId}`, {
        status: newStatus,
      })
      .subscribe((updatedTask) => {
        this.taskState.update((tasks) =>
          tasks.map((tasks) => (tasks.id === updatedTask.id ? updatedTask : tasks)),
        );
      });
  }

  addTask(task: Omit<Task, 'id'>): void {
    this.http.post<Task>(this.apiUrl, task).subscribe((createdTask) => {
      this.taskState.update((tasks) => [...tasks, createdTask]);
    });
  }

  getTaskById(taskId: number): Task | undefined {
    return this.taskState().find((task) => task.id === taskId);
  }

  readonly canCreateTask = computed(() => this.taskState().length < 5);
}
