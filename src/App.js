import React, { useState } from 'react';

// Main App Component
const App = () => {
  // State to manage which section is active in the interactive display
  // 'challenge', 'solution', 'benefits', 'pricing', 'expectations', 'llm-feature'
  const [activeSection, setActiveSection] = useState('challenge'); 

  // States for LLM feature
  const [partNumber, setPartNumber] = useState('');
  const [delay, setDelay] = useState('');
  const [proposedSolution, setProposedSolution] = useState('');
  const [communicationDraft, setCommunicationDraft] = useState('');
  const [isLoadingLLM, setIsLoadingLLM] = useState(false);
  const [llmError, setLlmError] = useState('');

  // Helper component for section titles (navigation buttons)
  const SectionTitle = ({ children, sectionId }) => (
    <button
      className={`px-4 py-2 text-lg font-semibold rounded-lg transition-all duration-300 ${
        activeSection === sectionId
          ? 'bg-blue-600 text-white shadow-lg'
          : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
      }`}
      onClick={() => setActiveSection(sectionId)}
    >
      {children}
    </button>
  );

  // Function to call Gemini API for communication draft
  const generateCommunicationDraft = async () => {
    setIsLoadingLLM(true);
    setLlmError('');
    setCommunicationDraft('');

    // Construct the prompt for the LLM based on user inputs
    const prompt = `Draft a concise, empathetic customer communication message for a stock-out situation.
    The affected part is: ${partNumber || 'an unspecified part'}.
    The estimated delay is: ${delay || 'unspecified'}.
    The proposed solution is: ${proposedSolution || 'We are working to resolve this as quickly as possible.'}.
    Focus on transparency, empathy, and providing a clear next step.
    Start with "Dear Valued Customer," and end with "Thank you for your understanding. Sincerely, Your Marketparts Team."`;

    try {
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      
      // IMPORTANT: For local development and deployment, you MUST provide your actual Gemini API Key.
      // This 'apiKey' constant is left empty here because the Canvas environment injects it at runtime.
      // For your own environment, you should use environment variables (e.g., process.env.REACT_APP_GEMINI_API_KEY)
      // and securely configure them on your hosting platform.
      const apiKey = ""; 
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      // Check for a valid response structure from the Gemini API
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setCommunicationDraft(text);
      } else {
        setLlmError('Failed to generate draft. The AI response was unexpected. Please check the console for details.');
        console.error('Gemini API response structure unexpected:', result);
      }
    } catch (error) {
      setLlmError('An error occurred while connecting to the AI service. Please check your network connection and ensure your API key is correctly configured for your environment.');
      console.error('Error calling Gemini API:', error);
    } finally {
      setIsLoadingLLM(false);
    }
  };

  return (
    // Main container for the entire application
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      {/* Header Section */}
      <header className="w-full max-w-4xl text-center mb-10 mt-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 leading-tight mb-4 rounded-lg p-2">
          Marketparts: Turn Stock-Outs into Stronger Customer Bonds
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600">
          Your Strategic Partner for Proactive Stock-Out Management
        </p>
      </header>

      {/* Interactive Navigation/Tabs */}
      <nav className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 w-full max-w-4xl">
        <SectionTitle sectionId="challenge">The Challenge</SectionTitle>
        <SectionTitle sectionId="solution">Our Solution</SectionTitle>
        <SectionTitle sectionId="benefits">Your Benefits</SectionTitle>
        <SectionTitle sectionId="pricing">Pricing Model</SectionTitle>
        <SectionTitle sectionId="expectations">Our Partnership: Your Role</SectionTitle>
        <SectionTitle sectionId="llm-feature">✨ AI Communication</SectionTitle>
      </nav>

      {/* Content Display Area - dynamically rendered based on activeSection */}
      <main className="w-full max-w-4xl bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
        {activeSection === 'challenge' && (
          <section className="animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              {/* Icon for Challenge */}
              <svg className="w-8 h-8 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              The Challenge: Are Stock-Outs Your Weak Link?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Every stock-out is a direct threat to your **customers' satisfaction** and your **brand's image**. It leads to frustration, lost sales, and resource drain. Your internal teams get swamped managing these incidents, and maintaining impeccable customer service becomes a constant struggle.
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Customer dissatisfaction and churn risk.</li>
              <li>Increased workload for your sales, logistics, and after-sales teams.</li>
              <li>Damage to brand reputation and trust.</li>
              <li>Hidden costs from dispute resolution and lost opportunities.</li>
            </ul>
          </section>
        )}

        {activeSection === 'solution' && (
          <section className="animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              {/* Icon for Solution */}
              <svg className="w-8 h-8 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Our Solution: A Premium, Discreet Service That Works For You
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Marketparts offers a comprehensive, proactive external stock-out management solution. We act **on your behalf, confidentially**, transforming every incident into an **opportunity to boost your customers' loyalty**. This premium service is a key asset you can offer your own clients, further solidifying their trust.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">How We Operate:</h3>
            <ul className="list-none space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-3 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"></path>
                </svg>
                <div>
                  <strong className="text-gray-900">Proactive Detection:</strong> Seamless and secure integration with your systems to instantly identify orders affected by a stock-out.
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-3 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <div>
                  <strong className="text-gray-900">Direct Customer Communication:</strong> Our experts contact **your clients** directly, presenting themselves as an extension of your service, ensuring transparent and empathetic communication.
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-3 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 100 4m-4 10a2 2 0 100 4m10-4a2 2 0 100 4m-8-12l9 9H3L9 5z"></path>
                </svg>
                <div>
                  <strong className="text-gray-900">Rapid Solution Search:</strong> We actively identify and propose alternatives (equivalent parts, alternative stock, production acceleration) to minimize impact and reduce delays.
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-3 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                <div>
                  <strong className="text-gray-900">Transparent Tracking and Reporting:</strong> Your clients are kept informed, and you receive clear dashboards on performance and customer satisfaction.
                </div>
              </li>
            </ul>
          </section>
        )}

        {activeSection === 'benefits' && (
          <section className="animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              {/* Icon for Benefits */}
              <svg className="w-8 h-8 mr-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Your Immediate Added Value:
            </h2>
            <ul className="list-none space-y-4 text-gray-700">
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-3 text-purple-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                  <strong className="text-gray-900">Accelerated Customer Loyalty:</strong> Even when issues arise, your responsiveness makes all the difference. Your clients will feel heard and supported, strengthening their loyalty and trust in your brand.
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-3 text-purple-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2"></path>
                </svg>
                <div>
                  <strong className="text-gray-900">Freed-Up Teams:</strong> Liberate your sales, logistics, and after-sales teams from time-consuming and often frustrating stock-out management tasks. They can now focus on your core business and high-value activities.
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-3 text-purple-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <div>
                  <strong className="text-gray-900">Reduced Hidden Costs:</strong> Minimize penalties, order cancellations, returns, and the time spent handling complaints, thanks to our proactive and efficient management.
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-3 text-purple-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <strong className="text-gray-900">Enhanced Brand Image:</strong> Your company will be perceived as a reliable, foresightful, and customer-centric partner, even when facing unexpected challenges.
                </div>
              </li>
            </ul>
          </section>
        )}

        {activeSection === 'pricing' && (
          <section className="animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              {/* Icon for Pricing */}
              <svg className="w-8 h-8 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Our Pricing Model: Fixed + Incentive on Recovered Revenue
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We've designed a pricing model that combines the **predictability of a subscription** with a **performance-based incentive aligned with your actual revenue**.
            </p>

            <div className="space-y-6">
              {/* Fixed Fee Card */}
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600 shadow-md">
                <h3 className="text-2xl font-bold text-blue-800 mb-2">
                  <span className="text-blue-600 mr-2">●</span> Access & Maintenance Fee (Mandatory Monthly/Annual)
                </h3>
                <p className="text-lg text-gray-700 mb-3">
                  This fee covers the initial integration, platform access, connection maintenance, and dedicated support. It ensures our infrastructure and expert team are constantly ready to act for you.
                </p>
                <p className="text-xl font-semibold text-blue-700">
                  <span className="text-3xl font-extrabold">€2,000 - €10,000+</span> per month/year
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  (Adjusted based on integration complexity, potential data volume, and desired Service Level Agreement.)
                </p>
              </div>

              {/* Incentive Fee Card */}
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600 shadow-md">
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  <span className="text-green-600 mr-2">●</span> Incentive on Managed Ex-Tax Revenue (Performance-Based)
                </h3>
                <p className="text-lg text-gray-700 mb-3">
                  In addition to the fixed fees, a prime is paid as a **percentage of the Ex-Tax Revenue (CA HT)** from each stock-out transaction we successfully manage. This covers notification, solution proposal, tracking, and resolution.
                </p>
                <p className="text-xl font-semibold text-green-700">
                  <span className="text-3xl font-extrabold">3% to 7%</span> of the managed ex-tax revenue (CA HT) per transaction
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  (This percentage aligns our interests perfectly: we are rewarded based on the direct business value we help you recover and secure by minimizing stock-out impact on your sales. The exact percentage can be adjusted based on volume and transaction complexity.)
                </p>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              This model provides a stable foundation for a long-term partnership, while directly rewarding our ability to protect and even boost your revenue.
            </p>
          </section>
        )}

        {activeSection === 'expectations' && (
          <section className="animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              {/* Icon for Expectations */}
              <svg className="w-8 h-8 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Our Partnership: Your Role in Maximizing Success
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              To fully leverage Marketparts' service and ensure seamless customer communication, your active participation and collaboration are key.
            </p>

            <div className="space-y-6">
              {/* Data Sharing */}
              <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-600 shadow-md">
                <h3 className="text-2xl font-bold text-orange-800 mb-2 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  Timely & Accurate Data Sharing
                </h3>
                <p className="text-lg text-gray-700">
                  **Provide real-time access** to critical information such as stock levels, incoming shipments, exact part specifications, and order statuses. This enables our proactive detection and swift communication.
                </p>
              </div>

              {/* Internal Communication */}
              <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-600 shadow-md">
                <h3 className="text-2xl font-bold text-orange-800 mb-2 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M12 20a9 9 0 110-18 9 9 0 010 18zm0 0v-8"></path></svg>
                  Dedicated Internal Point of Contact
                </h3>
                <p className="text-lg text-gray-700">
                  Designate a **responsive internal contact** for our team. This ensures quick answers to specific queries and rapid decision-making regarding alternative solutions or escalated cases.
                </p>
              </div>

              {/* Co-Communication Strategy */}
              <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-600 shadow-md">
                <h3 className="text-2xl font-bold text-orange-800 mb-2 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h10M7 16h10M9 20h6a2 2 0 002-2V6a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  Collaborative Communication Guidelines
                </h3>
                <p className="text-lg text-gray-700">
                  We encourage a **joint communication strategy**. This includes providing us with your brand's tone of voice, key messaging, and any specific client communication protocols. We can even **co-create communication templates** to ensure consistency and reinforce your brand's message while we handle the outreach.
                </p>
              </div>

              {/* Feedback Loop */}
              <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-600 shadow-md">
                <h3 className="text-2xl font-bold text-orange-800 mb-2 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Constructive Feedback & Continuous Improvement
                </h3>
                <p className="text-lg text-gray-700">
                  Your feedback on our performance is invaluable. Regular reviews and open communication will help us continuously refine our service to meet your evolving needs and exceed client expectations.
                </p>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              By working hand-in-hand, we can ensure that every stock-out is managed with maximum efficiency, transparency, and care, turning potential frustration into a testament to your customer commitment.
            </p>
          </section>
        )}

        {activeSection === 'llm-feature' && (
          <section className="animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              {/* Icon for AI Communication */}
              <svg className="w-8 h-8 mr-3 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L3 12l5.714-2.143L11 3z"></path>
              </svg>
              ✨ AI-Powered Customer Communication
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Leverage the power of AI to instantly draft empathetic and transparent communication messages to your customers when a stock-out occurs. Just provide a few details, and get a ready-to-send draft!
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="partNumber" className="block text-gray-700 text-sm font-bold mb-2">
                  Affected Part Number / Description:
                </label>
                <input
                  type="text"
                  id="partNumber"
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                  value={partNumber}
                  onChange={(e) => setPartNumber(e.target.value)}
                  placeholder="e.g., Brake Pad ABC-123"
                />
              </div>
              <div>
                <label htmlFor="delay" className="block text-gray-700 text-sm font-bold mb-2">
                  Estimated Delay:
                </label>
                <input
                  type="text"
                  id="delay"
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                  value={delay}
                  onChange={(e) => setDelay(e.target.value)}
                  placeholder="e.g., 2-3 business days"
                />
              </div>
              <div>
                <label htmlFor="proposedSolution" className="block text-gray-700 text-sm font-bold mb-2">
                  Proposed Solution (Optional):
                </label>
                <textarea
                  id="proposedSolution"
                  rows="3"
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 resize-y"
                  value={proposedSolution}
                  onChange={(e) => setProposedSolution(e.target.value)}
                  placeholder="e.g., An equivalent part is available, or priority re-stocking is arranged."
                ></textarea>
              </div>

              <button
                onClick={generateCommunicationDraft}
                disabled={isLoadingLLM}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingLLM ? 'Generating Draft...' : '✨ Generate Communication Draft'}
              </button>
            </div>

            {llmError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline ml-2">{llmError}</span>
              </div>
            )}

            {communicationDraft && (
              <div className="bg-blue-50 border border-blue-200 text-blue-800 p-6 rounded-lg relative mt-6">
                <h3 className="text-xl font-bold mb-3">Generated Communication Draft:</h3>
                <div className="whitespace-pre-wrap leading-relaxed">
                  {communicationDraft}
                </div>
                <button
                  onClick={() => {
                    // Simple copy to clipboard functionality
                    const textArea = document.createElement("textarea");
                    textArea.value = communicationDraft;
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                      document.execCommand('copy');
                      // Optional: Add a visual cue that it was copied
                      console.log('Text copied to clipboard!');
                    } catch (err) {
                      console.error('Failed to copy text:', err);
                    }
                    document.body.removeChild(textArea);
                  }}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full text-sm shadow transition-all duration-300"
                >
                  Copy to Clipboard
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Call to Action */}
      <footer className="w-full max-w-4xl text-center mt-10 p-6 bg-blue-700 text-white rounded-xl shadow-lg">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to turn your stock-outs into a competitive advantage?
        </h2>
        <p className="text-lg sm:text-xl mb-6">
          Contact us for a personalized study and demonstration.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
          <a
            href="mailto:contact@marketparts.com" // Replace with actual email
            className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-100 transition-all duration-300 transform hover:scale-105"
          >
            Email Us
          </a>
          <a
            href="tel:+33123456789" // Replace with actual phone number
            className="inline-block bg-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            Call Us
          </a>
        </div>
        <p className="text-sm mt-6">
          Marketparts Team | Marketparts.com
        </p>
      </footer>

      {/* Tailwind CSS Styling (ensure this is present for styles to apply) */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');
          .font-inter {
            font-family: 'Inter', sans-serif;
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default App;