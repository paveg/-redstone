import { createMuiTheme } from '@material-ui/core';
import responsiveFontSizes from '@material-ui/core/styles/responsiveFontSizes';

const theme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      fontFamily: ['M PLUS Rounded 1c', 'Noto Sans JP', 'sans-serif'].join(','),
    },
  }),
);

export default theme;
