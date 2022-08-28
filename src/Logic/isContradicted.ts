import { Workflow } from 'lib/resolvers-types';

export default function isContradicted(type: 'ENTER' | 'EXIT', data: Workflow) {
  if (type === 'ENTER') {
    return data?.passedStages?.[1]?.havaleh?.contradiction;
  } else if (type === 'EXIT') {
    console.log(data?.passedStages?.[3]?.havaleh);
    
    return (
      data?.passedStages?.[3]?.havaleh?.contradiction
    );
  }
}
