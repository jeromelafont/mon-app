import React, { useState } from 'react';

// Main App Component
const App = () => {
  // State for password protection
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Password for the app
  const CORRECT_PASSWORD = 'Marketparts';

  // Function to handle password submission
  const handleLogin = () => {
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  // State to manage which section is active in the interactive display
  // Order of tabs: 'challenge', 'solution', 'benefits', 'expectations', 'pricing', 'roi-calculation'
  const [activeSection, setActiveSection] = useState('challenge'); 

  // States for LLM feature (currently hidden but functionality remains)
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
  // This functionality is still present even if the tab is hidden
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
      
      const apiKey = ""; 
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

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

  // Render password input if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Enter Password to Access "Manufacturers offers"</h2>
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }}
            placeholder="Password"
          />
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          {passwordError && <p className="login-error">{passwordError}</p>}
        </div>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');

            :root {
              --midnight-blue: #002074;
              --true-blue: #1a7dff;
              --white: #ffffff;
            }

            body {
              font-family: 'Inter', sans-serif;
              margin: 0;
              background-color: #000000; /* Black background */
              color: var(--white);
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
            }
            .login-container {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              width: 100%;
              background-color: #000000;
            }
            .login-box {
              background-color: var(--midnight-blue);
              padding: 2.5rem;
              border-radius: 0.75rem;
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
              text-align: center;
              max-width: 400px;
              width: 90%;
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .login-title {
              font-size: 1.75rem;
              font-weight: 700;
              color: var(--true-blue);
              margin-bottom: 1.5rem;
            }
            .login-input {
              width: calc(100% - 20px);
              padding: 0.75rem 10px;
              margin-bottom: 1rem;
              border-radius: 0.5rem;
              border: 1px solid rgba(255, 255, 255, 0.3);
              background-color: rgba(255, 255, 255, 0.05);
              color: var(--white);
              font-size: 1rem;
            }
            .login-input::placeholder {
              color: rgba(255, 255, 255, 0.6);
            }
            .login-input:focus {
              outline: none;
              border-color: var(--true-blue);
              box-shadow: 0 0 0 3px rgba(26, 125, 255, 0.3);
            }
            .login-button {
              background-color: var(--true-blue);
              color: var(--white);
              padding: 0.75rem 1.5rem;
              border-radius: 0.5rem;
              border: none;
              font-size: 1rem;
              font-weight: 600;
              cursor: pointer;
              transition: background-color 0.3s ease, transform 0.2s ease;
            }
            .login-button:hover {
              background-color: #0060d4; /* Darker true blue */
              transform: translateY(-2px);
            }
            .login-error {
              color: #EF4444; /* Red color for error */
              margin-top: 1rem;
              font-size: 0.9rem;
            }
          `}
        </style>
      </div>
    );
  }

  // Render the main app content if authenticated
  return (
    // Main container for the entire application
    <div className="app-container">
      {/* Header Section */}
      <header className="header-section">
        <h1 className="main-title">
          Manufacturers offers
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
        <SectionTitle sectionId="expectations">Our Partnership: Your Role</SectionTitle>
        <SectionTitle sectionId="pricing">Pricing Model</SectionTitle>
        <SectionTitle sectionId="roi-calculation">ROI Calculation</SectionTitle>
        {/* AI Communication tab is hidden */}
        {/* <SectionTitle sectionId="llm-feature">✨ AI Communication</SectionTitle> */}
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
              The Challenge: When 3% of Ruptures Threaten 100% of Your Business
            </h2>
            <p className="section-text">
              Stock-outs are a constant challenge, but the real threat lies in **strategic ruptures** – especially those affecting **"fast movers"**. For an equipment manufacturer with an annual revenue of **€100 million**, an overall 10% rupture rate already represents significant risk. However, the critical impact comes from the **3% of these ruptures that concern "fast movers"**. These high-demand parts are crucial for your clients (distributors, workshops), as their absence leads to **direct and immediate lost revenue** for the end-customer.
            </p>
            <ul className="bullet-list">
              <li>**Direct Financial Impact on Clients:** A workshop cannot perform repairs, a distributor cannot sell. This directly translates to lost earnings and severe frustration for your customers.</li>
              <li>**Erosion of Trust and Brand Image:** When critical parts are unavailable, client trust erodes. Customers start seeking alternatives, including from competitors, directly threatening your **market share** and **customer lifetime value (CLV)**.</li>
              <li>**Compliance & Reputation Risk:** Unmanaged ruptures can lead to contractual penalties with large distributors or warranty issues, highlighting a lack of **compliance** and damaging your reputation as a reliable supplier.</li>
              <li>**Internal Resource Drain:** Managing these strategic ruptures diverts your sales and after-sales teams from value-generating tasks, leading to unproductive time and increased operational costs.</li>
            </ul>
            <p className="section-text">
              These **3% of strategic ruptures** are not just "incidents"; they are **critical failure points** that can have disproportionate repercussions on your revenue, reputation, and operational **compliance**.
            </p>
          </section>
        )}

        {activeSection === 'solution' && (
          <section className="content-section animate-fade-in">
            <h2 className="section-heading solution-heading">
              {/* Icon for Solution */}
              <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Our Solution: Comprehensive Risk Mitigation, Integrating Compliance & Marketparts Assets
            </h2>
            <p className="section-text">
              Marketparts offers an integrated approach to transform strategic ruptures into a demonstration of your excellence and commitment to **compliance**. We leverage our unique **assets** to provide a seamless and effective solution.
            </p>
            <h3 className="sub-heading">How We Operate:</h3>
            <ul className="icon-list">
              <li>
                <svg className="list-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"></path>
                </svg>
                <div>
                  <strong className="list-item-strong">Proactive & Compliant Detection (Leveraging Marketparts Algorithms):</strong> <br/>
                  We integrate our **advanced AI algorithms** and systems with your ERP and your connected distributor network. This enables real-time analysis of **stock data** and demand patterns, instantly identifying ruptures, especially those critical **"fast movers"**. All data handling strictly adheres to **GDPR/RGPD compliance** and established data privacy agreements, ensuring secure and lawful operations.
                </div>
              </li>
              <li>
                <svg className="list-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <div>
                  <strong className="list-item-strong">Validated Communication & Co-Communication (Marketparts Expert Teams):</strong> <br/>
                  Upon identifying a strategic rupture, our **dedicated team of communication experts** initiates proactive contact with the impacted client, acting **in your name** and using your **pre-approved brand tone and messaging**. Communication scripts are developed and validated with you to ensure **compliance** with your internal policies and any industry-specific regulations. This collaborative approach reinforces your brand's commitment.
                </div>
              </li>
              <li>
                <svg className="list-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 100 4m-4 10a2 2 0 100 4m10-4a2 2 0 100 4m-8-12l9 9H3L9 5z"></path>
                </svg>
                <div>
                  <strong className="list-item-strong">Optimized Fulfillment via Marketparts Network (Our Proprietary Network & Platform):</strong> <br/>
                  Leveraging our **extensive proprietary network of connected distributors** and their real-time stock availability, we swiftly identify alternative sources for the missing part. We facilitate the transaction to ensure the part reaches the end-customer. While you may not directly book this specific sale, you **prevent a permanent lost sale** and **protect your market share**. All transactions are facilitated through our **secure platform**, ensuring **commercial and logistical compliance** with agreed-upon terms.
                </div>
              </li>
              <li>
                <svg className="list-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                <div>
                  <strong className="list-item-strong">Transparent Reporting & Continuous Improvement (Marketparts' Risk Intelligence Tools):</strong> <br/>
                  We provide detailed, **compliant reports** on resolution times, client satisfaction, and the specific impact on strategic ruptures. The granular data collected through our **risk intelligence tools** helps you identify recurring weaknesses in your supply chain and forecast demand more accurately, leading to long-term operational improvements and fewer future "sinistres".
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
              Your Immediate Added Value: A Partnership for Growth & Protection
            </h2>
            <p className="section-text">
              While Marketparts already has experience with your clients, this **new partnership model** offers a deeper, more integrated approach that unlocks significant benefits directly for your business. We move beyond simple management to becoming a strategic extension of your brand, **protecting your market share and client relationships** even when you can't deliver directly.
            </p>
            <ul className="icon-list">
              <li>
                <svg className="list-icon purple-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                  <strong className="list-item-strong">Client Retention & Brand Integrity (Your Loyalty Insurance):</strong>
                  We ensure your customers remain loyal to *your* brand, even when you face stock-outs. By acting **in your name** and finding alternative fulfillment via our network, we prevent your clients from turning to competitors. This preserves your hard-earned client relationships and reinforces your brand's reputation for reliability and customer care, regardless of direct delivery source, acting as a direct **protection of your customer lifetime value**.
                </div>
              </li>
              <li>
                <svg className="list-icon purple-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2"></path>
                </svg>
                <div>
                  <strong className="list-item-strong">Resource Optimization & Strategic Focus (Reducing Operational Exposure):</strong>
                  Free your internal sales, logistics, and after-sales teams from the reactive burden of managing stock-out crises. This isn't just about offloading work; it's about enabling your most valuable talent to focus on core business activities, strategic growth initiatives, product innovation, and expanding market share. Think of us as your **"operational claims department,"** handling the heavy lifting and freeing your internal adjusters.
                </div>
              </li>
              <li>
                <svg className="list-icon purple-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <div>
                  <strong className="list-item-strong">Market Share Protection & Lost Sale Mitigation (Your Market Share Coverage Policy):</strong>
                  Our service directly counters the risk of losing market share due to non-delivery. By ensuring your customers still receive the part (even if via another distributor in your ecosystem), we prevent competitors from stepping in and capturing *your* customer base. This is a critical investment in maintaining your competitive position, essentially a **"policy against competitive encroachment"**.
                </div>
              </li>
              <li>
                <svg className="list-icon purple-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <strong className="list-item-strong">Valuable Supply Chain Insights & Continuous Improvement (Risk Intelligence & Underwriting Data):</strong>
                  Beyond reactive solutions, our detailed analysis of rupture patterns and distributor network demands provides you with invaluable data. This intelligence helps you proactively identify weaknesses in your own supply chain and demand forecasting, leading to long-term operational improvements and fewer future stock-outs. We provide you with the **"risk intelligence"** needed to refine your own "underwriting" (supply chain planning).
                </div>
              </li>
            </ul>
          </section>
        )}

        {activeSection === 'pricing' && (
          <section className="content-section animate-fade-in">
            <h2 className="section-heading pricing-heading">
              {/* Icon for Pricing */}
              <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Our Pricing Model: Fixed + Incentive on Value Preserved
            </h2>
            <p className="section-text">
              We've designed a pricing model that combines the **predictability of a subscription** with a **performance-based incentive aligned with the value we preserve** for your business.
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
                  In addition to the fixed fees, an incentive is applied as a **percentage of the Ex-Tax Revenue (CA HT)** of each stock-out transaction where we successfully found an alternative fulfillment via our network. This is your investment for the service that ensures the sale remains within your ecosystem and prevents customer churn.
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
                  <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0_003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
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

        {activeSection === 'roi-calculation' && (
          <section className="content-section animate-fade-in">
            <h2 className="section-heading benefits-heading"> {/* Using benefits-heading for ROI icon color */}
              {/* Icon for ROI Calculation */}
              <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Return on Investment (ROI): The Strategic Value of Our Partnership
            </h2>
            <p className="section-text">
              The true value of Marketparts is akin to a **strategic insurance policy** for your business. We don't just generate sales; we **prevent costly losses** and **preserve critical assets** (client relationships, market share) that are directly impacted by stock-outs. The ROI demonstrates that the investment in Marketparts is significantly outweighed by the value of the risks we mitigate.
            </p>

            <div className="roi-card">
              <div className="roi-item">
                <span className="roi-label">Step 1: Quantifying Your Current Risk Exposure (Monthly)</span>
                <p className="roi-sub-label">What is the potential financial and operational cost if crucial stock-out situations are *not* effectively managed today?</p>
                <ul className="roi-list">
                  <li>Total Annual Revenue (illustrative): **€100,000,000**</li>
                  <li>Monthly Revenue: **€8,333,333** (approx.)</li>
                  <li>**Overall Rupture Rate (Current Service Rate 90%):** **10%** of Monthly Revenue = **€833,333**</li>
                  <li className="nested-li">
                    <small>(This is the total value of orders facing rupture, both strategic and non-strategic)</small>
                  </li>
                  <li>**Strategic Rupture Rate (Fast Movers):** **3%** of Monthly Revenue = **€250,000**</li>
                  <li className="nested-li">
                    <small>(These are the critical ruptures leading to direct client loss of earnings, and are Marketparts' primary target for intervention.)</small>
                  </li>
                  <li className="nested-li">
                    <small>Estimated percentage of these strategic ruptures (€250,000) that are *permanently lost* or *diverted to competitors* without Marketparts' intervention:</small> **50%**
                  </li>
                  <li>**A. Estimated Direct Lost Revenue (Cost of Unmanaged Risk):** €250,000 * 50% = **€125,000**</li>
                  <li className="nested-li">
                    <small>*(This represents the sales value that would be irrevocably lost from your ecosystem.)*</small>
                  </li>
                  <li>Estimated Internal Team Time Loss (for *all* 50 cases of rupture, strategic and non-strategic, leading to internal handling/frustration): **2 hours / case**</li>
                  <li>Number of monthly rupture cases (approximated based on €250,000 strategic value / €5,000 avg order value): **50 cases**</li>
                  <li>Average Cost of Internal Team Time (fully loaded): **€40 / hour**</li>
                  <li>**B. Operational Cost of Unmanaged Risk (Internal Team Time):** 50 cases * 2 hours * €40/hour = **€4,000**</li>
                  <li className="nested-li">
                    <small>*(This is the cost of internal resources tied up in unproductive crisis management.)*</small>
                  </li>
                  <li className="summary-line">
                    **Total Estimated Monthly Cost of Unmanaged Strategic Rupture Risk (A+B):** **€125,000 (Lost Sales) + €4,000 (Operational) = €129,000**
                    <li className="nested-li"><small>*(This is the "bill" your company effectively pays each month for unmitigated stock-out risks.)*</small></li>
                  </li>
                </ul>
              </div>
              <div className="roi-item">
                <span className="roi-label">Step 2: Marketparts' Risk Mitigation & Value Preservation (Monthly)</span>
                <p className="roi-sub-label">How effectively do we reduce this risk and preserve value for your business?</p>
                <ul className="roi-list">
                  <li>**Marketparts' Strategic Rupture Resolution Rate:** Marketparts successfully resolves **90%** of the **strategic ruptures** (€250,000 value).</li>
                  <li className="nested-li">
                    <small>(This means 90% of the €250,000 in strategic sales value is salvaged via our network. Your effective service rate for *these critical orders* improves significantly.)</small>
                  </li>
                  <li>**C. Commercial Value Preserved / Lost Sales Avoided:** €250,000 * 90% = **€225,000**</li>
                  <li className="nested-li">
                    <small>*(This is the revenue that would have been lost or permanently diverted from your ecosystem without Marketparts' intervention. It's the "indemnification" of lost sales.)*</small>
                  </li>
                  <li>**D. Operational Cost Savings (Internal Team Time):** By taking over the management of these 50 rupture cases, we absorb the operational burden: **€4,000**</li>
                  <li className="nested-li">
                    <small>*(This is the direct saving from freeing your internal teams for strategic work.)*</small>
                  </li>
                  <li className="summary-line">
                    **Total Value Preserved by Marketparts (C+D):** **€225,000 (Commercial Value Preserved) + €4,000 (Operational Savings) = €229,000**
                    <li className="nested-li"><small>*(This is the total value Marketparts "returns" to your company each month by protecting against critical losses.)*</small></li>
                  </li>
                </ul>
              </div>
              <div className="roi-item">
                <span className="roi-label">Step 3: Marketparts Service Cost (Monthly)</span>
                <p className="roi-sub-label">Your investment in Marketparts' comprehensive risk mitigation solution (Your "Insurance Premium").</p>
                <ul className="roi-list">
                  <li>Monthly Fixed Fee (illustrative): **€3,000**</li>
                  <li>Monthly Incentive Fee (5% of €250,000 total managed value): **€12,500**</li>
                  <li className="summary-line">
                    **Total Monthly Cost of Marketparts Service:** **€3,000 + €12,500 = €15,500**
                  </li>
                </ul>
              </div>
              <div className="roi-item final-roi">
                <span className="roi-label">Step 4: Your Net Financial Gain & Estimated ROI</span>
                <p className="roi-sub-label">The tangible financial benefit of partnering with Marketparts: **Risk Reduced vs. Cost Incurred.**</p>
                <ul className="roi-list">
                  <li>**Net Monthly Value (Total Value Preserved - Total Marketparts Cost):** €229,000 - €15,500 = **€213,500**</li>
                  <li className="summary-line">
                    **Estimated Return on Investment (ROI):** (€213,500 / €15,500) * 100% ≈ **1377%**
                  </li>
                </ul>
                <p className="roi-disclaimer">
                  *This example is illustrative and uses generalized assumptions. Your actual ROI will depend on your specific volumes, order values, the severity of stock-outs, and our tailored agreements. The ROI represents the financial value of losses prevented and internal resources optimized. **A positive ROI indicates that the value of the risk mitigated exceeds the cost of the service.** *
                </p>
              </div>
            </div>
            <p className="section-text mt-6">
              By working hand-in-hand, we can ensure that every stock-out is managed with maximum efficiency, transparency, and care, turning potential frustration into a testament to your customer commitment.
            </p>
          </section>
        )}

        {/* AI Communication tab is hidden, but functionality remains */}
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
                  className="form-textarea"
                  rows="3"
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

      {/* Footer is removed as per request */}
      {/* <footer className="footer-section">
        <h2 className="footer-title">
          Ready to turn your stock-outs into a competitive advantage?
        </h2>
        <p className="footer-text">
          Contact us for a personalized study and demonstration.
        </p>
        <div className="contact-buttons-container">
          <a
            href="mailto:contact@marketparts.com" 
            className="contact-button white-button"
          >
            Email Us
          </a>
          <a
            href="tel:+33123456789" 
            className="contact-button blue-button"
          >
            Call Us
          </a>
        </div>
        <p className="footer-info">
          Marketparts Team | Marketparts.com
        </p>
      </footer> */}

      {/* Standard CSS Styles */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');

          :root {
            /* Marketparts Brand Colors */
            --midnight-blue: #002074;
            --true-blue: #1a7dff;
            --white: #ffffff;
            --indigo-purple: #4b0082;
            
            /* Derived Dark Theme Colors */
            --dark-background-primary: #000000; /* True black background */
            --dark-card-background: var(--midnight-blue);   /* Midnight Blue for main content/card backgrounds */
            
            /* Enhanced Text Colors for Readability on Dark Backgrounds */
            --dark-text-primary: var(--white); /* Pure white for primary text, headings, strong */
            --dark-text-secondary: rgba(255, 255, 255, 0.95); /* Very light gray for general text */
            --dark-text-tertiary: rgba(255, 255, 255, 0.7); /* Lighter gray for subtle text/notes */
            
            /* Derived Light/Accent Colors (functional colors, adapted for dark theme) */
            --light-true-blue: #EBF5FF; /* A very light shade of true blue for accents (e.g., hover on white button) */
            --darker-true-blue: #0060d4; /* A slightly darker shade of true blue for hovers */
            --red-color: #EF4444;   /* For errors, alerts */
            --green-color: #10B981; /* For success, positive highlights */
            --orange-color: #F97316; /* For warnings, highlights */
            --light-orange: #FFEDD5; /* Lighter shade of orange */
            --pink-color: #EC4899;  /* For AI feature accent */
          }

          body {
            margin: 0;
            font-family: 'Inter', sans-serif;
            background-color: var(--dark-background-primary); /* Primary dark background */
            color: var(--dark-text-primary); /* Primary text white */
            -webkit-font-smoothing: antialiased;
            -moz-osx-osx-font-smoothing: grayscale;
          }

          .app-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1.5rem; 
            background-color: var(--dark-background-primary); /* Consistent primary background */
          }

          .header-section {
            width: 100%;
            max-width: 960px; 
            text-align: center;
            margin-bottom: 2.5rem; 
            margin-top: 1rem; 
          }

          .main-title {
            font-size: 2.25rem; 
            line-height: 1.25; 
            font-weight: 800; 
            color: var(--true-blue); /* Main title in True Blue for contrast */
            margin-bottom: 1rem; 
            border-radius: 0.5rem; 
            padding: 0.5rem; 
          }

          .subtitle {
            font-size: 1.25rem; 
            color: var(--dark-text-secondary); /* Secondary text on dark background */
          }

          @media (min-width: 640px) { 
            .main-title {
              font-size: 3rem; 
            }
            .subtitle {
              font-size: 1.5rem; 
            }
            .app-container {
                padding: 1.5rem 2.5rem; 
            }
          }

          @media (min-width: 1024px) { 
            .app-container {
                padding: 2rem 3rem; 
            }
          }

          .nav-bar {
            display: flex;
            flex-wrap: nowrap; /* Ensure tabs stay on one line */
            overflow-x: auto; /* Allow horizontal scrolling on small screens if necessary */
            justify-content: center;
            gap: 0.75rem; 
            margin-bottom: 2.5rem; 
            width: 100%;
            max-width: 960px; 
            padding-bottom: 0.5rem; /* Add padding for scrollbar on small screens */
          }

          @media (min-width: 640px) { 
            .nav-bar {
              gap: 1rem; 
              overflow-x: visible; /* Disable scroll on larger screens */
            }
          }

          .nav-button {
            flex-shrink: 0; /* Prevent buttons from shrinking */
            padding: 0.5rem 1rem; 
            font-size: 1.125rem; 
            font-weight: 600; 
            border-radius: 0.5rem; 
            transition: all 0.3s ease-in-out; 
            background-color: var(--midnight-blue); /* Dark background for inactive buttons */
            color: var(--dark-text-primary); /* White text for inactive buttons */
            border: none;
            cursor: pointer;
          }

          .nav-button:hover {
            background-color: var(--darker-true-blue); /* Darker True Blue on hover */
            color: var(--white);
          }

          .nav-button-active {
            background-color: var(--true-blue); /* True Blue when active */
            color: var(--white); /* White text */
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Stronger shadow on dark theme */
          }

          .main-content {
            width: 100%;
            max-width: 960px; 
            background-color: var(--dark-card-background); /* Midnight Blue for content areas */
            padding: 1.5rem; 
            border-radius: 0.75rem; 
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1); /* Stronger shadow */
            border: 1px solid rgba(255, 255, 255, 0.1); /* Subtle light border for definition */
          }

          @media (min-width: 640px) { 
            .main-content {
              padding: 2rem; 
            }
          }

          .content-section {
            animation: fadeIn 0.5s ease-out; 
          }

          .section-heading {
            font-size: 1.875rem; 
            font-weight: 700; 
            color: var(--dark-text-primary); /* White for headings */
            margin-bottom: 1rem; 
            display: flex;
            align-items: center;
          }

          .section-icon {
            width: 2rem; 
            height: 2rem; 
            margin-right: 0.75rem; 
          }

          .challenge-heading .section-icon { color: var(--red-color); } 
          .solution-heading .section-icon { color: var(--green-color); } 
          .benefits-heading .section-icon { color: var(--indigo-purple); } 
          .pricing-heading .section-icon { color: var(--true-blue); } 
          .expectations-heading .section-icon { color: var(--orange-color); } 
          .llm-heading .section-icon { color: var(--pink-color); } 

          .section-text {
            font-size: 1.125rem; 
            color: var(--dark-text-secondary); /* Now very light gray */
            line-height: 1.6; 
            margin-bottom: 1rem; 
          }

          .bullet-list {
            list-style-type: disc;
            padding-left: 1.25rem; 
            color: var(--dark-text-secondary); /* Now very light gray */
            line-height: 1.5; 
          }
          .bullet-list li {
            margin-bottom: 0.5rem;
          }

          .sub-heading {
            font-size: 1.25rem; 
            font-weight: 600; 
            color: var(--dark-text-primary); /* White for subheadings */
            margin-bottom: 0.75rem; 
          }

          .icon-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 1rem; 
          }

          .icon-list li {
            display: flex;
            align-items: flex-start;
          }

          .list-icon {
            width: 1.5rem; 
            height: 1.5rem; 
            margin-right: 0.75rem; 
            color: var(--true-blue); /* True Blue for general icons */
            flex-shrink: 0;
            margin-top: 0.25rem; 
          }
          .purple-icon {
            color: var(--indigo-purple); /* Indigo Purple for specific benefit icons */
          }

          .list-item-strong {
            color: var(--dark-text-primary); /* White for strong text */
            font-weight: 700;
          }

          .card-container {
            display: flex;
            flex-direction: column;
            gap: 1.5rem; 
          }

          .info-card {
            padding: 1.5rem; 
            border-radius: 0.5rem; 
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
            border-left-width: 0.25rem; 
            background-color: var(--dark-card-background); /* Midnight Blue for info cards */
            border-color: rgba(255, 255, 255, 0.1); /* Subtle light border */
          }

          .blue-card {
            border-left-color: var(--true-blue); /* True Blue border */
          }

          .green-card {
            border-left-color: var(--green-color); /* Green border */
          }

          .orange-card {
            border-left-color: var(--orange-color); /* Orange border */
          }

          .card-title {
            font-size: 1.5rem; 
            font-weight: 700; 
            color: var(--dark-text-primary); /* White for card titles */
            margin-bottom: 0.5rem; 
            display: flex;
            align-items: center;
          }

          .card-title.card-title-icon {
            color: var(--orange-color); 
          }

          .card-bullet {
            margin-right: 0.5rem; 
            font-size: 1.5rem; 
          }
          .blue-bullet { color: var(--true-blue); } 
          .green-bullet { color: var(--green-color); } 

          .card-icon {
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 0.5rem;
            color: var(--orange-color);
          }

          .card-text {
            font-size: 1.125rem; 
            color: var(--dark-text-secondary); /* Now very light gray */
            margin-bottom: 0.75rem; 
          }

          .card-price {
            font-size: 1.25rem; 
            font-weight: 600; 
            color: var(--true-blue); /* True Blue for prices */
          }

          .card-price-value {
            font-size: 1.875rem; 
            font-weight: 800; 
          }

          .card-note {
            font-size: 0.875rem; 
            color: var(--dark-text-tertiary); /* Now brighter gray */
            margin-top: 0.5rem; 
          }

          .form-group-container {
            margin-bottom: 1.5rem; 
            display: flex;
            flex-direction: column;
            gap: 1rem; 
          }

          .form-group {
            margin-bottom: 1rem; 
          }

          .form-label {
            display: block;
            color: var(--dark-text-secondary); /* Now very light gray */
            font-size: 0.875rem; 
            font-weight: 700; 
            margin-bottom: 0.5rem; 
          }

          .form-input, .form-textarea {
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); 
            appearance: none;
            border: 1px solid rgba(255, 255, 255, 0.2); 
            border-radius: 0.5rem; 
            width: 100%;
            padding: 0.5rem 0.75rem; 
            background-color: rgba(255, 255, 255, 0.05); 
            color: var(--dark-text-primary); 
            line-height: 1.25; 
            outline: none;
            transition: all 0.2s ease-in-out;
            resize: vertical; 
          }

          .form-input:focus, .form-textarea:focus {
            box-shadow: 0 0 0 3px rgba(26, 125, 255, 0.3); 
            border-color: var(--true-blue); 
          }

          .action-button {
            background-color: var(--indigo-purple); 
            color: var(--white); 
            font-weight: 700; 
            padding: 0.75rem 1.5rem; 
            border-radius: 9999px; 
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1); 
            transition: all 0.3s ease-in-out; 
            border: none;
            cursor: pointer;
            display: inline-block; 
            margin-top: 1rem;
          }

          .action-button:hover {
            background-color: #3b0066; 
            transform: scale(1.05); 
          }

          .action-button:disabled {
            opacity: 0.5; 
            cursor: not-allowed; 
            transform: none;
          }

          .error-message {
            background-color: #440000; 
            border: 1px solid #FF0000; 
            color: #FFCCCC; 
            padding: 0.75rem 1rem; 
            border-radius: 0.5rem; 
            position: relative;
            margin-bottom: 1rem; 
          }

          .error-strong {
            font-weight: 700; 
          }

          .error-text {
            display: block; 
            margin-left: 0.5rem; 
          }

          @media (min-width: 640px) { 
            .error-text {
              display: inline;
            }
          }

          .draft-output-box {
            background-color: var(--midnight-blue); 
            border: 1px solid var(--true-blue); 
            color: var(--dark-text-primary); 
            padding: 1.5rem; 
            border-radius: 0.5rem; 
            position: relative;
            margin-top: 1.5rem; 
          }

          .draft-title {
            font-size: 1.25rem; 
            font-weight: 700; 
            margin-bottom: 0.75rem; 
          }

          .draft-text {
            white-space: pre-wrap; 
            line-height: 1.6; 
          }

          .copy-button {
            margin-top: 1rem; 
            background-color: var(--true-blue); 
            color: var(--white); 
            font-weight: 700; 
            padding: 0.5rem 1rem; 
            border-radius: 9999px; 
            font-size: 0.875rem; 
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); 
            transition: all 0.3s ease-in-out; 
            border: none;
            cursor: pointer;
          }

          .copy-button:hover {
            background-color: var(--darker-true-blue); 
          }

          /* ROI Section Specific Styles */
          .roi-card {
            background-color: var(--midnight-blue); 
            border: 1px solid rgba(255, 255, 255, 0.1); 
            border-radius: 0.75rem; 
            padding: 1.5rem; 
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); 
          }

          .roi-item {
            background-color: rgba(255, 255, 255, 0.05); 
            border: 1px solid rgba(255, 255, 255, 0.1); 
            border-radius: 0.5rem; 
            padding: 1rem; 
          }

          .roi-label {
            font-size: 1.125rem; 
            font-weight: 700; 
            color: var(--true-blue); 
            margin-bottom: 0.5rem;
            display: block;
          }

          .roi-sub-label {
            font-size: 0.95rem;
            color: var(--dark-text-secondary); 
            margin-bottom: 0.75rem;
            font-style: italic;
          }

          .roi-list {
            list-style: none; 
            padding: 0;
            margin: 0;
            line-height: 1.6;
            color: var(--dark-text-secondary); 
          }

          .roi-list li strong {
            color: var(--dark-text-primary); 
          }

          .roi-list .nested-li {
            font-size: 0.9rem;
            color: var(--dark-text-tertiary); 
            margin-left: 1.25rem;
            margin-top: 0.25rem;
            margin-bottom: 0.25rem;
          }
          .roi-list .nested-li small {
            font-style: italic;
          }

          .roi-list .summary-line {
            font-weight: 700;
            color: var(--true-blue); 
            margin-top: 0.75rem;
            border-top: 1px dashed rgba(255, 255, 255, 0.2); 
            padding-top: 0.5rem;
          }

          .final-roi {
            background-color: rgba(16, 185, 129, 0.15); 
            border-color: var(--green-color); 
            font-weight: 700;
          }

          .final-roi .roi-label {
            color: var(--green-color); 
            font-size: 1.25rem;
          }

          .roi-disclaimer {
            font-size: 0.875rem;
            color: var(--dark-text-tertiary); 
            margin-top: 1rem;
            font-style: italic;
          }

          @media (min-width: 768px) { 
            .roi-card {
              flex-direction: row;
              flex-wrap: wrap;
              justify-content: space-between;
            }
            .roi-item {
              flex: 1 1 calc(50% - 0.75rem); 
              max-width: calc(50% - 0.75rem);
            }
            .final-roi {
              flex: 1 1 100%; 
              max-width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default App;
