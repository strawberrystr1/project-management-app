import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';

const boardsMock = [
  { id: '1', title: 'board 1' },
  { id: '2', title: 'board 2' },
  { id: '3', title: 'board 3' },
  { id: '4', title: 'board 4' },
  { id: '5', title: 'board 5' },
];

const Boards = () => {
  return (
    <>
      <TextField id="standard-basic" label="Search" variant="standard" />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ alignItems: 'stretch' }}
      >
        {boardsMock.map((board) => (
          <Grid item xs={2} sm={4} md={4} key={board.id}>
            {/* {background: "main.primary"} */}
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea onClick={() => console.log('open card')}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {board.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    board description
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Divider />
              <Button size="small" fullWidth onClick={() => console.log('delete')} color="error">
                Delete
              </Button>
            </Card>
          </Grid>
        ))}
        <Grid item xs={2} sm={4} md={4}>
          <Card
            sx={{
              height: '100%',
              maxWidth: 345,
              background: 'transparent',
              border: '1px solid black',
            }}
          >
            <CardActionArea
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => console.log('ADD')}
            >
              add board
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Boards;
