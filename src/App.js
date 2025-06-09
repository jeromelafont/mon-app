import React, { useState } from 'react';

// ===================================================================================
// DÉFINITION DE TOUS LES SOUS-COMPOSANTS
// Tous les composants sont définis ici pour être utilisés par le composant principal App.
// ===================================================================================

// --- Composant pour les titres de section cliquables (navigation interne) ---
const SectionTitle = ({ children, sectionId, activeSection, setActiveSection }) => (
  <button
    className={`nav-button ${activeSection === sectionId ? 'nav-button-active' : ''}`}
    onClick={() => setActiveSection(sectionId)}
  >
    {children}
  </button>
);


// --- Section 1: Le Défi ---
const ChallengeSection = () => (
  <section className="content-section animate-fade-in">
    <h2 className="section-heading challenge-heading">
      <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
      The Challenge: When 3% of Ruptures Threaten 100% of Your Business
    </h2>
    <p className="section-text">
      Stock-outs are a constant challenge, but the real threat lies in <strong>strategic ruptures</strong> – especially those affecting <strong>"fast movers"</strong>. For an equipment manufacturer with an annual revenue of <strong>€100 million</strong>, an overall 10% rupture rate already represents significant risk. However, the critical impact comes from the <strong>3% of these ruptures that concern "fast movers"</strong>. These high-demand parts are crucial for your clients (distributors, workshops), as their absence leads to <strong>direct and immediate lost revenue</strong> for the end-customer.
    </p>
    <ul className="bullet-list">
      <li><strong>Direct Financial Impact on Clients:</strong> A workshop cannot perform repairs, a distributor cannot sell. This directly translates to lost earnings and severe frustration for your customers.</li>
      <li><strong>Erosion of Trust and Brand Image:</strong> When critical parts are unavailable, client trust erodes. Customers start seeking alternatives, including from competitors, directly threatening your <strong>market share</strong> and <strong>customer lifetime value (CLV)</strong>.</li>
      <li><strong>Compliance & Reputation Risk:</strong> Unmanaged ruptures can lead to contractual penalties with large distributors or warranty issues, highlighting a lack of <strong>compliance</strong> and damaging your reputation as a reliable supplier.</li>
      <li><strong>Internal Resource Drain:</strong> Managing these strategic ruptures diverts your sales and after-sales teams from value-generating tasks, leading to unproductive time and increased operational costs.</li>
    </ul>
    <p className="section-text">
      These <strong>3% of strategic ruptures</strong> are not just "incidents"; they are <strong>critical failure points</strong> that can have disproportionate repercussions on your revenue, reputation, and operational <strong>compliance</strong>.
    </p>
  </section>
);

// --- Section 2: La Solution ---
const SolutionSection = () => (
    <section className="content-section animate-fade-in">
        <h2 className="section-heading solution-heading">
            <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Our Solution: Comprehensive Risk Mitigation
        </h2>
        <p className="section-text">
            Marketparts offers an integrated approach to transform strategic ruptures into a demonstration of your excellence and commitment to <strong>compliance</strong>. We leverage our unique <strong>assets</strong> to provide a seamless and effective solution.
        </p>
        <h3 className="sub-heading">How We Operate:</h3>
        <ul className="icon-list">
            <li>
                <svg className="list-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"></path></svg>
                <div>
                    <strong className="list-item-strong">Proactive & Compliant Detection:</strong><br />
                    We integrate our advanced AI algorithms with your ERP and distributor network to instantly identify critical ruptures of "fast movers" in a GDPR/RGPD compliant way.
                </div>
            </li>
            <li>
                <svg className="list-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                <div>
                    <strong className="list-item-strong">Validated Co-Communication:</strong><br />
                    Our expert teams contact the impacted client in your name, using pre-approved branding and messaging to reinforce your brand's commitment.
                </div>
            </li>
            <li>
                <svg className="list-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 100 4m-4 10a2 2 0 100 4m10-4a2 2 0 100 4m-8-12l9 9H3L9 5z"></path></svg>
                <div>
                    <strong className="list-item-strong">Optimized Fulfillment via Marketparts Network:</strong><br />
                    We leverage our extensive network of distributors to find alternative sources, preventing a permanent lost sale and protecting your market share.
                </div>
            </li>
            <li>
                <svg className="list-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                <div>
                    <strong className="list-item-strong">Transparent Reporting & Continuous Improvement:</strong><br />
                    We provide detailed, compliant reports on resolution times and client satisfaction, giving you risk intelligence to improve your supply chain.
                </div>
            </li>
        </ul>
    </section>
);


