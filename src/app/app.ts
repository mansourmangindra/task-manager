import { Component, signal } from '@angular/core';
import { TaskList } from './components/task-list/task-list';
import { TaskSummary } from './components/task-summary/task-summary';
import { TaskForm } from './components/task-form/task-form';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('task-manager');
}
