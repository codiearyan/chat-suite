"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import useIntersectionObserver from "@/lib/hooks/useIntersectionObserver";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  const toggleItem = (index: number) => {
    setOpenItems((prevOpenItems) => {
      const newOpenItems = new Set(prevOpenItems);
      if (newOpenItems.has(index)) {
        newOpenItems.delete(index);
      } else {
        newOpenItems.add(index);
      }
      return newOpenItems;
    });
  };

  const faqItems: FAQItem[] = [
    {
      question: "What is ChatSuite?",
      answer:
        "ChatSuite is an all-in-one AI workspace that combines multiple powerful AI models (GPT-4, Claude 3.5 Sonnet, Google Gemini 1.5 Pro, Meta Llama 3.3) in one platform. It's designed to help you with content creation, analysis, research, and image generation - all through a single, user-friendly interface. Instead of managing multiple AI subscriptions, ChatSuite gives you access to everything you need at a fraction of the cost.",
    },
    {
      question: "How does the credit system work?",
      answer:
        "Credits are ChatSuite's simple payment system. 1 credit = 1 message or 1 image analysis. Credits never expire, so you can use them at your own pace. Each plan comes with a different number of credits: Free Trial (10 credits), Lite Model (100 credits for ₹499), Pro Model (500 credits for ₹1499), and Bulk Package (2000 credits for ₹2999). You can always purchase more credits when needed, and unused credits roll over indefinitely.",
    },
    {
      question: "What features are included in all plans?",
      answer:
        "All ChatSuite plans, including the Free Trial, give you access to: 1) Multiple AI models (GPT-4, Claude, Gemini, Llama, etc.), 2) Real-time web search, 3) Canvas editor for visual projects, 4) Voice input via microphone, 5) Document chat and analysis, 6) Image analysis and generation tools. Premium features like advanced AI tools and priority support are available in Pro and Bulk packages. Upcoming features include text-to-image generation and text-to-speech conversion.",
    },
    {
      question: "Can I try ChatSuite before buying?",
      answer:
        "Yes! We offer a Free Trial with 10 credits, no credit card required. This lets you experience all of ChatSuite's features and AI models firsthand. You can test the platform's capabilities, try different AI models, and see how the credit system works. After using your trial credits, you can choose the plan that best fits your needs.",
    },
    {
      question: "How does ChatSuite compare to using individual AI services?",
      answer:
        "ChatSuite saves you both money and time. Instead of paying for separate subscriptions to ChatGPT Plus (₹1600/month), Claude (₹1500/month), and other AI tools (₹500-2000/month each), you get everything in one platform starting at ₹499. Plus, you don't have to switch between different interfaces or manage multiple accounts. We estimate users save over ₹60,000 annually by using ChatSuite instead of individual services.",
    },
    {
      question: "Is my data secure with ChatSuite?",
      answer:
        "Yes, we take data security seriously. ChatSuite uses enterprise-grade encryption for all data transmission and storage. We don't store your conversations longer than necessary, and you can delete your data at any time. We never share your data with third parties, and our AI models are used solely for processing your requests. We comply with global data protection regulations including GDPR.",
    },
    {
      question: "What is your refund policy?",
      answer:
        "Refunds are issued only under specific circumstances: 1) Technical Issues: If you encounter persistent technical issues that prevent you from using the credits/services and our support team cannot resolve them, 2) Non-Delivery of Service: If purchased credits are not added to your account or features are inaccessible, 3) Billing Errors: If you're charged incorrectly due to system error or unauthorized charges. Contact support if you believe you qualify for a refund under these conditions.",
    },
    {
      question: "Can I use ChatSuite for my business?",
      answer:
        "Absolutely! ChatSuite is perfect for businesses of all sizes. Many companies use ChatSuite for content creation, customer service, data analysis, research, and creative projects. The Bulk Package is particularly popular among businesses as it offers the best value for teams. We also provide special enterprise solutions for larger organizations with custom requirements.",
    },
    {
      question: "What if I need more credits?",
      answer:
        "You can purchase additional credits at any time through your dashboard. The more credits you buy, the better the value: 100 credits (₹499), 500 credits (₹1499), or 2000 credits (₹2999). If you need a custom package, contact our sales team. Remember, credits never expire, so you can stock up when convenient.",
    },
  ];

  return (
    <section className="py-20 bg-slate-900" ref={sectionRef}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-light mb-12 text-center text-white"
          style={{
            opacity: 0,
            animation: isVisible ? "blurDown 1s 0.1s forwards" : "none",
          }}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border border-purple-500/20 rounded-lg overflow-hidden"
              style={{
                opacity: 0,
                animation: isVisible
                  ? `blurDown 1s ${0.1 + index * 0.05}s forwards`
                  : "none",
              }}
            >
              <button
                className="w-full p-4 text-left flex justify-between items-center bg-slate-800/30 hover:bg-slate-700/30 transition-colors duration-200 nofocus"
                onClick={() => toggleItem(index)}
              >
                <span className="text-md font-light text-white">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${
                    openItems.has(index) ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItems.has(index) ? "max-h-96" : "max-h-0"
                }`}
              >
                <div
                  className="p-4 bg-slate-800/10"
                  style={{
                    opacity: 0,
                    animation: openItems.has(index)
                      ? "blurDown 0.5s 0.1s forwards"
                      : "none",
                  }}
                >
                  <div
                    className="text-sm text-gray-300"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
