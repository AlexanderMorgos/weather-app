import { Form } from '@core/form/base';
import { FORM_VALIDATIONS } from '@core/form/constants';
import { FormFields } from './sign-up.types';
import { joinRules } from '@shared/utils/form';

export const FIELDS = {
  email: 'email',
};

export class SignUpForm extends Form<FormFields> {
  protected setup() {
    return {
      fields: [
        {
          name: FIELDS.email,
          type: 'text',
          rules: joinRules(FORM_VALIDATIONS.required, FORM_VALIDATIONS.email),
        },
      ],
    };
  }
}
