import { IColumn, IFullTask } from '../interfaces/apiInterfaces';

export const stringAvatar = (name: string): string => {
  const [first, second] = name.split(' ');
  return second ? `${first[0]}${second[0]}`.toUpperCase() : first[0].toUpperCase();
};

export const getNewOrder = (array: Array<Required<{ order: number }>>) =>
  array.reduce((acc, item) => (item.order > acc ? item.order : acc), 1) + 1;

export const readToken = () => String(localStorage.getItem('token-rss'));

export const getSubstring = (string: string): string => {
  const stringLength = string.length;
  const lastIndex = 6;
  const subString = string.substring(0, lastIndex);
  return stringLength > lastIndex ? `${subString}...` : subString;
};

export function makeOrderedArrayWithReplace(
  array: IFullTask[] | IColumn[],
  destIndex: number,
  draggableId: string
) {
  const modifiedArray = [...array];
  const sourceIndexId = modifiedArray.findIndex((item) => item._id === draggableId);
  const [removedItem] = modifiedArray.splice(sourceIndexId, 1);
  modifiedArray.splice(destIndex, 0, removedItem);
  return modifiedArray.map((item, index) => ({ ...item, order: index }));
}

export const addThemeScroll = (themeMode: boolean, classes: string[]): string => {
  if (themeMode) {
    classes.push('scrollbar-dark');
  } else {
    classes.push('scrollbar-light');
  }
  return classes.join(' ');
};
