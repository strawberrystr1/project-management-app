import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteFileMutation, useGetFilesQuery } from '../../../store/services/fileService';
import { Box, Dialog, LinearProgress, Stack } from '@mui/material';
import { useRef, useState } from 'react';
import { baseUrl } from '../../../store/services/basicAPItemplate';
import { addThemeScroll } from '../../../utils/functions';
import { useTypedDispatch, useTypedSelector } from '../../../hooks/redux';
import styles from '../style.module.scss';
import { openSuccessSnack } from '../../../store/reducers/snackSlice';
import { useTranslation } from 'react-i18next';
import DialogButton from '../../layouts/DialogButton';
import DialogControls from '../../layouts/DialogControls';

type Props = { taskId: string };

const ImageList = ({ taskId }: Props) => {
  const { data: files = [], isFetching } = useGetFilesQuery(taskId);
  const [deleteFile] = useDeleteFileMutation();
  const [open, setOpen] = useState(false);
  const path = useRef('');
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const handleOpenImage = (fileName: string) => {
    setOpen(true);
    path.current = fileName;
  };

  const handleCloseImage = () => setOpen(false);
  const deleteImage = (fileId: string) => {
    deleteFile(fileId)
      .unwrap()
      .then(() => dispatch(openSuccessSnack(t('snack_message.file.delete_file'))))
      .catch((e) => e);
  };
  const { isDarkTheme } = useTypedSelector((state) => state.settings);
  return (
    <>
      <List
        dense
        sx={{ height: '8rem', maxHeight: '8rem', overflow: 'auto', flex: '1 0 50%', width: '100%' }}
        className={addThemeScroll(isDarkTheme, [styles['image-list']])}
      >
        {files.map(({ _id, name, path }) => (
          <ListItem key={_id}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems="center"
              sx={{ width: '100%' }}
            >
              <Box
                sx={{
                  minWidth: '3rem',
                  minHeight: '3rem',
                  marginRight: '0.5em',
                  background: `url('${baseUrl + path}') no-repeat center / cover`,
                  borderRadius: '25%',
                  cursor: 'pointer',
                }}
                onClick={() => handleOpenImage(path)}
              />
              <ListItemText primary={name} sx={{ wordBreak: 'break-word', cursor: 'default' }} />
              <DialogButton
                type="delete_file"
                btn={(handleOpenDialog) => (
                  <IconButton onClick={handleOpenDialog}>
                    <DeleteIcon color="warning" />
                  </IconButton>
                )}
                form={(handleCloseDialog) => (
                  <DialogControls onCancel={handleCloseDialog} onConfirm={() => deleteImage(_id)} />
                )}
              />
            </Stack>
          </ListItem>
        ))}
        {isFetching && <LinearProgress color="warning" />}
      </List>
      <Dialog onClose={handleCloseImage} open={open}>
        <img
          src={baseUrl + path.current}
          style={{ maxWidth: '100%', maxHeight: 'calc(100vh - 64px)' }}
          alt="fullscreen-image"
        />
      </Dialog>
    </>
  );
};

export default ImageList;
