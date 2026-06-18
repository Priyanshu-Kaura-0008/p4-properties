export const COMPANY_INFO = {
  companyName: 'P4 Properties',
  tagline: 'Luxury • Legacy • Lifestyle',
  email: 'p4propertiesindia@gmail.com',
  primaryPhone: '+91 8195002006',
  secondaryPhone: '+91 8195002006',
  whatsapp: '918195002006',
  officeAddress: 'UGF 7, Ananta Square, Gazipur Road, Zirakpur, Punjab 140603',
  serviceAreas: ['Chandigarh', 'Mohali', 'Panchkula', 'Kharar', 'Kurali', 'New Chandigarh', 'Rajpura'],
  social: {
    instagram: 'https://www.instagram.com/p4propertiesindia',
    facebook: '',
    linkedin: '',
    youtube: '',
  },
  directors: [
    { name: 'OP Dhiman', phone: '+91 9888010321', whatsapp: '919888010321' },
    { name: 'Priyanshu Kaura', phone: '+91 8195002006', whatsapp: '918195002006' },
    { name: 'Pardeep Garg', phone: '+91 7876746746', whatsapp: '917876746746' },
    { name: 'Pardeep Aggarwal', phone: '+91 7053646975', whatsapp: '917053646975' },
  ],
};

export const CONTACT_LINKS = {
  phone: `tel:${COMPANY_INFO.primaryPhone.replace(/\s/g, '')}`,
  secondaryPhone: `tel:${COMPANY_INFO.secondaryPhone.replace(/\s/g, '')}`,
  email: `mailto:${COMPANY_INFO.email}`,
  whatsapp: `https://wa.me/${COMPANY_INFO.whatsapp}`,
};
