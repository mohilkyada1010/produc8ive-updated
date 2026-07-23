import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import FloatingLines from './FloatingLines'
import dashboardImage from '../DIY dashboard.PNG'
import './styles.css'

const routes = [
  ['/brand', 'Overview'], ['/logo', 'Logo'], ['/colors', 'Colors'],
  ['/typography', 'Typography'], ['/actions', 'CTAs'], ['/surfaces', 'Surfaces'],
  ['/patterns', 'Patterns'], ['/tokens', 'Tokens'], ['/components', 'Component lab']
]

const brand = {
  traits: ['Expert', 'Pragmatic', 'Trustworthy', 'Controlled', 'Quietly innovative'],
  avoid: ['Playful', 'Futuristic', 'Hype-driven'],
  colors: [
    ['Ivory', '#f4f0e8', '--ivory-100'], ['Paper', '#fffdf8', '--paper-100'],
    ['Ink', '#171717', '--ink-900'], ['Graphite', '#343633', '--ink-700'],
    ['Stone', '#625f58', '--stone-600'], ['Mist', '#ded8ce', '--stone-200'],
    ['Sage', '#69766d', '--sage-500'], ['Signal', '#b98b38', '--signal-500']
  ]
}

const defaultHero = {
  audienceLabel: 'Built for specialist teams', headline: 'Knowledge,', headlineEmphasis: 'put to work.',
  description: 'Turn your organization’s knowledge, systems, and SOPs into a governed AI workforce that gets work done.',
  primaryCtaLabel: 'Get started', primaryCtaUrl: '/get-started', secondaryCtaLabel: 'Explore agents', secondaryCtaUrl: '#agents',
  domainHeading: 'Built for work where judgment matters', domains: ['Finance', 'Tax', 'Legal', 'Operations', 'Research', 'Reporting']
}

function Link({ to, children, className = '' }) {
  return <a className={className} href={to} onClick={e => { e.preventDefault(); history.pushState({}, '', to); dispatchEvent(new PopStateEvent('popstate')); window.scrollTo(0, 0) }}>{children}</a>
}

function Copy({ value, label = 'Copy' }) {
  const [done, setDone] = useState(false)
  async function copy() { await navigator.clipboard.writeText(value); setDone(true); setTimeout(() => setDone(false), 1300) }
  return <button className="copy" onClick={copy}>{done ? 'Copied' : label}</button>
}

function Shell({ path, children }) {
  return <div className="app">
    <aside>
      <Link to="/" className="brand">Produc8ive</Link>
      <p className="aside-label">Brand system <span>v1.0</span></p>
      <nav>{routes.map(([to, label], i) => <Link key={to} to={to} className={path === to ? 'active' : ''}><span>0{i + 1}</span>{label}</Link>)}</nav>
      <p className="aside-note">Enterprise AI workforce<br />Finance · Tax · Legal</p>
    </aside>
    <main>{children}<footer><span>Produc8ive brand system</span><span>Built for teams that get work done.</span></footer></main>
  </div>
}

function PageHead({ eyebrow, title, intro }) {
  return <header className="page-head"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{intro}</p></header>
}

function Overview() {
  return <>
    <section className="hero">
      <div><p className="eyebrow">Produc8ive brand system</p><h1>Knowledge,<br /><em>put to work.</em></h1></div>
      <div className="hero-side"><p>Produc8ive turns an organization’s knowledge, systems, and SOPs into a governed AI workforce that gets work done.</p><div className="actions"><button className="button primary">Get started <b>↗</b></button><button className="button secondary">Explore agents</button></div></div>
    </section>
    <section className="statement"><p className="eyebrow light">Brand promise</p><blockquote>Give knowledge teams time back<br />without sacrificing control.</blockquote><div className="three"><p><b>Learns.</b><span>How your organization works.</span></p><p><b>Acts.</b><span>Across systems you already use.</span></p><p><b>Explains.</b><span>Every output and action.</span></p></div></section>
    <section className="section"><div className="section-title"><p className="eyebrow">Strategic foundation</p><h2>Enterprise scale.<br />Specialist depth.</h2></div><div className="foundation-grid">
      <article><span>01</span><h3>Category</h3><p>Enterprise AI Workforce Platform, anchored in finance, tax, and legal work.</p></article>
      <article><span>02</span><h3>Belief</h3><p>People should apply judgment—not spend their time moving information between systems.</p></article>
      <article><span>03</span><h3>Difference</h3><p>Organizational knowledge, live enterprise context, and controlled execution in one operating layer.</p></article>
      <article><span>04</span><h3>Outcome</h3><p>More work completed, faster and more consistently, with traceability built in.</p></article>
    </div></section>
    <section className="section"><div className="section-title"><p className="eyebrow">Character</p><h2>Quiet confidence.<br />Visible outcomes.</h2></div><div className="traits"><div><p className="eyebrow">We are</p>{brand.traits.map(x => <span key={x}>{x}</span>)}</div><div className="avoid"><p className="eyebrow">Never</p>{brand.avoid.map(x => <span key={x}>{x}</span>)}</div></div></section>
    <section className="direction"><div><p className="eyebrow">Design principles</p><h2>Clarity is a form<br />of control.</h2></div><ol><li><b>01</b><span><strong>Lead with outcomes</strong>Show what changed, not what the technology is called.</span></li><li><b>02</b><span><strong>Make complexity legible</strong>Structure dense ideas with hierarchy and proof.</span></li><li><b>03</b><span><strong>Earn every effect</strong>Depth and glass signal layers of work—not decoration.</span></li></ol></section>
  </>
}

