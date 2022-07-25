import prisma from '../prisma/client';

(async () => {
  await prisma.role.create({
    data: {
      name: 'مدیریت',
      viewRole: true,
      createRole: true,
      editRole: true,
      deleteRole: true,
      viewPerson: true,
      createPerson: true,
      editPerson: true,
      deletePerson: true,
      viewPlace: true,
      createPlace: true,
      editPlace: true,
      deletePlace: true,
      viewEquipment: true,
      createEquipment: true,
      editEquipment: true,
      deleteEquipment: true,
      viewAsset: true,
      createAsset: true,
      editAsset: true,
      deleteAsset: true,
      viewLicense: true,
      createLicense: true,
      editLicense: true,
      deleteLicense: true,
      viewTag: true,
      createTag: true,
      editTag: true,
      deleteTag: true,
    },
  });
  await prisma.person.create({
    data: {
      id: '0520926458',
      firstNameAndLastName: 'مهدی عبدی',
      role: { connect: { name: 'مدیریت' } },
      password: '123456',
    },
  });
  await prisma.process.createMany({
    data: [
      { processName: 'فرایند ورود کپسول به انبار بیمارستان', processNumber: 1 },
      { processName: 'فرایند خروج کپسول از انبار بیمارستان', processNumber: 2 },
    ],
  });
  //   complete it
  await prisma.equipment.createMany({
    data: [
      {
        name: 'اکسیژن ۵۰ لیتری',
        terminologyCode: 'oxygen_50l',
        serialNumber: 'سریال',
        hasInstructions: false,
      },
      {
        name: 'اکسیژن ۴۰ لیتری',
        terminologyCode: 'oxygen_40l',
        serialNumber: 'سریال',
        hasInstructions: false,
      },
    ],
  });
})();