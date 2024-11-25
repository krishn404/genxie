import React from 'react';
import { ArrowRight, FileText, Edit, Download, Sparkles } from 'lucide-react';

// Assuming AnimatedButton and CardSpotlight are available
import AnimatedButton from '../components/AnimatedButton';
import CardSpotlight from '../components/CardSpotlight';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="relative group p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-3 bg-blue-500/20 rounded-full">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  </div>
);

const DocumentTypeCard = ({ type, description }) => (
  <div className="p-6 bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
    <h3 className="text-xl font-bold text-white mb-2">{type}</h3>
    <p className="text-gray-300 text-sm">{description}</p>
  </div>
);

export default function LandingPage() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Generation",
      description: "Transform your ideas into polished documents in seconds using advanced AI"
    },
    {
      icon: Edit,
      title: "Easy Editing",
      description: "Customize and refine the generated content to match your exact needs"
    },
    {
      icon: Download,
      title: "Export Anywhere",
      description: "Download your documents in multiple formats ready for professional use"
    }
  ];

  const documentTypes = [
    {
      type: "Professional Resumes",
      description: "Stand out with ATS-friendly resumes tailored to your industry"
    },
    {
      type: "Project Synopsis",
      description: "Craft compelling project summaries that capture attention"
    },
    {
      type: "Research Abstracts",
      description: "Generate clear and concise academic abstracts"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-blue-900">
      {/* Hero Section */}
      <div className="relative px-6 lg:px-8 py-24 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-purple-500/20 to-transparent blur-xl"></div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Transform Your Ideas Into
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Professional Documents
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Create polished resumes, synopses, and abstracts in minutes with our AI-powered document generator. Edit and export with ease.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <AnimatedButton
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            Get Started Free <ArrowRight className="w-5 h-5" />
          </AnimatedButton>
          
          
        </div>
        
        <div className="w-full max-w-4xl mx-auto">
          <CardSpotlight />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-white mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Document Types Section */}
      <div className="py-20 px-6 lg:px-8 bg-gradient-to-b from-transparent to-black/30">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Create Any Document Type</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {documentTypes.map((doc, index) => (
            <DocumentTypeCard key={index} {...doc} />
          ))}
        </div>
      </div>
    </div>
  );
}