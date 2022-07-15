import { FormProvider, useForm } from 'react-hook-form';

import React from 'react';

export default function ReactHookDecorator({ children }) {
  // react-form-hooks
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
}
