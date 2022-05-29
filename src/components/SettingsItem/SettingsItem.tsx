import { Box, Typography, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';

const SettingsItem: React.FC<{ render: () => JSX.Element; type: string }> = ({ render, type }) => {
  const { t } = useTranslation();

  return (
    <>
      <Box>
        <Box className={styles.settings_item}>
          <Typography fontSize={20} gutterBottom={true}>
            {t(`settings.${type}`)}:
          </Typography>
          {render()}
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default SettingsItem;
