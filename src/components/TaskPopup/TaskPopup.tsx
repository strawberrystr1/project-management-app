import { Button, Dialog, DialogContent, Divider, Input } from '@mui/material';
import TaskDescription from './components/TaskDescription';
import TaskHeader from './components/TaskHeader';
import CloseIcon from '@mui/icons-material/Close';
import styles from './style.module.scss';
import {
  IColumn,
  IFullTask,
  IUpdateTask,
  IUpdateTaskFromPopup,
} from '../../interfaces/apiInterfaces';
import DialogButton from '../layouts/DialogButton';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import DialogControls from '../layouts/DialogControls';
import { useDeleteTaskMutation, useUpdateTaskMutation } from '../../store/services/tasksService';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { editTask, removeTask } from '../../store/reducers/boardSlice';
import UserPicker from '../UserPicker';
import { ColorPicker } from './components/ColorPicker';
import { useEffect, useState } from 'react';

interface Props {
  open: boolean;
  handleClose: () => void;
  task: IFullTask;
  columnTitle: string;
}

const TaskPopup = ({ open, handleClose, task, columnTitle }: Props) => {
  const { t } = useTranslation();
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();
  const dispatch = useTypedDispatch();
  const [updateTask] = useUpdateTaskMutation();
  const [color, setColor] = useState('');

  useEffect(() => {
    const splited = task.title.split('<!>');
    if (splited[1]) {
      setColor(splited[1].trim());
    }

    return () => setColor('');
  }, [task]);

  const taskData = {
    taskId: task._id,
    boardId: task.boardId,
    columnId: task.columnId,
  };

  const deleteTaskHandler = () => {
    deleteTask(taskData);
    handleClose();
    dispatch(removeTask([task.columnId, task._id]));
  };
  const handleUpdateTask = (newData: IUpdateTaskFromPopup) => {
    const body: IUpdateTask = {
      ...taskData,
      body: {
        description: task.description,
        boardId: task.boardId,
        columnId: task.columnId,
        order: task.order,
        title: task.title,
        users: task.users,
        userId: task.userId,
        ...newData,
      },
    };
    updateTask(body);
    dispatch(editTask({ ...taskData, body: { ...task, ...newData } }));
  };

  const changeUsers = (users: string[]) => {
    handleUpdateTask({ users });
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth={true} onClose={handleClose}>
      {color && <DialogContent sx={{ background: color }} />}
      <DialogContent className={styles.dialog}>
        <TaskHeader
          userId={task.userId}
          title={task.title}
          users={task.users}
          columnTitle={columnTitle}
          handleChange={handleUpdateTask}
          color={color}
        />
        <UserPicker users={task.users} setUsers={changeUsers} />
        <Divider />
        <TaskDescription
          color={color}
          description={task.description}
          handleChange={handleUpdateTask}
        />
        <Divider />
        <ColorPicker handleUpdate={handleUpdateTask} title={task.title} />
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
              loading={isLoading}
              sx={{ marginTop: '50px' }}
            >
              {t('task_popup.delete')}
            </LoadingButton>
          )}
          form={(handleClose) => (
            <DialogControls
              onConfirm={() => {
                deleteTaskHandler();
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