function HomeHero() {
  const [hero, setHero] = useState(defaultHero)
  useEffect(() => {
    const controller = new AbortController()
    fetch(`${import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'}/api/homepage`, { signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject())
      .then(({ data }) => data && setHero({ ...defaultHero, ...data }))
      .catch(() => {})
    return () => controller.abort()
  }, [])
  return <div className="site-home">
    <header className="site-nav">
      <Link to="/" className="site-logo">Produc8ive</Link>
      <nav className="site-links" aria-label="Primary"><a href="#platform">Platform</a><a href="#agents">Agents</a><a href="#how">How it works</a><Link to="/brand">Brand kit</Link></nav>
      <Link to="/get-started" className="site-cta">Get started <span aria-hidden="true">↗</span></Link>
    </header>
    <main className="site-main">
      <section className="home-hero" id="platform">
        <div className="hero-orbits" aria-hidden="true"><i></i><i></i><i></i></div>
        <span className="orbit-badge badge-one" aria-hidden="true">S</span><span className="orbit-badge badge-two" aria-hidden="true">K</span><span className="orbit-badge badge-three" aria-hidden="true">F</span><span className="orbit-badge badge-four" aria-hidden="true">T</span>
        <div className="home-kicker"><span className="avatar-stack" aria-hidden="true"><i>F</i><i>T</i><i>L</i></span><strong>{hero.audienceLabel}</strong></div>
        <h1>{hero.headline}<br /><em>{hero.headlineEmphasis}</em></h1>
        <p className="home-intro">{hero.description}</p>
        <div className="home-actions"><Link to={hero.primaryCtaUrl} className="button primary">{hero.primaryCtaLabel} <b aria-hidden="true">↗</b></Link><a href={hero.secondaryCtaUrl} className="button secondary">{hero.secondaryCtaLabel}</a></div>
        <div className="product-stage" id="agents">
          <img className="workspace-placeholder" src="/agent-workspace-placeholder.svg" alt="Placeholder for the Produc8ive agent workspace preview" />
        </div>
      </section>
      <section className="domain-strip" id="how" aria-label="Produc8ive capabilities"><p>{hero.domainHeading}</p><div>{hero.domains.map(domain => <span key={domain}>{domain}</span>)}</div></section>
    </main>
  </div>
}

function Logo() {
  return <><PageHead eyebrow="Identity / 02" title="A mark for work in motion." intro="The current horizontal lockup is the only approved logo. Preserve its proportions, contrast, and generous breathing room." />
    <section className="logo-stage"><img src="/logo.png" alt="Produc8ive logo" /></section>
    <section className="split section"><div><p className="eyebrow">Proposed clear space</p><h2>Let the mark breathe.</h2><p>Maintain clear space equal to the height of the “P” around every side. Until a vector master exists, this rule remains proposed.</p></div><div className="clearspace"><div><img src="/logo.png" alt="Logo clear-space example" /></div></div></section>
    <section className="section"><div className="section-title"><p className="eyebrow">Approved use</p><h2>High contrast,<br />without compromise.</h2></div><div className="logo-pair"><article><img src="/logo.png" alt="Logo on ivory" /><p>Preferred · Ivory</p></article><article className="dark-logo"><div className="logo-reverse">PRODUC8IVE</div><p>Proposed · Reversed typeset preview only</p></article></div><p className="note">The reversed treatment is a placement preview, not an exportable logo asset. Create an approved SVG before production use.</p></section>
    <section className="section"><p className="eyebrow">Do not</p><div className="dont-grid"><p>Stretch or compress</p><p>Recolor individual parts</p><p>Place on busy imagery</p><p>Add glow or shadow</p></div></section>
  </>
}

function Colors() {
  return <><PageHead eyebrow="Foundation / 03" title="Warmth, precision, restraint." intro="Ivory and ink carry the identity. Muted neutrals organize information; sage and signal are scarce functional accents." />
    <section className="palette">{brand.colors.map(([name, hex, token], i) => <article key={name} style={{background: hex, color: i === 2 || i === 3 || i === 4 || i === 6 ? '#fffdf8' : '#171717'}}><div><h3>{name}</h3><Copy value={hex} /></div><p>{hex}<br /><span>{token}</span></p></article>)}</section>
    <section className="section"><div className="section-title"><p className="eyebrow">Usage ratio</p><h2>Neutral by default.<br />Accent with intent.</h2></div><div className="ratio"><span>60%<small>Ivory / paper</small></span><span>25%<small>Ink / graphite</small></span><span>10%<small>Stone</small></span><span>5%<small>Accent</small></span></div></section>
    <section className="section"><p className="eyebrow">Verified text pairings</p><div className="table"><div><b>Background</b><b>Text</b><b>Ratio</b><b>Use</b></div><div><span>Paper #fffdf8</span><span>Ink #171717</span><span>17.64:1</span><span>All text</span></div><div><span>Ivory #f4f0e8</span><span>Ink #171717</span><span>15.77:1</span><span>All text</span></div><div><span>Ink #171717</span><span>Paper #fffdf8</span><span>17.64:1</span><span>All inverse text</span></div><div><span>Ivory #f4f0e8</span><span>Stone #625f58</span><span>5.60:1</span><span>Body and metadata</span></div></div></section>
  </>
}

function Typography() {
  return <><PageHead eyebrow="Foundation / 04" title="Editorial authority. Operational clarity." intro="Source Serif 4 gives the brand a considered point of view. Inter keeps dense workflows and explanations direct." />
    <section className="type-feature"><p>Source Serif 4</p><span>Display & headings</span><h2>Work moves faster<br />when knowledge does.</h2><div><b>Medium 500</b><b>Semibold 600</b><Copy value="font-family: 'Source Serif 4', Georgia, serif;" label="Copy CSS" /></div></section>
    <section className="type-feature sans"><p>Inter</p><span>Body, UI & labels</span><h2>Agents research, reason, act, and escalate exceptions across the systems your teams already use.</h2><div><b>Regular 400</b><b>Medium 500</b><b>Semibold 600</b><Copy value="font-family: Inter, Arial, sans-serif;" label="Copy CSS" /></div></section>
    <section className="section"><p className="eyebrow">Landing-page scale</p><div className="type-scale"><div><span>Hero</span><strong>48 / 1.02</strong><p>Give every decision the full intelligence of your organization.</p></div><div><span>Section</span><strong>36 / 1.08</strong><h2>Designed around how work gets done.</h2></div><div><span>Subsection</span><strong>28 / 1.15</strong><h3>Control without friction.</h3></div><div><span>Body</span><strong>16 / 1.55</strong><p>Use sentence case and keep paragraphs focused on a single outcome.</p></div></div></section>
    <section className="voice section"><div><p className="eyebrow">Voice</p><h2>Bold. Expressive.<br />Outcome-led.</h2></div><div><article><b>Say</b><p>Close the books. Keep the judgment.</p><p>Your organization already knows how. Put that knowledge to work.</p></article><article className="avoid"><b>Avoid</b><p>Supercharge your business with revolutionary AI.</p><p>Unlock the future with next-generation agents.</p></article></div></section>
  </>
}

const ButtonDemo = ({ label, kind = 'primary', disabled = false }) => <button disabled={disabled} className={`button ${kind}`}>{label}<b>↗</b></button>
function Actions() {
  return <><PageHead eyebrow="Components / 05" title="Move work forward." intro="Actions are direct, specific, and visually ordered. One primary action per decision point; secondary actions help people investigate." />
    <section className="cta-hero"><p className="eyebrow light">Primary conversion</p><h2>Your next move<br />starts here.</h2><ButtonDemo label="Get started" /></section>
    <section className="section"><p className="eyebrow">Hierarchy</p><div className="cta-grid"><article><span>Primary</span><ButtonDemo label="Get started" /><p>One per section. Use for the highest-value next step.</p></article><article><span>Secondary</span><ButtonDemo label="Explore agents" kind="secondary" /><p>Use to deepen product understanding.</p></article><article><span>Tertiary</span><ButtonDemo label="See how it works" kind="text" /><p>Use for low-commitment exploration.</p></article></div></section>
    <section className="section"><p className="eyebrow">States</p><div className="states"><div><span>Default</span><ButtonDemo label="Get started" /></div><div><span>Hover</span><ButtonDemo label="Get started" kind="hover" /></div><div><span>Focus</span><ButtonDemo label="Get started" kind="focus" /></div><div><span>Disabled</span><ButtonDemo label="Get started" disabled /></div></div></section>
    <section className="section"><p className="eyebrow">Form example</p><form className="form" onSubmit={e => e.preventDefault()}><label>Work email<input type="email" placeholder="name@company.com" /></label><label>What should move faster?<textarea placeholder="Tell us about the workflow"></textarea></label><ButtonDemo label="Get started" /></form></section>
  </>
}

function Surfaces() {
  return <><PageHead eyebrow="System / 06" title="Depth that explains." intro="Light surfaces lead. Dark sections create focus. Glass is reserved for layered workflows, navigation, and featured content." />
    <section className="surface-stack"><article><p>Paper</p><h2>Clear, direct, useful.</h2><span>Primary reading surface</span></article><article><p>Ivory</p><h2>Warmth without noise.</h2><span>Default page surface</span></article><article className="glass"><p>Glass</p><h2>Context over context.</h2><span>Featured layers and navigation</span></article><article className="inverse"><p>Ink</p><h2>Focus the decision.</h2><span>Approved dark sections</span></article></section>
    <section className="section"><p className="eyebrow">Featured card</p><div className="featured"><div><p className="eyebrow light">Agent / Finance operations</p><h2>From source data<br />to board-ready.</h2><p>Pull live data, validate figures, create visuals, and format the presentation—while keeping every source traceable.</p><ButtonDemo label="See how it works" kind="inverse" /></div><div className="mock"><div className="mock-top"><span>Board Deck Agent</span><span>● Live</span></div><div className="chart"><i></i><i></i><i></i><i></i><i></i><i></i></div><div className="mock-row"><span>Sources checked <b>24</b></span><span>Exceptions <b>03</b></span></div></div></div></section>
    <section className="section"><p className="eyebrow">Listings & disclosure</p><div className="accordion">{['What does the agent learn?', 'Where can it act?', 'How does it explain decisions?'].map((x, i) => <details key={x} open={i === 0}><summary>{x}<b>+</b></summary><p>{i === 0 ? 'Approved SOPs, policies, business rules, and historical decisions—within defined boundaries.' : 'Document the answer in plain language, then link to the relevant workflow or control.'}</p></details>)}</div></section>
  </>
}

const patternCode = `.dark-field {
  background:
    radial-gradient(circle at 78% 20%, rgba(105,118,109,.30), transparent 30%),
    linear-gradient(120deg, #171717, #292c29 55%, #171717);
  color: #fffdf8;
}`
function Patterns() {
  return <><PageHead eyebrow="Expression / 07" title="Atmosphere, with a job to do." intro="Patterns create hierarchy and safe content zones. They are CSS-native, restrained, and always have a solid fallback." />
    <section className="pattern-preview"><div><p className="eyebrow light">Dark field / Featured story</p><h2>Complex work.<br />Clear control.</h2><p>Keep primary content in the left 55%. The atmospheric focus sits away from text.</p></div></section>
    <section className="code-block"><div><span>CSS · Dark field</span><Copy value={patternCode} label="Copy CSS" /></div><pre>{patternCode}</pre></section>
    <section className="section"><div className="section-title"><p className="eyebrow">Diagram language</p><h2>Show the work,<br />not the magic.</h2></div><div className="flow"><div><b>01</b><span>SOPs & knowledge</span></div><i>→</i><div><b>02</b><span>Governed agent</span></div><i>→</i><div><b>03</b><span>Systems & action</span></div><i>→</i><div><b>04</b><span>Evidence & exceptions</span></div></div></section>
    <section className="section"><p className="eyebrow">Pattern rules</p><div className="dont-grid"><p>Use texture to separate modes</p><p>Protect quiet zones for copy</p><p>Keep motion slow and optional</p><p>Never imply unverified intelligence</p></div></section>
  </>
}

const tokenSnippet = `:root {
  --surface-primary: #f4f0e8;
  --surface-secondary: #fffdf8;
  --surface-inverse: #171717;
  --text-primary: #171717;
  --text-secondary: #625f58;
  --text-inverse: #fffdf8;
  --border-subtle: #ded8ce;
  --action-primary: #171717;
  --focus-ring: #69766d;
}`
function Tokens() {
  return <><PageHead eyebrow="Handoff / 08" title="One source of truth." intro="Use semantic tokens in production work. Primitive values describe what a color is; semantic values describe what it does." />
    <section className="code-block large"><div><span>CSS · Core semantic tokens</span><Copy value={tokenSnippet} label="Copy tokens" /></div><pre>{tokenSnippet}</pre></section>
    <section className="section"><p className="eyebrow">Naming model</p><div className="token-model"><div><span>Primitive</span><code>--ink-900</code><p>Raw value. Do not use directly in components.</p></div><i>→</i><div><span>Semantic</span><code>--text-primary</code><p>Purpose. Preferred in layouts and prose.</p></div><i>→</i><div><span>Component</span><code>--button-bg</code><p>Local role. Maps back to a semantic token.</p></div></div></section>
    <section className="section"><p className="eyebrow">Quick copy</p><div className="quick-copy">{[['Primary background', 'var(--surface-primary)'], ['Primary text', 'var(--text-primary)'], ['Inverse section', 'var(--surface-inverse)'], ['Primary action', 'var(--action-primary)']].map(([a,b]) => <div key={a}><span>{a}</span><code>{b}</code><Copy value={b} /></div>)}</div></section>
    <section className="handoff"><p className="eyebrow light">Working rule</p><h2>If a value has no clear role,<br />it is not yet a token.</h2><p>Deprecate by aliasing the old semantic name for one release, documenting the replacement, then removing it.</p></section>
  </>
}

function SectionLibrary() {
  const [filter, setFilter] = useState('All')
  const sections = [
    ['Hero', 'Split hero', <SplitHero />], ['Hero', 'Product hero', <ProductHero />],
    ['Feature', 'Split feature', <SplitFeature />], ['Feature', 'Feature grid', <FeatureGrid />],
    ['CTA', 'Conversion banner', <ConversionBanner />], ['Footer', 'Corporate footer', <CorporateFooter />]
  ]
  const visible = filter === 'All' ? sections : sections.filter(([type]) => type === filter)
  return <section className="section-library">
    <header className="library-intro"><div><p className="eyebrow">Admin / Section library</p><h1>Ready-made sections,<br /><em>made Produc8ive.</em></h1></div><div><p>Reusable landing-page structures based on Ruixen UI's free section patterns, adapted to the Produc8ive brand system.</p><a className="button primary" href="https://ruixen.com/docs/index" target="_blank" rel="noreferrer">Browse Ruixen <b>↗</b></a></div></header>
    <nav className="section-filters" aria-label="Filter sections">{['All', 'Hero', 'Feature', 'CTA', 'Footer'].map(item => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}<span>{item === 'All' ? sections.length : sections.filter(([type]) => type === item).length}</span></button>)}</nav>
    <div className="section-list">{visible.map(([type, name, preview], index) => <article className="section-preview" key={name}><header><div><span>{String(index + 1).padStart(2, '0')}</span><h2>{name}</h2></div><p>{type}</p></header><div className="preview-frame">{preview}</div></article>)}</div>
  </section>
}