// --- Section 3: Les Bénéfices ---
const BenefitsSection = () => (
    <section className="content-section animate-fade-in">
        <h2 className="section-heading benefits-heading">
            <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            Your Immediate Added Value
        </h2>
        <p className="section-text">
            This partnership model offers a deeper, more integrated approach. We become a strategic extension of your brand, protecting your market share and client relationships.
        </p>
        <ul className="icon-list">
            <li>
                <svg className="list-icon purple-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <div>
                    <strong className="list-item-strong">Client Retention & Brand Integrity:</strong>
                    We ensure your customers remain loyal to *your* brand by preventing them from turning to competitors, acting as a direct protection of your customer lifetime value.
                </div>
            </li>
            <li>
                <svg className="list-icon purple-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2"></path></svg>
                <div>
                    <strong className="list-item-strong">Resource Optimization & Strategic Focus:</strong>
                    Free your internal teams from the reactive burden of managing stock-out crises, enabling them to focus on core business activities and strategic growth.
                </div>
            </li>
            <li>
                <svg className="list-icon purple-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                <div>
                    <strong className="list-item-strong">Market Share Protection & Lost Sale Mitigation:</strong>
                    Our service directly counters the risk of losing market share by ensuring your customers still receive the part, preventing competitors from capturing your customer base.
                </div>
            </li>
            <li>
                <svg className="list-icon purple-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div>
                    <strong className="list-item-strong">Valuable Supply Chain Insights:</strong>
                    Our detailed analysis of rupture patterns provides invaluable data, helping you proactively identify weaknesses in your own supply chain and forecasting.
                </div>
            </li>
        </ul>
    </section>
);


// --- Section 4: Les Attentes ---
const ExpectationsSection = () => (
    <section className="content-section animate-fade-in">
        <h2 className="section-heading expectations-heading">
            <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Our Partnership: Your Role in Maximizing Success
        </h2>
        <p className="section-text">
            To fully leverage our service and ensure seamless customer communication, your active participation is key.
        </p>
        <div className="card-container">
            <div className="info-card orange-card">
                <h3 className="card-title card-title-icon">
                    <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Timely & Accurate Data Sharing
                </h3>
                <p className="card-text">
                    Provide real-time access to critical information like stock levels, incoming shipments, and order statuses.
                </p>
            </div>
            <div className="info-card orange-card">
                <h3 className="card-title card-title-icon">
                    <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M12 20a9 9 0 110-18 9 9 0 010 18zm0 0v-8"></path></svg>
                    Dedicated Internal Point of Contact
                </h3>
                <p className="card-text">
                    Designate a responsive internal contact for our team to ensure quick answers and rapid decision-making.
                </p>
            </div>
            <div className="info-card orange-card">
                <h3 className="card-title card-title-icon">
                    <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h10M7 16h10M9 20h6a2 2 0 002-2V6a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    Collaborative Communication Guidelines
                </h3>
                <p className="card-text">
                    We encourage a joint communication strategy, providing us with your brand's tone of voice and key messaging.
                </p>
            </div>
            <div className="info-card orange-card">
                <h3 className="card-title card-title-icon">
                    <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Constructive Feedback
                </h3>
                <p className="card-text">
                    Your feedback is invaluable. Regular reviews help us continuously refine our service to meet your needs.
                </p>
            </div>
        </div>
    </section>
);


