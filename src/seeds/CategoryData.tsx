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
  {name: 'Sports', icon: <SportsIcon />, selectedIcon: <SelectedSportsIcon />},
  {name: 'Crime', icon: <CrimeIcon />, selectedIcon: <SelectedCrimeIcon />},
  {name: 'Travel', icon: <TravelIcon />, selectedIcon: <SelectedTravelIcon />},
  {name: 'Style', icon: <StyleIcon />, selectedIcon: <SelectedStyleIcon />},
  {
    name: 'Automotive',
    icon: <AutomotiveIcon />,
    selectedIcon: <SelectedAutomotiveIcon />,
  },
];
