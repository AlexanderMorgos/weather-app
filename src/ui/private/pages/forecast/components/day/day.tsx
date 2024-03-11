import React, { useMemo } from 'react';
import Card from '@mui/material/Card';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AirIcon from '@mui/icons-material/Air';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

import { AppWithStyles } from '@core/theme/types';
import { ForecastReadModel } from '@shared/models/forecast/read-model';
import { Flex } from '@shared/components/flex';
import { dateUtils, formatDate, isAfter } from '@shared/utils/date';
import { WeatherCondition } from '@shared/models/forecast/weather-condition';

import { useStyles } from './day.styles';

export type DayProps = AppWithStyles<typeof useStyles> & {
  data: ForecastReadModel;
};

export const Day: React.FC<DayProps> = ({ classes: initialClasses, data }) => {
  const { classes } = useStyles(undefined, { props: { classes: initialClasses } });

  const icon = useMemo(() => {
    const commonIconProps = { classes: { root: classes.icon } };
    const config: Record<WeatherCondition, React.ReactNode> = {
      [WeatherCondition.SUNNY]: <WbSunnyIcon {...commonIconProps} />,
      [WeatherCondition.CLOUDY]: <CloudIcon {...commonIconProps} />,
      [WeatherCondition.RAINY]: <WaterDropIcon {...commonIconProps} />,
      [WeatherCondition.SNOWY]: <AcUnitIcon {...commonIconProps} />,
      [WeatherCondition.WINDY]: <AirIcon {...commonIconProps} />,
      [WeatherCondition.FOGGY]: <CloudQueueIcon {...commonIconProps} />,
      [WeatherCondition.THUNDERSTORM]: <ThunderstormIcon {...commonIconProps} />
    };

    return config[data.asJson.condition];
  }, [data]);

  const label = useMemo(() => {
    const config: Record<WeatherCondition, string> = {
      [WeatherCondition.SUNNY]: 'Sunny',
      [WeatherCondition.CLOUDY]: 'Cloudy',
      [WeatherCondition.RAINY]: 'Rainy',
      [WeatherCondition.SNOWY]: 'Snowy',
      [WeatherCondition.WINDY]: 'Windy',
      [WeatherCondition.FOGGY]: 'Foggy',
      [WeatherCondition.THUNDERSTORM]: 'Thunderstorm'
    };

    return config[data.asJson.condition];
  }, [data]);

  const currentTemperature = useMemo(() => {
    const now = dateUtils();
    const hour = now.hour();
    const isFutureDate = isAfter(data.asJson.date, dateUtils())

    if (isFutureDate) {
      return data.asJson.dayParts.day;
    }

    if (hour >= 6 && hour < 12) {
      return data.asJson.dayParts.morning;
    } 
    
    if (hour >= 12 && hour < 18) {
      return data.asJson.dayParts.day;
    } 
    
    if(hour >= 18 && hour < 24) {
      return data.asJson.dayParts.evening
    }

    return data.asJson.dayParts.night;
  }, []);

  const partsConfig = useMemo(() => {
    return [
      {
        label: 'Morning',
        color: '#2196f3',
        value: data.asJson.dayParts.morning
      },
      {
        label: 'Day',
        color: '#ffc43a',
        value: data.asJson.dayParts.day
      },
      {
        label: 'Evening',
        color: '#1863b5',
        value: data.asJson.dayParts.evening
      },
      {
        label: 'Night',
        color: '#0f0f10',
        value: data.asJson.dayParts.night
      }
    ];
  }, [data]);

  return (
    <Flex autoWidth={false} item xs={12} sm={6} classes={{ root: classes.root }}>
      <Card classes={{ root: classes.card }}>
        <p className={classes.date}>{formatDate(data.asJson.date, 'dddd, DD MMMM YYYY')}</p>
        <Flex alignItems="center" justifyContent="space-between" classes={{ root: classes.currentTemperatureWrapper }}>
          <p className={classes.currentTemperature}>{currentTemperature}</p>
          <div className={classes.iconWrapper}>{icon}</div>
        </Flex>
        <p className={classes.weatherCondition}>{label}</p>
        <Flex autoWidth={false} container spacing={4}>
          {partsConfig.map((part) => {
            return (
              <Flex item key={part.label} xs={12} sm={6}>
                <p className={classes.dayPartLabel}>{part.label}</p>
                <div className={classes.divider} style={{ backgroundColor: part.color }} />
                <p className={classes.dayPartLabel}>{part.value} °</p>
              </Flex>
            );
          })}
        </Flex>
      </Card>
    </Flex>
  );
};