// --- Section 5: Le Modèle de Prix ---
const PricingSection = () => (
    <section className="content-section animate-fade-in">
        <h2 className="section-heading pricing-heading">
            <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            Our Pricing Model: Fixed + Incentive
        </h2>
        <p className="section-text">
            We've designed a model that combines the predictability of a subscription with a performance-based incentive aligned with the value we preserve.
        </p>
        <div className="card-container">
            <div className="info-card blue-card">
                <h3 className="card-title">Access & Maintenance Fee</h3>
                <p className="card-text">
                    This fee covers integration, platform access, and dedicated support, ensuring our team is ready to act for you.
                </p>
                <p className="card-price">
                    <span className="card-price-value">€2,000 - €10,000+</span> / month
                </p>
                <p className="card-note">
                    (Adjusted based on complexity, data volume, and SLA.)
                </p>
            </div>
            <div className="info-card green-card">
                <h3 className="card-title">Incentive on Managed Revenue</h3>
                <p className="card-text">
                    An incentive applied as a percentage of the Ex-Tax Revenue of each stock-out transaction we successfully fulfill via our network.
                </p>
                <p className="card-price">
                    <span className="card-price-value">3% to 7%</span> per transaction
                </p>
                <p className="card-note">
                    (This aligns our interests: we are rewarded on the value we help you secure.)
                </p>
            </div>
        </div>
    </section>
);

// --- Section 6: Le Calcul du ROI ---
const RoiSection = () => (
    <section className="content-section animate-fade-in">
        <h2 className="section-heading benefits-heading">
            <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            Return on Investment (ROI)
        </h2>
        <p className="section-text">
            The value of Marketparts is akin to a <strong>strategic insurance policy</strong>. We don't just generate sales; we <strong>prevent costly losses</strong> and preserve critical assets like client relationships and market share.
        </p>

        <div className="roi-card">
            <div className="roi-item">
                <span className="roi-label">Step 1: Quantifying Your Risk (Monthly)</span>
                <p className="roi-sub-label">Illustrative example for a €100M business.</p>
                <ul className="roi-list">
                    <li>Monthly Revenue: <strong>€8,333,333</strong></li>
                    <li>Strategic Rupture Rate (3%): <strong>€250,000</strong></li>
                    <li className="summary-line">Total Estimated Monthly Cost of Risk: <strong>€129,000</strong></li>
                </ul>
            </div>
            <div className="roi-item">
                <span className="roi-label">Step 2: Marketparts' Value Preservation</span>
                <p className="roi-sub-label">Assuming 90% resolution rate.</p>
                 <ul className="roi-list">
                    <li>Commercial Value Preserved: <strong>€225,000</strong></li>
                    <li>Operational Cost Savings: <strong>€4,000</strong></li>
                    <li className="summary-line">Total Value Preserved by Marketparts: <strong>€229,000</strong></li>
                </ul>
            </div>
            <div className="roi-item">
                <span className="roi-label">Step 3: Marketparts Service Cost</span>
                <p className="roi-sub-label">Illustrative example.</p>
                 <ul className="roi-list">
                    <li>Monthly Fixed Fee: <strong>€3,000</strong></li>
                    <li>Monthly Incentive Fee (5%): <strong>€12,500</strong></li>
                    <li className="summary-line">Total Monthly Cost: <strong>€15,500</strong></li>
                </ul>
            </div>
            <div className="roi-item final-roi">
                <span className="roi-label">Step 4: Your Net Financial Gain & ROI</span>
                <p className="roi-sub-label">Risk Reduced vs. Cost Incurred.</p>
                <ul className="roi-list">
                    <li>Net Monthly Value: <strong>€213,500</strong></li>
                    <li className="summary-line">Estimated Return on Investment (ROI): ≈ <strong>1377%</strong></li>
                </ul>
            </div>
        </div>

        <div className="hidden-cost-section">
            <h3 className="hidden-cost-title">Hidden Cost Alert: Logistic Penalties</h3>
            <p className="section-text">
                Beyond calculable losses, many contracts include strict financial penalties for non-delivery. Our service actively works to prevent their occurrence by facilitating alternative fulfillment, providing an additional layer of insurance for your business.
            </p>
        </div>
    </section>
);


