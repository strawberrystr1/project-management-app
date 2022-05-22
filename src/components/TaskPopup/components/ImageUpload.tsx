import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PublishIcon from '@mui/icons-material/Publish';
import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useCreateFileMutation } from '../../../store/services/fileService';
import { SaveOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from '../../../hooks/redux';
import { openSuccessSnack } from '../../../store/reducers/snackSlice';

const Input = styled('input')({
  display: 'none',
});

type Props = {
  taskId: string;
  boardId: string;
};

const ImageUpload = ({ taskId, boardId }: Props) => {
  const [file, setFile] = useState<File>();
  const handleChange = (files: FileList | null) => {
    files && setFile(files[0]);
  };

  const [uploadFile] = useCreateFileMutation();
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const uploadFileCallback = () => {
    const formData = new FormData();
    formData.append('taskId', taskId);
    formData.append('boardId', boardId);
    formData.append('file', file as File);
    uploadFile(formData)
      .unwrap()
      .then(() => dispatch(openSuccessSnack(t('snack_message.file.create_file'))))
      .catch((e) => e);
  };

  return (
    <Box sx={{ alignSelf: 'center' }}>
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={({ target }) => handleChange(target.files)}
        />
        <Button
          variant="text"
          component="span"
          color="secondary"
          startIcon={<PublishIcon color="info" />}
        >
          {file ? file.name : t('task_popup.upload')}
        </Button>
      </label>
      <IconButton color="success" onClick={uploadFileCallback}>
        <SaveOutlined />
      </IconButton>
    </Box>
  );
};

export default ImageUpload;
