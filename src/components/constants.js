import { icons } from './icons';

export const sectionTypes = {
  experience: { title: 'Опыт работы', icon: icons.experience, color: 'primary' },
  education: { title: 'Образование', icon: icons.education, color: 'secondary' },
  skills: { title: 'Навыки', icon: icons.skills, color: 'success' },
  certificates: { title: 'Сертификаты', icon: icons.certificates, color: 'warning' },
  about: { title: 'О себе', icon: icons.about, color: 'info' },
};

export const personalInfoTemplate = {
  id: 'personal',
  type: 'personal',
  data: {
    name: '',
    position: '',
    email: '',
    phone: '',
    city: '',
    description: '',
  }
};

export function getDefaultData(type) {
  switch (type) {
    case 'experience':
      return {
        position: '',
        company: '',
        period: '',
        description: '',
      };
    case 'education':
      return {
        institution: '',
        specialty: '',
        period: '',
        additionalInfo: 'Опишите изученные предметы, достижения, дипломную работу...'
      };
    case 'skills':
      return { skills: [''] };
    case 'certificates':
      return {
        name: '',
        issuer: '',
        date: '',
        description: '',
      };
    case 'about':
      return { text: 'Расскажите о себе' };
    default:
      return {};
  }
}