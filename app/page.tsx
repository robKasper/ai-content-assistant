"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FiZap, FiTarget, FiClock, FiCheck } from "react-icons/fi";

const DEMO_OUTPUT = `## Title Options

1. "Real Estate Investing 101: A Beginner's Guide to Building Wealth"
2. "How to Start Investing in Real Estate with Little Money"
3. "Real Estate Investing Strategies That Actually Work in 2024"

## Meta Description

Learn proven real estate investing strategies for beginners. Discover how to build wealth through property investment with our comprehensive guide.

## Blog Outline

### Introduction
- Hook: The wealth-building power of real estate
- Why real estate outperforms other investments
- What you'll learn in this guide

### 1. Understanding Real Estate Investment Types
- Residential vs. commercial properties
- REITs and crowdfunding options
- Fix-and-flip vs. buy-and-hold strategies

### 2. Getting Started with Limited Capital
- House hacking strategies
- FHA loans and low down payment options
- Partnering with other investors

### 3. Analyzing Your First Deal
- The 1% rule explained
- Cash flow calculations
- Hidden costs to watch for

### Conclusion
- Start small, think long-term
- CTA: Download our free investment calculator`;

function TypewriterDemo() {
  const [displayedText, setDisplayedText] = useState("");

  const isTyping = displayedText.length < DEMO_OUTPUT.length;

  useEffect(() => {
    if (displayedText.length < DEMO_OUTPUT.length) {
      const timeout = setTimeout(() => {
        // Type 2-4 characters at a time for faster effect
        const charsToAdd = Math.floor(Math.random() * 3) + 2;
        setDisplayedText(DEMO_OUTPUT.slice(0, displayedText.length + charsToAdd));
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [displayedText]);

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25"></div>
      <Card className="relative bg-white">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-2 mb-4 text-xs sm:text-sm text-gray-500">
            <span className="px-2 py-1 bg-gray-100 rounded">Topic: How to invest in real estate</span>
            <span className="px-2 py-1 bg-gray-100 rounded">Keyword: real estate investing</span>
          </div>
          <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 max-h-96 overflow-y-auto">
            {displayedText}
            {isTyping && <span className="animate-pulse">▊</span>}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">AI Content Assistant</h1>
        <div className="flex gap-2 sm:gap-4">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm" className="sm:size-default">Sign In</Button>
          </Link>
          <Link href="/auth/signup">
            <Button size="sm" className="sm:size-default">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-4 py-8 sm:py-16 text-center">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
          Generate SEO Blog Outlines
          <br />
          <span className="text-blue-600">In Seconds</span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Stop staring at blank pages. Enter your topic and keyword, and let AI create
          a comprehensive, SEO-optimized blog outline instantly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/signup">
            <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
              Start Free
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Demo Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">See It In Action</h3>
          <p className="text-gray-600">Watch as AI generates a complete blog outline in real-time</p>
        </div>
        <div className="max-w-3xl mx-auto">
          <TypewriterDemo />
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Why Content Creators Love Us</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiZap className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Instant Results</h4>
            <p className="text-gray-600">Get complete outlines in seconds, not hours</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiTarget className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-lg mb-2">SEO Optimized</h4>
            <p className="text-gray-600">Titles and structure designed to rank</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiClock className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Save Hours</h4>
            <p className="text-gray-600">Focus on writing, not planning</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">How It Works</h3>
          <div className="flex flex-col md:flex-row gap-8 max-w-3xl mx-auto">
            <div className="flex-1 text-center">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                1
              </div>
              <h4 className="font-semibold mb-2">Enter Your Topic</h4>
              <p className="text-gray-600 text-sm">Describe what you want to write about</p>
            </div>
            <div className="flex-1 text-center">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                2
              </div>
              <h4 className="font-semibold mb-2">Add Your Keyword</h4>
              <p className="text-gray-600 text-sm">Tell us your target SEO keyword</p>
            </div>
            <div className="flex-1 text-center">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                3
              </div>
              <h4 className="font-semibold mb-2">Get Your Outline</h4>
              <p className="text-gray-600 text-sm">Receive a complete, structured outline</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Start Free</h3>
          <p className="text-gray-600 mb-8">No credit card required</p>
          <Card>
            <CardContent className="p-8">
              <div className="text-4xl font-bold mb-2">10 Free Credits</div>
              <p className="text-gray-600 mb-6">Generate 10 blog outlines for free</p>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <FiCheck className="text-green-600" />
                  <span>SEO-optimized titles</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck className="text-green-600" />
                  <span>Meta descriptions</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck className="text-green-600" />
                  <span>Detailed outlines</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck className="text-green-600" />
                  <span>Copy to clipboard</span>
                </li>
              </ul>
              <Link href="/auth/signup">
                <Button className="w-full" size="lg">Get Started Free</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} AI Content Assistant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
