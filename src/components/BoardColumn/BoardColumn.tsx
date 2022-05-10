import { Add } from '@mui/icons-material';
import { Stack, Divider, Box, Typography, Button, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CreateTaskForm from '../CreateTaskForm';
import DialogButton from '../layouts/DialogButton';
import styles from './style.module.scss';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import DialogControls from '../layouts/DialogControls';
import { IColumnResponce } from '../../interfaces/apiInterfaces';

const BoardColumn = ({ order, title }: IColumnResponce) => {
  const { t } = useTranslation();
  return (
    <Box
      style={{ order, display: 'flex', flexDirection: 'column' }}
      className={styles['column-container']}
    >
      <Box className={styles['title-container']}>
        <Typography variant="h6" className={styles['column-title']}>
          {title} + {order}
        </Typography>
        <DialogButton
          type="delete_column"
          btn={(handleOpenDialog) => (
            <IconButton
              onClick={handleOpenDialog}
              size="small"
              color="secondary"
              aria-label="delete column"
            >
              <BackspaceOutlinedIcon />
            </IconButton>
          )}
          form={(handleCloseDialog) => <DialogControls onCancel={handleCloseDialog} />}
        />
      </Box>
      <Stack
        direction={'column'}
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={0}
        className={`${styles['column']} container-scroll`}
      >
        {/* JUST AN EXAMPLE */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Box key={item} className={styles['column-item']}>
            Item #{item}
          </Box>
        ))}
        {/* JUST AN EXAMPLE */}
      </Stack>
      <DialogButton
        type="new_task"
        btn={(h, type) => (
          <Button onClick={h} className={styles['new-task-btn']} color="warning" endIcon={<Add />}>
            {t(`buttons.${type}`)}
          </Button>
        )}
        form={(h) => <CreateTaskForm handleClose={h} />}
      />
    </Box>
  );
};

export default BoardColumn;
