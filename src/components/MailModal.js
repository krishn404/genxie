// MailModal.js
import React, { useState } from 'react';

const MailModal = ({ isOpen, onClose, message, documentType }) => {
    const [emailDetails, setEmailDetails] = useState({
        recipient: '',
        subject: '',
    });

    if (!isOpen) return null;

    // Generate mailto link based on document type
    const generateMailToLink = () => {
        const { recipient, subject } = emailDetails;
        const fileAttachmentUrl = generateFileAttachmentUrl(documentType); // URL for the document attachment
        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=Please find the attached ${documentType} document.%0A%0A${fileAttachmentUrl}`;
        return mailtoLink;
    };

    // Mock function to generate file URL for attachment
    const generateFileAttachmentUrl = (type) => {
        // Normally you would upload your file somewhere and generate the URL.
        // For example, you could generate a link to Google Drive or another cloud service
        return `https://www.example.com/attachments/my-document.${type}`; // Just an example, use real file URL
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Email Document</h2>
                <p className="text-sm text-gray-600 mb-6">{message}</p>

                <form className="space-y-6">
                    {/* Document Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Document Type</label>
                        <select
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                            onChange={(e) => setEmailDetails({ ...emailDetails, documentType: e.target.value })}
                        >
                            <option value="docx">DOCX</option>
                            <option value="pdf">PDF</option>
                        </select>
                    </div>

                    {/* Recipient Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Recipient Email</label>
                        <input
                            type="email"
                            value={emailDetails.recipient}
                            onChange={(e) => setEmailDetails({ ...emailDetails, recipient: e.target.value })}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                            placeholder="recipient@example.com"
                        />
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subject</label>
                        <input
                            type="text"
                            value={emailDetails.subject}
                            onChange={(e) => setEmailDetails({ ...emailDetails, subject: e.target.value })}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                            placeholder="Email Subject"
                        />
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-300 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-400 transition duration-150 ease-in-out"
                        >
                            Close
                        </button>

                        {/* Send Email Button */}
                        <a
                            href={generateMailToLink()} // This will open Gmail with pre-filled details
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition duration-150 ease-in-out"
                        >
                            Send Email
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MailModal;
