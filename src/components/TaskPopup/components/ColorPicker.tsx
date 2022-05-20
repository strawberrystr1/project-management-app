import { Box, Typography } from '@mui/material';
import styles from '../style.module.scss';
import { colors } from '../../../utils/constants/colors';
import { IUpdateTaskFromPopup } from '../../../interfaces/apiInterfaces';

type Props = {
  handleUpdate: (data: IUpdateTaskFromPopup) => void;
  title: string;
};

export const ColorPicker = ({ handleUpdate, title }: Props) => {
  const changeColor = (color: string) => {
    handleUpdate({ title: `${title.split(' <!> ')[0]} <!> ${color}` });
  };

  return (
    <Box className={styles.colorWrapper}>
      <Typography>You can choose a cover for this task:</Typography>
      <Box className={styles.colors}>
        {colors.map((color) => (
          <Box
            className={styles.colorsItem}
            sx={{ background: color }}
            key={color}
            onClick={() => changeColor(color)}
          />
        ))}
        <Box
          className={styles.colorsItem}
          sx={{ background: 'transparent' }}
          onClick={() => changeColor('')}
        />
      </Box>
    </Box>
  );
};
