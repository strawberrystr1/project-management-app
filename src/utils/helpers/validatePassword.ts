export const validate = (pass: string, lang: string) => {
  let msg = '';
  if (!pass) {
    if (lang === 'en') msg = 'Password is required';
    else msg = 'Укажите пароль';
  }
  if (pass.trim().length < 8) {
    if (lang === 'en') msg = 'Password must be 8 or more characters';
    else msg = 'Пароль должен состоять из 8 и более символов';
  }
  if (/[\&@#$%\^\*]/.test(pass))
    if (lang === 'en')
      msg = `Password mustn't contain the following characters '@, #, $, %, ^, &, *'`;
    else msg = `Пароль не должен содержать следующие символы '@, #, $, %, ^, &, *'`;
  if (/\s/.test(pass))
    if (lang === 'en') msg = `Password mustn't contain whitespaces`;
    else msg = 'Пароль не должен содержать пробелы';
  return msg;
};
