import {tasksStore} from './tasks';
import {authStore} from './auth';

export const stores = {
  tasksStore,
  authStore,
};

export const resetStores = () => {
  tasksStore.reset();
  authStore.reset();
};
