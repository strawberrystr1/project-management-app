import { IFullTask } from '../interfaces/apiInterfaces';
import { useTypedSelector } from './redux';

export const useFilterTasks = (tasks: IFullTask[]) => {
  const { taskSearch, usersSearch, colorSearch } = useTypedSelector((state) => state.board);
  return tasks.filter((task) => {
    const titleFilter = task.title.split(' <!> ')[0].includes(taskSearch.trim());

    let memberFilter: boolean;
    if (usersSearch.length === 0) {
      memberFilter = true;
    } else {
      const a = task.users.filter((item) => {
        return usersSearch.includes(item);
      });
      memberFilter = a.length > 0;
    }

    let colorFilter: boolean;
    const splittedTitle = task.title.split(' <!> ');
    if (colorSearch) {
      const color = splittedTitle[1];
      colorFilter = splittedTitle.length > 1 && color.includes(colorSearch);
    } else {
      colorFilter = true;
    }

    return titleFilter && memberFilter && colorFilter;
  });
};
