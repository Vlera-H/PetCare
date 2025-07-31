import HeroSlideImage1 from './assets/img/dogs/dog-slide-1.png';

import HeroSlideImage2 from './assets/img/dogs/dog-slide-2.png';

import HeroSlideImage3 from './assets/img/dogs/dog-slide-3.png';


import DogCateg1 from './assets/img/dogs/dog-categ-1.png';

import DogCateg2 from './assets/img/dogs/dog-categ-2.png';

import DogCateg3 from './assets/img/dogs/dog-categ-3.png';

import DogCateg4 from './assets/img/dogs/dog-categ-4.png';


import { AiFillYouTube ,  AiFillInstagram ,  AiFillGithub }
 from 'react-icons/ai';

 
export const navigation = [
    {
        name: 'home',
        href: '#',
    },
    {
        name: 'prices',
        href: '#',
    },
    {
        name: 'contact',
        href: '#',
    },
    {
        name: 'get an appointment',
        href: '#',
    },
    {
        name: 'contact',
        href: '#',
    },
];
export const heroSliderData = [
    {
        id: 1,
        image: HeroSlideImage1,
        title: 'Dog Grooming',
        description: 'Professional grooming services for your beloved pets.',
    },
    {
        id: 2,
        image: HeroSlideImage2,
        title: 'Cat Grooming',
        description: 'Gentle and caring grooming for your feline friends.',
    },
    {
        id: 3,
        image: HeroSlideImage3,
        title: 'Pet Spa',
        description: 'Relaxing spa treatments for all types of pets.',
    },
];


export const bundleData = [
  {
    id: 1,
    name: 'Basic Grooming Package',
    services: ['Bath', 'Haircut', 'Nail Trim'],
    price: 40,
    description: 'Essential grooming services for your pet to look and feel great.',
  },
  {
    id: 2,
    name: 'Premium Grooming Package',
    services: ['Bath', 'Haircut', 'Nail Trim', 'Ear Cleaning', 'Teeth Brushing'],
    price: 70,
    description: 'Full grooming experience with extra pampering and care.',
  },
  {
    id: 3,
    name: 'Spa & Wellness Package',
    services: ['Massage', 'Hydrating Bath', 'Hair Treatment', 'Aromatherapy'],
    price: 100,
    description: 'Luxury spa treatments to relax and rejuvenate your pet.',
  },
];

export const social = [
  {
    
    icon: <AiFillYoutube />,
    href: '#',
  },
  {
    id: 2,
    icon: <AiFillInstagram />,
    href: '#',
  },
  {
    id: 3,
    icon: <AiFillGithub />,
    href: '#',
  },
];