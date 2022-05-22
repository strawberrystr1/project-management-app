import { Button, Dialog, DialogContent, Divider, Stack } from '@mui/material';
import TaskDescription from './components/TaskDescription';
import TaskHeader from './components/TaskHeader';
import CloseIcon from '@mui/icons-material/Close';
import styles from './style.module.scss';
import { ITask } from '../../interfaces/apiInterfaces';
import DialogButton from '../layouts/DialogButton';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import DialogControls from '../layouts/DialogControls';
import ImageUpload from './components/ImageUpload';
import ImageList from './components/ImageList';
import { themeOptionsDark } from '../../theme/theme';

interface Props {
  open: boolean;
  handleClose: () => void;
  task: ITask;
  columnTitle: string;
}

const TaskPopup = ({ open, handleClose, task, columnTitle }: Props) => {
  const { t } = useTranslation();

  const deleteTask = () => {
    console.log('delete task');
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth={true} onClose={handleClose}>
      <DialogContent className={styles.dialog}>
        <TaskHeader
          userId={task.userId}
          title={task.title}
          users={task.users}
          columnTitle={columnTitle}
        />
        <TaskDescription description={task.description} />
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          m={1}
          p={1}
          divider={<Divider orientation="vertical" variant="middle" flexItem />}
          sx={{ border: '2px dashed #868d92' }}
        >
          <ImageList taskId={task._id} />
          <ImageUpload taskId={task._id} boardId={task.boardId}></ImageUpload>
        </Stack>
        <DialogButton
          type="delete_task"
          message=" "
          btn={(handleOpen) => (
            <LoadingButton
              variant="contained"
              color="error"
              size="small"
              onClick={handleOpen}
              className={styles.delete}
              // loading={deleteLoading}
            >
              {t('task_popup.delete')}
            </LoadingButton>
          )}
          form={(handleClose) => (
            <DialogControls
              onConfirm={() => {
                deleteTask();
                handleClose();
              }}
              onCancel={handleClose}
            />
          )}
        />
      </DialogContent>
      <Button onClick={handleClose} className={styles.close}>
        <CloseIcon />
      </Button>
    </Dialog>
  );
};

export default TaskPopup;
