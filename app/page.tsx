"use client";

import React, { useState, useEffect, useRef } from "react";
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
        body: JSON.stringify(payload),
        mode: 'cors',
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
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        alert('Unable to connect to server. Please check your connection or try again later.');
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-900 dark:to-green-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Image
                src="/full_logo.svg"
                alt="ExpatTaxBot"
                width={205}
                height={40}
                className="object-contain"
                priority
              />
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
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-green-100/20 dark:from-green-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10" id="hero">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-sm font-medium text-green-700 dark:text-green-300 mb-8 border border-green-200 dark:border-green-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1D9746]"></span>
            </span>
            The Future of International Tax Prep
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
            Simplify Expat Tax Prep with AI
            <br />
            <span className="bg-gradient-to-r from-[#1D9746] via-emerald-600 to-[#1D9746] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
              Master FETE, FTC, and FBARs in Minutes.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            AI extracts T1, SA100, 1040s + auto FTC, treaties, carryforwards.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="#waitlist"
              className="group relative px-8 py-4 bg-[#1D9746] text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/25 hover:-translate-y-0.5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:animate-shimmer"></div>
              Join Waitlist
            </a>
            <a
              href="#features"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-bold border-2 border-gray-200 dark:border-gray-700 hover:border-[#1D9746] dark:hover:border-[#1D9746] transition-all"
            >
              See Features
            </a>
          </div>
        </div>
      </section>

      {/* USP Comparison Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950" id="comparison">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why CPAs Choose ExpatTaxBot
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The only platform built from the ground up for global tax complexity.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl">
            <table className="w-full text-left border-collapse bg-white dark:bg-gray-900">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <th className="px-6 py-5 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Feature</th>
                  <th className="px-6 py-5 text-sm font-bold text-[#1D9746] dark:text-green-400 uppercase tracking-wider border-x border-gray-100 dark:border-gray-800 bg-green-50/30 dark:bg-green-900/10 text-center">ExpatTaxBot</th>
                  <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">Standard Tax Software (e.g., UltraTax CS, TurboTax)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[
                  {
                    feature: "Foreign Document Extraction (T1, SA100)",
                    bot: "AI-optimized for all formats",
                    standard: "Limited to US forms"
                  },
                  {
                    feature: "FTC & Treaty Benefits",
                    bot: "Automated calculations & compliance",
                    standard: "Manual or basic support"
                  },
                  {
                    feature: "Year-Over-Year Carryforwards",
                    bot: "AI detects from prior returns",
                    standard: "Requires manual input"
                  },
                  {
                    feature: "FBAR Preparation",
                    bot: "Full automation & FATCA validation",
                    standard: "Add-on or extra cost"
                  },
                  {
                    feature: "Smart Questionnaires",
                    bot: "Adaptive, branded client intake",
                    standard: "Generic forms"
                  }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-6 font-medium text-gray-900 dark:text-white">{row.feature}</td>
                    <td className="px-6 py-6 text-center border-x border-gray-100 dark:border-gray-800 bg-green-50/10 dark:bg-green-900/5">
                      <div className="inline-flex items-center gap-2 text-[#1D9746] dark:text-green-400 font-semibold">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {row.bot}
                      </div>
                    </td>
                    <td className="px-6 py-6 text-gray-500 dark:text-gray-400 italic text-center">{row.standard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
              Precision-Engineered for CPAs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Everything you need to master international taxation without the manual overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Global Document Mastery */}
            <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-[#1D9746] dark:hover:border-[#1D9746] transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-[#1D9746] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Global Document Mastery</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                While others stop at the 1040, we master the complexity. Handles foreign returns (T1, SA100) that domestic software simply ignores.
              </p>
            </div>

            {/* FTC & Treaty Automation */}
            <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">FTC & Treaty Automation</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Ensures 100% compliance across jurisdictions. Automatically calculates foreign tax credits and applies treaty benefits with surgical precision.
              </p>
            </div>

            {/* Carryforward Intelligence */}
            <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Carryforward Intelligence</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Stop digging through old PDFs. Our AI analyzes prior year returns to automatically detect and apply carryforwards for maximum tax savings.
              </p>
            </div>

            {/* FBAR Streamlining */}
            <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-lime-500 dark:hover:border-lime-500 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 bg-lime-100 dark:bg-lime-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-lime-600 dark:text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">FBAR Streamlining</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                End-to-end preparation with real-time checks. Automated FATCA validation ensures your clients never face costly filing mistakes.
              </p>
            </div>

            {/* Planned Questionnaires */}
            <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Planned Questionnaires</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Client-specific, adaptive intake flows. Brand your practice with smart questionnaires that adjust dynamically to each client situation.
              </p>
            </div>

            {/* Smart Currency Logic */}
            <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Smart Currency Logic</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Automatically handles complex multi-currency conversions using historical exchange rates for 100% precision across all schedules.
              </p>
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
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-200 via-emerald-200 to-teal-200 dark:from-green-800 dark:via-emerald-800 dark:to-teal-800 transform md:-translate-x-1/2"></div>

            {/* Step 1: Upload Documents */}
            <div className={`timeline-step relative mb-24 transition-all duration-1000 ${visibleSteps.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-[#1D9746] to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg z-10 border-4 border-white dark:border-gray-900">
                  1
                </div>

                {/* Content - alternating sides on desktop */}
                <div className="md:w-1/2 md:pr-16 ml-20 md:ml-0 md:text-right">
                  <div className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-green-100 dark:border-green-900 transition-all duration-700 delay-200 ${visibleSteps.includes(0) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}>
                    <div className="inline-block p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mb-4">
                      <svg className="w-8 h-8 text-[#1D9746] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className={`timeline-step relative mb-24 transition-all duration-1000 ${visibleSteps.includes(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg z-10 border-4 border-white dark:border-gray-900">
                  2
                </div>

                {/* Content - right side on desktop */}
                <div className="hidden md:block md:w-1/2"></div>
                <div className="md:w-1/2 md:pl-16 ml-20 md:ml-0">
                  <div className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-emerald-100 dark:border-emerald-900 transition-all duration-700 delay-200 ${visibleSteps.includes(1) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}>
                    <div className="inline-block p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg mb-4">
                      <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <p className="text-sm text-emerald-900 dark:text-emerald-200">
                        <strong>Pro Tip:</strong> You maintain full control and can adjust blueprint selections if needed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Worksheet Generation */}
            <div className={`timeline-step relative mb-24 transition-all duration-1000 ${visibleSteps.includes(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg z-10 border-4 border-white dark:border-gray-900">
                  3
                </div>

                {/* Content - left side on desktop */}
                <div className="md:w-1/2 md:pr-16 ml-20 md:ml-0 md:text-right">
                  <div className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-teal-100 dark:border-teal-900 transition-all duration-700 delay-200 ${visibleSteps.includes(2) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}>
                    <div className="inline-block p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg mb-4">
                      <svg className="w-8 h-8 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <div className="mt-4 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg text-left md:text-right">
                      <p className="text-sm text-teal-900 dark:text-teal-200">
                        <strong>99.9% Accuracy:</strong> Machine learning models trained on millions of tax documents
                      </p>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            </div>

            {/* Step 4: Export & File */}
            <div className={`timeline-step relative transition-all duration-1000 ${visibleSteps.includes(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-lime-500 to-lime-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg z-10 border-4 border-white dark:border-gray-900">
                  4
                </div>

                {/* Content - right side on desktop */}
                <div className="hidden md:block md:w-1/2"></div>
                <div className="md:w-1/2 md:pl-16 ml-20 md:ml-0">
                  <div className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-lime-100 dark:border-lime-900 transition-all duration-700 delay-200 ${visibleSteps.includes(3) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}>
                    <div className="inline-block p-3 bg-lime-100 dark:bg-lime-900/30 rounded-lg mb-4">
                      <svg className="w-8 h-8 text-lime-600 dark:text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      <div className="text-center p-4 bg-gradient-to-br from-lime-50 to-green-50 dark:from-lime-900/20 dark:to-green-900/20 rounded-lg">
                        <div className="text-3xl font-bold text-lime-600 dark:text-lime-400">10x</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Faster Processing</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-lime-50 to-green-50 dark:from-lime-900/20 dark:to-green-900/20 rounded-lg">
                        <div className="text-3xl font-bold text-lime-600 dark:text-lime-400">80%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Time Savings</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className={`text-center mt-20 transition-all duration-1000 ${visibleSteps.includes(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <div className="inline-block p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border-2 border-green-200 dark:border-green-800">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Ready to transform your expat tax practice?
              </p>
              <a
                href="#testimonials"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#1D9746] to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
              >
                Join the Waitlist Today
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950" id="testimonials">
        <div className="max-w-7xl mx-auto" >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Trusted by Forward-Thinking CPAs
              </h2>
              <div className="space-y-6">
                <div className="p-6 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-800">
                  <p className="text-xl italic text-gray-800 dark:text-gray-200 mb-4">
                    "At Zeifmans, we deal with countless Canadian T1 returns for US expat clients, and the manual hassle with extractions, FTC under Canada-US treaties, and carryforwards is a real pain. ExpatTaxBot's AI focus on foreign docs like T1 alongside 1040s looks perfect—I'm impressed and ready to integrate it into our practice to slash prep time."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1D9746] rounded-full flex items-center justify-center text-white font-bold">RT</div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Richard Thompson, Tax Partner</div>
                      <div className="text-sm text-gray-500">Zeifmans, Toronto</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative" id="waitlist">
              <div className="absolute inset-0 bg-[#1D9746] blur-3xl opacity-10 rounded-full"></div>
              <div className="relative bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Join the Beta Waitlist</h3>

                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">You're on the list!</h4>
                    <p className="text-gray-600 dark:text-gray-400">We'll reach out as soon as we're ready for your practice.</p>
                  </div>
                ) : (
                  <form onSubmit={(e: React.FormEvent) => handleSubmit(e, "waitlist")} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-[#1D9746] focus:border-transparent outline-none transition-all"
                        placeholder="cpa@firm.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">What features are most important for your practice?</label>
                      <textarea
                        value={features}
                        onChange={(e) => setFeatures(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-[#1D9746] focus:border-transparent outline-none transition-all"
                        placeholder="e.g., UK SA100 support, FBAR automation..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#1D9746] hover:bg-green-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/25"
                    >
                      Secure Early Access
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-4">
                      Limited spots available for the 2026 tax season.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image
              src="/full_logo_with_name.svg"
              alt="ExpatTaxBot"
              width={305}
              height={100}
              className="object-contain"
            />
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">AI-powered expat taxation automation for CPAs</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 ExpatTaxBot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
