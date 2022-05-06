import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CreateBoard from '../../CreateBoard';
import LanguageSwitch from './components/LanguageSwitch';
import styles from './style.module.scss';

const Header = () => {
  const { t } = useTranslation();
  return (
    <Container maxWidth={false} component="header" className={styles.headerWrapper}>
      <Container maxWidth="xl">
        header
        <Container maxWidth="xs">
          <span>{t('example.header')}</span>
          <LanguageSwitch />
          <CreateBoard />
        </Container>
      </Container>
    </Container>
  );
};

export default Header;
