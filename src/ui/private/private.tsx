import React, { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

import { LazyLoad } from '@shared/components/lazy-load';
import { ROUTES } from '@shared/constants/routes';
import { AppWithStyles } from '@core/theme/types';
import { Flex } from '@shared/components/flex';
import { IAuthViewModel } from '@shared/types/view-models/auth';
import { appInject } from '@core/di/utils';
import { DI_TOKENS } from '@shared/constants/di';
import { appObserver } from '@core/state-management/utils';

const Forecast = React.lazy(() => import('./pages/forecast'));

import { useStyles } from './private.styles';

export type PrivateProps = AppWithStyles<typeof useStyles>;

export const Private: React.FC<PrivateProps> = appObserver(({ classes: initialClasses }) => {
  const authViewModel = appInject<IAuthViewModel>(DI_TOKENS.authViewModel);
  const { classes } = useStyles(undefined, { props: { classes: initialClasses } });

  const name = useMemo(
    () =>
      authViewModel.userEmail
        ?.split(' ')
        .map((x) => x[0])
        .join('')
        .substr(0, 2),
    [authViewModel.userEmail]
  );

  const routes = useMemo((): Array<RouteConfig> => {
    return [
      {
        path: ROUTES.private.forecast,
        element: <Forecast />,
      },
    ];
  }, []);

  const renderRoutes = ({ nestedRoutes, ...otherRouteConfig }: RouteConfig) => {
    return (
      <>
        <Route {...otherRouteConfig} />
        {nestedRoutes?.map((x) => (
          <React.Fragment key={x.path}>{renderRoutes(x)}</React.Fragment>
        ))}
      </>
    );
  };

  return (
    <LazyLoad classes={{ root: classes.loader }}>
      <div className={classes.root}>
        <Flex autoWidth={false} justifyContent="flex-end" classes={{ root: classes.header }}>
          <Avatar classes={{ root: classes.avatar }}>
            {name}
          </Avatar>
          <IconButton onClick={authViewModel.logout}>
            <LogoutIcon />
          </IconButton>
        </Flex>
        <div className={classes.content}>
          <Routes>
            {routes.map((routeProps) => {
              return <React.Fragment key={String(routeProps.path)}>{renderRoutes(routeProps)}</React.Fragment>;
            })}
            <Route path="*" element={<Navigate to={ROUTES.private.forecast} />} />
          </Routes>
        </div>
      </div>
    </LazyLoad>
  );
});

export default Private;
