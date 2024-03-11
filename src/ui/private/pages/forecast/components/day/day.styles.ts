import { BREAKPOINT } from '@core/theme/constants';
import { appMakeStyles } from '@core/theme/utils/make-styles';

export const useStyles = appMakeStyles()(({ spacing, breakpoints }) => ({
  root: {},
  card: {
    width: '100%',
    padding: spacing(3, 4),

    [breakpoints.down(BREAKPOINT.mobile)]: {
      padding: spacing(1, 2),
    },
  },
  date: {
    fontWeight: 600,
    fontSize: 14,
    marginBottom: spacing(3),
    color: '#0F0F10',

    [breakpoints.down(BREAKPOINT.mobile)]: {
      marginBottom: spacing(2),
    },
  },
  currentTemperatureWrapper: {
    marginBottom: spacing(3),

    [breakpoints.down(BREAKPOINT.mobile)]: {
      marginBottom: spacing(2),
    },
  },
  currentTemperature: {
    fontSize: 64,
    color: '#0F0F10',
    fontWeight: 600,

    [breakpoints.down(BREAKPOINT.mobile)]: {
      fontSize: 40
    },
  },
  weatherCondition: {
    fontWeight: 600,
    fontSize: 14,
    marginBottom: spacing(3),
    color: '#0F0F10',

    [breakpoints.down(BREAKPOINT.mobile)]: {
      marginBottom: spacing(2),
    },
  },
  iconWrapper: {
    width: 60,
    height: 60,

    [breakpoints.down(BREAKPOINT.mobile)]: {
      width: 30,
      height: 30
    },
  },
  icon: {
    width: '100%',
    height: '100%'
  },
  divider: {
    height: 2,
    width: '100%',
    margin: spacing(2, 0)
  },
  dayPartLabel: {
    fontWeight: 600,
    fontSize: 14,
    color: '#0F0F10',
  },
  dayPartTemperature: {
    fontWeight: 600,
    fontSize: 16,
    color: '#0F0F10',
  }
}));
