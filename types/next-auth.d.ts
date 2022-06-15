import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

/** Example on how to extend the built-in session types */
declare module 'next-auth' {
  interface Session {
    /** This is an example. You can find me in types/next-auth.d.ts */
    user: {
      readonly id: string;
      readonly firstName: string;
      readonly lastName: string;
      readonly role: {
        readonly id: string;
        readonly name: string;
        readonly viewPerson: boolean;
        readonly createPerson: boolean;
        readonly editPerson: boolean;
        readonly deletePerson: boolean;
        readonly viewPlace: boolean;
        readonly createPlace: boolean;
        readonly editPlace: boolean;
        readonly deletePlace: boolean;
        readonly viewEquipment: boolean;
        readonly createEquipment: boolean;
        readonly editEquipment: boolean;
        readonly deleteEquipment: boolean;
        readonly viewAsset: boolean;
        readonly createAsset: boolean;
        readonly editAsset: boolean;
        readonly deleteAsset: boolean;
        readonly viewLicense: boolean;
        readonly createLicense: boolean;
        readonly editLicense: boolean;
        readonly deleteLicense: boolean;
        readonly viewTag: boolean;
        readonly createTag: boolean;
        readonly editTag: boolean;
        readonly deleteTag: boolean;
        readonly viewRole: boolean;
        readonly createRole: boolean;
        readonly editRole: boolean;
        readonly deleteRole: boolean;
      };
    };
  }
}

// /** Example on how to extend the built-in types for JWT */
// declare module "next-auth/jwt" {
//   interface JWT {
//     /** This is an example. You can find me in types/next-auth.d.ts */
//     bar: number
//   }
// }
