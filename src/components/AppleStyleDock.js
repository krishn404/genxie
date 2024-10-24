import React from 'react'; // Ensure React is imported
import {
    HomeIcon,
    Mail,
    ScrollText,
    SunMoon,
} from 'lucide-react';

import { Dock, DockIcon, DockItem, DockLabel } from './dock';

const data = (onThemeToggle) => [
    {
        title: 'Home',
        icon: (
            <HomeIcon className='h-full w-full text-neutral-600 dark:text-neutral-300' />
        ),
        href: '#',
    },
    {
        title: 'New Document',
        icon: (
            <ScrollText className='h-full w-full text-neutral-600 dark:text-neutral-300' />
        ),
        href: '#',
    },
    {
        title: 'Email',
        icon: (
            <Mail className='h-full w-full text-neutral-600 dark:text-neutral-300' />
        ),
        href: '#',
    },
    {
        title: 'Theme',
        icon: (
            <SunMoon className='h-full w-full text-neutral-600 dark:text-neutral-300' />
        ),
        href: '#',
        onClick: onThemeToggle, // Call the toggle function
    },
];

export const AppleStyleDock = ({ onThemeToggle }) => {
    return (
        <div className='absolute bottom-2 left-1/2 max-w-full -translate-x-1/2'>
            <Dock className='items-end pb-3'>
                {data(onThemeToggle).map((item, idx) => (
                    <DockItem
                        key={idx}
                        className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'
                        onClick={item.onClick} // Call onClick when DockItem is clicked
                    >
                        <DockLabel>{item.title}</DockLabel>
                        <DockIcon>{item.icon}</DockIcon>
                    </DockItem>
                ))}
            </Dock>
        </div>
    );
};

export default AppleStyleDock; // Ensure this line is present
