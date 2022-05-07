export const stringAvatar = (name: string): string => {
  const [first, second] = name.split(' ');
  return second ? `${first[0]}${second[0]}` : first[0];
};
