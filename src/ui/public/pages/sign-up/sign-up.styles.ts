import { appMakeStyles } from '@core/theme/utils/make-styles';

export const useStyles = appMakeStyles()(({ spacing }) => ({
  root: {
    height: '100%',
    width: '100%'
  },
  heading: {
    fontSize: 32,
    color: '#000000',
    marginBottom: spacing(8)
  },
  submitButton: {
    marginTop: spacing(4)
  }
}));
