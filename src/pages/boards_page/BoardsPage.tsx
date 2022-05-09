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
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CreateBoardForm from '../../components/CreateBoardForm';
import DialogButton from '../../components/layouts/DialogButton';
import styles from './style.module.scss';

const boardsMock = [
  { id: '1', title: 'board 1' },
  { id: '2', title: 'board 2' },
  { id: '3', title: 'board 3' },
  { id: '4', title: 'board 4' },
  { id: '5', title: 'board 5' },
];

// const boardsMock = [];

const Boards = () => {
  const createAddBtn = (handleOpen: () => void) => {
    return (
      <Grid onClick={handleOpen} item xs={2} sm={4} md={4}>
        <Card
          sx={{
            height: '100%',
            maxWidth: 345,
            backgroundColor: 'secondary.main',
            // backgroundColor: 'transparent',
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
            <AddIcon fontSize="large" />
          </CardActionArea>
        </Card>
      </Grid>
    );
  };

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
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea
                // sx={{ backgroundColor: 'secondary.main' }}
                onClick={() => console.log('open card', board.id)}
              >
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
              <Button
                size="small"
                // variant="contained"
                // variant="outlined"
                // variant="text"
                fullWidth
                onClick={() => console.log('delete card', board.id)}
                // color="error"
                // color="secondary"
                // color="info"
                color="warning"
              >
                Delete
              </Button>
            </Card>
          </Grid>
        ))}
        <DialogButton
          type="new_board"
          btn={(handleOpen) => createAddBtn(handleOpen)}
          form={(handleClose) => <CreateBoardForm handleClose={handleClose} />}
        />
      </Grid>
    </>
  );
};

export default Boards;
