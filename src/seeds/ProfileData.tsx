import React from 'react';
import {HelpIcon, InfoIcon} from '../assets/icons';
import {IProfileBottomCard} from '../typings/common';

export const ProfileData: IProfileBottomCard[] = [
  {
    title: 'Help Center',
    icon: <HelpIcon />,
  },
  {
    title: 'Info Apps',
    icon: <InfoIcon />,
  },
];
