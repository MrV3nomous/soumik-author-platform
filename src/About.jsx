import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BOOK = {
  kindleIndia: 'https://www.amazon.in/dp/B0HML17SSR',
  kindleGlobal: 'https://kdp.amazon.com/amazon-dp-action/us/dualbookshelf.marketplacelink/B0HML17SSR',
};

function Arrow({ diagonal = false }) {
  return diagonal ? (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M5.5 14.5 14.5 5.5M6.5 5.5h8v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
}

function AuthorHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand" aria-label="Soumik Halder — home">
          <span className="brand__monogram" aria-hidden="true">TWK</span>
          <span className="brand__words"><span>The Things We Keep</span><small>Stories by Soumik Halder</small></span>
        </Link>
        <button className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <span /><span />
        </button>
        <nav className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`} aria-label="Main navigation">
          <Link to="/#stories" onClick={closeMenu}>The stories</Link>
          <Link to="/#threshold" onClick={closeMenu}>The idea</Link>
          <Link to="/about" className="is-active" onClick={closeMenu}>About</Link>
          <a className="site-nav__buy" href={BOOK.kindleIndia} target="_blank" rel="noreferrer noopener" onClick={closeMenu}>Get the book <Arrow diagonal /></a>
        </nav>
      </div>
    </header>
  );
}

function AuthorFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__afterimage" aria-hidden="true"><span /><span /><span /></div>
      <div className="site-footer__top section-wrap">
        <Link to="/" className="brand" aria-label="The Things We Keep — home">
          <span className="brand__monogram" aria-hidden="true">TWK</span>
          <span className="brand__words"><span>The Things We Keep</span><small>Stories by Soumik Halder</small></span>
        </Link>
        <p>Some things are lost.<br /><em>Some things refuse to leave.</em></p>
        <div className="site-footer__links"><Link to="/#stories">Enter the stories</Link><Link to="/about">About the author</Link><a href={BOOK.kindleIndia} target="_blank" rel="noreferrer noopener">Find the book ↗</a></div>
      </div>
      <div className="site-footer__bottom section-wrap"><span>© {new Date().getFullYear()} Soumik Halder</span><span>THE THINGS WE KEEP · DARK TALES OF GUILT AND CONSEQUENCE</span></div>
    </footer>
  );
}

export default function About() {
  useEffect(() => {
    const targets = [...document.querySelectorAll('[data-reveal]')];
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-revealed'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      <AuthorHeader />
      <main>
        <section className="about-hero">
          <div className="about-hero__background" aria-hidden="true">
            <img className="about-hero__image" src="https://images.unsplash.com/photo-1637081182843-f89af4fbe51e?auto=format&fit=crop&w=2600&q=86&crop=entropy" alt="" loading="eager" decoding="async" onError={(event) => event.currentTarget.classList.add('asset-missing')} />
            <span className="about-hero__orb about-hero__orb--one" />
            <span className="about-hero__orb about-hero__orb--two" />
            <span className="about-hero__grain" />
          </div>
          <div className="about-hero__inner section-wrap" data-reveal>
            <p className="eyebrow"><span />THE WRITER BEHIND THE STORIES</p>
            <p className="about-hero__overline">A NOTE FROM THE AUTHOR</p>
            <h1>Some things<br />follow us <em>home.</em></h1>
            <p className="about-hero__intro">I’m Soumik Halder, the author of <em>The Things We Keep: Dark Tales of Guilt and Consequence.</em> I’m drawn to the uneasy space where ordinary lives begin to slip into the strange, and where the past refuses to remain safely behind us.</p>
            <div className="about-hero__signature"><span />SOUMIK HALDER</div>
          </div>
        </section>

        <section className="about-note section-wrap" data-reveal>
          <div className="about-note__index">ON STORIES <span>— 01</span></div>
          <div className="about-note__body">
            <h2>I’m interested in what a person cannot put down.</h2>
            <p>Grief, guilt, memory, longing, envy, and love can be difficult to separate. In the stories collected here, they sometimes become doorways into something darker: a night that will not end, a face that should not be there, a bargain that asks too much, or a secret that has waited years to be heard.</p>
            <p>I want the uncanny to grow out of recognisable human feeling. The world may turn impossible, but the choices that lead us there remain painfully human.</p>
          </div>
          <div className="about-note__mark" aria-hidden="true">“</div>
        </section>

        <section className="about-book" data-reveal>
          <div className="about-book__inner section-wrap">
            <div>
              <p className="eyebrow"><span />THE DEBUT COLLECTION</p>
              <h2><em>The Things We Keep</em></h2>
              <p>Eight short stories and one bonus novella, brought together by the things people hide, protect, sacrifice, and carry long after they should have let go.</p>
            </div>
            <div className="about-book__actions">
              <a className="button button--light" href={BOOK.kindleIndia} target="_blank" rel="noreferrer noopener">Find the Kindle edition <Arrow diagonal /></a>
              <a className="button button--outline" href={BOOK.kindleGlobal} target="_blank" rel="noreferrer noopener">Other Amazon stores <Arrow diagonal /></a>
              <Link className="text-link" to="/#stories">Enter the collection <Arrow /></Link>
            </div>
          </div>
        </section>
        <section className="about-closing section-wrap" data-reveal>
          <p className="eyebrow"><span />THANK YOU FOR READING</p>
          <h2>Keep the light on.<br /><em>Or don’t.</em></h2>
          <p>There are nine doors into this collection. You know where to begin.</p>
          <Link className="button button--light" to="/#stories">Explore the stories <Arrow /></Link>
        </section>
      </main>
      <AuthorFooter />
    </div>
  );
}
