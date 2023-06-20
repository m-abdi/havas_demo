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
export async function canViewLicenses(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.viewLicense;
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
export async function canCreateEquipment(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.createEquipment;
}
export async function canCreateAsset(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.createAsset;
}
export async function canCreateTags(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.createTag;
}
export async function canCreateLicense(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.createLicense;
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
export async function canDeleteLicenses(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.deleteLicense;
}
export async function canEditAssets(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session?.user?.id,
    },
    include: { role: true },
  });
  return user?.role.editAsset;
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
export async function canCreateEnterDeliverExit(session: Session) {
  const user = await prisma.person.findFirst({
    where: {
      id: session.user.id,
    },
    include: { role: true },
  });
  return user?.role.createEnterDeliverExit;
}
