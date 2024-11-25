'use client';

import React, { useState } from 'react';
import { HomeIcon, Mail, ScrollText } from 'lucide-react';
import { useRouter } from 'next/router'; // For routing to landing page
import { motion } from 'framer-motion';
import MailModal from './MailModal'; // Import the MailModal component
import Modal from './Modal'; // Import the ConfirmationModal component

const Navbar = () => {
    const router = useRouter();
    const [isMailModalOpen, setIsMailModalOpen] = useState(false); // State to manage the mail modal visibility
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // State for confirmation modal visibility

    // Data for the Navbar items
    const data = [
        {
            title: 'Home',
            icon: <HomeIcon className='h-6 w-6 text-black' />,
            href: '/LandingPage', // Path to your landing page
        },
        {
            title: 'New Document',
            icon: <ScrollText className='h-6 w-6 text-black' />,
            href: '#', // Link for New Document (placeholder)
            onClick: () => setIsConfirmationModalOpen(true) // Open the confirmation modal when clicked
        },
        {
            title: 'Email',
            icon: <Mail className='h-6 w-6 text-black' />,
            href: '#', // Link for Email (placeholder)
            onClick: () => setIsMailModalOpen(true) // Open the mail modal when clicked
        },
    ];

    // Handle navigation
    const handleNavigation = (href) => {
        if (href.startsWith('/')) {
            router.push(href); // Navigate to internal route like '/LandingPage'
        } else {
            window.location.href = href; // External link or anchor
        }
    };

    // Handle confirmation of new document (hard refresh)
    const handleConfirmNewDocument = () => {
        window.location.reload(); // Hard refresh the page
    };

    // Handle closing of the confirmation modal
    const handleCloseConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };

    // Handle closing of the mail modal
    const handleCloseMailModal = () => {
        setIsMailModalOpen(false);
    };

    return (
        <>
            <motion.div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 py-2 px-4 bg-black backdrop-blur-lg rounded-full shadow-lg flex items-center space-x-4 z-50">
                {data.map((item, idx) => (
                    <motion.div
                        key={idx}
                        className='relative flex items-center justify-center cursor-pointer group'
                        onClick={() => {
                            if (item.onClick) {
                                item.onClick(); // If there's an onClick handler, call it
                            } else {
                                handleNavigation(item.href); // Otherwise navigate
                            }
                        }} // Trigger navigation or show modal
                        whileHover={{ scale: 1.2 }} // Hover effect to scale up the icon
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <div className="flex items-center justify-center p-2 rounded-full bg-white hover:bg-gray-600 transition-all">
                            {item.icon}
                        </div>
                        {/* Tooltip above the icon */}
                        <div className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-white py-1 px-2 bg-black/60 rounded-md whitespace-nowrap">
                            {item.title}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Confirmation Modal for New Document */}
            <Modal
                isOpen={isConfirmationModalOpen}
                onClose={handleCloseConfirmationModal}
                onConfirm={handleConfirmNewDocument}
                message="You want to discard this document and open a new one?"
            />

            {/* Mail Modal */}
            <MailModal
                isOpen={isMailModalOpen}
                onClose={handleCloseMailModal}
                message="Fill out the form below to send the document via email."
            />
        </>
    );
};

export default Navbar;
