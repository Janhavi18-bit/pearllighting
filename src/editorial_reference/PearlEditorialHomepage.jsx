import React, { useState } from 'react'
import { productsData } from '../data/productsData'

const wa = (message) => `https://wa.me/918329045712?text=${encodeURIComponent(message)}`
const festive = [
  { title: 'Star Curtain', image: '/images/diwali/diwali-hanging-star-curtain.png' },
  { title: 'Golden Bokeh', image: '/images/diwali/diwali-golden-bokeh-lifestyle.png' },
  { title: 'Crystal Bubble', image: '/images/diwali/diwali-crystal-bubble-lights.png' },
  { title: 'Diya Curtain', image: '/images/diwali/diwali-hanging-diya-curtain.png' },
]

export default function PearlEditorialHomepage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const featured = productsData.slice(0, showAll ? productsData.length : 6)
  const enquiry = (name = 'lighting products') => window.open(wa(`Hi Pearl Lighting, please share details and pricing for ${name}.`), '_blank', 'noopener,noreferrer')

  return <main className="pearl-reimagined">
    <header className="pl-nav">
      <button className="pl-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><i></i><i></i></button>
      <a href="#top" className="pl-logo"><img src="/images/logo/pearl-lightings-logo-tight.png" alt="Pearl Lighting" /><span>PEARL LIGHTING</span></a>
      <a className="pl-nav-cta" href={wa('Hi Pearl Lighting, I would like to enquire about your collection.')} target="_blank" rel="noreferrer">LET'S TALK <span>↗</span></a>
      {menuOpen && <nav className="pl-drawer">{[['The mood','#top'],['Our approach','#story'],['Lighting collection','#collection'],['Festive light','#festive'],['Visit us','#contact']].map(([t,h])=><a key={h} href={h} onClick={()=>setMenuOpen(false)}>{t}<span>↗</span></a>)}</nav>}
    </header>

    <section className="pl-opening" id="top">
      <div className="pl-opening-copy">
        <div className="pl-eyebrow"><span className="pl-dot"></span> LIGHTING, WITH FEELING <span>— MUMBAI, INDIA</span></div>
        <h1>Light is not<br/>just seen.<br/><em>It is felt.</em></h1>
        <div className="pl-opening-bottom"><p>Thoughtful lighting for the spaces we live in, gather in, and remember.</p><a href="#collection" className="pl-round-link">EXPLORE THE COLLECTION <span>↓</span></a></div>
      </div>
      <div className="pl-opening-art">
        <img className="pl-hero-image" src="/images/diwali/diwali-golden-bokeh-lifestyle.png" alt="Warm golden light creating an intimate evening atmosphere"/>
        <div className="pl-image-caption"><span>01 / ATMOSPHERE</span><span>Warm light. Lasting feeling.</span></div>
        <div className="pl-vertical-note">PEARL LIGHTING · PARTH ENTERPRISES</div>
      </div>
      <div className="pl-opening-index"><span>01</span><span className="pl-index-line"></span><span>THE ART OF LIGHT</span></div>
    </section>

    <section className="pl-manifesto" id="story">
      <div className="pl-manifesto-left"><span className="pl-eyebrow">A DIFFERENT WAY TO SEE LIGHT</span><p>Some things fill a room.<br/><em>The right light changes it.</em></p></div>
      <div className="pl-manifesto-right"><div className="pl-story-photo"><img src="/images/products/led-strip-light-hero.png" alt="LED lighting detail"/></div><div className="pl-story-copy"><span>DESIGNED FOR EVERYDAY MOMENTS</span><p>From the quiet precision of architectural lighting to the sparkle of a celebration, we help you find the light that feels right for your space.</p><a href="#collection">MEET THE COLLECTION <span>↗</span></a></div></div>
    </section>

    <section className="pl-collection" id="collection">
      <div className="pl-section-heading"><div><span className="pl-eyebrow">THE PEARL EDIT / 01</span><h2>Made to shape<br/><em>the atmosphere.</em></h2></div><p>Explore considered forms, focused beams and understated details. Find the right piece for your next space.</p></div>
      <div className="pl-product-mosaic">
        {featured.map((p,i)=><button key={p.id} className={`pl-product pl-product-${i%6}`} onClick={()=>setActive(p)}>
          <div className="pl-product-image"><img src={p.primaryImage?.image || '/images/products/slim-panel-round.png'} alt={p.primaryImage?.alt || p.name} loading={i>2?'lazy':'eager'}/><span className="pl-product-plus">↗</span></div>
          <div className="pl-product-meta"><span>{p.number || `0${i+1}`}</span><div><h3>{p.name}</h3><p>{p.subtitle || 'Pearl Lighting Collection'}</p></div><span className="pl-product-arrow">↗</span></div>
        </button>)}
      </div>
      <button className="pl-view-all" onClick={()=>setShowAll(!showAll)}>{showAll?'SHOW FEATURED':'VIEW ALL LIGHTING'} <span>{showAll?'↑':'↓'}</span></button>
    </section>

    <section className="pl-interlude">
      <div className="pl-interlude-image"><img src="/images/products/rope-light-warm-glow.png" alt="Warm rope lighting glow" loading="lazy"/></div>
      <div className="pl-interlude-copy"><span className="pl-eyebrow">DETAIL MAKES THE DIFFERENCE</span><h2>A little glow.<br/><em>A whole new feeling.</em></h2><p>Accents, edges, corners, and the in-between. Bring warmth to the details that make a place yours.</p><a href={wa('Hi Pearl Lighting, please share your rope light options and pricing.')} target="_blank" rel="noreferrer">ASK ABOUT ROPE LIGHTS <span>↗</span></a></div>
      <span className="pl-interlude-number">02</span>
    </section>

    <section className="pl-festive" id="festive">
      <div className="pl-festive-heading"><div><span className="pl-eyebrow">THE PEARL EDIT / 02</span><h2>Make room<br/>for <em>celebration.</em></h2></div><p>For the nights that run longer, the homes that welcome everyone, and the moments worth making brighter.</p></div>
      <div className="pl-festive-grid">{festive.map((item,i)=><a href={wa(`Hi Pearl Lighting, please share details and pricing for ${item.title} festive lights.`)} target="_blank" rel="noreferrer" className={`pl-festive-item pl-festive-${i}`} key={item.title}><img src={item.image} alt={item.title} loading="lazy"/><span className="pl-festive-label"><span>0{i+1} / FESTIVE LIGHTING</span><strong>{item.title}</strong><b>↗</b></span></a>)}</div>
      <div className="pl-festive-bottom"><span>LIGHT THAT BRINGS US TOGETHER.</span><a href={wa('Hi Pearl Lighting, please send me your complete festive lighting catalogue.')} target="_blank" rel="noreferrer">EXPLORE FESTIVE LIGHTS ↗</a></div>
    </section>

    <footer className="pl-footer" id="contact">
      <div className="pl-footer-top"><span className="pl-eyebrow">YOUR SPACE, IN A NEW LIGHT</span><h2>Let's make<br/><em>something glow.</em></h2><a className="pl-footer-contact" href={wa('Hi Pearl Lighting, I would like help choosing lighting for my space.')} target="_blank" rel="noreferrer">START A CONVERSATION <span>↗</span></a></div>
      <div className="pl-footer-info"><div className="pl-footer-brand"><img src="/images/logo/pearl-lightings-logo-tight.png" alt="Pearl Lighting"/><span>Light Is My Life, Pearl Is My Light.</span></div><div><span className="pl-footer-label">VISIT OUR STUDIO</span><p>42/44 Navjeevan Wadi, Ground Floor, Room No. 1,<br/>4th Marin Street, Dhobi Talao, Kalbadevi,<br/>Mumbai – 400002</p></div><div><span className="pl-footer-label">SAY HELLO</span><a href="tel:+918329045712">+91 83290 45712</a><a href="mailto:pearlleddriver@gmail.com">pearlleddriver@gmail.com</a><a href="https://www.instagram.com/pearl_llighting/" target="_blank" rel="noreferrer">@pearl_llighting ↗</a></div></div>
      <div className="pl-footer-bottom"><span>© {new Date().getFullYear()} PEARL LIGHTING · PARTH ENTERPRISES</span><a href="#top">BACK TO TOP ↑</a><span>MADE FOR THE LOVE OF LIGHT.</span></div>
    </footer>

    {active && <div className="pl-modal-backdrop" onClick={()=>setActive(null)}><section className="pl-modal" role="dialog" aria-modal="true" aria-label={active.name} onClick={e=>e.stopPropagation()}><button className="pl-modal-close" onClick={()=>setActive(null)} aria-label="Close">×</button><div className="pl-modal-img"><img src={active.primaryImage?.image} alt={active.primaryImage?.alt || active.name}/></div><div className="pl-modal-copy"><span className="pl-eyebrow">PEARL LIGHTING COLLECTION</span><h2>{active.name}</h2><p>{active.description}</p><a href={wa(`Hi Pearl Lighting, please share price, specifications and available variants for ${active.name}.`)} target="_blank" rel="noreferrer">ENQUIRE ON WHATSAPP ↗</a></div></section></div>}
  </main>
}
