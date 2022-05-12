import { Box, Typography, Divider, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import { useFormik } from 'formik';
import validationSchema from '../../utils/helpers/validationSchema';
import { useUpdateUserMutation } from '../../store/services/userService';
import LoadingButton from '@mui/lab/LoadingButton';
import { IUserResponse } from '../../interfaces/apiInterfaces';
import DialogButton from '../layouts/DialogButton';
import DialogControls from '../layouts/DialogControls';

interface IProps {
  userId: string;
  data: IUserResponse;
  omit: ('name' | 'login' | 'password')[];
  fieldName: string;
}

const SettingsFormItem: React.FC<IProps> = ({ userId, data, omit, fieldName }) => {
  const { t } = useTranslation();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleSubmit = async () => {
    const token = localStorage.getItem('token-rss') as string;
    const body = {
      id: userId,
      token,
      body: {
        name: data.name,
        login: data.login,
        password: formik.values.password,
      },
    };
    await updateUser(body).unwrap();
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: { [fieldName]: '' },
    validationSchema: validationSchema.omit(omit),
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Box>
        <Typography fontSize={20} gutterBottom={true}>
          {t(`settings.${fieldName}`)}:
        </Typography>
        <form className={styles.settings_item}>
          <TextField
            placeholder={t(`settings.placeholder_${fieldName}`)}
            id={fieldName}
            name={fieldName}
            onChange={formik.handleChange}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            value={formik.values.password}
          />
          <DialogButton
            type="change_password"
            message=" "
            btn={(handleOpen) => (
              <LoadingButton
                className={styles.submit}
                type="button"
                variant="contained"
                size="small"
                loading={isLoading}
                onClick={handleOpen}
              >
                {t('settings.change_btn')}
              </LoadingButton>
            )}
            form={(handleClose) => (
              <DialogControls
                onConfirm={() => {
                  handleSubmit();
                  handleClose();
                }}
                onCancel={handleClose}
              />
            )}
          />
        </form>
      </Box>
      <Divider />
    </>
  );
};

export default SettingsFormItem;
