import React from 'react';
import {
  AutomotiveIcon,
  CrimeIcon,
  SelectedAutomotiveIcon,
  SelectedCrimeIcon,
  SelectedSportsIcon,
  SelectedStyleIcon,
  SelectedTravelIcon,
  SportsIcon,
  StyleIcon,
  TravelIcon,
} from '../assets/icons';
import {ICategoryType} from '../typings/common';

export const CategoryType: ICategoryType[] = [
  {name: 'All', icon: <SportsIcon />, selectedIcon: <SelectedSportsIcon />},
  {name: 'General', icon: <StyleIcon />, selectedIcon: <SelectedStyleIcon />},
  {name: 'Sports', icon: <SportsIcon />, selectedIcon: <SelectedSportsIcon />},
  {name: 'Business', icon: <StyleIcon />, selectedIcon: <SelectedStyleIcon />},
  {name: 'Crime', icon: <CrimeIcon />, selectedIcon: <SelectedCrimeIcon />},
  {name: 'Travel', icon: <TravelIcon />, selectedIcon: <SelectedTravelIcon />},
  {
    name: 'Automotive',
    icon: <AutomotiveIcon />,
    selectedIcon: <SelectedAutomotiveIcon />,
  },
];