// --- Composant de navigation pour l'Offre 1 ---
const Offer1Nav = ({ activeSection, setActiveSection }) => {
    const sections = [
        { id: 'challenge', title: 'The Challenge' },
        { id: 'solution', title: 'Our Solution' },
        { id: 'benefits', title: 'Your Benefits' },
        { id: 'expectations', title: 'Your Role' },
        { id: 'pricing', title: 'Pricing' },
        { id: 'roi-calculation', title: 'ROI' },
    ];

    return (
        <nav className="nav-bar">
            {sections.map(section => (
                <SectionTitle
                    key={section.id}
                    sectionId={section.id}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                >
                    {section.title}
                </SectionTitle>
            ))}
        </nav>
    );
};


// --- Composant principal pour le contenu de l'Offre 1 ---
const Offer1Content = () => {
    const [activeSection, setActiveSection] = useState('challenge');

    const sectionComponents = {
        challenge: <ChallengeSection />,
        solution: <SolutionSection />,
        benefits: <BenefitsSection />,
        expectations: <ExpectationsSection />,
        pricing: <PricingSection />,
        'roi-calculation': <RoiSection />,
    };

    return (
        <>
            <header className="header-section">
                <h1 className="main-title">Your Strategic Partner</h1>
                <p className="subtitle">For Proactive Stock-Out Management</p>
            </header>

            <Offer1Nav activeSection={activeSection} setActiveSection={setActiveSection} />

            <main className="main-content">
                {sectionComponents[activeSection]}
            </main>
        </>
    );
};

// --- Composant pour le contenu de l'Offre 2 ---
const Offer2Content = () => (
    <main className="main-content">
        <section className="content-section animate-fade-in">
            <h2 className="section-heading" style={{ color: 'var(--true-blue)' }}>
                <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10l2-2h14l-2-2H6"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7h-2l2-2V7zm0 0h2l-2-2V7zM16 11h-2l2-2V11zm0 0h2l-2-2V11zM16 15h-2l2-2V15zm0 0h2l-2-2V15z"></path></svg>
                Offer 2: Data Management
            </h2>
            <p className="section-text">
                This section will detail Marketparts' advanced <strong>Data Management</strong> solutions. We will showcase how we can help equipment manufacturers leverage their data for better insights, predictive analytics, and optimized inventory strategies.
            </p>
            <ul className="bullet-list">
                <li>Data Harmonization & Centralization</li>
                <li>Advanced Analytics & Reporting</li>
                <li>Predictive Demand Forecasting</li>
                <li>Inventory Optimization Consulting</li>
            </ul>
            <p className="section-text" style={{ marginTop: '1.5rem' }}>
                Stay tuned for more details on how Marketparts can transform your data into a strategic asset!
            </p>
        </section>
    </main>
);

// --- Écran de connexion ---
const LoginScreen = ({ onLogin, error }) => {
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        onLogin(password);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Enter Password to Access Offers</h2>
                <input
                    type="password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Password"
                />
                <button className="login-button" onClick={handleSubmit}>
                    Login
                </button>
                {error && <p className="login-error">{error}</p>}
            </div>
        </div>
    );
};

// --- Header global de l'application ---
const GlobalHeader = ({ activeOffer, setActiveOffer, onResetSection }) => {
    const handleOfferClick = (offer) => {
        setActiveOffer(offer);
        if (offer === 'offer1') {
            // Optionnel: reset la section de l'offre 1 quand on y revient
            onResetSection('challenge');
        }
    };

    return (
        <header className="global-app-header">
            <h1 className="global-title">Manufacturers Offers</h1>
            <nav className="global-nav">
                <button
                    className={`global-nav-button ${activeOffer === 'offer1' ? 'global-nav-button-active' : ''}`}
                    onClick={() => handleOfferClick('offer1')}
                >
                    Offer 1: Manufacturers
                </button>
                <button
                    className={`global-nav-button ${activeOffer === 'offer2' ? 'global-nav-button-active' : ''}`}
                    onClick={() => handleOfferClick('offer2')}
                >
                    Offer 2: Data Management
                </button>
            </nav>
        </header>
    );
};


