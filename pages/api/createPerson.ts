import { NextApiRequest, NextApiResponse } from 'next';

import bcrypt from 'bcrypt';
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
  } = req?.body;

  // hash salt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(mobileNumber as string, salt);
  try {
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
