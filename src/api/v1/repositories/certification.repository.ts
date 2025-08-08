import { Certification } from '@v1/interfaces/certification.interface';
import { v4 as uuidv4 } from 'uuid';

let certifications: Certification[] = [];

export default {
  getByUserId: (userId: string): Certification[] => certifications.filter(c => c.userId === userId),
  create: (userId: string, skill: string): Certification => {
    const cert: Certification = { id: uuidv4(), userId, skill, issuedAt: new Date() };
    certifications.push(cert);
    return cert;
  },
};
