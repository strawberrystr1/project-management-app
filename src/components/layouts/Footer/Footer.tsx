import { Container, Stack, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import teamInfo from '../../../utils/constants/teamInfo';
import styles from './style.module.scss';
import { Box } from '@mui/system';

const Footer = () => {
  return (
    <Container
      maxWidth={false}
      component="footer"
      className="footer-container"
      sx={{ padding: '5px 0' }}
    >
      <Container maxWidth="xl">
        <Stack
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: '100%' }}
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, md: 2 }}
        >
          <Stack direction="row" alignItems="center">
            <a target="_blank" href="https://rs.school/react/" rel="noreferrer">
              <img className={styles.logo} src="../assets/rs_school_js.svg" alt="school logo" />
            </a>
            <Typography display={{ xs: 'block', sm: 'none' }} fontSize="20" fontWeight={600}>
              2022
            </Typography>
          </Stack>
          <Box className={styles.links_wrapper}>
            {teamInfo.map((item) => (
              <a
                target="_blank"
                href={item.github}
                key={item.name}
                className={styles.link}
                rel="noreferrer"
              >
                <GitHubIcon
                  sx={{
                    color: (theme) => theme.typography.body1.color,
                  }}
                  className={styles.git_logo}
                />
                <Typography fontSize={{ xs: 16, md: 18 }} lineHeight={{ xs: 1.2, md: 1.5 }}>
                  {item.name}
                </Typography>
              </a>
            ))}
          </Box>
          <Typography
            fontSize={{ xs: 20, md: 30 }}
            display={{ xs: 'none', sm: 'block' }}
            fontWeight={600}
            color="inherit"
          >
            2022
          </Typography>
        </Stack>
      </Container>
    </Container>
  );
};

export default Footer;
