import AuthenticationRequired from 'src/AuthenticationRequired';
import Persons from 'src/Screens/Persons';
import React from 'react';

export default function persons() {
  return (
    <AuthenticationRequired pageName={'اشخاص'}>
      <Persons data={[]} />
    </AuthenticationRequired>
  );
}
