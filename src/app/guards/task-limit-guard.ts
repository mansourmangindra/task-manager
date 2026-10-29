import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TaskService } from '../services/task-service';

export const taskLimitGuard: CanActivateFn = () => {
  const taskService = inject(TaskService);
  const router = inject(Router);

  if (taskService.canCreateTask()) {
    return true;
  }
  return router.createUrlTree(['/']);
};
