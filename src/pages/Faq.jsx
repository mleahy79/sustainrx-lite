import React, { useState } from "react";
import { useAudioFeedback } from "../context/AudioFeedbackContext";

const faqData = [
  {
    question: "What is SustainRx?",
    answer:
      "SustainRx is a code health clinic that diagnoses technical debt, identifies chronic hotspots, and delivers a prioritized treatment plan to keep your codebase sustainable long-term.",
  },
  {
    question: "How does SustainRx work?",
    answer:
      "Sign in with GitHub, submit a repository URL, and SustainRx scans your commit history, examines file change frequency, and evaluates contributor patterns to build a full health profile of your project.",
  },
  {
    question: "Is my code secure with SustainRx?",
    answer:
      "Yes. SustainRx reads your repository data through the GitHub API using your authorized token. Your source code is not stored on our servers or shared with any third parties.",
  },
  {
    question: "What programming languages does SustainRx support?",
    answer:
      "SustainRx analyzes repository-level health patterns like commit frequency, hotspots, and contributor trends — so it works with any language or framework in your GitHub repositories.",
  },
  {
    question: "Why do I need to sign in with GitHub?",
    answer:
      "GitHub authentication allows SustainRx to securely access your repositories on your behalf. We only request the permissions needed to read your repository and user profile data.",
  },
  {
    question: "What kind of issues does it detect?",
    answer:
      "SustainRx looks for commit health trends, chronic hotspots — files changed repeatedly that signal structural problems — code debt indicators, and contributor patterns that may reveal bottlenecks.",
  },
  {
    question: "Will SustainRx support AI-powered analysis?",
    answer:
      "Yes. AI-assisted code analysis is actively being developed and will be integrated soon. This will enable deeper, more contextual insights into your codebase health beyond pattern-based scanning alone.",
  },
  {
    question: "Is SustainRx free to use?",
    answer:
      "SustainRx is currently free during early access. As we add more features, we may introduce paid tiers — but we will always communicate any changes well in advance.",
  },
];

const Faq = () => {
    const [activeQuestion, setActiveQuestion] = useState(null);
    const { playAccordionOpen, playAccordionClose } = useAudioFeedback();

  const handleToggle = (index) => {
    const isOpening = activeQuestion !== index;
    setActiveQuestion(isOpening ? index : null);
    if (isOpening) {
      playAccordionOpen();
    } else {
      playAccordionClose();
    }
  };

  return (
    <div className="w-screen min-h-screen flex justify-center">
        <div className="w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] py-10">
        <h1 className="text-3xl text-gray-400 font-bold mb-6 text-center">Frequently Asked Questions</h1>
    {faqData.map((item, index) => (
        <div key={index} className="mb-4">
          <button
            id={`faq-button-${index}`}
            aria-expanded={activeQuestion === index}
            aria-controls={`faq-panel-${index}`}
            className="w-full text-left p-4 bg-neutral-700/20 border-gray-700 border-1 backdrop-blur-lg rounded-lg hover:bg-gray-800 transition-colors duration-300 shadow-lg shadow-black/50 ease-in-out"
            onClick={() => handleToggle(index)}
          >
            <h2 className="text-lg font-semibold text-[#178582]">{item.question}</h2>
          </button>
          <div
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-button-${index}`}
            className={`overflow-hidden transition-all duration-400 ease-in-out ${
            activeQuestion === index ? "max-h-60 mt-2" : "max-h-0"
          }`}>
            <div className="p-4 bg-gray-800 rounded-b-lg shadow-lg shadow-black/50">
              <p className="text-[#bfa174]">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Faq;
