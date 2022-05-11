export const stringAvatar = (name: string): string => {
  const [first, second] = name.split(' ');
  return second ? `${first[0]}${second[0]}` : first[0];
};

export const getNewOrder = (array: Array<Required<{ order: number }>>) =>
  array.reduce((acc, item) => (item.order > acc ? item.order : acc), 1) + 1;

export const readToken = () => String(localStorage.getItem('token-rss'));
