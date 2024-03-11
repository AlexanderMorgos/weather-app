import { appMakeStyles } from '@core/theme/utils/make-styles';

export const useStyles = appMakeStyles()(({ spacing }) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  emptyState: {
    fontSize: 32,
    color: '#000000',
  },
  select: {
    minWidth: 150,
    marginBottom: spacing(4)
  },
  day: {}
}));
