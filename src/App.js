import React, { useState } from 'react';

// Helper component for section titles (navigation buttons within an offer)
// Defined outside the App component to ensure it's declared only once and can be reused.
const SectionTitle = ({ children, sectionId, activeSection, setActiveSection }) => (
  <button
    className={`nav-button ${activeSection === sectionId ? 'nav-button-active' : ''}`}
    onClick={() => setActiveSection(sectionId)}
  >
    {children}
  </button>
);

// --- Offer 1 Content Component ---
// Encapsulates the specific content and navigation for Offer 1.
// Defined outside the App component to ensure it's declared only once and receives props.
const Offer1Content = ({ activeSection, setActiveSection, generateCommunicationDraft, partNumber, setPartNumber, delay, setDelay, proposedSolution, setProposedSolution, isLoadingLLM, llmError, communicationDraft }) => (
  <> {/* Using a React Fragment as a root for Offer1Content to allow multiple top-level elements if needed */}
    <header className="header-section">
      <h1 className="main-title">
        Manufacturers offers
      </h1>
      <p className="subtitle">
        Your Strategic Partner for Proactive Stock-Out Management
      </p>
    </header>

    <nav className="nav-bar">
      <SectionTitle sectionId="challenge" activeSection={activeSection} setActiveSection={setActiveSection}>The Challenge</SectionTitle>
      <SectionTitle sectionId="solution" activeSection={activeSection} setActiveSection={setActiveSection}>Our Solution</SectionTitle>
      <SectionTitle sectionId="benefits" activeSection={activeSection} setActiveSection={setActiveSection}>Your Benefits</SectionTitle>
      <SectionTitle sectionId="expectations" activeSection={activeSection} setActiveSection={setActiveSection}>Our Partnership: Your Role</SectionTitle>
      <SectionTitle sectionId="pricing" activeSection={activeSection} setActiveSection={setActiveSection}>Pricing Model</SectionTitle>
      <SectionTitle sectionId="roi-calculation" activeSection={activeSection} setActiveSection={setActiveSection}>ROI Calculation</SectionTitle>
      {/* AI Communication tab is hidden as per request */}
      {/* {activeSection === 'llm-feature' && <SectionTitle sectionId="llm-feature" activeSection={activeSection} setActiveSection={setActiveSection}>✨ AI Communication</SectionTitle>} */}
    </nav>

    <main className="main-content">
      {/* Content sections are conditionally rendered within the main tag */}
      {activeSection === 'challenge' && (
        <section className="content-section animate-fade-in">
          <h2 className="section-heading challenge-heading">
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
                We provide detailed, **compliant reports** on resolution times, client satisfaction, and the specific impact on strategic ruptures. The granular data collected through our **risk intelligence tools** helps you identify recurring weaknesses in your own supply chain and forecast demand more accurately, leading to long-term operational improvements and fewer future "sinistres".
              </div>
            </li>
          </ul>
        </section>
      )}

      {activeSection === 'benefits' && (
        <section className="content-section animate-fade-in">
          <h2 className="section-heading benefits-heading">
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
                Our service directly counters the risk of losing market share dues to non-delivery. By ensuring your customers still receive the part (even if via another distributor in your ecosystem), we prevent competitors from stepping in and capturing *your* customer base. This is a critical investment in maintaining your competitive position, essentially a **"policy against competitive encroachment"**.
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
            <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            Our Pricing Model: Fixed + Incentive on Value Preserved
          </h2>
          <p className="section-text">
            We've designed a pricing model that combines the **predictability of a subscription** with a **performance-based incentive aligned with the value we preserve** for your business.
          </p>

          <div className="card-container">
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

          <p className="section-text" style={{marginTop: '1.5rem'}}>
            This model provides a stable foundation for a long-term partnership, while directly rewarding our ability to protect and even boost your revenue.
          </p>
        </section>
      )}

      {activeSection === 'expectations' && (
        <section className="content-section animate-fade-in">
          <h2 className="section-heading expectations-heading">
            <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Our Partnership: Your Role in Maximizing Success
          </h2>
          <p className="section-text">
            To fully leverage Marketparts' service and ensure seamless customer communication, your active participation and collaboration are key.
          </p>

          <div className="card-container">
            <div className="info-card orange-card">
              <h3 className="card-title card-title-icon">
                <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0_003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Timely & Accurate Data Sharing
              </h3>
              <p className="card-text">
                **Provide real-time access** to critical information such as stock levels, incoming shipments, exact part specifications, and order statuses. This enables our proactive detection and swift communication.
              </p>
            </div>

            <div className="info-card orange-card">
              <h3 className="card-title card-title-icon">
                <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M12 20a9 9 0 110-18 9 9 0 010 18zm0 0v-8"></path></svg>
                Dedicated Internal Point of Contact
              </h3>
              <p className="card-text">
                Designate a **responsive internal contact** for our team. This ensures quick answers to specific queries and rapid decision-making regarding alternative solutions or escalated cases.
              </p>
            </div>

            <div className="info-card orange-card">
              <h3 className="card-title card-title-icon">
                <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h10M7 16h10M9 20h6a2 2 0 002-2V6a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                Collaborative Communication Guidelines
              </h3>
              <p className="card-text">
                We encourage a **joint communication strategy**. This includes providing us with your brand's tone of voice, key messaging, and any specific client communication protocols. We can even **co-create communication templates** to ensure consistency and reinforce your brand's message while we handle the outreach.
              </p>
            </div>

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

          <p className="section-text" style={{marginTop: '1.5rem'}}>
            By working hand-in-hand, we can ensure that every stock-out is managed with maximum efficiency, transparency, and care, turning potential frustration into a testament to your customer commitment.
          </p>
        </section>
      )}

      {activeSection === 'roi-calculation' && (
        <section className="content-section animate-fade-in">
          <h2 className="section-heading benefits-heading">
            <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            Return on Investment (ROI): The Strategic Value of Our Partnership
          </h2>
          <p className="section-text">
            The true value of Marketparts is akin to a **strategic insurance policy** for your business. We don't just generate sales; we **prevent costly losses** and **preserve critical assets** (client relationships, market share) that are directly impacted by stock-outs. The ROI demonstrates that the investment in Marketparts is significantly outweighed by the value of the risks we mitigate.
          </p>

          <div className="roi-card">
            <span className="roi-label" style={{color: 'var(--true-blue)'}}>Comparing "Lost Earnings" and "Service Cost": The Marketparts Insurance Analogy</span>
            <p className="roi-sub-label" style={{marginBottom: '1rem', color: 'var(--dark-text-secondary)'}}>
              You are right to highlight that "lost earnings and margins" (the *claims*) are not direct revenue gains for the equipment manufacturer on transactions managed by Marketparts. However, this is precisely what makes the insurance analogy so powerful and the ROI so impactful.
            </p>

            <div className="roi-item" style={{backgroundColor: 'rgba(255, 255, 255, 0.08)'}}>
              <span className="roi-label" style={{color: 'var(--true-blue)'}}>1. "Lost Earnings": The True Cost of Uncovered Risk</span>
              <p className="roi-sub-label" style={{marginBottom: '0.5rem', color: 'var(--dark-text-secondary)'}}>
                In the insurance world, the premium is not compared to "new sales" generated by the insured, but to the **cost they would have incurred** if the claim had not been covered.
              </p>
              <p className="roi-list">
                The "**Claim**": Stock-outs, especially "fast movers," are **claims** for the equipment manufacturer. These claims have **multi-dimensional costs**:
              </p>
              <ul className="roi-list" style={{paddingLeft: '1.25rem'}}>
                <li style={{marginBottom: '0.25rem', color: 'var(--dark-text-secondary)'}}>
                  <strong>Direct Lost Revenue Cost:</strong> If Marketparts does not intervene, this lost sales opportunity is **permanently lost** or **diverted** to a competitor. This is revenue that will not enter the equipment manufacturer's ecosystem via this distributor/customer.
                </li>
                <li style={{marginBottom: '0.25rem', color: 'var(--dark-text-secondary)'}}>
                  <strong>Opportunity Cost:</strong> A frustrated customer may reduce future orders or even switch to a competitor. This is a loss of **future market share** and an erosion of **Customer Lifetime Value (CLV)**.
                </li>
                <li style={{marginBottom: '0.25rem', color: 'var(--dark-text-secondary)'}}>
                  <strong>Internal Operational Cost:</strong> Time spent by internal teams (sales, customer service) managing dissatisfied customers, manually searching for solutions, and handling disputes is a direct, unproductive salary cost.
                </li>
                <li style={{marginBottom: '0.25rem', color: 'var(--dark-text-secondary)'}}>
                  <strong>Reputational Cost:</strong> The equipment manufacturer's brand image is damaged.
                </li>
              </ul>
            </div>

            <div className="roi-item" style={{backgroundColor: 'rgba(255, 255, 255, 0.08)'}}>
              <span className="roi-label" style={{color: 'var(--true-blue)'}}>2. Marketparts: Indemnification and Prevention</span>
              <p className="roi-list">
                Marketparts acts as your **insurer and claims manager**:
              </p>
              <ul className="roi-list" style={{paddingLeft: '1.25rem'}}>
                <li style={{marginBottom: '0.25rem', color: 'var(--dark-text-secondary)'}}>
                  <strong>Indemnification (the "Value Preserved"):</strong> When Marketparts intervenes, it **indemnifies** the equipment manufacturer by **preventing the losses** they would have incurred. We don't generate new sales *for you* on the diverted part, but we **prevent a sale from being permanently lost to your ecosystem** (by redirecting it to another distributor in your network). This is **preserved commercial value**. The customer remains within your sphere of influence. We **eliminate the operational cost** of managing these claims for your teams, freeing them to focus on sales or R&D. This is a **direct saving**.
                </li>
                <li style={{marginBottom: '0.25rem', color: 'var(--dark-text-secondary)'}}>
                  <strong>Prevention and Risk Intelligence:</strong> Beyond reactive indemnification, Marketparts collects data on claims (ruptures) to provide you with **risk intelligence**. This information allows the equipment manufacturer to better "underwrite" their own future risks, adjust their production planning, reduce the probability of future claims, and thus potentially "reduce their premium" long-term (fewer ruptures = less need for our specific intervention).
                </li>
              </ul>
            </div>
            
            <div className="roi-item" style={{backgroundColor: 'rgba(255, 255, 255, 0.08)'}}>
              <span className="roi-label" style={{color: 'var(--true-blue)'}}>3. The ROI: Comparing Avoided Costs and Premiums</span>
              <p className="roi-list">
                Marketparts' ROI measures the **profitability of this insurance**:
              </p>
              <ul className="roi-list" style={{paddingLeft: '1.25rem'}}>
                <li style={{marginBottom: '0.25rem', color: 'var(--dark-text-secondary)'}}>
                  <strong>Your "Insurance Premium":</strong> This is the monthly fixed cost of Marketparts (for platform access, monitoring, dedicated team) plus the incentive on the value we successfully preserved (the percentage of the ex-tax revenue of strategic ruptures we managed).
                </li>
                <li style={{marginBottom: '0.25rem', color: 'var(--dark-text-secondary)'}}>
                  <strong>Your "Benefit" (or "Net Value of Protection"):</strong> This is the sum of all costs you avoided (lost sales, operational costs, reputational damage) minus your Marketparts "insurance premium."
                </li>
              </ul>
              <p className="roi-list" style={{marginTop: '1rem'}}>
                In short, the ROI demonstrates that **Marketparts' investment is significantly lower than the cost of losses you would incur without our service.** It's a direct comparison between **what you lose without us** and **what you spend for us**, to calculate **what you gain net by being protected.**
              </p>
              <p className="roi-list">
                This is a sound and recognized financial logic: insurance is not a direct profit center on each transaction, but an **essential protection item** that guarantees **business continuity, revenue stability, and long-term customer trust**.
              </p>
            </div>

            {/* Original ROI Steps follow */}
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
                <li style={{marginBottom: '0.25rem', color: 'var(--dark-text-secondary)'}}>
                  Estimated percentage of these strategic ruptures (€250,000) that are *permanently lost* or *diverted to competitors* without Marketparts' intervention: **50%**
                </li>
                <li>**A. Estimated Direct Lost Revenue (Cost of Unmanaged Risk):** €250,000 * 50% = **€125,000**</li>
                <li style={{marginBottom: '0.25rem', color: 'var(--dark-text-secondary)'}}>
                  <small>*(This represents the sales value that would be irrevocably lost from your ecosystem.)*</small>
                </li>
                <li>Estimated Internal Team Time Loss (for *all* 50 cases of rupture, strategic and non-strategic, leading to internal handling/frustration): **2 hours / case**</li>
                <li>Number of monthly rupture cases (approximated based on €250,000 strategic value / €5,000 avg order value): **50 cases**</li>
                <li>Average Cost of Internal Team Time (fully loaded): **€40 / hour**</li>
                <li>**B. Operational Cost of Unmanaged Risk (Internal Team Time):** 50 cases * 2 hours * €40/hour = **€4,000**</li>
                <li style={{marginBottom: '0.25rem', color: 'var(--dark-text-secondary)'}}>
                  <small>*(This is the cost of internal resources tied up in unproductive crisis management.)*</small>
                </li>
                <li className="summary-line">
                  **Total Estimated Monthly Cost of Unmanaged Strategic Rupture Risk (A+B):** **€125,000 (Lost Sales) + €4,000 (Operational) = €129,000**
                  <li style={{marginBottom: '0.25rem', color: 'var(--dark-text-tertiary)'}}><small>*(This is the "bill" your company effectively pays each month for unmitigated stock-out risks.)*</small></li>
                </li>
              </ul>
            </div>
            <div className="roi-item">
              <span className="roi-label">Step 2: Marketparts' Risk Mitigation & Value Preservation (Monthly)</span>
              <p className="roi-sub-label">How effectively do we reduce this risk and preserve value for your business?</p>
              <ul className="roi-list">
                <li>**Marketparts' Strategic Rupture Resolution Rate:** Marketparts successfully resolves **90%** of the **strategic ruptures** (€250,000 value).</li>
                <li style={{marginBottom: '0.25rem', color: 'var(--dark-text-secondary)'}}>
                  <small>(This means 90% of the €250,000 in strategic sales value is salvaged via our network. Your effective service rate for *these critical orders* improves significantly.)</small>
                </li>
                <li>**C. Commercial Value Preserved / Lost Sales Avoided:** €250000 * 90% = **€225000**</li>
                <li style={{marginBottom: '0.25rem', color: 'var(--dark-text-secondary)'}}>
                  <small>*(This is the revenue that would have been lost or permanently diverted from your ecosystem without Marketparts' intervention. It's the "indemnification" of lost sales.)*</small>
                </li>
                <li>**D. Operational Cost Savings (Internal Team Time):** By taking over the management of these 50 rupture cases, we absorb the operational burden: **€4,000**</li>
                <li style={{marginBottom: '0.25rem', color: 'var(--dark-text-secondary)'}}>
                  <small>*(This is the direct saving from freeing your internal teams for strategic work.)*</small>
                </li>
                <li className="summary-line">
                  **Total Value Preserved by Marketparts (C+D):** **€225,000 (Commercial Value Preserved) + €4,000 (Operational Savings) = €229,000**
                  <li style={{marginBottom: '0.25rem', color: 'var(--dark-text-tertiary)'}}><small>*(This is the total value Marketparts "returns" to your company each month by protecting against critical losses.)*</small></li>
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
          <p className="section-text" style={{marginTop: '1.5rem'}}>
            By working hand-in-hand, we can ensure that every stock-out is managed with maximum efficiency, transparency, and care, turning potential frustration into a testament to your customer commitment.
          </p>
        </section>

        {/* Hidden Cost: Logistic Penalties Section */}
        <div className="hidden-cost-section">
          <h3 className="hidden-cost-title" style={{color: 'var(--red-color)'}}>Hidden Cost Alert: Unquantifiable Logistic Penalties</h3>
          <p className="section-text" style={{color: 'var(--dark-text-secondary)'}}>
            Beyond the directly calculable losses, there's another significant, often unseen, financial impact for equipment manufacturers: **logistic penalties**.
          </p>
          <p className="section-text" style={{color: 'var(--dark-text-secondary)'}}>
            Many contracts with major distributors include strict clauses that allow them to impose **financial penalties** if delivery criteria are not met, such as full order fulfillment within a specified timeframe (e.g., 30 days). These penalties can accumulate rapidly and are a **true hidden cost** that can severely impact your profitability, often exceeding the direct cost of lost sales.
          </p>
          <ul className="bullet-list" style={{color: 'var(--dark-text-tertiary)'}}>
            <li>**Contractual Obligations:** Penalties for non-compliance with delivery terms.</li>
            <li>**Erosion of Supplier Status:** Repeated penalties can downgrade your supplier status with key partners.</li>
            <li>**Unforeseen Financial Drain:** These are not always budgeted for and can create significant financial surprises.</li>
          </ul>
          <p className="section-text" style={{color: 'var(--dark-text-secondary)'}}>
            While Marketparts cannot directly quantify these penalties in the ROI calculation (as they vary widely by contract), our service actively works to **prevent their occurrence**. By facilitating alternative fulfillment for strategic ruptures, we help you **avoid triggering these costly clauses**, further safeguarding your margins and your critical relationships with distributors. Consider this an **additional, significant layer of insurance** our service provides.
          </p>
        </div>
      </main>
    </> // Closing Fragment for Offer1Content
  );
};

// --- Offer 2 Content Component (Placeholder) ---
// Defined outside the App component to ensure it's declared only once.
const Offer2Content = () => (
  <div className="main-content">
    <section className="content-section animate-fade-in">
      <h2 className="section-heading" style={{color: 'var(--true-blue)'}}>
        <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10l2-2h14l-2-2H6"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7h-2l2-2V7zm0 0h2l-2-2V7zM16 11h-2l2-2V11zm0 0h2l-2-2V11zM16 15h-2l2-2V15zm0 0h2l-2-2V15z"></path>
        </svg>
        Offer 2: Data Management
      </h2>
      <p className="section-text" style={{color: 'var(--dark-text-secondary)'}}>
        This section will detail Marketparts' advanced **Data Management** solutions. We will showcase how we can help equipment manufacturers leverage their data for better insights, predictive analytics, and optimized inventory strategies.
      </p>
      <ul className="bullet-list" style={{color: 'var(--dark-text-secondary)'}}>
        <li>Data Harmonization & Centralization</li>
        <li>Advanced Analytics & Reporting</li>
        <li>Predictive Demand Forecasting</li>
        <li>Inventory Optimization Consulting</li>
      </ul>
      <p className="section-text" style={{color: 'var(--dark-text-secondary)', marginTop: '1.5rem'}}>
        Stay tuned for more details on how Marketparts can transform your data into a strategic asset!
      </p>
    </section>
  </div>
);

// Main App Component where conditional rendering of offers happens
const App = () => {
  // State for password protection
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Password for the app
  const CORRECT_PASSWORD = 'Marketparts'; // The correct password to access the app

  // Function to handle password submission
  const handleLogin = () => {
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  // State to manage which offer is currently active (Offer 1 or Offer 2)
  const [activeOffer, setActiveOffer] = useState('offer1'); // Default to Offer 1

  // State to manage which section is active within Offer 1
  // Order of tabs for Offer 1: 'challenge', 'solution', 'benefits', 'expectations', 'pricing', 'roi-calculation'
  const [activeSection, setActiveSection] = useState('challenge'); 

  // States for LLM feature (currently hidden but functionality remains)
  const [partNumber, setPartNumber] = useState('');
  const [delay, setDelay] = useState('');
  const [proposedSolution, setProposedSolution] = useState('');
  const [communicationDraft, setCommunicationDraft] = useState('');
  const [isLoadingLLM, setIsLoadingLLM] = useState(false);
  const [llmError, setLlmError] = useState('');

  // Function to call Gemini API for communication draft
  const generateCommunicationDraft = async () => {
    setIsLoadingLLM(true);
    setLlmError('');
    setCommunicationDraft('');

    // Construct the prompt for the LLM based on user inputs
    const prompt = `Draft a concise, empathetic customer communication message for a stock-out situation.
    The affected part is: ${partNumber || 'unspecified part'}.
    The estimated delay is: ${delay || 'unspecified'}.
    The proposed solution is: ${proposedSolution || 'We are working to resolve this as quickly as possible.'}.
    Focus on transparency, empathy, and providing a clear next step.
    Start with "Dear Valued Customer," and end with "Thank you for your understanding. Sincerely, Your Marketparts Team."`;

    try {
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      
      const apiKey = ""; // API key managed by the Canvas environment at runtime
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
    <div className="app-container">
      {/* Global Header for navigating between offers */}
      <div className="global-app-header">
        <h1 className="global-title">Manufacturers offers</h1>
        <nav className="global-nav">
          <button
            className={`global-nav-button ${activeOffer === 'offer1' ? 'global-nav-button-active' : ''}`}
            onClick={() => { setActiveOffer('offer1'); setActiveSection('challenge'); }} // Reset section when changing offer
          >
            Offer 1: Manufacturers
          </button>
          <button
            className={`global-nav-button ${activeOffer === 'offer2' ? 'global-nav-button-active' : ''}`}
            onClick={() => setActiveOffer('offer2')}
          >
            Offer 2: Data Management
          </button>
        </nav>
      </div>

      {/* Conditional rendering based on activeOffer */}
      {activeOffer === 'offer1' && (
        <Offer1Content 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          generateCommunicationDraft={generateCommunicationDraft} 
          partNumber={partNumber} 
          setPartNumber={setPartNumber} 
          delay={delay} 
          setDelay={setDelay} 
          proposedSolution={proposedSolution} 
          setProposedSolution={setProposedSolution} 
          isLoadingLLM={isLoadingLLM} 
          llmError={llmError} 
          communicationDraft={communicationDraft} 
        />
      )}
      {activeOffer === 'offer2' && <Offer2Content />}

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

          /* Global App Header for Offer Navigation */
          .global-app-header {
            width: 100%;
            max-width: 960px; /* Aligns with main content max-width */
            text-align: center;
            margin-bottom: 2.5rem; 
            margin-top: 1rem; 
            background-color: var(--midnight-blue); /* Consistent with card background */
            padding: 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .global-title {
            font-size: 2.5rem; /* Larger for global title */
            line-height: 1.25; 
            font-weight: 800; 
            color: var(--true-blue); 
            margin-bottom: 1rem; 
          }

          .global-nav {
            display: flex;
            flex-wrap: nowrap; 
            overflow-x: auto; 
            justify-content: center;
            gap: 1rem; 
            padding-bottom: 0.5rem; 
          }
          .global-nav-button {
            flex-shrink: 0; 
            padding: 0.75rem 1.5rem; 
            font-size: 1.125rem; 
            font-weight: 600; 
            border-radius: 0.5rem; 
            transition: all 0.3s ease-in-out; 
            background-color: var(--midnight-blue); 
            color: var(--dark-text-primary); 
            border: 1px solid var(--true-blue); /* Highlight border */
            cursor: pointer;
          }

          .global-nav-button:hover {
            background-color: var(--darker-true-blue); 
            color: var(--white);
          }

          .global-nav-button-active {
            background-color: var(--true-blue); 
            color: var(--white); 
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); 
            transform: translateY(-2px);
          }


          /* Offer Content Container - New wrapper for Offer 1 and Offer 2 specific content */
          .offer-content-container {
            width: 100%;
            max-width: 960px;
            background-color: var(--dark-background-primary); /* Consistent with primary app background */
            padding: 0; /* No padding here as inner main-content has it */
            border-radius: 0.75rem;
            /* Removed shadow/border from here as global-app-header now has it */
          }

          /* General Content Styling (Applies to sections within each offer) */
          .header-section { /* Original header within Offer 1 */
            width: 100%;
            max-width: 960px; /* max-w-4xl */
            text-align: center;
            margin-bottom: 2.5rem; /* mb-10 */
            margin-top: 1rem; /* mt-4 */
          }

          .main-title { /* Original main title within Offer 1 */
            font-size: 2.25rem; /* text-4xl */
            line-height: 1.25; /* leading-tight */
            font-weight: 800; /* font-extrabold */
            color: var(--true-blue); /* Main title in True Blue for contrast */
            margin-bottom: 1rem; /* mb-4 */
            border-radius: 0.5rem; /* rounded-lg */
            padding: 0.5rem; /* p-2 */
          }

          .subtitle {
            font-size: 1.25rem; /* text-xl */
            color: var(--dark-text-secondary); /* Secondary text on dark background */
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

          .nav-bar { /* Nav bar specific to Offer 1 content */
            display: flex;
            flex-wrap: nowrap; 
            overflow-x: auto; 
            justify-content: center;
            gap: 0.75rem; 
            margin-bottom: 2.5rem; 
            width: 100%;
            max-width: 960px; 
            padding-bottom: 0.5rem; 
          }

          @media (min-width: 640px) { /* sm breakpoint */
            .nav-bar {
              gap: 1rem; 
              overflow-x: visible; 
            }
          }

          .nav-button {
            flex-shrink: 0; 
            padding: 0.5rem 1rem; 
            font-size: 1.125rem; 
            font-weight: 600; 
            border-radius: 0.5rem; 
            transition: all 0.3s ease-in-out; 
            background-color: var(--midnight-blue); 
            color: var(--dark-text-primary); 
            border: none;
            cursor: pointer;
          }

          .nav-button:hover {
            background-color: var(--darker-true-blue); 
            color: var(--white);
          }

          .nav-button-active {
            background-color: var(--true-blue); 
            color: var(--white); 
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); 
          }

          .main-content { /* Main content area within each offer */
            width: 100%;
            max-width: 960px; 
            background-color: var(--dark-card-background); 
            padding: 1.5rem; 
            border-radius: 0.75rem; 
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1); 
            border: 1px solid rgba(255, 255, 255, 0.1); 
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
            color: var(--dark-text-primary); 
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
            color: var(--dark-text-secondary); 
            line-height: 1.6; 
            margin-bottom: 1rem; 
          }

          .bullet-list {
            list-style-type: disc;
            padding-left: 1.25rem; 
            color: var(--dark-text-secondary); 
            line-height: 1.5; 
          }
          .bullet-list li {
            margin-bottom: 0.5rem;
          }

          .sub-heading {
            font-size: 1.25rem; 
            font-weight: 600; 
            color: var(--dark-text-primary); 
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
            color: var(--true-blue); 
            flex-shrink: 0;
            margin-top: 0.25rem; 
          }
          .purple-icon {
            color: var(--indigo-purple); 
          }

          .list-item-strong {
            color: var(--dark-text-primary); 
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
            background-color: var(--dark-card-background); 
            border-color: rgba(255, 255, 255, 0.1); 
          }

          .blue-card {
            border-left-color: var(--true-blue); 
          }

          .green-card {
            border-left-color: var(--green-color); 
          }

          .orange-card {
            border-left-color: var(--orange-color); 
          }

          .card-title {
            font-size: 1.5rem; 
            font-weight: 700; 
            color: var(--dark-text-primary); 
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
            color: var(--dark-text-secondary); 
            margin-bottom: 0.75rem; 
          }

          .card-price {
            font-size: 1.25rem; 
            font-weight: 600; 
            color: var(--true-blue); 
          }

          .card-price-value {
            font-size: 1.875rem; 
            font-weight: 800; 
          }

          .card-note {
            font-size: 0.875rem; 
            color: var(--dark-text-tertiary); 
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
            color: var(--dark-text-secondary); 
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

          /* Hidden Cost Section Styles */
          .hidden-cost-section {
            background-color: var(--midnight-blue);
            border: 1px solid var(--red-color); /* Red border for alert */
            border-radius: 0.75rem;
            padding: 1.5rem;
            margin-top: 2.5rem; /* Space from previous section */
            box-shadow: 0 4px 10px rgba(255, 0, 0, 0.3); /* Red glow for alert */
          }

          .hidden-cost-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--red-color); /* Red text for warning */
            margin-bottom: 1rem;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
};

// --- Offer 2 Content Component (Placeholder) ---
// Defined outside the App component to ensure it's declared only once.
const Offer2Content = () => (
  <div className="main-content">
    <section className="content-section animate-fade-in">
      <h2 className="section-heading" style={{color: 'var(--true-blue)'}}>
        <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10l2-2h14l-2-2H6"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7h-2l2-2V7zm0 0h2l-2-2V7zM16 11h-2l2-2V11zm0 0h2l-2-2V11zM16 15h-2l2-2V15zm0 0h2l-2-2V15z"></path>
        </svg>
        Offer 2: Data Management
      </h2>
      <p className="section-text" style={{color: 'var(--dark-text-secondary)'}}>
        This section will detail Marketparts' advanced **Data Management** solutions. We will showcase how we can help equipment manufacturers leverage their data for better insights, predictive analytics, and optimized inventory strategies.
      </p>
      <ul className="bullet-list" style={{color: 'var(--dark-text-secondary)'}}>
        <li>Data Harmonization & Centralization</li>
        <li>Advanced Analytics & Reporting</li>
        <li>Predictive Demand Forecasting</li>
        <li>Inventory Optimization Consulting</li>
      </ul>
      <p className="section-text" style={{color: 'var(--dark-text-secondary)', marginTop: '1.5rem'}}>
        Stay tuned for more details on how Marketparts can transform your data into a strategic asset!
      </p>
    </section>
  </div>
);


export default App;