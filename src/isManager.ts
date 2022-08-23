import { Session } from 'next-auth';

export default function isManager(session: Session): boolean {
  return Boolean(session?.user?.role?.name === 'مدیریت');
}
