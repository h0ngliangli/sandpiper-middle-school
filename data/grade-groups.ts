export interface RoomParent {
  name: string;
  imageUrl?: string;
}

export interface GradeGroup {
  grade: number;
  whatsappUrl: string;
  groupImageUrl: string;
  roomParents: RoomParent[];
}

export const gradeGroups: GradeGroup[] = [
  {
    grade: 6,
    whatsappUrl: 'https://chat.whatsapp.com/Is1VLr3bIXl6vrRui4roYi',
    groupImageUrl: '/images/whatsapp-group-6.jpg',
    roomParents: [
      { name: 'Yi Wang' },
      { name: 'Manique Bloom' },
    ],
  },
  {
    grade: 7,
    whatsappUrl: 'https://chat.whatsapp.com/ETnpOob0pYmJBgFGx29fFi',
    groupImageUrl: '/images/whatsapp-group-7.jpg',
    roomParents: [
      { name: 'Ying Wang' },
    ],
  },
  {
    grade: 8,
    whatsappUrl: 'https://chat.whatsapp.com/C6FRRvNQ7j0J9Jo3osQA4o',
    groupImageUrl: '/images/whatsapp-group-8.jpg',
    roomParents: [
      { name: 'Reiko Medina' },
      { name: 'Manique Bloom' },
    ],
  },
];
