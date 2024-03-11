import React, { useCallback, useMemo } from 'react';

import { AppWithStyles } from '@core/theme/types';
import { SignUpForm, FIELDS } from './sign-up.form';
import { appInject } from '@core/di/utils';
import { IAuthViewModel } from '@shared/types/view-models/auth';
import { DI_TOKENS } from '@shared/constants/di';
import { TextField } from '@shared/components/text-field';
import { Flex } from '@shared/components/flex';
import { Button } from '@shared/components/button';

import { useStyles } from './sign-up.styles';

export type SignUpProps = AppWithStyles<typeof useStyles>;

export const SignUp: React.FC<SignUpProps> = () => {
  const { classes } = useStyles();
  const authViewModel = appInject<IAuthViewModel>(DI_TOKENS.authViewModel);
  const form = useMemo(() => new SignUpForm(), []);

  const handleSubmit = useCallback(async () => {
    await form.validate();

    if (form?.hasError) {
      form?.showErrors();

      return;
    }

    authViewModel.signUp(form.values().email);
  }, [form]);

  return (
    <Flex 
      direction="column"
      justifyContent="center" 
      alignItems="center" 
      classes={{ root: classes.root }}
    >
      <h3 className={classes.heading}>Weather app</h3>
      <form onSubmit={form.onSubmit}>
        <TextField
          field={form.$(FIELDS.email)} 
        />
        <Button
          text="Sign up"
          size="medium"
          onClick={handleSubmit}
          classes={{ root: classes.submitButton }}
        />
      </form>
    </Flex>
  );
};
