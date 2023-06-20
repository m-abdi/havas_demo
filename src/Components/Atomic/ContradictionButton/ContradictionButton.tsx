import { Button } from '../Button';
import React from 'react';
import { Workflow } from 'lib/resolvers-types';
import isContradicted from '../../../Logic/isContradicted';

export default function ContradictionButton({
  type,
  data,
}: {
  type: 'EXIT' | 'ENTER';
  data: Workflow;
}) {
  if (type === 'EXIT') {
    if (isContradicted(type, data)) {
      return <Button label='مغایرت حواله با دریافتی' color='error' />;
    } else {
      return <Button label='کامل' color='success' />;
    }
  } else if (type === 'ENTER') {
    if (
      !data?.passedStages?.[1]?.havaleh?.assets &&
      data?.passedStages?.[0]?.submittedByUser?.id !==
        data?.passedStages?.[1]?.submittedByUser?.id
    ) {
      return <Button label='ثبت حواله توسط شرکت' color='success' />;
    } else if (isContradicted(type, data)) {
      return <Button label='مغایرت حواله شرکت با دریافتی' color='error' />;
    } else if (
      data?.passedStages?.[0]?.submittedByUser?.id ===
      data?.passedStages?.[1]?.submittedByUser?.id
    ) {
      return (
        <Button label='ثبت حواله توسط انباردار' backgroundColor='purple' />
      );
    }
  }
  return <span></span>;
}