function SplitHero() { return <section className="lab-split-hero"><div><p className="eyebrow">Enterprise AI workforce</p><h3>Put your knowledge<br /><em>to work.</em></h3><p>Governed agents that understand how your organization works and move specialist work forward.</p><div><button className="button primary">Get started ↗</button><button className="button secondary">See how it works</button></div></div><div className="lab-workflow"><span>WORKFLOW / 01</span><b>Research</b><i>→</i><b>Reason</b><i>→</i><b>Act</b><small>Every action stays traceable.</small></div></section> }
function ProductHero() { return <section className="lab-product-hero"><p className="eyebrow">Built for work where judgment matters</p><h3>Close the work.<br />Keep the judgment.</h3><p>Connect knowledge, live context, and controlled execution in one operating layer.</p><button className="button primary">Explore agents ↗</button><div className="lab-dashboard"><span>Board Deck Agent</span><strong>24 sources checked</strong><div><i></i><i></i><i></i><i></i><i></i></div></div></section> }
function SplitFeature() { return <section className="lab-feature-split"><div><p className="eyebrow light">Controlled execution</p><h3>Designed around<br />how work gets done.</h3><p>Agents work across approved systems, escalate exceptions, and keep evidence attached.</p></div><ol>{[['01','Learns your process','Approved SOPs, policies, and prior decisions.'],['02','Acts within boundaries','Defined permissions, review gates, and controls.'],['03','Explains every output','Sources and reasoning remain visible.']].map(([n,t,d]) => <li key={n}><b>{n}</b><span><strong>{t}</strong>{d}</span></li>)}</ol></section> }
function FeatureGrid() { return <section className="lab-feature-grid"><header><p className="eyebrow">One operating layer</p><h3>From knowledge<br />to completed work.</h3></header><div>{[['01','Research','Find the right evidence.'],['02','Reason','Apply policy and context.'],['03','Act','Move work across systems.'],['04','Escalate','Bring judgment in on time.']].map(([n,t,d]) => <article key={n}><span>{n}</span><h4>{t}</h4><p>{d}</p></article>)}</div></section> }
function ConversionBanner() { return <section className="lab-cta"><p className="eyebrow light">Your next move</p><h3>Give knowledge teams<br />time back.</h3><p>Start with one high-value workflow and prove the outcome.</p><button className="button inverse">Start a conversation ↗</button></section> }
function CorporateFooter() { return <footer className="lab-footer"><div><strong>Produc8ive</strong><p>Knowledge, put to work.</p></div><div><span>Platform</span><a href="#">Agents</a><a href="#">How it works</a><a href="#">Security</a></div><div><span>Company</span><a href="#">About</a><a href="#">Insights</a><a href="#">Contact</a></div><small>© 2026 Produc8ive. Built for teams that get work done.</small></footer> }

