import React from 'react';

import { appInject } from '@core/di/utils';
import { DI_TOKENS } from '@shared/constants/di';
import { appObserver } from '@core/state-management/utils';
import { LazyLoad } from '@shared/components/lazy-load';
import { AppWithStyles } from '@core/theme/types';
import { IAuthViewModel } from '@shared/types/view-models/auth';

import { useStyles } from './app.styles';

const PrivateModule = React.lazy(() => import('./ui/private'));
const PublicModule = React.lazy(() => import('./ui/public'));

export type AppProps = AppWithStyles<typeof useStyles>;

const App: React.FC<AppProps> = appObserver(({ classes: initialClasses }) => {
  const { classes } = useStyles(undefined, { props: { classes: initialClasses } });
  const authViewModel = appInject<IAuthViewModel>(DI_TOKENS.authViewModel);

  return (
    <LazyLoad classes={{ root: classes.root }}>
      {authViewModel.loggedIn ? <PrivateModule /> : <PublicModule />}
    </LazyLoad>
  );
});

export default App;
