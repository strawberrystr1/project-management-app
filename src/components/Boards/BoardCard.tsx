import { Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import { IBoard } from '../../interfaces/apiInterfaces';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UpdateBoardBtn from './UpdateBoardBtn';
import DeleteBoardBtn from './DeleteBoardBtn';
import styles from './style.module.scss';
import { useGetBoardByIdQuery } from '../../store/services/boardsService';
import Loader from '../Loader';
import { useTypedSelector } from '../../hooks/redux';

const BoardCard = ({ board }: { board: IBoard }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading } = useGetBoardByIdQuery(board['_id']);
  const columnsLength = data?.columns ? data?.columns.length : 0;

  return (
    <Grid item xs={2} sm={4} md={4} key={board['_id']}>
      {isLoading ? (
        <Loader />
      ) : (
        <Card
          className={styles['card-item']}
          sx={{ maxWidth: 345, position: 'relative', maxHeight: 100, overflow: 'auto' }}
        >
          <CardActionArea
            onClick={() => {
              navigate(`/boards/${board['_id']}`);
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {board.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {columnsLength > 0
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
      )}
    </Grid>
  );
};

export default BoardCard;
