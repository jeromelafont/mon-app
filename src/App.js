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
      className={`nav-button ${activeSection === sectionId ? 'nav-button-active' : ''}`}
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
    <div className="app-container">
      {/* Header Section */}
      <header className="header-section">
        <h1 className="main-title">
          Marketparts: Turn Stock-Outs into Stronger Customer Bonds
        </h1>
        <p className="subtitle">
          Your Strategic Partner for Proactive Stock-Out Management
        </p>
      </header>

      {/* Interactive Navigation/Tabs */}
      <nav className="nav-bar">
        <SectionTitle sectionId="challenge">The Challenge</SectionTitle>
        <SectionTitle sectionId="solution">Our Solution</SectionTitle>
        <SectionTitle sectionId="benefits">Your Benefits</SectionTitle>
        <SectionTitle sectionId="pricing">Pricing Model</SectionTitle>
        <SectionTitle sectionId="expectations">Our Partnership: Your Role</SectionTitle>
        <SectionTitle sectionId="llm-feature">✨ AI Communication</SectionTitle>
      </nav>

      {/* Content Display Area - dynamically rendered based on activeSection */}
      <main className="main-content">
        {activeSection === 'challenge' && (
          <section className="content-section animate-fade-in">
            <h2 className="section-heading challenge-heading">
              {/* Icon for Challenge */}
              <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              The Challenge: Are Stock-Outs Your Weak Link?
            </h2>
            <p className="section-text">
              Every stock-out is a direct threat to your **customers' satisfaction** and your **brand's image**. It leads to frustration, lost sales, and resource drain. Your internal teams get swamped managing these incidents, and maintaining impeccable customer service becomes a constant struggle.
            </p>
            <ul className="bullet-list">
              <li>Customer dissatisfaction and churn risk.</li>
              <li>Increased workload for your sales, logistics, and after-sales teams.</li>
              <li>Damage to brand reputation and trust.</li>
              <li>Hidden costs from dispute resolution and lost opportunities.</li>
            </ul>
          </section>
        )}

        {activeSection === 'solution' && (
          <section className="content-section animate-fade-in">
            <h2 className="section-heading solution-heading">
              {/* Icon for Solution */}
              <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Our Solution: A Premium, Discreet Service That Works For You
            </h2>
            <p className="section-text">
              Marketparts offers a comprehensive, proactive external stock-out management solution. We act **on your behalf, confidentially**, transforming every incident into an **opportunity to boost your customers' loyalty**. This premium service is a key asset you can offer your own clients, further solidifying their trust.
            </p>
            <h3 className="sub-heading">How We Operate:</h3>
            <ul className="icon-list">
              <li>
                <svg className="list-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"></path>
                </svg>
                <div>
                  <strong className="list-item-strong">Proactive Detection:</strong> Seamless and secure integration with your systems to instantly identify orders affected by a stock-out.
                </div>
              </li>
              <li>
                <svg className="list-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <div>
                  <strong className="list-item-strong">Direct Customer Communication:</strong> Our experts contact **your clients** directly, presenting themselves as an extension of your service, ensuring transparent and empathetic communication.
                </div>
              </li>
              <li>
                <svg className="list-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 100 4m-4 10a2 2 0 100 4m10-4a2 2 0 100 4m-8-12l9 9H3L9 5z"></path>
                </svg>
                <div>
                  <strong className="list-item-strong">Rapid Solution Search:</strong> We actively identify and propose alternatives (equivalent parts, alternative stock, production acceleration) to minimize impact and reduce delays.
                </div>
              </li>
              <li>
                <svg className="list-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                <div>
                  <strong className="list-item-strong">Transparent Tracking and Reporting:</strong> Your clients are kept informed, and you receive clear dashboards on performance and customer satisfaction.
                </div>
              </li>
            </ul>
          </section>
        )}

        {activeSection === 'benefits' && (
          <section className="content-section animate-fade-in">
            <h2 className="section-heading benefits-heading">
              {/* Icon for Benefits */}
              <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Your Immediate Added Value: A Partnership for Growth
            </h2>
            <p className="section-text">
              While Marketparts already has experience with your clients, this **new partnership model** offers a deeper, more integrated approach that unlocks significant benefits directly for your business. We move beyond simple management to becoming a strategic extension of your brand.
            </p>
            <ul className="icon-list">
              <li>
                <svg className="list-icon purple-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                  <strong className="list-item-strong">Accelerated Customer Loyalty & Brand Reinforcement:</strong>
                  Even when issues arise, your responsiveness makes all the difference. By acting **in your name and under your brand guidelines**, we ensure seamless, consistent, and empathetic communication. This transforms a potential frustration into a positive brand touchpoint, directly impacting repeat business, word-of-mouth referrals, and strengthening long-term client relationships. Your brand's reputation for reliability is actively enhanced, not just preserved.
                </div>
              </li>
              <li>
                <svg className="list-icon purple-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2"></path>
                </svg>
                <div>
                  <strong className="list-item-strong">Significant Resource Liberation & Strategic Focus:</strong>
                  Liberate your sales, logistics, and after-sales teams from the time-consuming, often stressful, and reactive tasks of stock-out management. This isn't just about offloading work; it's about enabling your most valuable talent to focus on core business activities, strategic growth initiatives, product innovation, and expanding market share.
                </div>
              </li>
              <li>
                <svg className="list-icon purple-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <div>
                  <strong className="list-item-strong">Tangible Reduction in Hidden Costs & Revenue Protection:</strong>
                  Proactive management directly minimizes financial drains. This includes fewer order cancellations, reduced logistical penalties, less time spent on dispute resolution, and crucially, prevention of lost future orders due to a negative customer experience. By efficiently managing affected sales, we actively protect and recover your potential revenue.
                </div>
              </li>
            </ul>

            <h3 className="sub-heading mt-8">Illustrative Return on Investment (ROI)</h3>
            <p className="section-text">
              Let's illustrate the potential financial impact of partnering with Marketparts, based on typical scenarios:
            </p>

            <div className="roi-card">
              <div className="roi-item">
                <span className="roi-label">Hypothèses Mensuelles</span>
                <ul className="roi-list">
                  <li>Nombre moyen de cas de rupture : **50**</li>
                  <li>Valeur moyenne d'une commande impactée : **€1,000**</li>
                  <li>Taux de commandes sauvées (non annulées) : **60%**</li>
                  <li>Temps interne économisé par cas : **2 heures**</li>
                  <li>Coût horaire moyen équipe interne : **€40**</li>
                  <li>Frais Fixe Marketparts (hypothétique) : **€3,000**</li>
                  <li>Incentive Marketparts : **5%** du CA HT géré</li>
                </ul>
              </div>
              <div className="roi-item">
                <span className="roi-label">Calcul des Bénéfices</span>
                <ul className="roi-list">
                  <li>Chiffre d'Affaires HT Géré : 50 cas * €1,000 = **€50,000**</li>
                  <li>Revenus Sauvés : €50,000 * 60% = **€30,000**</li>
                  <li>Heures Économisées : 50 cas * 2h = **100 heures**</li>
                  <li>Économies sur Coûts Équipe : 100h * €40 = **€4,000**</li>
                  <li>**Bénéfices Totaux Mensuels : €30,000 + €4,000 = €34,000**</li>
                </ul>
              </div>
              <div className="roi-item">
                <span className="roi-label">Coût Marketparts</span>
                <ul className="roi-list">
                  <li>Coût Fixe Mensuel : **€3,000**</li>
                  <li>Incentive (5% de €50,000) : **€2,500**</li>
                  <li>**Coût Total Marketparts Mensuel : €3,000 + €2,500 = €5,500**</li>
                </ul>
              </div>
              <div className="roi-item final-roi">
                <span className="roi-label">Résultat et ROI Estimé</span>
                <ul className="roi-list">
                  <li>Gain Net Mensuel : €34,000 - €5,500 = **€28,500**</li>
                  <li>**ROI Estimé : (€28,500 / €5,500) * 100% ≈ 518%**</li>
                </ul>
                <p className="roi-disclaimer">
                  *Cet exemple est illustratif. Votre ROI réel dépendra de vos volumes, valeurs de commande et de nos accords spécifiques.*
                </p>
              </div>
            </div>
            <p className="section-text mt-6">
              By working hand-in-hand, we can ensure that every stock-out is managed with maximum efficiency, transparency, and care, turning potential frustration into a testament to your customer commitment.
            </p>
          </section>
        )}

        {activeSection === 'pricing' && (
          <section className="content-section animate-fade-in">
            <h2 className="section-heading pricing-heading">
              {/* Icon for Pricing */}
              <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Our Pricing Model: Fixed + Incentive on Recovered Revenue
            </h2>
            <p className="section-text">
              We've designed a pricing model that combines the **predictability of a subscription** with a **performance-based incentive aligned with your actual revenue**.
            </p>

            <div className="card-container">
              {/* Fixed Fee Card */}
              <div className="info-card blue-card">
                <h3 className="card-title">
                  <span className="card-bullet blue-bullet">●</span> Access & Maintenance Fee (Mandatory Monthly/Annual)
                </h3>
                <p className="card-text">
                  This fee covers the initial integration, platform access, connection maintenance, and dedicated support. It ensures our infrastructure and expert team are constantly ready to act for you.
                </p>
                <p className="card-price">
                  <span className="card-price-value">€2,000 - €10,000+</span> per month/year
                </p>
                <p className="card-note">
                  (Adjusted based on integration complexity, potential data volume, and desired Service Level Agreement.)
                </p>
              </div>

              {/* Incentive Fee Card */}
              <div className="info-card green-card">
                <h3 className="card-title">
                  <span className="card-bullet green-bullet">●</span> Incentive on Managed Ex-Tax Revenue (Performance-Based)
                </h3>
                <p className="card-text">
                  In addition to the fixed fees, a prime is paid as a **percentage of the Ex-Tax Revenue (CA HT)** from each stock-out transaction we successfully manage. This covers notification, solution proposal, tracking, and resolution.
                </p>
                <p className="card-price">
                  <span className="card-price-value">3% to 7%</span> of the managed ex-tax revenue (CA HT) per transaction
                </p>
                <p className="card-note">
                  (This percentage aligns our interests perfectly: we are rewarded based on the direct business value we help you recover and secure by minimizing stock-out impact on your sales. The exact percentage can be adjusted based on volume and transaction complexity.)
                </p>
              </div>
            </div>

            <p className="section-text mt-6">
              This model provides a stable foundation for a long-term partnership, while directly rewarding our ability to protect and even boost your revenue.
            </p>
          </section>
        )}

        {activeSection === 'expectations' && (
          <section className="content-section animate-fade-in">
            <h2 className="section-heading expectations-heading">
              {/* Icon for Expectations */}
              <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Our Partnership: Your Role in Maximizing Success
            </h2>
            <p className="section-text">
              To fully leverage Marketparts' service and ensure seamless customer communication, your active participation and collaboration are key.
            </p>

            <div className="card-container">
              {/* Data Sharing */}
              <div className="info-card orange-card">
                <h3 className="card-title card-title-icon">
                  <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  Timely & Accurate Data Sharing
                </h3>
                <p className="card-text">
                  **Provide real-time access** to critical information such as stock levels, incoming shipments, exact part specifications, and order statuses. This enables our proactive detection and swift communication.
                </p>
              </div>

              {/* Internal Communication */}
              <div className="info-card orange-card">
                <h3 className="card-title card-title-icon">
                  <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M12 20a9 9 0 110-18 9 9 0 010 18zm0 0v-8"></path></svg>
                  Dedicated Internal Point of Contact
                </h3>
                <p className="card-text">
                  Designate a **responsive internal contact** for our team. This ensures quick answers to specific queries and rapid decision-making regarding alternative solutions or escalated cases.
                </p>
              </div>

              {/* Co-Communication Strategy */}
              <div className="info-card orange-card">
                <h3 className="card-title card-title-icon">
                  <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h10M7 16h10M9 20h6a2 2 0 002-2V6a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  Collaborative Communication Guidelines
                </h3>
                <p className="card-text">
                  We encourage a **joint communication strategy**. This includes providing us with your brand's tone of voice, key messaging, and any specific client communication protocols. We can even **co-create communication templates** to ensure consistency and reinforce your brand's message while we handle the outreach.
                </p>
              </div>

              {/* Feedback Loop */}
              <div className="info-card orange-card">
                <h3 className="card-title card-title-icon">
                  <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Constructive Feedback & Continuous Improvement
                </h3>
                <p className="card-text">
                  Your feedback on our performance is invaluable. Regular reviews and open communication will help us continuously refine our service to meet your evolving needs and exceed client expectations.
                </p>
              </div>
            </div>

            <p className="section-text mt-6">
              By working hand-in-hand, we can ensure that every stock-out is managed with maximum efficiency, transparency, and care, turning potential frustration into a testament to your customer commitment.
            </p>
          </section>
        )}

        {activeSection === 'llm-feature' && (
          <section className="content-section animate-fade-in">
            <h2 className="section-heading llm-heading">
              {/* Icon for AI Communication */}
              <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L3 12l5.714-2.143L11 3z"></path>
              </svg>
              ✨ AI-Powered Customer Communication
            </h2>
            <p className="section-text">
              Leverage the power of AI to instantly draft empathetic and transparent communication messages to your customers when a stock-out occurs. Just provide a few details, and get a ready-to-send draft!
            </p>

            <div className="form-group-container">
              <div className="form-group">
                <label htmlFor="partNumber" className="form-label">
                  Affected Part Number / Description:
                </label>
                <input
                  type="text"
                  id="partNumber"
                  className="form-input"
                  value={partNumber}
                  onChange={(e) => setPartNumber(e.target.value)}
                  placeholder="e.g., Brake Pad ABC-123"
                />
              </div>
              <div className="form-group">
                <label htmlFor="delay" className="form-label">
                  Estimated Delay:
                </label>
                <input
                  type="text"
                  id="delay"
                  className="form-input"
                  value={delay}
                  onChange={(e) => setDelay(e.target.value)}
                  placeholder="e.g., 2-3 business days"
                />
              </div>
              <div className="form-group">
                <label htmlFor="proposedSolution" className="form-label">
                  Proposed Solution (Optional):
                </label>
                <textarea
                  id="proposedSolution"
                  rows="3"
                  className="form-textarea"
                  value={proposedSolution}
                  onChange={(e) => setProposedSolution(e.target.value)}
                  placeholder="e.g., An equivalent part is available, or priority re-stocking is arranged."
                ></textarea>
              </div>

              <button
                onClick={generateCommunicationDraft}
                disabled={isLoadingLLM}
                className="action-button purple-button"
              >
                {isLoadingLLM ? 'Generating Draft...' : '✨ Generate Communication Draft'}
              </button>
            </div>

            {llmError && (
              <div className="error-message" role="alert">
                <strong className="error-strong">Error:</strong>
                <span className="error-text">{llmError}</span>
              </div>
            )}

            {communicationDraft && (
              <div className="draft-output-box">
                <h3 className="draft-title">Generated Communication Draft:</h3>
                <div className="draft-text">
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
                  className="copy-button"
                >
                  Copy to Clipboard
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Call to Action */}
      <footer className="footer-section">
        <h2 className="footer-title">
          Ready to turn your stock-outs into a competitive advantage?
        </h2>
        <p className="footer-text">
          Contact us for a personalized study and demonstration.
        </p>
        <div className="contact-buttons-container">
          <a
            href="mailto:contact@marketparts.com" // Replace with actual email
            className="contact-button white-button"
          >
            Email Us
          </a>
          <a
            href="tel:+33123456789" // Replace with actual phone number
            className="contact-button blue-button"
          >
            Call Us

          </a>
        </div>
        <p className="footer-info">
          Marketparts Team | Marketparts.com
        </p>
      </footer>

      {/* Standard CSS Styles */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');

          :root {
            --primary-blue: #2563EB;
            --dark-blue: #1E40AF;
            --light-blue: #DBEAFE;
            --medium-blue: #3B82F6;
            --text-color-dark: #1F2937;
            --text-color-medium: #4B5563;
            --text-color-light: #6B7280;
            --red-color: #EF4444;
            --green-color: #10B981;
            --purple-color: #8B5CF6;
            --dark-purple: #7C3AED;
            --orange-color: #F97316;
            --light-orange: #FFEDD5;
            --pink-color: #EC4899;
          }

          body {
            margin: 0;
            font-family: 'Inter', sans-serif;
            background-color: #F9FAFB;
            color: var(--text-color-dark);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          .app-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1.5rem; /* p-4 sm:p-6 lg:p-8 */
          }

          .header-section {
            width: 100%;
            max-width: 960px; /* max-w-4xl */
            text-align: center;
            margin-bottom: 2.5rem; /* mb-10 */
            margin-top: 1rem; /* mt-4 */
          }

          .main-title {
            font-size: 2.25rem; /* text-4xl */
            line-height: 1.25; /* leading-tight */
            font-weight: 800; /* font-extrabold */
            color: var(--dark-blue); /* text-blue-800 */
            margin-bottom: 1rem; /* mb-4 */
            border-radius: 0.5rem; /* rounded-lg */
            padding: 0.5rem; /* p-2 */
          }

          .subtitle {
            font-size: 1.25rem; /* text-xl */
            color: var(--text-color-medium); /* text-gray-600 */
          }

          @media (min-width: 640px) { /* sm breakpoint */
            .main-title {
              font-size: 3rem; /* sm:text-5xl */
            }
            .subtitle {
              font-size: 1.5rem; /* sm:text-2xl */
            }
            .app-container {
                padding: 1.5rem 2.5rem; /* sm:p-6 */
            }
          }

          @media (min-width: 1024px) { /* lg breakpoint */
            .app-container {
                padding: 2rem 3rem; /* lg:p-8 */
            }
          }

          .nav-bar {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.75rem; /* gap-3 */
            margin-bottom: 2.5rem; /* mb-10 */
            width: 100%;
            max-width: 960px; /* max-w-4xl */
          }

          @media (min-width: 640px) { /* sm breakpoint */
            .nav-bar {
              gap: 1rem; /* sm:gap-4 */
            }
          }

          .nav-button {
            padding: 0.5rem 1rem; /* px-4 py-2 */
            font-size: 1.125rem; /* text-lg */
            font-weight: 600; /* font-semibold */
            border-radius: 0.5rem; /* rounded-lg */
            transition: all 0.3s ease-in-out; /* transition-all duration-300 */
            background-color: #E5E7EB; /* bg-gray-200 */
            color: var(--text-color-dark); /* text-gray-700 */
            border: none;
            cursor: pointer;
          }

          .nav-button:hover {
            background-color: var(--light-blue); /* hover:bg-blue-100 */
          }

          .nav-button-active {
            background-color: var(--medium-blue); /* bg-blue-600 */
            color: white; /* text-white */
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-lg */
          }

          .main-content {
            width: 100%;
            max-width: 960px; /* max-w-4xl */
            background-color: white; /* bg-white */
            padding: 1.5rem; /* p-6 */
            border-radius: 0.75rem; /* rounded-xl */
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
            border: 1px solid #F3F4F6; /* border border-gray-100 */
          }

          @media (min-width: 640px) { /* sm breakpoint */
            .main-content {
              padding: 2rem; /* sm:p-8 */
            }
          }

          .content-section {
            animation: fadeIn 0.5s ease-out; /* animate-fade-in */
          }

          .section-heading {
            font-size: 1.875rem; /* text-3xl */
            font-weight: 700; /* font-bold */
            color: var(--text-color-dark); /* text-gray-900 */
            margin-bottom: 1rem; /* mb-4 */
            display: flex;
            align-items: center;
          }

          .section-icon {
            width: 2rem; /* w-8 */
            height: 2rem; /* h-8 */
            margin-right: 0.75rem; /* mr-3 */
          }

          .challenge-heading .section-icon { color: var(--red-color); } /* text-red-500 */
          .solution-heading .section-icon { color: var(--green-color); } /* text-green-500 */
          .benefits-heading .section-icon { color: var(--purple-color); } /* text-purple-500 */
          .pricing-heading .section-icon { color: var(--dark-blue); } /* text-indigo-500 */
          .expectations-heading .section-icon { color: var(--orange-color); } /* text-orange-500 */
          .llm-heading .section-icon { color: var(--pink-color); } /* text-pink-500 */

          .section-text {
            font-size: 1.125rem; /* text-lg */
            color: var(--text-color-medium); /* text-gray-700 */
            line-height: 1.6; /* leading-relaxed */
            margin-bottom: 1rem; /* mb-4 */
          }

          .bullet-list {
            list-style-type: disc;
            padding-left: 1.25rem; /* pl-5 */
            color: var(--text-color-medium); /* text-gray-700 */
            line-height: 1.5; /* space-y-2 */
          }
          .bullet-list li {
            margin-bottom: 0.5rem;
          }

          .sub-heading {
            font-size: 1.25rem; /* text-xl */
            font-weight: 600; /* font-semibold */
            color: var(--text-color-dark); /* text-gray-800 */
            margin-bottom: 0.75rem; /* mb-3 */
          }

          .icon-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 1rem; /* space-y-4 */
          }

          .icon-list li {
            display: flex;
            align-items: flex-start;
          }

          .list-icon {
            width: 1.5rem; /* w-6 */
            height: 1.5rem; /* h-6 */
            margin-right: 0.75rem; /* mr-3 */
            color: var(--primary-blue); /* text-blue-500 */
            flex-shrink: 0;
            margin-top: 0.25rem; /* mt-1 */
          }
          .purple-icon {
            color: var(--purple-color); /* text-purple-600 */
          }

          .list-item-strong {
            color: var(--text-color-dark); /* text-gray-900 */
            font-weight: 700;
          }

          .card-container {
            display: flex;
            flex-direction: column;
            gap: 1.5rem; /* space-y-6 */
          }

          .info-card {
            padding: 1.5rem; /* p-6 */
            border-radius: 0.5rem; /* rounded-lg */
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-md */
            border-left-width: 0.25rem; /* border-l-4 */
          }

          .blue-card {
            background-color: var(--light-blue); /* bg-blue-50 */
            border-left-color: var(--primary-blue); /* border-blue-600 */
          }

          .green-card {
            background-color: #ECFDF5; /* bg-green-50 */
            border-left-color: var(--green-color); /* border-green-600 */
          }

          .orange-card {
            background-color: var(--light-orange); /* bg-orange-50 */
            border-left-color: var(--orange-color); /* border-orange-600 */
          }

          .card-title {
            font-size: 1.5rem; /* text-2xl */
            font-weight: 700; /* font-bold */
            color: var(--dark-blue); /* text-blue-800 */
            margin-bottom: 0.5rem; /* mb-2 */
            display: flex;
            align-items: center;
          }

          .card-title.card-title-icon {
            color: var(--orange-color); /* text-orange-800 */
          }

          .card-bullet {
            margin-right: 0.5rem; /* mr-2 */
            font-size: 1.5rem; /* For visibility of the bullet */
          }
          .blue-bullet { color: var(--primary-blue); } /* text-blue-600 */
          .green-bullet { color: var(--green-color); } /* text-green-600 */

          .card-icon {
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 0.5rem;
            color: var(--orange-color);
          }


          .card-text {
            font-size: 1.125rem; /* text-lg */
            color: var(--text-color-medium); /* text-gray-700 */
            margin-bottom: 0.75rem; /* mb-3 */
          }

          .card-price {
            font-size: 1.25rem; /* text-xl */
            font-weight: 600; /* font-semibold */
            color: var(--primary-blue); /* text-blue-700 */
          }

          .card-price-value {
            font-size: 1.875rem; /* text-3xl */
            font-weight: 800; /* font-extrabold */
          }

          .card-note {
            font-size: 0.875rem; /* text-sm */
            color: var(--text-color-light); /* text-gray-500 */
            margin-top: 0.5rem; /* mt-2 */
          }

          .form-group-container {
            margin-bottom: 1.5rem; /* mb-6 */
            display: flex;
            flex-direction: column;
            gap: 1rem; /* space-y-4 */
          }

          .form-group {
            margin-bottom: 1rem; /* mb-4 removed from parent, added here for consistency */
          }

          .form-label {
            display: block;
            color: var(--text-color-dark); /* text-gray-700 */
            font-size: 0.875rem; /* text-sm */
            font-weight: 700; /* font-bold */
            margin-bottom: 0.5rem; /* mb-2 */
          }

          .form-input, .form-textarea {
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow */
            appearance: none;
            border: 1px solid #D1D5DB; /* border */
            border-radius: 0.5rem; /* rounded-lg */
            width: 100%;
            padding: 0.5rem 0.75rem; /* py-2 px-3 */
            color: var(--text-color-dark); /* text-gray-700 */
            line-height: 1.25; /* leading-tight */
            outline: none;
            transition: all 0.2s ease-in-out;
            resize: vertical; /* Only allow vertical resize for textarea */
          }

          .form-input:focus, .form-textarea:focus {
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3); /* focus:shadow-outline */
            border-color: var(--primary-blue); /* focus:border-blue-500 */
          }

          .action-button {
            background-color: var(--purple-color); /* bg-purple-600 */
            color: white; /* text-white */
            font-weight: 700; /* font-bold */
            padding: 0.75rem 1.5rem; /* py-3 px-6 */
            border-radius: 9999px; /* rounded-full */
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
            transition: all 0.3s ease-in-out; /* transition-all duration-300 */
            border: none;
            cursor: pointer;
            display: inline-block; /* to apply text-align and margin auto */
            margin-top: 1rem;
          }

          .action-button:hover {
            background-color: var(--dark-purple); /* hover:bg-purple-700 */
            transform: scale(1.05); /* transform hover:scale-105 */
          }

          .action-button:disabled {
            opacity: 0.5; /* disabled:opacity-50 */
            cursor: not-allowed; /* disabled:cursor-not-allowed */
            transform: none;
          }

          .error-message {
            background-color: #FEE2E2; /* bg-red-100 */
            border: 1px solid #FCA5A5; /* border border-red-400 */
            color: #B91C1C; /* text-red-700 */
            padding: 0.75rem 1rem; /* px-4 py-3 */
            border-radius: 0.5rem; /* rounded-lg */
            position: relative;
            margin-bottom: 1rem; /* mb-4 */
          }

          .error-strong {
            font-weight: 700; /* font-bold */
          }

          .error-text {
            display: block; /* block */
            margin-left: 0.5rem; /* sm:inline ml-2 */
          }

          @media (min-width: 640px) { /* sm breakpoint */
            .error-text {
              display: inline;
            }
          }

          .draft-output-box {
            background-color: #EFF6FF; /* bg-blue-50 */
            border: 1px solid #BFDBFE; /* border border-blue-200 */
            color: var(--dark-blue); /* text-blue-800 */
            padding: 1.5rem; /* p-6 */
            border-radius: 0.5rem; /* rounded-lg */
            position: relative;
            margin-top: 1.5rem; /* mt-6 */
          }

          .draft-title {
            font-size: 1.25rem; /* text-xl */
            font-weight: 700; /* font-bold */
            margin-bottom: 0.75rem; /* mb-3 */
          }

          .draft-text {
            white-space: pre-wrap; /* whitespace-pre-wrap */
            line-height: 1.6; /* leading-relaxed */
          }

          .copy-button {
            margin-top: 1rem; /* mt-4 */
            background-color: var(--medium-blue); /* bg-blue-500 */
            color: white; /* text-white */
            font-weight: 700; /* font-bold */
            padding: 0.5rem 1rem; /* py-2 px-4 */
            border-radius: 9999px; /* rounded-full */
            font-size: 0.875rem; /* text-sm */
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* shadow */
            transition: all 0.3s ease-in-out; /* transition-all duration-300 */
            border: none;
            cursor: pointer;
          }

          .copy-button:hover {
            background-color: var(--primary-blue); /* hover:bg-blue-600 */
          }

          .footer-section {
            width: 100%;
            max-width: 960px; /* max-w-4xl */
            text-align: center;
            margin-top: 2.5rem; /* mt-10 */
            padding: 1.5rem; /* p-6 */
            background-color: var(--primary-blue); /* bg-blue-700 */
            color: white; /* text-white */
            border-radius: 0.75rem; /* rounded-xl */
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
          }

          .footer-title {
            font-size: 1.875rem; /* text-3xl */
            font-weight: 700; /* font-bold */
            margin-bottom: 1rem; /* mb-4 */
          }

          @media (min-width: 640px) { /* sm breakpoint */
            .footer-title {
              font-size: 2.25rem; /* sm:text-4xl */
            }
          }

          .footer-text {
            font-size: 1.125rem; /* text-lg */
            margin-bottom: 1.5rem; /* mb-6 */
          }

          @media (min-width: 640px) { /* sm breakpoint */
            .footer-text {
              font-size: 1.25rem; /* sm:text-xl */
            }
          }

          .contact-buttons-container {
            display: flex;
            flex-direction: column; /* flex-col */
            justify-content: center;
            gap: 1rem; /* space-y-4 */
          }

          @media (min-width: 640px) { /* sm breakpoint */
            .contact-buttons-container {
              flex-direction: row; /* sm:flex-row */
              gap: 1rem; /* sm:space-x-4 */
              margin-left: 0; /* Resetting space-y-0 equivalent */
            }
          }

          .contact-button {
            display: inline-block; /* inline-block */
            font-weight: 700; /* font-bold */
            padding: 0.75rem 2rem; /* py-3 px-8 */
            border-radius: 9999px; /* rounded-full */
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-lg */
            transition: all 0.3s ease-in-out; /* transition-all duration-300 */
            text-decoration: none; /* remove underline for links */
            transform: scale(1); /* Ensure initial scale is 1 */
            border: none;
            cursor: pointer;
          }

          .contact-button:hover {
            transform: scale(1.05); /* transform hover:scale-105 */
          }

          .white-button {
            background-color: white; /* bg-white */
            color: var(--primary-blue); /* text-blue-700 */
          }

          .white-button:hover {
            background-color: var(--light-blue); /* hover:bg-blue-100 */
          }

          .blue-button {
            background-color: var(--medium-blue); /* bg-blue-500 */
            color: white; /* text-white */
          }

          .blue-button:hover {
            background-color: var(--primary-blue); /* hover:bg-blue-600 */
          }

          .footer-info {
            font-size: 0.875rem; /* text-sm */
            margin-top: 1.5rem; /* mt-6 */
          }

          /* Animations */
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* ROI Section Specific Styles */
          .roi-card {
            background-color: #F8FAFC; /* Light gray background */
            border: 1px solid #E2E8F0; /* Light border */
            border-radius: 0.75rem; /* Rounded corners */
            padding: 1.5rem; /* Padding */
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .roi-item {
            background-color: #FFFFFF; /* White background for each item */
            border: 1px solid #E2E8F0; /* Light border */
            border-radius: 0.5rem; /* Rounded corners */
            padding: 1rem; /* Padding */
          }

          .roi-label {
            font-size: 1.125rem; /* text-lg */
            font-weight: 700; /* font-bold */
            color: var(--dark-blue); /* Darker text */
            margin-bottom: 0.5rem;
            display: block;
          }

          .roi-list {
            list-style: none; /* No bullets */
            padding: 0;
            margin: 0;
            line-height: 1.6;
            color: var(--text-color-medium);
          }

          .roi-list li strong {
            color: var(--text-color-dark);
          }

          .final-roi {
            background-color: #ECFDF5; /* Light green background */
            border-color: var(--green-color); /* Green border */
            font-weight: 700;
          }

          .final-roi .roi-label {
            color: var(--green-color); /* Green text */
            font-size: 1.25rem;
          }

          .roi-disclaimer {
            font-size: 0.875rem;
            color: var(--text-color-light);
            margin-top: 1rem;
            font-style: italic;
          }

          @media (min-width: 768px) { /* md breakpoint */
            .roi-card {
              flex-direction: row;
              flex-wrap: wrap;
              justify-content: space-between;
            }
            .roi-item {
              flex: 1 1 calc(50% - 0.75rem); /* Two columns on larger screens */
              max-width: calc(50% - 0.75rem);
            }
            .final-roi {
              flex: 1 1 100%; /* Full width for the final ROI */
              max-width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default App;
