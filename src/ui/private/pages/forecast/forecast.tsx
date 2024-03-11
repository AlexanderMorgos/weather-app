import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';

import { AppWithStyles } from '@core/theme/types';
import { appInject } from '@core/di/utils';
import { DI_TOKENS } from '@shared/constants/di';
import { appObserver } from '@core/state-management/utils';
import { IForecastViewModel } from '@shared/types/view-models/forecast';
import { Loading } from '@shared/components/loading';
import { Flex } from '@shared/components/flex';
import { Day } from './components/day';
import { Select } from '@shared/components/select';
import { EUROPEAN_CAPITALS } from '@shared/constants/capitals';

import { useStyles } from './forecast.styles';

export type ForecastProps = AppWithStyles<typeof useStyles>;

export const Forecast: React.FC<ForecastProps> = appObserver(({ classes: initialClasses }) => {
  const forecastViewModel = appInject<IForecastViewModel>(DI_TOKENS.forecastViewModel);
  const [selectedCityId, setSelectedCityId] = useState('');
  const [loading, setLoading] = useState(true);
  const { classes } = useStyles(undefined, { props: { classes: initialClasses } });

  const initialize = useCallback(async () => {
    try {
      await forecastViewModel.fetchForecast();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, []);

  const handleCapitalChange = useCallback((event: SelectChangeEvent<unknown>) => {
    setSelectedCityId(String(event.target.value));
  }, []);

  const selectOptions = useMemo(() => {
    return EUROPEAN_CAPITALS.map((capital) => {
      return {
        id: capital.code,
        label: capital.name
      };
    })
  }, []);

  const content = useMemo(() => {
    if (!selectedCityId) {
      return (
        <Flex justifyContent="center" classes={{ root: classes.emptyState }}>Please select a city</Flex>
      );
    }

    if (loading) {
      return <Loading />
    }

    return (
      <Flex container spacing={4}>
        {forecastViewModel.forecast.map((forecast) => {
          return (
            <Day 
              key={forecast.asJson.date}
              data={forecast}
              classes={{ root: classes.day }}
            />
          );
        })}
      </Flex>
    );
  }, [selectedCityId, loading, forecastViewModel.forecast]);

  return (
    <div className={classes.root}>
      <Flex 
        autoWidth={false}
        justifyContent="center" 
        flexWrap="nowrap"
      >
        <Select 
          value={selectedCityId}
          options={selectOptions}
          classes={{ root: classes.select }}
          onChange={handleCapitalChange}
        />
      </Flex>
      {content}
    </div>
  );
});

export default Forecast;
