import { BREAKPOINT } from '@core/theme/constants';
import { appMakeStyles } from '@core/theme/utils/make-styles';

export const useStyles = appMakeStyles()(({ spacing, breakpoints }) => {
  const headerHeight = '50px';

  return {
    root: {
      width: '100%',
      height: '100%',
      overflow: 'auto',
    },
    loader: {
      width: '100%',
      height: '100%',
    },
    header: {
      height: headerHeight,
      padding: spacing(1, 4),


      [breakpoints.down(BREAKPOINT.mobile)]: {
        padding: spacing(1, 2),
      },
    },
    avatar: {
      marginRight: spacing(3)
    },
    content: {
      padding: spacing(0, 4),
      height: `calc(100% - ${headerHeight})`
    }
  };
});
