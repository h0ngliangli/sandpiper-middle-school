import React from 'react';

export interface StatItem {
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
}