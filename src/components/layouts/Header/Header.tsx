import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';

const Header = () => {
  const { t } = useTranslation();
  return (
    <Container maxWidth={false} component="header" className={styles.headerWrapper}>
      <Container maxWidth="xl">
        header
        <h3>{t('example.header')}</h3>
      </Container>
    </Container>
  );
};

export default Header;