function LandingPageOne() {
  return <div className="landing-one">
    <FloatingNavbar />
    <main>
      <section className="tabbed-hero landing-hero-redesign" id="platform">
        <div className="hero-lines" aria-hidden="true"><FloatingLines lineCount={18} lineDistance={16} animationSpeed={.28} middleWavePosition={{x: 1.4, y: -.15, rotate: .24}} linesGradient={['#69766d', '#b98b38']} /></div>
        <h1>AI Workflows That Eliminate<br /><em>Repetitive Finance Operations</em></h1>
        <p className="landing-lead">Automate invoice processing, reconciliations, approvals, compliance, and audit workflows. Reduce manual effort, eliminate bottlenecks, strengthen financial controls, and accelerate month-end close—all without replacing your ERP.</p>
        <div className="landing-actions"><a className="button primary" href="#contact">Map One Finance Workflow ↗</a><span className="landing-cta-note">Start with one workflow. No migration.</span></div>
        <div className="hero-dashboard-frame"><img src={dashboardImage} alt="Produc8ive finance automation dashboard" /></div>
      </section>
      <section className="growth-strip" id="proof" aria-label="Growth and efficiency outcomes"><div>
        <article><strong>10+ hours</strong><p>saved per week</p></article>
        <article><strong>8x</strong><p>faster processing</p></article>
        <article><strong>95%+</strong><p>data accuracy</p></article>
        <article><strong>60%</strong><p>lower processing cost</p></article>
      </div></section>
      <ProblemSection />
      <FinanceShiftSection />
      <WhyProduc8iveSection />
      <UseCasesSection />
      <FinanceBrainFlowSection />
      <ImplementationJourneySection />
      <WorkflowDemoSection />
      <IntegrationsSection />
      <HonestScopeSection />
      <LeadershipSection />
      <TrustedBySection />
      <FinalCtaSection />
      <FaqSection />
      <ContactSection />
    </main>
  </div>
}

function ProblemSection() {
  const manualItems = [
    'High Manual Data Entry',
    'Delayed Approvals',
    'Compliance & Audit Risk',
    'Month-end Close Delays',
    'Limited Visibility',
    'Reactive Decision Making'
  ]
  const produc8iveItems = [
    'Automated Data Capture',
    'Intelligent Workflow Automation',
    'Built-in Controls & Audit Trail',
    'Accelerated Financial Close',
    'AI-Powered Dashboards',
    'Actionable AI Insights'
  ]
  const flowCards = [
    ['01', 'Fragmented Finance Inputs', 'Finance data comes from invoices, emails, spreadsheets, ERP exports, and documents, making intake fragmented and inefficient.'],
    ['02', 'Manual Operational Work', 'Teams spend excessive time on repetitive data entry, validation, approvals, and reconciliation instead of strategic finance work.'],
    ['03', 'Delayed Financial Close', 'Manual processes and disconnected systems delay month-end close, reporting, and financial decision-making.']
  ]
  return <section className="problem-section" id="problems">
    <header>
      <p className="eyebrow light">The Problem</p>
      <h2>Manual Finance Processes Are Slowing Down Your Business.</h2>
      <p>Disconnected systems and manual finance processes create bottlenecks, increase reconciliation effort and compliance risk, delay financial close, and drive up operating costs as transaction volumes grow.</p>
    </header>

    {/* Two-column comparison */}
    <div className="problem-comparison">
      <article className="problem-compare-card problem-compare-manual">
        <header className="compare-card-head">
          <h3>Manual Finance Today</h3>
          <span className="compare-tag compare-tag-bad">Expensive · Slow · Risky</span>
        </header>
        <ul>{manualItems.map(item => <li key={item}><span className="compare-icon compare-icon-bad" aria-hidden="true">✕</span>{item}</li>)}</ul>
      </article>
      <article className="problem-compare-card problem-compare-produc8ive">
        <header className="compare-card-head">
          <h3>Finance with Produc8ive</h3>
          <span className="compare-tag compare-tag-good">Automated · Controlled · Accelerated</span>
        </header>
        <ul>{produc8iveItems.map(item => <li key={item}><span className="compare-icon compare-icon-good" aria-hidden="true">✓</span>{item}</li>)}</ul>
      </article>
    </div>

    {/* Three horizontal flow cards */}
    <div className="problem-flow-cards">
      {flowCards.map(([num, title, desc]) => (
        <article className="problem-flow-card" key={num}>
          <span className="problem-flow-num" aria-hidden="true">{num}</span>
          <h3>{title}</h3>
          <p>{desc}</p>
        </article>
      ))}
    </div>

    {/* Closing statement */}
    <div className="problem-closing">
      <blockquote>"That is not expert finance work. That is operational drag."</blockquote>
    </div>
  </section>
}

