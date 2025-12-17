"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [features, setFeatures] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formType, setFormType] = useState<"waitlist" | "features" | null>(null);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const stepElements = document.querySelectorAll('.timeline-step');
      const windowHeight = window.innerHeight;
      const newVisibleSteps: number[] = [];

      stepElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Trigger when element is 70% visible in viewport
        if (elementTop < windowHeight * 0.7 && elementTop + elementHeight > 0) {
          newVisibleSteps.push(index);
        }
      });

      setVisibleSteps(newVisibleSteps);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent, type: "waitlist" | "features") => {
    e.preventDefault();
    
    try {
      const payload = {
        email: email,
        feature_requested: type === "features" ? features : ""
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://expattaxbot-backend-874973878804.us-east1.run.app';
      const response = await fetch(`${apiUrl}/join_wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log(`Successfully submitted ${type}:`, payload);
        setSubmitted(true);
        setFormType(type);
        setTimeout(() => {
          setSubmitted(false);
          setEmail("");
          setFeatures("");
          setFormType(null);
        }, 3000);
      } else {
        console.error('Failed to submit:', await response.text());
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="ExpatTaxBot Logo"
                width={40}
                height={40}
                className="rounded-lg bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Expat<span className="text-amber-700 dark:text-amber-600">Tax</span>Bot
              </span>
            </div>
            <div className="hidden md:flex gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">How It Works</a>
              <a href="#waitlist" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Join Waitlist</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            AI-Powered Expat Tax Automation
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Simplify Expat Tax
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Prep for CPAs
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Parse and prepare complex expat tax returns with AI. Process Form 1040, FBARs for multiple sources with unprecedented accuracy and speed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#waitlist"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              Join the Waitlist
            </a>
            <a
              href="#features"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features for CPAs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Built specifically for tax professionals handling complex expat taxation
            </p>
          </div>

          <div className="space-y-4">
            {/* Feature 1: Blueprint Extraction */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 1 ? null : 1)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Smart Document Blueprint Extraction
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      AI automatically extracts and maps data from international tax documents
                    </p>
                  </div>
                </div>
                <div className={`ml-4 transform transition-transform duration-200 ${expandedFeature === 1 ? 'rotate-45' : ''}`}>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${expandedFeature === 1 ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 pb-5 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our AI engine intelligently processes Form 1040, schedules, foreign tax returns like T1 (Canada), UK SA100, and other international tax documents with precision field recognition.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Intelligent field mapping across multiple document formats</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Support for 20+ international tax form types</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Real-time validation and error detection</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Feature 2: Accuracy */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 hover:border-green-300 dark:hover:border-green-700 transition-all">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 2 ? null : 2)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      99.9% Accuracy Guarantee
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      AI models trained on millions of tax documents ensure precision
                    </p>
                  </div>
                </div>
                <div className={`ml-4 transform transition-transform duration-200 ${expandedFeature === 2 ? 'rotate-45' : ''}`}>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${expandedFeature === 2 ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 pb-5 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Advanced machine learning models ensure precise data extraction, calculation accuracy, and full compliance with IRS regulations and international tax treaties.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Continuous learning from CPA feedback and corrections</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Multi-layer validation against tax law databases</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Automated cross-referencing and consistency checks</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Feature 3: Multi-Country Support */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 3 ? null : 3)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Multi-Country Support
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Process tax documents from India, Canada, UK, Australia, and more
                    </p>
                  </div>
                </div>
                <div className={`ml-4 transform transition-transform duration-200 ${expandedFeature === 3 ? 'rotate-45' : ''}`}>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${expandedFeature === 3 ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 pb-5 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Seamlessly handle foreign tax credit calculations, treaty benefits, and multi-jurisdiction compliance requirements for expat clients worldwide.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Automatic currency conversion with historical rates</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Tax treaty optimization and benefit analysis</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Foreign earned income exclusion calculations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Feature 4: Client Portal */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 hover:border-orange-300 dark:hover:border-orange-700 transition-all">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 4 ? null : 4)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Interactive Client Portal
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Branded questionnaires with AI-powered personalization
                    </p>
                  </div>
                </div>
                <div className={`ml-4 transform transition-transform duration-200 ${expandedFeature === 4 ? 'rotate-45' : ''}`}>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${expandedFeature === 4 ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 pb-5 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Create branded web questionnaires that intelligently adapt to each client's unique situation, collecting exactly the information you need.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Dynamic question flow based on client responses</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Secure document upload and e-signature integration</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Progress tracking and automated reminders</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Feature 5: Year-over-Year Intelligence */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 hover:border-cyan-300 dark:hover:border-cyan-700 transition-all">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 5 ? null : 5)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Year-over-Year Intelligence
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      AI identifies carryforwards, patterns, and optimization opportunities
                    </p>
                  </div>
                </div>
                <div className={`ml-4 transform transition-transform duration-200 ${expandedFeature === 5 ? 'rotate-45' : ''}`}>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${expandedFeature === 5 ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 pb-5 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Upload previous year returns and let AI automatically identify carryforwards, detect changes in client circumstances, and suggest tax-saving opportunities.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Automatic NOL and credit carryforward tracking</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Change detection alerts for residency and income sources</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Trend analysis for proactive tax planning</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Feature 6: FBAR & Compliance */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 hover:border-red-300 dark:hover:border-red-700 transition-all">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 6 ? null : 6)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      FBAR & Compliance Automation
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Never miss critical filing obligations with automated compliance
                    </p>
                  </div>
                </div>
                <div className={`ml-4 transform transition-transform duration-200 ${expandedFeature === 6 ? 'rotate-45' : ''}`}>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${expandedFeature === 6 ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 pb-5 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Automated FBAR preparation and filing with real-time validation against IRS rules, FATCA compliance, and tax treaty provisions.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Automatic FBAR threshold monitoring and alerts</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Form 8938, 5471, 8621 preparation support</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Real-time compliance deadline tracking</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Simple, fast, and intelligent workflow in 4 easy steps
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-indigo-200 to-purple-200 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-800 transform md:-translate-x-1/2"></div>

            {/* Step 1: Upload Documents */}
            <div className={`timeline-step relative mb-24 transition-all duration-1000 ${
              visibleSteps.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg z-10 border-4 border-white dark:border-gray-900">
                  1
                </div>

                {/* Content - alternating sides on desktop */}
                <div className="md:w-1/2 md:pr-16 ml-20 md:ml-0 md:text-right">
                  <div className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-blue-100 dark:border-blue-900 transition-all duration-700 delay-200 ${
                    visibleSteps.includes(0) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}>
                    <div className="inline-block p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4">
                      <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      Upload Documents
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Simply drag and drop or upload your client&apos;s tax documents including:
                    </p>
                    <ul className="text-left md:text-right space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex md:flex-row-reverse items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Form 1040 and all schedules</span>
                      </li>
                      <li className="flex md:flex-row-reverse items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Foreign tax returns (T1, UK SA100, etc.)</span>
                      </li>
                      <li className="flex md:flex-row-reverse items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Bank statements and financial records</span>
                      </li>
                      <li className="flex md:flex-row-reverse items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Previous year returns for reference</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            </div>

            {/* Step 2: AI Blueprint Selection */}
            <div className={`timeline-step relative mb-24 transition-all duration-1000 ${
              visibleSteps.includes(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg z-10 border-4 border-white dark:border-gray-900">
                  2
                </div>

                {/* Content - right side on desktop */}
                <div className="hidden md:block md:w-1/2"></div>
                <div className="md:w-1/2 md:pl-16 ml-20 md:ml-0">
                  <div className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-indigo-100 dark:border-indigo-900 transition-all duration-700 delay-200 ${
                    visibleSteps.includes(1) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}>
                    <div className="inline-block p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mb-4">
                      <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      AI Blueprint Selection
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Our advanced AI engine automatically:
                    </p>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Identifies document types and tax jurisdictions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Selects optimal extraction blueprint for each form</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Maps fields intelligently across different formats</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Validates data against IRS requirements</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                      <p className="text-sm text-indigo-900 dark:text-indigo-200">
                        <strong>Pro Tip:</strong> You maintain full control and can adjust blueprint selections if needed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Worksheet Generation */}
            <div className={`timeline-step relative mb-24 transition-all duration-1000 ${
              visibleSteps.includes(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg z-10 border-4 border-white dark:border-gray-900">
                  3
                </div>

                {/* Content - left side on desktop */}
                <div className="md:w-1/2 md:pr-16 ml-20 md:ml-0 md:text-right">
                  <div className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-purple-100 dark:border-purple-900 transition-all duration-700 delay-200 ${
                    visibleSteps.includes(2) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}>
                    <div className="inline-block p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg mb-4">
                      <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      Intelligent Worksheet Generation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Watch as AI prepares comprehensive tax worksheets with:
                    </p>
                    <ul className="text-left md:text-right space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex md:flex-row-reverse items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>All extracted income, deductions, and credits</span>
                      </li>
                      <li className="flex md:flex-row-reverse items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Foreign tax credit calculations and limitations</span>
                      </li>
                      <li className="flex md:flex-row-reverse items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>FBAR data organized and validated</span>
                      </li>
                      <li className="flex md:flex-row-reverse items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Treaty benefits automatically applied</span>
                      </li>
                      <li className="flex md:flex-row-reverse items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Cross-referenced with prior year data</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-left md:text-right">
                      <p className="text-sm text-purple-900 dark:text-purple-200">
                        <strong>99.9% Accuracy:</strong> Machine learning models trained on millions of tax documents
                      </p>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            </div>

            {/* Step 4: Export & File */}
            <div className={`timeline-step relative transition-all duration-1000 ${
              visibleSteps.includes(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg z-10 border-4 border-white dark:border-gray-900">
                  4
                </div>

                {/* Content - right side on desktop */}
                <div className="hidden md:block md:w-1/2"></div>
                <div className="md:w-1/2 md:pl-16 ml-20 md:ml-0">
                  <div className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-pink-100 dark:border-pink-900 transition-all duration-700 delay-200 ${
                    visibleSteps.includes(3) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}>
                    <div className="inline-block p-3 bg-pink-100 dark:bg-pink-900/30 rounded-lg mb-4">
                      <svg className="w-8 h-8 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      Export & File
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Seamlessly integrate with your existing workflow:
                    </p>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Export to Excel, PDF, or CSV format</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Direct integration with ProSeries, Lacerte, Drake</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>One-click FBAR e-filing preparation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Automated audit trail and documentation</span>
                      </li>
                    </ul>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg">
                        <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">10x</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Faster Processing</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg">
                        <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">80%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Time Savings</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className={`text-center mt-20 transition-all duration-1000 ${
            visibleSteps.includes(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-block p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Ready to transform your expat tax practice?
              </p>
              <a
                href="#waitlist"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                Join the Waitlist Today
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join the Waitlist
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Be among the first CPAs to revolutionize your expat tax practice. 
            Limited early access spots available.
          </p>

          {submitted && formType === "waitlist" ? (
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 text-white">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
              <p>You&apos;ve been added to our waitlist. We&apos;ll be in touch soon!</p>
            </div>
          ) : (
            <form onSubmit={(e) => handleSubmit(e, "waitlist")} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
                >
                  Join Waitlist
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 flex justify-center gap-8 text-white/80">
            <div>
              <div className="text-3xl font-bold">10+</div>
              <div className="text-m">CPAs Interested</div>
            </div>
            <div>
              <div className="text-3xl font-bold">2026 Tax Session</div>
              <div className="text-m">Beta Launch</div>
            </div>
            <div>
              <div className="text-3xl font-bold">50%</div>
              <div className="text-m">Early Access Discount</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Request Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Help Shape the Future
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Tell us what features matter most to your practice
            </p>
          </div>

          {submitted && formType === "features" ? (
            <div className="bg-white dark:bg-gray-900 rounded-lg p-8 text-center shadow-xl">
              <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
              <p className="text-gray-600 dark:text-gray-300">Your feedback helps us build a better product!</p>
            </div>
          ) : (
            <form onSubmit={(e) => handleSubmit(e, "features")} className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-xl">
              <div className="mb-6">
                <label htmlFor="feature-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="feature-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="feature-request" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What features would you like to see?
                </label>
                <textarea
                  id="feature-request"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about specific countries, document types, integrations, or workflows you need..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
              >
                Submit Feature Request & Join Waitlist
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image
              src="/logo.png"
              alt="ExpatTaxBot Logo"
              width={32}
              height={32}
              className="rounded-lg bg-gray-800"
            />
            <span className="text-xl font-bold text-white">
              Expat<span className="text-amber-500">Tax</span>Bot
            </span>
          </div>
          <p className="mb-4">AI-powered expat taxation automation for CPAs</p>
          <p className="text-sm text-gray-500">
            © 2025 ExpatTaxBot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
