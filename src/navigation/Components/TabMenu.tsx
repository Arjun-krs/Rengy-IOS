import React from 'react';
import { HomeIcon, CalculateIcon, InstallIcon, RequestIcon, ArVrIcon } from '../../utils/svgSrc';

export const FOOTER_MENU = [
    {
        name: 'Home',
        key: 'home',
        activeIcon: <HomeIcon color='#148057' />,
        icon: <HomeIcon color='#67606E' />
    },
    {
        name: 'Calculate',
        key: 'calculate',
        activeIcon: <CalculateIcon color='#148057' />,
        icon: <CalculateIcon color='#67606E' />
    },
    {
        name: 'Get Installation',
        key: 'get_installation',
        activeIcon: <InstallIcon color='#148057' />,
        icon: <InstallIcon color='#67606E' />
    },
    {
        name: 'My Request',
        key: 'myrequest',
        activeIcon: <RequestIcon color='#148057' />,
        icon: <RequestIcon color='#67606E' />
    },
    {
        name: 'AR/VR',
        key: 'arvr',
        activeIcon: <ArVrIcon color='#148057' />,
        icon: <ArVrIcon color='#67606E' />
    },
]