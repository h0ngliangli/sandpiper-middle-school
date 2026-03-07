import React from 'react';

export interface ByTheNumberItem {
  id: string;
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface SectionContent {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  reverse?: boolean; // If true, image is on left, text on right
  ctaText?: string;
  ctaLink?: string;
}

export interface LinkItem {
  id: string;
  label: string;
  url: string;
  icon: React.ReactNode;
  description?: string; // Optional description for the link
}

export interface SchoolEvent {
  id: string;
  title: string;
  summary: string; // Short blurb for the card
  description: string; // Full detail shown in the modal
  eventDate: string; // ISO date string (YYYY-MM-DD) — when the event happens
  expirationDate: string; // ISO date string — after this date the event is "past" and won't appear in Recent News
  category: string; // e.g. "Academic", "Sports", "Community", "Arts"
  imageUrl?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

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

export interface Testimonial {
  id: number;
  name?: string;
  role: string;
  content: string;
  avatar?: string;
}