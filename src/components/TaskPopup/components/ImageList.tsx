import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteFileMutation, useGetFilesQuery } from '../../../store/services/fileService';
import { Box, Dialog, LinearProgress } from '@mui/material';
import { useRef, useState } from 'react';
import { baseUrl } from '../../../store/services/basicAPItemplate';

type Props = { taskId: string };

const ImageList = ({ taskId }: Props) => {
  const { data: files = [], isLoading, isFetching } = useGetFilesQuery(taskId);
  const [deleteFile] = useDeleteFileMutation();
  const [open, setOpen] = useState(false);
  const path = useRef('');

  const handleOpenImage = (fileName: string) => {
    setOpen(true);
    path.current = fileName;
  };

  const handleCloseImage = () => setOpen(false);
  const deleteImage = (fileId: string) => deleteFile(fileId);
  return (
    <>
      <List dense sx={{ height: '8rem', maxHeight: '8rem', overflow: 'auto', flex: '1 0 50%' }}>
        {files.map(({ _id, name, path }) => (
          <ListItem
            key={_id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => deleteImage(_id)}>
                <DeleteIcon color="warning" />
              </IconButton>
            }
          >
            <Box
              sx={{
                width: '3rem',
                height: '3rem',
                marginRight: '0.5em',
                background: `url(${baseUrl + path}) no-repeat center / cover`,
                borderRadius: '25%',
                cursor: 'pointer',
              }}
              onClick={() => handleOpenImage(path)}
            />
            <ListItemText primary={name} sx={{ wordBreak: 'break-word', cursor: 'default' }} />
          </ListItem>
        ))}
        {isFetching && <LinearProgress color="warning" />}
      </List>
      <Dialog onClose={handleCloseImage} open={open}>
        <img src={baseUrl + path.current} />
      </Dialog>
    </>
  );
};

export default ImageList;
