import { Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import { IBoard } from '../../interfaces/apiInterfaces';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UpdateBoardBtn from './UpdateBoardBtn';
import DeleteBoardBtn from './DeleteBoardBtn';
import { useGetBoardByIdQuery } from '../../store/services/boardsService';

const BoardCard = ({ board }: { board: IBoard }) => {
  const token = localStorage.getItem('token-rss') as string;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data } = useGetBoardByIdQuery({ id: board.id, token });
  const columnsLength = data?.columns?.length;

  return (
    <Grid item xs={2} sm={4} md={4} key={board.id}>
      <Card sx={{ maxWidth: 345, position: 'relative' }}>
        <CardActionArea
          onClick={() => {
            console.log('open card', board.id);
            navigate(`/boards/${board.id}`);
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {board.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {columnsLength && columnsLength > 0
                ? t(`boards.boardDescription`, {
                    count: columnsLength,
                  })
                : t(`boards.boardDescriptionNoColumns`)}
            </Typography>
          </CardContent>
        </CardActionArea>

        <DeleteBoardBtn board={board} />
        <UpdateBoardBtn board={board} />
      </Card>
    </Grid>
  );
};

export default BoardCard;
