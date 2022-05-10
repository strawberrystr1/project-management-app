import { Card, CardActionArea, CardContent, Grid, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IBoard } from '../../interfaces/apiInterfaces';
import { getSubstring } from '../../utils/functions';
import ConfirmForm from '../ConfirmForm';
import DialogButton from '../layouts/DialogButton';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// todo change columnsLength of each board
const columnsLengthMock = 0;

const BoardCard = ({ board }: { board: IBoard }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Grid item xs={2} sm={4} md={4} key={board.id}>
      <Card sx={{ maxWidth: 345, position: 'relative' }}>
        <CardActionArea
          onClick={() => {
            console.log('open card', board.id);
            navigate(`/boards/board/${board.id}`);
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {board.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {columnsLengthMock > 0
                ? t(`boards.boardDescription`, {
                    count: columnsLengthMock,
                  })
                : t(`boards.boardDescriptionNoColumns`)}
            </Typography>
          </CardContent>
        </CardActionArea>

        <DialogButton
          type="delete_board"
          message={t(`forms.delete_board.description`, {
            title: getSubstring(board.title),
          })}
          btn={(handleOpen) => (
            <IconButton
              sx={{ position: 'absolute', right: 0, top: 0 }}
              aria-label="delete"
              color="warning"
              onClick={handleOpen}
            >
              <DeleteIcon />
            </IconButton>
          )}
          form={(handleClose) => (
            <ConfirmForm
              handleConfirm={() => {
                console.log('delete', board.id); //todo
                handleClose();
              }}
              handleClose={handleClose}
            />
          )}
        />
      </Card>
    </Grid>
  );
};

export default BoardCard;
