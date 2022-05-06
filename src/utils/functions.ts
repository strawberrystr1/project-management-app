export const stringAvatar = (name: string): string => {
  let nameText;
  if (name.split(' ').length > 1) {
    nameText = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
  } else {
    nameText = name[0];
  }
  return nameText;
};
