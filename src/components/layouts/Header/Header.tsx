import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CreateBoardForm from '../../CreateBoardForm';
import DialogButton from '../DialogButton';
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
          <DialogButton type="new_board" form={(h) => <CreateBoardForm handleClose={h} />} />
        </Container>
      </Container>
    </Container>
  );
};

export default Header;
