import { Box, Typography } from '@mui/material';
import styles from '../style.module.scss';
import { colors } from '../../../utils/constants/colors';
import { IUpdateTaskFromPopup } from '../../../interfaces/apiInterfaces';
import { useTranslation } from 'react-i18next';

type Props = {
  handleUpdate: (data: IUpdateTaskFromPopup) => void;
  title: string;
};

export const ColorPicker = ({ handleUpdate, title }: Props) => {
  const { t } = useTranslation();

  const changeColor = (color: string) => {
    if (color !== '') {
      handleUpdate({ title: `${title.split(' <!> ')[0]} <!> ${color}` });
    } else {
      handleUpdate({ title: `${title.split(' <!> ')[0]}` });
    }
  };

  return (
    <Box className={styles.colorWrapper}>
      <Typography>{t('task_popup.color')}</Typography>
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