// ===================================================================================
// COMPOSANT PRINCIPAL DE L'APPLICATION
// ===================================================================================
const App = () => {
    // --- State Management ---
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [activeOffer, setActiveOffer] = useState('offer1');

    const CORRECT_PASSWORD = 'Marketparts';

    // --- Logique d'authentification ---
    const handleLogin = (password) => {
        if (password === CORRECT_PASSWORD) {
            setIsAuthenticated(true);
            setPasswordError('');
        } else {
            setPasswordError('Incorrect password. Please try again.');
        }
    };
    
    // --- Rendu conditionnel ---
    if (!isAuthenticated) {
        return (
          <>
            <LoginScreen onLogin={handleLogin} error={passwordError} />
            <style>{STYLES}</style>
          </>
        );
    }

    return (
        <div className="app-container">
            <GlobalHeader
                activeOffer={activeOffer}
                setActiveOffer={setActiveOffer}
                // Passe une fonction vide car la gestion de la section est dans Offer1Content
                onResetSection={() => {}} 
            />

            {activeOffer === 'offer1' && <Offer1Content />}
            {activeOffer === 'offer2' && <Offer2Content />}

            {/* Injection de tous les styles CSS */}
            <style>{STYLES}</style>
        </div>
    );
};

// ===================================================================================
// STYLES CSS
// Tout le CSS est placé dans une constante pour la propreté.
// ===================================================================================
const STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');

    :root {
      --midnight-blue: #002074;
      --true-blue: #1a7dff;
      --white: #ffffff;
      --indigo-purple: #4b0082;
      --dark-background-primary: #000000;
      --dark-card-background: var(--midnight-blue);
      --dark-text-primary: var(--white);
      --dark-text-secondary: rgba(255, 255, 255, 0.95);
      --dark-text-tertiary: rgba(255, 255, 255, 0.7);
      --darker-true-blue: #0060d4;
      --red-color: #EF4444;
      --green-color: #10B981;
      --orange-color: #F97316;
    }

    body {
      margin: 0;
      font-family: 'Inter', sans-serif;
      background-color: var(--dark-background-primary);
      color: var(--dark-text-primary);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* --- Login Screen --- */
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      width: 100%;
      padding: 1rem;
    }
    .login-box {
      background-color: var(--midnight-blue);
      padding: 2.5rem;
      border-radius: 0.75rem;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
      text-align: center;
      max-width: 400px;
      width: 100%;
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
    .login-input::placeholder { color: rgba(255, 255, 255, 0.6); }
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
      background-color: #0060d4;
      transform: translateY(-2px);
    }
    .login-error {
      color: var(--red-color);
      margin-top: 1rem;
      font-size: 0.9rem;
    }

    /* --- Main App Layout --- */
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5rem;
    }
    @media (min-width: 640px) { .app-container { padding: 1.5rem 2.5rem; } }
    @media (min-width: 1024px) { .app-container { padding: 2rem 3rem; } }

    /* --- Global Header --- */
    .global-app-header {
      width: 100%;
      max-width: 960px;
      text-align: center;
      margin-bottom: 2.5rem;
      margin-top: 1rem;
      background-color: var(--midnight-blue);
      padding: 1.5rem;
      border-radius: 0.75rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .global-title {
      font-size: 2.5rem;
      line-height: 1.25;
      font-weight: 800;
      color: var(--true-blue);
      margin: 0 0 1rem 0;
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
      background-color: transparent;
      color: var(--dark-text-primary);
      border: 1px solid var(--true-blue);
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

    /* --- Offer 1 Specific Header --- */
    .header-section {
      text-align: center;
      margin-bottom: 2.5rem;
    }
    .main-title {
      font-size: 2.25rem;
      line-height: 1.25;
      font-weight: 800;
      color: var(--true-blue);
      margin-bottom: 1rem;
    }
    .subtitle {
      font-size: 1.25rem;
      color: var(--dark-text-secondary);
    }
    @media (min-width: 640px) {
      .main-title { font-size: 3rem; }
      .subtitle { font-size: 1.5rem; }
    }

    /* --- Offer 1 Navigation Bar --- */
    .nav-bar {
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
    @media (min-width: 640px) {
      .nav-bar {
        gap: 1rem;
        overflow-x: visible;
      }
    }
    .nav-button {
      flex-shrink: 0;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 0.5rem;
      transition: all 0.3s ease-in-out;
      background-color: var(--midnight-blue);
      color: var(--dark-text-primary);
      border: 1px solid rgba(26, 125, 255, 0.5);
      cursor: pointer;
    }
    .nav-button:hover {
      background-color: var(--darker-true-blue);
      border-color: var(--darker-true-blue);
      color: var(--white);
    }
    .nav-button-active {
      background-color: var(--true-blue);
      color: var(--white);
      border-color: var(--true-blue);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    }

    /* --- General Content Styling --- */
    .main-content {
      width: 100%;
      max-width: 960px;
      background-color: var(--dark-card-background);
      padding: 1.5rem;
      border-radius: 0.75rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    @media (min-width: 640px) { .main-content { padding: 2rem; } }

    .content-section {
      animation: fadeIn 0.5s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .section-heading {
      font-size: 1.875rem;
      font-weight: 700;
      color: var(--dark-text-primary);
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .section-icon {
      width: 2rem;
      height: 2rem;
      flex-shrink: 0;
    }
    .challenge-heading .section-icon { color: var(--red-color); }
    .solution-heading .section-icon { color: var(--green-color); }
    .benefits-heading .section-icon { color: var(--indigo-purple); }
    .pricing-heading .section-icon { color: var(--true-blue); }
    .expectations-heading .section-icon { color: var(--orange-color); }

    .section-text {
      font-size: 1.125rem;
      color: var(--dark-text-secondary);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .section-text strong {
      color: var(--dark-text-primary);
      font-weight: 700;
    }
    .sub-heading {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--dark-text-primary);
      margin: 1.5rem 0 0.75rem 0;
    }
    .bullet-list {
      list-style-type: disc;
      padding-left: 1.5rem;
      color: var(--dark-text-secondary);
      line-height: 1.6;
    }
    .bullet-list li { margin-bottom: 0.75rem; }

    /* --- Lists and Cards --- */
    .icon-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .icon-list li {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    }
    .list-icon {
      width: 1.5rem;
      height: 1.5rem;
      color: var(--true-blue);
      flex-shrink: 0;
      margin-top: 0.25rem;
    }
    .purple-icon { color: var(--indigo-purple); }
    .list-item-strong {
      color: var(--dark-text-primary);
      font-weight: 700;
    }
    .card-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
      margin-top: 1.5rem;
    }
    @media (min-width: 768px) { .card-container { grid-template-columns: 1fr 1fr; } }
    .info-card {
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-left: 4px solid;
      background-color: rgba(0,0,0,0.2);
    }
    .blue-card { border-left-color: var(--true-blue); }
    .green-card { border-left-color: var(--green-color); }
    .orange-card { border-left-color: var(--orange-color); }
    .card-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--dark-text-primary);
      margin: 0 0 0.75rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .card-title.card-title-icon { color: var(--orange-color); }
    .card-icon { width: 1.5rem; height: 1.5rem; }
    .card-text {
      font-size: 1rem;
      color: var(--dark-text-secondary);
      margin-bottom: 1rem;
    }
    .card-price {
      font-size: 1rem;
      font-weight: 600;
      color: var(--true-blue);
    }
    .card-price-value { font-size: 1.875rem; font-weight: 800; }
    .card-note {
      font-size: 0.875rem;
      color: var(--dark-text-tertiary);
      margin-top: 0.5rem;
      font-style: italic;
    }

    /* --- ROI Section Specific --- */
    .roi-card, .hidden-cost-section {
      background-color: rgba(0,0,0,0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 0.75rem;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-top: 1.5rem;
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
    .roi-list li strong { color: var(--dark-text-primary); }
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
    }
    .final-roi .roi-label {
      color: var(--green-color);
      font-size: 1.25rem;
    }
    .final-roi .summary-line {
        color: var(--green-color);
    }
    .hidden-cost-section {
      border-color: var(--red-color);
      box-shadow: 0 4px 10px rgba(255, 0, 0, 0.2);
    }
    .hidden-cost-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--red-color);
      margin-bottom: 1rem;
      text-align: center;
    }
`;


export default App;