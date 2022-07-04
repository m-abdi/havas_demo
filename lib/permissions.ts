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
export async function canViewEquipments(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.viewEquipment;
}
export async function canViewAssets(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.viewAsset;
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
export async function canCreatePlace(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.createPlace;
}
export async function canDeleteRols(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.deleteRole;
}
export async function canDeletePersons(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.deletePerson;
}
export async function canDeleteEquipments(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.deleteEquipment;
}
export async function canDeleteAssets(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.deleteAsset;
}
export async function canDeletePlaces(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.deletePlace;
}
