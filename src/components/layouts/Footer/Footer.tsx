import { Container, Stack, Typography } from '@mui/material';
import teamInfo from '../../../utils/constants/teamInfo';
import styles from './style.module.scss';
import github from '../../../assets/icons/github.png';
import { Box } from '@mui/system';

const Footer = () => {
  return (
    <Container
      maxWidth={false}
      component="footer"
      className={styles.footerWrapper}
      sx={{ backgroundColor: 'primary.main' }}
    >
      <Stack
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: '100%' }}
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, md: 2 }}
        maxWidth="xl"
      >
        <Stack direction="row" alignItems="center">
          <a href="https://rs.school/react/">
            <img className={styles.logo} src="../assets/rs_school_js.svg" alt="school logo" />
          </a>
          <Typography display={{ xs: 'block', sm: 'none' }} fontSize="20" fontWeight={600}>
            2022
          </Typography>
        </Stack>
        <Box className={styles.links_wrapper}>
          {teamInfo.map((item) => (
            <a href={item.github} key={item.name} className={styles.link}>
              <img src={github} alt="github logo" className={styles.git_logo} />
              <Typography
                color="white"
                fontSize={{ xs: 16, md: 18 }}
                lineHeight={{ xs: 1.2, md: 1.5 }}
              >
                {item.name}
              </Typography>
            </a>
          ))}
        </Box>
        <Typography
          fontSize={{ xs: 20, md: 30 }}
          display={{ xs: 'none', sm: 'block' }}
          fontWeight={600}
        >
          2022
        </Typography>
      </Stack>
    </Container>
  );
};

export default Footer;
