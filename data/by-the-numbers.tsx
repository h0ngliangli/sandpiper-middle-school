import { Users, Trophy, SmilePlus, Bot } from 'lucide-react';
import { ByTheNumberItem } from '../types';

export const byTheNumberItems: ByTheNumberItem[] = [
  { id: '1', label: 'Student-Teacher Ratio', value: '15:1', icon: <Users className="h-8 w-8 text-sandpiper-gold" /> },
  { id: '2', label: 'Student Clubs', value: '10+', icon: <Bot className="h-8 w-8 text-sandpiper-gold" /> },
  { id: '3', label: 'Sport Teams', value: '6', icon: <Trophy className="h-8 w-8 text-sandpiper-gold" /> },
  { id: '4', label: 'Student Satisfaction', value: '90%', icon: <SmilePlus className="h-8 w-8 text-sandpiper-gold" /> },
];
