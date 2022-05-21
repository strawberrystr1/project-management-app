export const validate = (pass: string) => {
  let msg = '';
  if (!pass) msg = 'Password is required';
  if (pass.trim().length < 8) msg = 'Password must be 8 or more characters';
  if (/[\&@#$%\^\*]/.test(pass))
    msg = `Password mustn't contain the following characters '@, #, $, %, ^, &, *'`;
  if (/\s/.test(pass)) msg = `Password mustn't contain whitespaces`;

  return msg;
};
