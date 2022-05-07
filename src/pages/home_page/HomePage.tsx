import { Avatar, Box, Button, Container, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import picture from '../../assets/images/2.png';
import person from '../../assets/images/person1.png';
import githubIcon from '../../assets/icons/github.png';
import team from '../../utils/constants/teamInfo';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box className={styles['welcome-wrapper']}>
      <Box className={styles['btns-wrapper']}>
        <Button
          onClick={() => navigate('/sign-up')}
          variant="contained"
          className={`${styles.btn} ${styles.override}`}
        >
          Sign Up
        </Button>
        <Button
          onClick={() => navigate('/sign-in')}
          variant="contained"
          className={`${styles.btn} ${styles.override}`}
        >
          Log In
        </Button>
      </Box>
      <Box className={styles['info-wrapper']}>
        <Typography paragraph fontSize={22} className={styles['info-text']}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi provident nisi, ipsum
          repellat deserunt ipsam id quod laudantium illum. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quaerat, rem ducimus! Cupiditate quam recusandae dolor aut dolores
          distinctio labore deleniti minima. Quaerat enim consectetur voluptate nobis, laboriosam
          inventore iure ipsam?
        </Typography>
        <img src={picture} alt="main picture" />
      </Box>
      <Box>
        <Typography variant="h2" align="center">
          Our team
        </Typography>
        <Container maxWidth="lg" className={styles.container}>
          {team.map((member, i) => (
            <Box key={member.name} className={styles['member-wrapper']}>
              <Box className={styles['member']}>
                <Avatar src={person} alt="person avatar" className={styles['member-avatar']} />
                <Box className={styles['member-info']}>
                  <a href={member.github}>
                    <img src={githubIcon} alt="link icon" />
                  </a>
                  <Typography variant="h6" fontSize={34}>
                    {member.name}
                  </Typography>
                  <Typography paragraph align="center" fontSize={18}>
                    {member.info}
                  </Typography>
                </Box>
              </Box>
              {i !== team.length - 1 && <Divider sx={{ background: 'white' }} />}
            </Box>
          ))}
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
