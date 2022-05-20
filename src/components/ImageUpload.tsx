import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PublishIcon from '@mui/icons-material/Publish';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useCreateFileMutation } from '../store/services/fileService';

const Input = styled('input')({
  display: 'none',
});

type Props = { taskId: string };

const ImageUpload = ({ taskId }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (files: FileList | null) => {
    files && setFile(files[0]);
  };

  const [uploadFile] = useCreateFileMutation();

  const uploadFileCallback = () => {
    console.log(file);
    file && uploadFile({ file, taskId });
  };

  return (
    <>
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={({ target }) => handleChange(target.files)}
        />
        <IconButton color="info" aria-label="upload picture" component="span">
          <PublishIcon />
        </IconButton>
      </label>
      <Button onClick={uploadFileCallback}>Add</Button>
    </>
  );
};

export default ImageUpload;