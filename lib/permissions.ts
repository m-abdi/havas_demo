import { Session } from 'next-auth';
import prisma from '../prisma/client';

export async function canViewRoles(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.viewRole;
}
export async function canViewPlaces(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.viewPlace;
}
export async function canViewPerson(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.viewPerson;
}
export async function canCreateRole(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.createRole;
}
export async function canCreatePerson(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.createPerson;
}
