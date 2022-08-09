import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt"

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;
const prisma =
  global.prisma || (typeof window === 'undefined' && new PrismaClient());

if (process.env.NODE_ENV === 'development') global.prisma = prisma;(async () => {
  
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
    // hash salt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('123456', salt);
  await prisma.person.create({
    data: {
      id: '0520926458',
      firstNameAndLastName: 'مهدی عبدی',
      role: { connect: { name: 'مدیریت' } },
      password: hashedPassword,
    },
  });
  await prisma.config.create({
    data: {
      ignoreManagerApproval: true,
      current: true,
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
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'اکسیژن ۴۰ لیتری',
        terminologyCode: 'oxygen_40l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'گاز بیهوشی ۵۰ لیتری',
        terminologyCode: 'bihoshi_50l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'گاز بیهوشی ۴۰ لیتری',
        terminologyCode: 'bihoshi_40l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'شفت ۵۰ لیتری',
        terminologyCode: 'shaft_50l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'شفت ۴۰ لیتری',
        terminologyCode: 'shaft_40l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'شیر کنترل ۵۰ لیتری',
        terminologyCode: 'controlValve_50l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'شیر کنترل ۴۰ لیتری',
        terminologyCode: 'controlValve_40l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'co2 ۵۰ لیتری',
        terminologyCode: 'co2_50l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'co2 ۴۰ لیتری',
        terminologyCode: 'co2_40l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'آرگون ۵۰ لیتری',
        terminologyCode: 'argon_50l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'آرگون ۴۰ لیتری',
        terminologyCode: 'argon_40l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'ازت ۵۰ لیتری',
        terminologyCode: 'azete_50l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'ازت ۴۰ لیتری',
        terminologyCode: 'azete_40l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'هوای خشک ۵۰ لیتری',
        terminologyCode: 'dryAir_50l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'هوای خشک ۴۰ لیتری',
        terminologyCode: 'dryAir_40l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'آنتونکس ۵۰ لیتری',
        terminologyCode: 'entonox_50l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'آنتونکس ۴۰ لیتری',
        terminologyCode: 'entonox_40l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'استیلن ۵۰ لیتری',
        terminologyCode: 'acetylene_50l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'استیلن ۴۰ لیتری',
        terminologyCode: 'acetylene_40l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'گاز مایع ۵۰ لیتری',
        terminologyCode: 'lpg_50l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
      {
        name: 'گاز مایع ۴۰ لیتری',
        terminologyCode: 'lpg_40l',
        serialNumber: 'سریال',
        hasInstructions: false,
        receiving: 0,
        outsourced: 0,
        sending: 0,
      },
    ],
  });
})();
