import { useState } from 'react';
import { Link } from 'react-router-dom';

const storyModules = import.meta.glob('./content/stories/*.json', { eager: true, import: 'default' });
const STORIES = Object.values(storyModules).sort((a, b) => a.order - b.order);

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
          <span className="brand__monogram" aria-hidden="true">SH</span>
          <span className="brand__words"><span>Soumik Halder</span><small>Fiction &amp; the things we keep</small></span>
        </Link>
        <button className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <span /><span />
        </button>
        <nav className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`} aria-label="Main navigation">
          <Link to="/#stories" onClick={closeMenu}>The stories</Link>
          <Link to="/#about" onClick={closeMenu}>The collection</Link>
          <Link to="/#book" onClick={closeMenu}>Editions</Link>
          <Link to="/about" className="is-active" onClick={closeMenu}>About</Link>
          <a className="site-nav__buy" href={BOOK.kindleIndia} target="_blank" rel="noreferrer noopener" onClick={closeMenu}>Find the book <Arrow diagonal /></a>
        </nav>
      </div>
    </header>
  );
}

function AuthorFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top section-wrap">
        <Link to="/" className="brand" aria-label="Soumik Halder — home">
          <span className="brand__monogram" aria-hidden="true">SH</span>
          <span className="brand__words"><span>Soumik Halder</span><small>Fiction &amp; the things we keep</small></span>
        </Link>
        <p>Dark tales of guilt and consequence.</p>
        <div className="site-footer__links"><Link to="/about">About the author</Link><Link to="/#stories" className="footer-back-top">Explore the stories ↑</Link></div>
      </div>
      <nav className="site-footer__directory section-wrap" aria-label="All stories">
        {STORIES.map((story, index) => <Link key={story.slug} to={`/stories/${story.slug}`}><span>{String(index + 1).padStart(2, '0')}</span>{story.title}</Link>)}
      </nav>
      <div className="site-footer__bottom section-wrap">
        <span>© {new Date().getFullYear()} Soumik Halder</span>
        <span>Atmospheric photography via <a href="https://unsplash.com" target="_blank" rel="noreferrer noopener">Unsplash</a></span>
        <a href={BOOK.kindleIndia} target="_blank" rel="noreferrer noopener">Find the book ↗</a>
      </div>
    </footer>
  );
}

export default function About() {
  return (
    <div className="about-page">
      <AuthorHeader />
      <main>
        <section className="about-hero">
          <div className="about-hero__background" aria-hidden="true">
            <span className="about-hero__orb about-hero__orb--one" />
            <span className="about-hero__orb about-hero__orb--two" />
            <span className="about-hero__grain" />
          </div>
          <div className="about-hero__inner section-wrap">
            <p className="eyebrow"><span />THE WRITER BEHIND THE STORIES</p>
            <p className="about-hero__overline">A NOTE FROM THE AUTHOR</p>
            <h1>Some things<br />follow us <em>home.</em></h1>
            <p className="about-hero__intro">I’m Soumik Halder, the author of <em>The Things We Keep: Dark Tales of Guilt and Consequence.</em> I’m drawn to the uneasy space where ordinary lives begin to slip into the strange, and where the past refuses to remain safely behind us.</p>
            <div className="about-hero__signature"><span />SOUMIK HALDER</div>
          </div>
        </section>

        <section className="about-note section-wrap">
          <div className="about-note__index">ON STORIES <span>— 01</span></div>
          <div className="about-note__body">
            <h2>I’m interested in what a person cannot put down.</h2>
            <p>Grief, guilt, memory, longing, envy, and love can be difficult to separate. In the stories collected here, they sometimes become doorways into something darker: a night that will not end, a face that should not be there, a bargain that asks too much, or a secret that has waited years to be heard.</p>
            <p>I want the uncanny to grow out of recognisable human feeling. The world may turn impossible, but the choices that lead us there remain painfully human.</p>
          </div>
          <div className="about-note__mark" aria-hidden="true">“</div>
        </section>

        <section className="about-book">
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
        <section className="about-closing section-wrap">
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
