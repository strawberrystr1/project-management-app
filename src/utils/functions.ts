export const stringAvatar = (name: string): string => {
  const [first, second] = name.split(' ');
  return second ? `${first[0]}${second[0]}` : first[0];
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

// export function correctArr > (_arr, _param) {
/*
      коррекция  элементов массива по паре индекса
      *    _arr -- массив требующий коррекции
      *   _param -- пара [n1,n2] -- индексы массива для взаимной  перестановки
  */
//   _arr[_param[1]] = _arr.splice(_param[0], 1, _arr[_param[1]])[0];
// }
// correctArr(arr, [4, 1]);
