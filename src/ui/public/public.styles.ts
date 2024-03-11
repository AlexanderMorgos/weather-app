import { appMakeStyles } from '@core/theme/utils/make-styles';

export const useStyles = appMakeStyles()(() => {
  return {
    root: {
      width: '100%',
      height: '100%',
      position: 'relative',
    },
    loader: {
      width: '100%',
      height: '100%',
    }
  };
});
