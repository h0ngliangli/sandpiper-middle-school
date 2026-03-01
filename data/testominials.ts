interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Parent of a 7th Grader",
    content: "The teachers at Sandpiper truly care about every child. My son's transition here went so smoothly — he now looks forward to school every day, especially his science class and the robotics club.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: 2,
    name: "David Chen",
    role: "Current 8th Grade Student",
    content: "My favorite part of Sandpiper is the music program. Being in the orchestra gave me so much confidence. The extracurriculars here are amazing — I've learned so much and made great friends who share my interests.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Class of 2023 Honor Alumni",
    content: "My three years at Sandpiper laid a strong foundation for high school. The academic environment is wonderful — my teachers didn't just teach me how to learn, they taught me how to face challenges with confidence.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
  }
];