function FinanceShiftSection() {
  const capabilities = [
    'Capture finance data automatically',
    'Identify exceptions before review',
    'Coordinate approvals and follow-ups',
    'Validate documents and transactions',
    'Prepare review-ready workpapers',
    'Maintain complete audit visibility'
  ]
  return <section className="finance-shift" id="finance-shift">
    <div className="finance-shift-copy">
      <p className="eyebrow">The Shift</p>
      <h2>Finance Should Focus on Decisions, Not Data Preparation.</h2>
      <p className="shift-subhead">The Modern Finance Team Needs a System That Can —</p>
      <ul className="shift-list">
        {capabilities.map((item, i) => (
          <li key={item} className="shift-list-item" style={{'--delay': `${i * 0.08}s`}}>
            <span className="shift-list-icon" aria-hidden="true">→</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
    <div className="shift-visual" aria-label="Produc8ive coordinates finance work and surfaces only material exceptions">
      <header><span><i></i>Finance workflow</span><b>Coordinated</b></header>
      <div className="workflow-summary">
        <small>SYSTEM CAPABILITY</small>
        <strong>Decisions,<br />not prep.</strong>
        <span>Agents handle routine work. Your team handles what matters.</span>
      </div>
      <div className="workflow-path" aria-hidden="true"><span>Capture</span><i>→</i><span>Validate</span><i>→</i><span>Deliver</span></div>
      <div className="exception-card">
        <span><small>EXCEPTION SURFACED</small><strong>Approval threshold exceeded</strong></span>
        <b>Needs judgment</b>
      </div>
      <footer>
        <span>Routine items cleared <b>52</b></span>
        <span>For review <b>02</b></span>
      </footer>
    </div>
  </section>
}

function WhyProduc8iveSection() {
  const reasons = [
    {
      type: 'multi-agent',
      title: 'Multi-Agent Architecture',
      description: 'Specialised AI agents working together across your finance workflows.',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 12h5l5-5M12 12l5 5"/></svg>,
      visual: <div className="why-visual-multi" aria-hidden="true">
        <svg className="wv-multi-svg" viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Connection lines */}
          <line x1="150" y1="90" x2="32" y2="32" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="4 4"/>
          <line x1="150" y1="90" x2="32" y2="148" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="4 4"/>
          <line x1="150" y1="90" x2="268" y2="32" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="4 4"/>
          <line x1="150" y1="90" x2="268" y2="148" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="4 4"/>
          {/* Traveling dots — one per line, staggered */}
          <circle className="wv-dot wv-dot-1" r="3.5" fill="var(--sage-500)"><animateMotion dur="2s" repeatCount="indefinite" begin="0s"><mpath href="#path-tl"/></animateMotion></circle>
          <circle className="wv-dot wv-dot-2" r="3.5" fill="var(--signal-500)"><animateMotion dur="2s" repeatCount="indefinite" begin="0.5s"><mpath href="#path-bl"/></animateMotion></circle>
          <circle className="wv-dot wv-dot-3" r="3.5" fill="var(--sage-500)"><animateMotion dur="2s" repeatCount="indefinite" begin="1s"><mpath href="#path-tr"/></animateMotion></circle>
          <circle className="wv-dot wv-dot-4" r="3.5" fill="var(--signal-500)"><animateMotion dur="2s" repeatCount="indefinite" begin="1.5s"><mpath href="#path-br"/></animateMotion></circle>
          {/* Motion paths */}
          <defs>
            <path id="path-tl" d="M150,90 L32,32"/>
            <path id="path-bl" d="M150,90 L32,148"/>
            <path id="path-tr" d="M150,90 L268,32"/>
            <path id="path-br" d="M150,90 L268,148"/>
          </defs>
          {/* Satellite nodes */}
          <rect x="8" y="10" width="48" height="44" rx="2" fill="var(--paper-100)" stroke="var(--border-subtle)" strokeWidth="1"/>
          <text x="32" y="37" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="Inter,sans-serif" fill="var(--text-secondary)" letterSpacing="0.08em">AP</text>
          <rect x="8" y="126" width="48" height="44" rx="2" fill="var(--paper-100)" stroke="var(--border-subtle)" strokeWidth="1"/>
          <text x="32" y="153" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="Inter,sans-serif" fill="var(--text-secondary)" letterSpacing="0.08em">AR</text>
          <rect x="244" y="10" width="48" height="44" rx="2" fill="var(--paper-100)" stroke="var(--border-subtle)" strokeWidth="1"/>
          <text x="268" y="37" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="Inter,sans-serif" fill="var(--text-secondary)" letterSpacing="0.08em">TAX</text>
          <rect x="244" y="126" width="48" height="44" rx="2" fill="var(--paper-100)" stroke="var(--border-subtle)" strokeWidth="1"/>
          <text x="268" y="153" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="Inter,sans-serif" fill="var(--text-secondary)" letterSpacing="0.08em">CLOSE</text>
          {/* Center node */}
          <rect x="122" y="62" width="56" height="56" rx="2" fill="var(--ink-900)"/>
          <text x="150" y="95" textAnchor="middle" fontSize="12" fontWeight="600" fontFamily="Inter,sans-serif" fill="var(--paper-100)" letterSpacing="0.04em">P8</text>
          {/* Center pulse ring */}
          <circle cx="150" cy="90" r="34" stroke="var(--sage-500)" strokeWidth="1" strokeOpacity="0.4" fill="none">
            <animate attributeName="r" values="34;44;34" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
    },
    {
      type: 'human-loop',
      title: 'Human-in-the-Loop',
      description: 'AI prepares and recommends. Your team reviews and approves.',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l8 4v5c0 5-3.4 8-8 9-4.6-1-8-4-8-9V7l8-4z"/><path d="M9 12l2 2 4-4"/></svg>,
      visual: <div className="why-visual-loop" aria-hidden="true">
        <div className="wv-loop-row"><span className="wv-chip wv-chip-ai">AI prepared</span><span className="wv-arrow">→</span><span className="wv-chip wv-chip-human">Human approves</span></div>
        <div className="wv-loop-status"><i></i><b>2 items awaiting review</b></div>
      </div>
    },
    {
      type: 'custom-wf',
      title: 'Custom Workflows',
      description: 'Configured around your processes, controls, and approval structure.',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M17.5 17.5m-2.5 0a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0M14 10h3v4"/></svg>,
      visual: <div className="wv-steps" aria-hidden="true"><span><b>01</b>Capture</span><i>→</i><span><b>02</b>Validate</span><i>→</i><span><b>03</b>Approve</span></div>
    },
    {
      type: 'erp-agnostic',
      title: 'ERP Agnostic',
      description: 'Works with your existing systems. No ERP replacement required.',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="6" width="6" height="12" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/><rect x="16" y="6" width="6" height="12" rx="1"/><path d="M8 12h1M15 12h1"/></svg>,
      visual: <div className="wv-erp" aria-hidden="true"><span>SAP</span><span>Oracle</span><b>P8</b><span>Xero</span><span>QB</span></div>
    },
    {
      type: 'orchestration',
      title: 'Proprietary AI Orchestration',
      description: 'Our orchestration layer optimises models, rules, and human decisions.',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>,
      visual: <div className="wv-orch" aria-hidden="true"><span className="wv-orch-ring wv-orch-ring-outer"></span><span className="wv-orch-ring wv-orch-ring-inner"></span><b>Orch.</b></div>
    },
    {
      type: 'integrations',
      title: 'Plug & Play Integrations',
      description: 'Connect email, ERPs, portals, banks, and documents seamlessly.',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
      visual: <div className="wv-integrations" aria-hidden="true"><span>Email</span><span>ERP</span><span>Bank</span><span>Docs</span></div>
    }
  ]

  return <section className="why-produc8ive" id="why-produc8ive">
    <header className="why-header">
      <div><p className="why-pill">Why Produc8ive</p><h2>Built for the Work Between Your Systems</h2></div>
      <p>Six capabilities that make Produc8ive different from adding AI to isolated finance tasks.</p>
    </header>
    <div className="why-grid">
      {reasons.map(({ type, title, description, icon, visual }, index) => (
        <article className={`why-card${index < 2 ? ' why-card-large' : ''} why-card-${type}`} key={title}>
          <div className="why-card-icon">{icon}</div>
          <h3>{title}</h3>
          <p>{description}</p>
          <div className={`why-visual ${type}`}>{visual}</div>
        </article>
      ))}
    </div>
  </section>
}

function UseCasesSection() {
  const agents = [
    {
      num: '01', title: 'Bookkeeping Handoff Assistant',
      inputs: ['Client emails', 'Bank statements', 'Invoices', 'Receipts', 'Spreadsheets'],
      outputs: ['Clean bookkeeping packet', 'Missing item detection', 'Entity mapping', 'Transaction notes', 'Review flags'],
      review: 'Bookkeeper approves before entry or reconciliation.'
    },
    {
      num: '02', title: 'AP Invoice Processing Assistant',
      inputs: ['Vendor invoices', 'Purchase order details', 'Approval emails', 'Due dates', 'ERP records'],
      outputs: ['Extracted invoice data', 'Approval status', 'Exception flags', 'Posting-ready packet'],
      review: 'Finance team approves low-confidence or exception cases.'
    },
    {
      num: '03', title: 'Variance Analysis Assistant',
      inputs: ['Management estimates', 'Approved budgets', 'Actual vendor invoices', 'Expense records'],
      outputs: ['Budget vs. actual variance analysis', 'Under/over-budget identification', 'Exception flagging'],
      review: 'Finance team reviews significant variances and approves corrective actions.'
    },
    {
      num: '04', title: 'AR Collections Follow-Up',
      inputs: ['Invoice aging', 'Payment history', 'Previous emails', 'Open disputes'],
      outputs: ['Draft payment reminders', 'Invoice aging prioritization', 'Customer-specific messaging'],
      review: 'Team edits and sends communications.'
    },
    {
      num: '05', title: 'Month-End Close Tracker',
      inputs: ['Reconciliation files', 'Open AP/AR items', 'Uncategorized transactions', 'Pending approvals'],
      outputs: ['Daily close summary', 'Outstanding blockers', 'Assigned owners', 'Recommended next actions'],
      review: 'Finance lead assigns owners and clears blockers.'
    },
    {
      num: '06', title: 'Investor Reporting Preparation',
      inputs: ['Monthly financials', 'KPIs', 'Budget files', 'Commentary notes', 'Cash flow data'],
      outputs: ['Draft investor reporting package', 'Missing information', 'Financial highlights', 'Review notes'],
      review: 'CFO or Financial Controller approves before distribution.'
    },
    {
      num: '07', title: 'Documentation Pre-Check',
      inputs: ['KYC documents', 'PAN documents', 'Entity records', 'Investor documents', 'Bank and broker requirements'],
      outputs: ['Documentation readiness checklist', 'Missing documents', 'Mismatched information', 'Unclear documentation flags'],
      review: 'Account manager confirms before external submission.'
    },
    {
      num: '08', title: 'Case Status Tracker',
      inputs: ['Client emails', 'Internal notes', 'Bank, broker, and vendor updates', 'Pending documents'],
      outputs: ['Current workflow stage', 'Blockers', 'Task owner', 'Next action', 'Client update draft'],
      review: 'Owner reviews and sends the client update.'
    },
    {
      num: '09', title: 'Audit-Ready Books QA',
      inputs: ['Accounting books', 'Financial reports', 'Supporting documents', 'Uncategorized expenses', 'Inconsistent entries'],
      outputs: ['Missing support documentation', 'Data mismatches', 'Anomaly detection', 'Outstanding review questions'],
      review: 'Accountant decides the final accounting treatment.'
    }
  ]

  return <section className="use-cases-section" id="agents">
    <div className="agent-scroll" aria-label="Deployable finance assistants">
      <div className="agent-track">
        {[...agents, ...agents].map(({ num, title, inputs, outputs, review }, index) => (
          <article key={`${num}-${index}`} aria-hidden={index >= agents.length ? 'true' : undefined}>
            <span>{num}</span>
            <div>
              <h3>{title}</h3>
              <div className="agent-io">
                <div className="agent-io-col">
                  <p className="agent-io-label">Input</p>
                  <ul>{inputs.map(i => <li key={i}>{i}</li>)}</ul>
                </div>
                <div className="agent-io-divider" aria-hidden="true">→</div>
                <div className="agent-io-col">
                  <p className="agent-io-label">Output</p>
                  <ul>{outputs.map(o => <li key={o}>{o}</li>)}</ul>
                </div>
              </div>
              <p className="agent-review"><span aria-hidden="true">◎</span> Human Review — {review}</p>
            </div>
            <i aria-hidden="true">↗</i>
          </article>
        ))}
      </div>
    </div>
    <div className="use-cases-copy">
      <p className="eyebrow">Use Cases</p>
      <h2>Real Finance Workflows Produc8ive Can Support</h2>
      <p className="use-cases-intro">Deploy purpose-built agents for the finance processes consuming the most time today, then expand the same Finance Brain across AP, AR, close, reporting, bookkeeping and compliance.</p>
      <a className="button primary" href="#contact">Map One Finance Workflow <b aria-hidden="true">↗</b></a>
    </div>
  </section>
}

function FinanceBrainFlowSection() {
  const stages = [
    {
      type: 'capture',
      label: 'Intake Assistants',
      title: 'Intake',
      description: 'Automate the intake of finance documents and requests.',
      capabilities: ['Accounting Operations', 'Client Onboarding', 'AP Invoice Intake', 'Documentation-Heavy Workflows'],
      visual: <div className="capture-workspace" aria-hidden="true">
        <header><span>Finance intake</span><b>● Live</b></header>
        <div className="capture-flow">
          <div className="source-list">
            <span><i>@</i>Email<small>6 new</small></span>
            <span><i>▤</i>Invoices<small>8 files</small></span>
            <span><i>▥</i>Statements<small>4 files</small></span>
          </div>
          <div className="flow-connector"><i></i><b>→</b></div>
          <div className="intake-result">
            <small>STRUCTURED INTAKE</small>
            <strong>18 items ready</strong>
            <span>Classified <b>18</b></span>
            <span>Fields extracted <b>96%</b></span>
            <em>Ready to validate</em>
          </div>
        </div>
      </div>
    },
    {
      type: 'validate',
      label: 'Review Assistants',
      title: 'Review',
      description: 'Review finance data and documents to detect issues before processing.',
      capabilities: ['Missing Documents', 'Mismatch Checks', 'Uncategorized Transactions', 'Incomplete Reports'],
      visual: <div className="validation-workspace" aria-hidden="true">
        <header><span>Document review</span><b>3 checks passed</b></header>
        <div className="validation-panels">
          <div className="document-preview">
            <small>INVOICE / 1842</small>
            <strong>Northstar Supply</strong>
            <span>Invoice total <b>£12,480</b></span>
            <span>PO reference <b>PO-7741</b></span>
            <i></i><i></i>
          </div>
          <div className="check-list">
            <span><i>✓</i><b>Supplier matched</b><small>Vendor master</small></span>
            <span><i>✓</i><b>Totals checked</b><small>Within tolerance</small></span>
            <span className="check-flag"><i>!</i><b>Approval missing</b><small>Review required</small></span>
          </div>
        </div>
      </div>
    },
    {
      type: 'coordinate',
      label: 'Status Assistants',
      title: 'Track',
      description: 'Track the progress of finance workflows from start to completion.',
      capabilities: ['Month-End Close', 'AP Approvals', 'AR Collections', 'Documentation Cases'],
      visual: <div className="coordination-workspace" aria-hidden="true">
        <header><span>Workflow status</span><b>3 owners</b></header>
        <div className="coordination-board">
          <span><i>✓</i><b>AP review</b><small>Finance Ops</small><em>Complete</em></span>
          <span><i>2</i><b>Controller approval</b><small>J. Morgan</small><em>In review</em></span>
          <span><i>3</i><b>ERP posting</b><small>System queue</small><em>Waiting</em></span>
        </div>
        <footer><span>Dependency tracked</span><b>No blockers</b></footer>
      </div>
    },
    {
      type: 'deliver',
      label: 'Reporting Assistants',
      title: 'Report',
      description: 'Generate accurate reports, insights, and executive-ready summaries.',
      capabilities: ['Investor Updates', 'CFO Reporting', 'KPI Summaries', 'Cash-Flow Commentary'],
      visual: <div className="deliver-visual" aria-hidden="true">
        <span><small>INVESTOR REPORTING PACK</small><b>Review-ready</b><i></i><i></i><i></i></span>
        <em>Evidence attached</em>
      </div>
    }
  ]

  return <section className="finance-brain-flow" id="finance-brain-flow">
    <header>
      <p className="flow-pill">A Finance Brain for Repeatable Operations</p>
      <h2>A Finance Operations Layer That Learns,<br />Acts, and Traces.</h2>
      <p className="flow-subhead">A finance operations layer that learns your SOPs, works across your systems, and produces traceable outputs.</p>
    </header>
    <div className="flow-timeline">
      {stages.map(({ type, label, title, description, capabilities, visual }) => (
        <article className="timeline-item" key={title}>
          <div className={`flow-card-visual ${type}`}>{visual}</div>
          <span className="timeline-node" aria-hidden="true"><i></i></span>
          <div className="flow-card-copy">
            <p className="timeline-stage">{label}</p>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="flow-capabilities">
              <p className="flow-cap-label">Key Capabilities</p>
              <ul>{capabilities.map(c => <li key={c}>{c}</li>)}</ul>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
}

function ImplementationJourneySection() {
  const stages = [
    ['01', 'Discovery', 'Map your finance workflows, systems, stakeholders, and success metrics to define the implementation plan.', 'Week 1'],
    ['02', 'Workflow Configuration', 'Configure business rules, approval workflows, validations, and process mappings tailored to your finance operations.', 'Week 1–2'],
    ['03', 'ERP Integration', 'Securely integrate with ERP platforms such as Tally, SAP, NetSuite, Acumatica, and hundreds of other business systems.', 'Week 2'],
    ['04', 'Data Training', 'Train AI models using your ledgers, vendors, document formats, and historical finance data within a secure testing environment.', 'Week 2–3'],
    ['05', 'Go Live', 'Deploy automated workflows into production with continuous monitoring, alerts, and ongoing accuracy improvements.', 'Week 3–4']
  ]
  const deployment = [
    ['complete', 'Discovery', 'Week 1 · Complete', 'Workflows, systems, stakeholders, and success metrics mapped.'],
    ['complete', 'Workflow Configuration', 'Week 1–2 · Complete', 'Business rules, approvals, and process mappings configured.'],
    ['complete', 'ERP Integration', 'Week 2 · Complete', 'Tally, SAP, and document repository connected securely.'],
    ['progress', 'Data Training', 'Week 2–3 · In progress', 'AI models training on ledgers, vendors, and historical data.'],
    ['pending', 'Go Live', 'Week 3–4 · Pending', 'Production deployment pending final sign-off and monitoring setup.']
  ]
  return <section className="implementation-journey" id="implementation-journey">
    <div className="implementation-copy">
      <p className="implementation-pill">Implementation Journey</p>
      <h2>From Kickoff to Autonomy in Weeks</h2>
      <p className="implementation-intro">A guided, five-stage implementation that connects Produc8ive to your ERP, learns your finance processes, and delivers a review-ready workflow—without replacing your existing systems.</p>
      <div className="implementation-principles">
        {stages.map(([num, title, description, timeline]) => (
          <article key={num}>
            <i aria-hidden="true">{num}</i>
            <div>
              <h3>{title} <span className="impl-timeline">{timeline}</span></h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
    <div className="deployment-stage">
      <div className="deployment-workspace">
        <header>
          <div><small>IMPLEMENTATION PROGRESS</small><h3>Produc8ive Deployment</h3></div>
          <span>In progress</span>
        </header>
        <div className="deployment-checklist">
          {deployment.map(([state, title, status, description]) => (
            <article className={state} key={title}>
              <i aria-hidden="true">{state === 'complete' ? '✓' : state === 'progress' ? '◒' : '·'}</i>
              <div><h4>{title}</h4><p>{description}</p></div>
              <b>{status}</b>
            </article>
          ))}
        </div>
        <footer>
          <div className="readiness-copy">
            <span>Overall progress</span>
            <strong>60%</strong>
            <i><b style={{width:'60%'}}></b></i>
          </div>
          <button type="button">View Deployment Plan <span aria-hidden="true">→</span></button>
        </footer>
      </div>
      <div className="deployment-support" aria-label="Implementation summary">
        <article><small>Typical Timeline</small><strong>3–4 Weeks</strong></article>
        <article><small>Implementation Stages</small><strong>5 Guided Steps</strong></article>
        <article><small>Support</small><strong>Dedicated Customer Success Partner</strong></article>
      </div>
    </div>
  </section>
}

function WorkflowDemoSection() {
  const steps = [
    ['01', 'Invoice In',    'Vendor invoices received through email or a shared document repository.'],
    ['02', 'Extract',       'Automatically extract vendor info, invoice number, line items, amounts, taxes, and due dates.'],
    ['03', 'Check',         'Validate purchase orders, approval status, required fields, and flag missing or inconsistent data.'],
    ['04', 'Route',         'Low-confidence invoices and exceptions routed to the appropriate finance reviewer.'],
    ['05', 'Post-Ready',    'Prepare a validated, approval-ready invoice package for seamless ERP posting.'],
    ['06', 'Audit Log',     'Record every action, review, approval, and change for a complete audit trail.']
  ]
  return <section className="workflow-demo" id="workflow-demo">
    <header className="workflow-demo-header">
      <p className="eyebrow light">See It in Action</p>
      <h2>One Workflow, Fully Mapped —<br /><em>AP Invoice Processing</em></h2>
      <p className="workflow-demo-lead">Follow a complete Accounts Payable workflow from invoice receipt to ERP-ready posting, with AI automating repetitive tasks while keeping humans in control of critical decisions.</p>
    </header>

    <div className="workflow-steps">
      {steps.map(([num, title, desc], i) => (
        <div className="workflow-step" key={num} style={{'--step-index': i}}>
          <div className="workflow-step-card">
            <span className="workflow-step-num">{num}</span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
          {i < steps.length - 1 && (
            <div className="workflow-step-connector" aria-hidden="true">
              <span className="wf-connector-dot"></span>
            </div>
          )}
        </div>
      ))}
    </div>

    <div className="workflow-result">
      <span className="workflow-result-icon" aria-hidden="true">✓</span>
      <div>
        <p className="workflow-result-label">Result</p>
        <p className="workflow-result-text">AP work reaches the finance team cleaner, faster, and with fewer hidden gaps.</p>
      </div>
      <a className="button inverse" href="#contact">Map Your Workflow <b aria-hidden="true">↗</b></a>
    </div>
  </section>
}


function IntegrationsSection() {
  const erps = [
    {
      name: 'Tally',
      sub: 'Power of Simplicity',
      logo: <span className="erp-logo-tally"><em>Tally</em><small>Power of Simplicity</small></span>
    },
    {
      name: 'SAP',
      sub: null,
      logo: <span className="erp-logo-sap">SAP</span>
    },
    {
      name: 'Oracle NetSuite',
      sub: 'NetSuite',
      logo: <span className="erp-logo-oracle"><em>ORACLE</em><small>NetSuite</small></span>
    },
    {
      name: 'Acumatica',
      sub: 'The Cloud ERP',
      logo: <span className="erp-logo-acumatica"><b>◆</b> Acumatica<small>The Cloud ERP</small></span>
    }
  ]
  return <section className="integrations-section" id="integrations">
    <header className="integrations-header">
      <p className="eyebrow">Integrations</p>
      <h2>Connects to Your <em>Existing Stack</em></h2>
    </header>
    <div className="integrations-logos" aria-label="Supported ERP platforms">
      {erps.map(({ name, logo }) => (
        <div className="integrations-logo-cell" key={name}>
          {logo}
        </div>
      ))}
    </div>
    <p className="integrations-note">Works with your existing ERP. Custom integrations available. No replacement required.</p>
  </section>
}


function HonestScopeSection() {
  const prepares = ['Document Checks', 'Review Packets', 'Audit Packs', 'Reporting Drafts', 'Follow-up Drafts', 'Status Tracking']
  const decides  = ['Accounting', 'Tax Positions', 'Payments', 'Compliance', 'Investments', 'Final Approval']

  return <section className="honest-scope" id="honest-scope">
    <div className="honest-scope-inner">

      {/* Left — header copy */}
      <div className="honest-scope-copy">
        <p className="eyebrow">Honest Scope</p>
        <h2>What Produc8ive<br />Does Not Do</h2>
        <p className="honest-scope-body">Produc8ive does not replace finance judgment. It does not make final accounting, tax, compliance, banking, or investment decisions.</p>
        <p className="honest-scope-statement">Produc8ive prepares.<br />Your team decides.</p>
      </div>

      {/* Right — comparison */}
      <div className="honest-scope-compare">
        <div className="honest-col honest-col-prepares">
          <div className="honest-col-header">
            <span className="honest-col-tag honest-tag-ai">AI</span>
            <p className="honest-col-title">Produc8ive Prepares</p>
          </div>
          <ul>{prepares.map((item, i) => (
            <li key={item}><span className="honest-item-num">{String(i+1).padStart(2,'0')}</span>{item}</li>
          ))}</ul>
        </div>
        <div className="honest-col honest-col-decides">
          <div className="honest-col-header">
            <span className="honest-col-tag honest-tag-human">Human</span>
            <p className="honest-col-title">Finance Decides</p>
          </div>
          <ul>{decides.map((item, i) => (
            <li key={item}><span className="honest-item-num">{String(i+1).padStart(2,'0')}</span>{item}</li>
          ))}</ul>
        </div>
      </div>

    </div>

    {/* Guiding principle strip */}
    <div className="honest-principle">
      <span className="honest-principle-label">Guiding Principle</span>
      <p>Every finance decision remains under your team's control.</p>
    </div>
  </section>
}

function LeadershipSection() {
  const team = [
    {
      name: 'Ameya Kunte',
      role: 'Co-founder & Experienced Finance Professional',
      img: '/ameya.jpg',
      bio: 'Ameya Kunte is a Chartered Accountant, tax expert, and entrepreneur with over two decades of experience in restructuring advisory, corporate tax, and M&A. He is the Founder of Globeview Advisors LLP, a boutique consulting firm delivering tax-centric business advisory services to leading businesses and promoters. Previously with Ernst & Young and PwC, Ameya also co-founded Taxsutra, India\'s premier B2B tax news platform.',
      linkedin: '#'
    },
    {
      name: 'Saurav Mishra',
      role: 'Co-Founder & AI Advocate',
      img: '/Saurav.jpg',
      bio: 'Saurav is a growth strategist and entrepreneur who enables T-Shaped Growth for businesses by combining deep expertise in marketing and sales with a broad understanding of HR, finance, operations, and supply chains. He helps organizations deploy AI-driven automation and scalable growth playbooks. Previously, he founded and scaled a 300+ member technology company, later acquired by a New York private equity firm.',
      linkedin: '#'
    },
    {
      name: 'Sawan Jain',
      role: 'Co-Founder & Tech Arch',
      img: '/sawan.jpg',
      bio: 'Sawan is the Co-founder of Varseno with over 20 years of experience in enterprise software strategy, design, and delivery. He is passionate about solving complex problems through innovative and scalable technology solutions. Known for his pragmatic leadership style, Sawan brings together strategy, creativity, and execution to build high-performing teams and deliver meaningful business impact.',
      linkedin: '#'
    },
    {
      name: 'Akash Hande',
      role: 'Co-Founder & Product',
      img: '/akash.jpg',
      bio: 'Akash Hande is the Co-founder and Product Manager at Produc8ive, where he drives the vision and execution of AI-powered products. With a strong focus on blending technology, automation, and business strategy, Akash specializes in building scalable solutions for finance, e-commerce, and sport domain. He thrives on turning complex workflows into simple, outcome-driven products.',
      linkedin: '#'
    }
  ]

  return <section className="leadership-section" id="leadership">
    <header className="leadership-header">
      <p className="eyebrow">Leadership Team</p>
      <h2>The People Behind Produc8ive</h2>
    </header>
    <div className="leadership-grid">
      {team.map(({ name, role, img, bio, linkedin }) => (
        <article className="leader-card" key={name}>
          <div className="leader-img-wrap">
            <img src={img} alt={name} className="leader-img" />
          </div>
          <div className="leader-body">
            <div className="leader-meta">
              <div>
                <h3 className="leader-name">{name}</h3>
                <p className="leader-role">{role}</p>
              </div>
              <a
                href={linkedin}
                className="leader-linkedin"
                aria-label={`${name} on LinkedIn`}
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn Profile
              </a>
            </div>
            <p className="leader-bio">{bio}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
}

function TrustedBySection() {
  const logos = [
    { name: 'Suma', src: '/Suma-Logo-BlackText (1).svg' },
    { name: 'Serum', src: '/serum-logo.png' },
    { name: 'Kale', src: '/Kale-New-Logofo.png' },
    { name: 'Globeview', src: '/globalview.png' }
  ]
  return <section className="trusted-by" id="trusted-by">
    <div className="trusted-by-header">
      <p className="eyebrow">Our Clients</p>
      <h2>Trusted by Finance Teams</h2>
    </div>
    <div className="trusted-logos">
      {logos.map(({ name, src }) => (
        <div className="trusted-logo-cell" key={name}>
          <img src={src} alt={name} className="trusted-logo-img" />
        </div>
      ))}
    </div>
  </section>
}

function FinalCtaSection() {
  const workflows = [
    'Accounting Preparation', 'AP Invoice Processing', 'Month-End Close Tracking',
    'Investor Reporting', 'AR Follow-ups', 'Documentation Pre-checks'
  ]
  return <section className="final-cta" id="start-here">
    <div className="final-cta-inner">
      <p className="eyebrow light">Start Here</p>
      <h2>Start With One<br />Finance Workflow</h2>
      <div className="final-cta-workflows" aria-label="Example workflows">
        {workflows.map((w, i) => (
          <span key={w}>{w}{i < workflows.length - 1 && <i aria-hidden="true"> · </i>}</span>
        ))}
      </div>
      <p className="final-cta-body">We map the workflow, build the first AI assistant, demonstrate the results, and then scale.</p>
      <a className="button inverse" href="#contact">Map One Workflow <b aria-hidden="true">↗</b></a>
    </div>
  </section>
}

function FaqSection() {
  const faqs = [
    { q: 'Is this replacing our finance team?', a: 'No. It removes repetitive prep, classification, follow-up and tracking work. Final review stays with your team.' },
    { q: 'Which workflow should we start with?', a: 'Start where the pain is most visible: AP invoice processing, bookkeeping operations, month-end close, documentation checks or AR follow-ups.' },
    { q: 'Do we need to change our ERP or finance stack?', a: 'No. The first workflow can sit around your current email, documents, spreadsheets, ERP exports and operating process.' },
    { q: 'Can it handle sensitive finance workflows?', a: 'It supports document checks, summaries, missing-item detection, status tracking and audit packs. Final judgment stays human.' },
    { q: 'What does the first pilot produce?', a: 'A mapped workflow, sample input structure, output checklist, and one working assistant for a selected use case.' },
    { q: 'Can it work across multiple finance processes?', a: 'Yes, but not on day one. Start with one workflow. Expand after the first workflow proves useful.' }
  ]
  return <section className="faq-section" id="faq">
    <div className="faq-inner">
      <header className="faq-header">
        <p className="eyebrow">FAQ</p>
        <h2>Common Questions</h2>
      </header>
      <div className="faq-list accordion">
        {faqs.map(({ q, a }) => (
          <details key={q}>
            <summary>{q}<b aria-hidden="true">+</b></summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
}

function ContactSection() {
  return <section className="contact-section" id="contact">
    <div className="contact-intro">
      <p className="eyebrow">Start with one workflow</p>
      <h2>Let's map the work that should move faster.</h2>
      <p>Tell us where your finance team is spending time on repetitive preparation, reconciliation or follow-up. We'll start with the workflow, its controls and the people who need to stay in the loop.</p>
      <a href="mailto:smishra@produc8ive.com">smishra@produc8ive.com <span aria-hidden="true">&rarr;</span></a>
    </div>
    <form className="contact-form" action="mailto:smishra@produc8ive.com" method="post" encType="text/plain">
      <p>Contact details</p>
      <div className="contact-name-fields">
        <label>First name<input name="firstName" autoComplete="given-name" required /></label>
        <label>Last name<input name="lastName" autoComplete="family-name" required /></label>
      </div>
      <label>Work email<input name="email" type="email" autoComplete="email" required /></label>
      <label>Phone <span>Optional</span><input name="phone" type="tel" autoComplete="tel" /></label>
      <label>What workflow should move faster?<textarea name="message" rows="5" required /></label>
      <button className="button primary" type="submit">Send message <b aria-hidden="true">&rarr;</b></button>
      <small>Your email client will open with your message addressed to Produc8ive.</small>
    </form>
  </section>
}

function FloatingNavbar() {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let previous = scrollY
    const update = () => {
      const current = scrollY
      setScrolled(current > 16)
      setVisible(current < 80 || current < previous)
      previous = current
    }
    addEventListener('scroll', update, { passive: true })
    return () => removeEventListener('scroll', update)
  }, [])
  return <header className={`floating-navbar ${visible ? 'nav-visible' : 'nav-hidden'} ${scrolled ? 'scrolled' : ''}`}><Link to="/" className="site-logo">Produc8ive</Link><nav aria-label="Primary"><a href="#platform">Platform</a><a href="#proof">Outcomes</a><a href="#agents">Agents</a></nav><a className="nav-action" href="#contact">Map One Finance Workflow <span aria-hidden="true">↗</span></a></header>
}

const pages = {'/brand': Overview, '/logo': Logo, '/colors': Colors, '/typography': Typography, '/actions': Actions, '/surfaces': Surfaces, '/patterns': Patterns, '/tokens': Tokens, '/components': SectionLibrary}
function App() {
  const [path, setPath] = useState(location.pathname)
  useEffect(() => { const update = () => setPath(location.pathname); addEventListener('popstate', update); return () => removeEventListener('popstate', update) }, [])
  if (path === '/') return <HomeHero />
  if (path === '/landing%20page%201' || path === '/landing page 1') return <LandingPageOne />
  const Page = pages[path] || Overview
  return <Shell path={pages[path] ? path : '/brand'}><Page /></Shell>
}

createRoot(document.getElementById('root')).render(<App />)
