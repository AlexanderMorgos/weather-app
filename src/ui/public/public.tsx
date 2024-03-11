import React, { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { SignUp } from './pages/sign-up';
import { LazyLoad } from '@shared/components/lazy-load';
import { ROUTES } from '@shared/constants/routes';
import { AppWithStyles } from '@core/theme/types';
import { appObserver } from '@core/state-management/utils';

import { useStyles } from './public.styles';

export type PublicProps = AppWithStyles<typeof useStyles>;

export const Public: React.FC<PublicProps> = appObserver(({ classes: initialClasses }) => {
  const { classes } = useStyles(undefined, { props: { classes: initialClasses } });

  const routes = useMemo((): Array<RouteConfig> => {
    return [
      {
        path: ROUTES.public.signUp,
        element: <SignUp />,
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
        <Routes>
          {routes.map((routeProps) => {
            return <React.Fragment key={String(routeProps.path)}>{renderRoutes(routeProps)}</React.Fragment>;
          })}
          <Route path="*" element={<Navigate to={ROUTES.public.signUp} />} />
        </Routes>
      </div>
    </LazyLoad>
  );
});

export default Public;
