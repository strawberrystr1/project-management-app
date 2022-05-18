import { Button, Dialog, DialogContent } from '@mui/material';
import TaskDescription from './components/TaskDescription';
import TaskHeader from './components/TaskHeader';
import CloseIcon from '@mui/icons-material/Close';
import styles from './style.module.scss';
import { ITask } from '../../interfaces/apiInterfaces';
import DialogButton from '../layouts/DialogButton';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import DialogControls from '../layouts/DialogControls';

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
