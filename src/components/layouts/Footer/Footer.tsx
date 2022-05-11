import { Container, Typography } from '@mui/material';
import teamInfo from '../../../utils/constants/teamInfo';
import styles from './style.module.scss';
import github from '../../../assets/icons/github.png';

const Footer = () => {
  return (
    <Container
      maxWidth={false}
      component="footer"
      className={styles.footerWrapper}
      sx={{ backgroundColor: 'primary.main' }}
    >
      <Container maxWidth="xl" className={`${styles.footer} ${styles.override}`}>
        <a href="https://rs.school/react/">
          <img className={styles.logo} src="../assets/rs_school_js.svg" alt="school logo" />
        </a>
        <div className={styles.links_wrapper}>
          {teamInfo.map((item) => (
            <a href={item.github} key={item.name} className={styles.link}>
              <img src={github} alt="github logo" className={styles.git_logo} />
              <Typography color="white" fontSize={18}>
                {item.name}
              </Typography>
            </a>
          ))}
        </div>
        <Typography fontSize={30} fontWeight={600} className={styles.year}>
          2022
        </Typography>
      </Container>
    </Container>
  );
};

export default Footer;
