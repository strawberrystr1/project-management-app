export interface IFromField {
  fields: string[];
}

export interface IInitialFormValues {
  [key: string]: string;
}

export interface IDialogButtonProps {
  btn: (handleOpen: () => void, t?: string) => JSX.Element;
  form: (handleClose: () => void) => JSX.Element;
  type: string; //translation type
  className?: string;
}
