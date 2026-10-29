import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { NewTask } from './pages/new-task/new-task';
import { TaskDetails } from './pages/task-details/task-details';
import { taskLimitGuard } from './guards/task-limit-guard';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
  },
  {
    path: 'task/:id',
    component: TaskDetails,
  },
  {
    path: 'new-task',
    component: NewTask,
    canActivate: [taskLimitGuard],
  },
];
