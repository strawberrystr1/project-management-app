import { FormikErrors } from 'formik';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IInitialFormValues } from '../interfaces/formInterfaces';

const useFormikTranslation = (
  validateForm: (
    values?: IInitialFormValues | undefined
  ) => Promise<FormikErrors<IInitialFormValues>>
) => {
  const { i18n } = useTranslation();
  useEffect(() => {
    validateForm();
  }, [i18n.language]);
};

export default useFormikTranslation;
