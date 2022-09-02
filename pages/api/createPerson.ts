import { NextApiRequest, NextApiResponse } from 'next';
import { canCreatePerson, canCreatePlace } from 'lib/permissions';

import bcrypt from 'bcrypt';
import { getSession } from 'next-auth/react';
import prisma from '../../prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const {
    id,
    firstNameAndLastName,
    placeId,
    roleId,
    address,
    state,
    city,
    postalCode,
    telephone,
    mobileNumber,
    website,
    newPlace,
  } = req?.body;
  const session = await getSession({ req });
  if (!session || !(await canCreatePerson(session))) {
    return res.status(401);
  }
  // hash salt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(mobileNumber as string, salt);
  try {
    if (newPlace) {
      if (!session || !(await canCreatePlace(session))) {
        return res.status(401);
      }
      const createdPlace = prisma.place.create({
        data: {
          name: newPlace?.name,
          typeOfWork: newPlace?.typeOfWork,
          state: newPlace?.state,
          city: newPlace?.city,
          postalCode: newPlace?.postalCode,
          address: newPlace?.address,
          telephone: newPlace?.telephone,
          mobileNumber: newPlace?.mobileNumber,
          website: newPlace?.website,
          nationalId: newPlace?.nationalId,
          economicalCode: newPlace?.economicalCode,
          registeredNumber: newPlace?.registeredNumber,
          description: newPlace?.description,
        },
      });
      const createdPerson = prisma.person.create({
        data: {
          id: id as string,
          firstNameAndLastName: firstNameAndLastName,
          password: telephone as string,
          place: { connect: { name: newPlace?.name } },
          role: { connect: { id: roleId } },
          address: address,
          state: state,
          city: city,
          postalCode: postalCode,
          telephone: telephone,
          mobileNumber: mobileNumber,
          website: website,
        },
      });
      const connectedPlaceToPerson = prisma.place.update({
        where: { name: newPlace?.name },
        data: {
          representative: { connect: { id: id as string } },
        },
      });
      const transaction = await prisma.$transaction([
        createdPlace,
        createdPerson,
        connectedPlaceToPerson,
      ]);
      console.log(transaction[2]);
      return res.status(201).json(transaction?.[1]);
    }
    const createdPerson = await prisma.person.create({
      data: {
        id,
        firstNameAndLastName,
        password: hashedPassword,
        place: { connect: { id: placeId } },
        role: { connect: { id: roleId } },
        address,
        state,
        city,
        postalCode,
        telephone,
        mobileNumber,
        website,
      },
    });
    return res.status(201).json(createdPerson);
  } catch (e: any) {
    return res.status(500).send(e?.message ?? 'database connection error');
  }
}
