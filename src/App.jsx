import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

const storyModules = import.meta.glob('./content/stories/*.json', {
  eager: true,
  import: 'default',
});

const STORIES = Object.values(storyModules).sort((a, b) => a.order - b.order);
const BY_SLUG = new Map(STORIES.map((story) => [story.slug, story]));

// Story prose lives in plain .txt files. Each actual newline separates paragraphs.
// Only text placed in this folder is shipped to the public website.
const storyTextModules = import.meta.glob('./content/story-text/*.txt', {
  eager: true,
  query: '?raw',
  import: 'default',
});
const STORY_TEXT = Object.fromEntries(
  Object.entries(storyTextModules).map(([path, text]) => [
    path.split('/').pop().replace(/\.txt$/i, ''),
    text,
  ]),
);
const STORIES_WITH_TEXT = new Set(
  Object.entries(STORY_TEXT)
    .filter(([, text]) => typeof text === 'string' && text.trim().length > 0)
    .map(([slug]) => slug),
);

// Temporary Unsplash photography for visual review. Replace with optimized/local artwork later.
const UNSPLASH_SCENES = {
  hero: 'https://images.unsplash.com/photo-1637081182843-f89af4fbe51e?auto=format&fit=crop&w=2600&q=86&crop=entropy',
  epilogue: 'https://images.unsplash.com/photo-1758301064875-b46ec97564dd?auto=format&fit=crop&w=2400&q=84&crop=entropy',
  lighthouseDetail: 'https://images.unsplash.com/photo-1758301064875-b46ec97564dd?auto=format&fit=crop&w=2200&q=84&crop=entropy',
};

function getStoryParagraphs(slug) {
  const source = (STORY_TEXT[slug] || '').replace(/\r\n?/g, '\n').trim();
  if (!source) return [];
  return source
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}


const BOOK = {
  title: 'The Things We Keep',
  subtitle: 'Dark Tales of Guilt and Consequence',
  author: 'Soumik Halder',
  kindleIndia: 'https://www.amazon.in/dp/B0HML17SSR',
  kindleGlobal: 'https://kdp.amazon.com/amazon-dp-action/us/dualbookshelf.marketplacelink/B0HML17SSR',
  hardcoverIndia: 'https://forms.gle/LPfTPWX8zVFNH5Zj6',
  cover: '/book-mockup.png',
};

function safeDecodeURIComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    // A malformed percent-escape should lead to the not-found page, not crash the app.
    return value;
  }
}

function readLocation(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  const storyPage = path.match(/^\/stories\/([^/]+)$/i);
  const readerPage = path.match(/^\/read\/([^/]+)$/i);
  if (storyPage) return { kind: 'story', slug: safeDecodeURIComponent(storyPage[1]).toLowerCase() };
  if (readerPage) return { kind: 'read', slug: safeDecodeURIComponent(readerPage[1]).toLowerCase() };
  if (path === '/') return { kind: 'home', slug: null };
  return { kind: 'not-found', slug: null };
}

function useSiteRouter() {
  const location = useLocation();
  const routerNavigate = useNavigate();
  const route = useMemo(() => readLocation(location.pathname), [location.pathname]);

  useEffect(() => {
    let scrollTimer;
    if (location.hash.length > 1) {
      const targetId = safeDecodeURIComponent(location.hash.slice(1));
      scrollTimer = window.setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 70);
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
    return () => {
      if (scrollTimer) window.clearTimeout(scrollTimer);
    };
  }, [location.pathname, location.hash]);

  const navigate = (to) => routerNavigate(to);
  return { route, navigate };
}

function InternalLink({ to, navigate, className = '', children, onClick, ...props }) {
  return (
    <a
      href={to}
      className={className}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        navigate(to);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function Arrow({ diagonal = false, down = false }) {
  if (down) return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M10 3.5v12m-5-5 5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (diagonal) return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M5.5 14.5 14.5 5.5M6.5 5.5h8v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Brand({ navigate }) {
  return (
    <InternalLink to="/" navigate={navigate} className="brand" aria-label="Soumik Halder — home">
      <span className="brand__monogram" aria-hidden="true">
        <img src={BOOK.cover} alt="The Things We Keep cover" />
      </span>
      <span className="brand__words"><span>The Things We Keep</span><small>Stories by Soumik Halder</small></span>
    </InternalLink>
  );
}

function Header({ navigate, active = 'home' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Brand navigate={navigate} />
        <button className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <span /><span />
        </button>
        <nav className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`} aria-label="Main navigation">
          <InternalLink to="/#stories" navigate={navigate} className={active === 'stories' ? 'is-active' : ''} onClick={closeMenu}>The stories</InternalLink>
          <InternalLink to="/#threshold" navigate={navigate} onClick={closeMenu}>The idea</InternalLink>
          <InternalLink to="/about" navigate={navigate} onClick={closeMenu}>About</InternalLink>
          <a className="site-nav__buy" href={BOOK.kindleIndia} target="_blank" rel="noreferrer noopener" onClick={closeMenu}>Get the book <Arrow diagonal /></a>
        </nav>
      </div>
    </header>
  );
}

function ImageLayer({ story, className = '' }) {
  return (
    <div className={`image-layer ${className}`} style={{ '--story-accent': story.palette.accent, '--story-glow': story.palette.glow }} aria-hidden="true">
      <img src={story.image} alt="" loading="lazy" decoding="async" onError={(event) => event.currentTarget.classList.add('image-layer__failed')} />
      <span className="image-layer__wash" />
      <span className="image-layer__grain" />
    </div>
  );
}



function BookCover() {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`book-cover ${failed ? 'book-cover--fallback' : ''}`}>
      <span className="book-cover__halo" />
      {!failed && <img src={BOOK.cover} alt="Cover of The Things We Keep by Soumik Halder" loading="lazy" decoding="async" onError={() => setFailed(true)} />}
      {failed && (
        <div className="book-cover__art" aria-label="Book cover placeholder">
          <span className="book-cover__author">SOUMIK HALDER</span>
          <span className="book-cover__archive" aria-hidden="true"><i /><b /></span>
          <strong>THE THINGS<br />WE KEEP</strong>
          <span className="book-cover__subtitle">DARK TALES OF GUILT<br />AND CONSEQUENCE</span>
        </div>
      )}
      <p className="book-cover__caption">A collection by Soumik Halder</p>
    </div>
  );
}

function HomePage({ stories, navigate }) {
  return (
    <>
      <Header navigate={navigate} />
      <main className="immersive-home">
        <section className="presence-hero" aria-labelledby="home-title">
          <img className="presence-hero__image" src={UNSPLASH_SCENES.hero} alt="" fetchPriority="high" decoding="async" onError={(event) => event.currentTarget.classList.add('asset-missing')} />
          <div className="presence-hero__shade" aria-hidden="true" />
          <div className="presence-hero__fog presence-hero__fog--one" aria-hidden="true" />
          <div className="presence-hero__fog presence-hero__fog--two" aria-hidden="true" />
          <div className="presence-hero__grain" aria-hidden="true" />
          <div className="presence-hero__frame" aria-hidden="true"><span /><span /><span /></div>
          <div className="presence-hero__content">
            <p className="presence-hero__eyebrow" data-reveal style={{ '--reveal-delay': '100ms' }}>An anthology of psychological horror</p>
            <h1 id="home-title" data-reveal style={{ '--reveal-delay': '260ms' }}>The Things<br /><em>We Keep.</em></h1>
            <p className="presence-hero__tagline" data-reveal style={{ '--reveal-delay': '440ms' }}>Some secrets aren't buried.<br />They're preserved.</p>
            <div className="presence-hero__actions" data-reveal style={{ '--reveal-delay': '590ms' }}>
              <a className="presence-hero__enter" href="#stories">Enter the stories <span aria-hidden="true">↘</span></a>
              <InternalLink to="/read/the-lighthouse" navigate={navigate} className="presence-hero__sample">Read the opening story <span aria-hidden="true">↗</span></InternalLink>
            </div>
          </div>
          <div className="presence-hero__side-note" aria-hidden="true"><span>09 STORIES</span><i /><span>01 OBSESSION</span></div>
          <a className="presence-hero__scroll" href="#threshold" aria-label="Scroll to begin"><span>Keep going</span><i /></a>
          <span className="presence-hero__counter" aria-hidden="true">I — IX</span>
        </section>

        <section id="threshold" className="threshold-scene" aria-label="About the collection">
          <div className="threshold-scene__left" data-reveal>
            <p className="threshold-scene__eyebrow">Before anything becomes a haunting</p>
            <h2>It starts with<br /><em>something ordinary.</em></h2>
          </div>
          <div className="threshold-scene__right" data-reveal style={{ '--reveal-delay': '160ms' }}>
            <p>Someone we loved. A room we know by heart. A memory that changes each time we touch it.</p>
            <p>Then, one detail refuses to fit. And the familiar world begins to turn against us.</p>
          </div>
          <div className="threshold-scene__trace" aria-hidden="true"><span /><span /><span /></div>
          <div className="threshold-scene__index" aria-hidden="true">A NOTE ON WHAT REMAINS&nbsp; / &nbsp;01</div>
        </section>

        <section id="stories" className="story-corridor" aria-labelledby="story-corridor-title">
          <header className="story-corridor__opening" data-reveal>
            <p className="story-corridor__eyebrow"><span />Nine stories. Nine kinds of unease.</p>
            <h2 id="story-corridor-title">Nothing here is<br /><em>quite what it seems.</em></h2>
            <p>Move slowly. The details matter.</p>
          </header>
          <div className="story-corridor__scenes">
            {stories.map((story, index) => (
              <article className={`story-encounter story-encounter--${index % 3 === 0 ? 'wide' : index % 3 === 1 ? 'close' : 'quiet'}`} key={story.slug} style={{ '--scene-accent': story.palette.accent, '--scene-index': index }}>
                <InternalLink to={`/stories/${story.slug}`} navigate={navigate} className={`story-encounter__link ${index % 2 ? 'story-encounter__link--reverse' : ''}`} aria-label={`Enter ${story.title}`}>
                  <figure className="story-encounter__image" data-reveal style={{ '--reveal-delay': `${Math.min(index % 3, 2) * 90}ms` }}>
                    <img src={story.image} alt={story.imageAlt} loading="lazy" decoding="async" onError={(event) => event.currentTarget.classList.add('asset-missing')} />
                    <span className="story-encounter__image-shade" aria-hidden="true" />
                    <span className="story-encounter__image-index" aria-hidden="true">{String(index + 1).padStart(2, '0')} <i /> 09</span>
                    <figcaption>{story.motif}</figcaption>
                  </figure>
                  <div className="story-encounter__copy" data-reveal style={{ '--reveal-delay': `${140 + (index % 3) * 100}ms` }}>
                    <span className="story-encounter__number">{String(index + 1).padStart(2, '0')}<i /></span>
                    <p className="story-encounter__category">{story.category}</p>
                    <h3>{story.title}</h3>
                    <p className="story-encounter__line">{story.detailLine || story.shortLine}</p>
                    <p className="story-encounter__description">{story.shortLine}</p>
                    <span className="story-encounter__enter">Step inside <b aria-hidden="true">↗</b></span>
                  </div>
                </InternalLink>
              </article>
            ))}
          </div>
        </section>

        <section className="quiet-interval" aria-label="A pause between stories">
          <div className="quiet-interval__hairline" aria-hidden="true" />
          <p data-reveal>Fear rarely arrives as a stranger.</p>
          <h2 data-reveal style={{ '--reveal-delay': '160ms' }}>Sometimes it knows<br /><em>where you keep the key.</em></h2>
          <span className="quiet-interval__grain" aria-hidden="true" />
          <div className="quiet-interval__hairline" aria-hidden="true" />
        </section>

        <section className="opening-door" aria-labelledby="opening-door-title">
          <img className="opening-door__image" src={UNSPLASH_SCENES.lighthouseDetail} alt="" loading="lazy" decoding="async" onError={(event) => event.currentTarget.classList.add('asset-missing')} />
          <div className="opening-door__shade" aria-hidden="true" />
          <div className="opening-door__content" data-reveal>
            <p className="opening-door__eyebrow">The opening door · available to read in full</p>
            <h2 id="opening-door-title">The Lighthouse</h2>
            <p>A locked steel door. A storm outside. A night that keeps returning to the beginning.</p>
            <InternalLink to="/read/the-lighthouse" navigate={navigate} className="opening-door__link">Enter the story <span aria-hidden="true">→</span></InternalLink>
          </div>
          <span className="opening-door__caption" aria-hidden="true">01 / 09&nbsp; — &nbsp;THE LIGHTHOUSE</span>
        </section>

        <section className="collection-afterimage" aria-label="The collection">
          <img className="collection-afterimage__image" src={UNSPLASH_SCENES.epilogue} alt="" loading="lazy" decoding="async" onError={(event) => event.currentTarget.classList.add('asset-missing')} />
          <div className="collection-afterimage__shade" aria-hidden="true" />
          <div className="collection-afterimage__words" data-reveal>
            <p>Eight short stories. One bonus novella.</p>
            <blockquote>“What we keep<br />can keep us, too.”</blockquote>
            <span>THE THINGS WE KEEP · SOUMIK HALDER</span>
          </div>
        </section>

        <section id="book" className="book-threshold section-wrap" data-reveal>
          <div className="book-threshold__copy">
            <p className="book-threshold__eyebrow">The complete collection</p>
            <h2>The story does not<br /><em>end here.</em></h2>
            <p><strong>The Things We Keep: Dark Tales of Guilt and Consequence</strong> brings together nine unsettling worlds of grief, memory, obsession, sacrifice and the cost of the things we cannot release.</p>
            <div className="book-threshold__actions">
              <a className="book-threshold__primary" href={BOOK.kindleIndia} target="_blank" rel="noreferrer noopener">Find the Kindle edition <span aria-hidden="true">↗</span></a>
              <a className="book-threshold__secondary" href={BOOK.kindleGlobal} target="_blank" rel="noreferrer noopener">Other Amazon stores</a>
              <a className="book-threshold__secondary" href={BOOK.hardcoverIndia} target="_blank" rel="noreferrer noopener">India hardcover enquiry</a>
            </div>
          </div>
          <BookCover />
        </section>
      </main>
      <Footer navigate={navigate} />
    </>
  );
}

function StoryPage({ story, navigate }) {
  return <StoryPageContent key={story.slug} story={story} navigate={navigate} />;
}

function StoryPageContent({ story, navigate }) {
  const storyIndex = STORIES.findIndex((item) => item.slug === story.slug);
  const hasText = STORIES_WITH_TEXT.has(story.slug);
  const storyPageRef = useRef(null);
  const [imageInspected, setImageInspected] = useState(false);
  const [selectedMotif, setSelectedMotif] = useState(null);

  useEffect(() => {
    const page = storyPageRef.current;
    if (!page) return undefined;
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      page.style.setProperty('--story-page-progress', String(progress));
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [story.slug]);
  const previous = STORIES[(storyIndex - 1 + STORIES.length) % STORIES.length];
  const next = STORIES[(storyIndex + 1) % STORIES.length];
  const themeStyle = {
    '--story-accent': story.palette.accent,
    '--story-glow': story.palette.glow,
    '--story-bg': story.palette.background,
    '--story-surface': story.palette.surface,
  };
  return (
    <div className="story-page" ref={storyPageRef} style={{ ...themeStyle, '--story-page-progress': 0 }}>
      <div className="story-page__progress" aria-hidden="true"><span /></div>
      <Header navigate={navigate} active="stories" />
      <main>
        <section
          className="story-page__hero"
          onPointerMove={(event) => {
            if (event.pointerType === 'touch' || window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            event.currentTarget.style.setProperty('--story-shift-x', `${-x * 15}px`);
            event.currentTarget.style.setProperty('--story-shift-y', `${-y * 10}px`);
          }}
          onPointerLeave={(event) => {
            event.currentTarget.style.setProperty('--story-shift-x', '0px');
            event.currentTarget.style.setProperty('--story-shift-y', '0px');
          }}
        >
          <ImageLayer story={story} className="story-page__backdrop" />
          <div className="story-page__hero-veil" aria-hidden="true" />
          <div className="story-page__hero-inner section-wrap">
            <InternalLink to="/#stories" navigate={navigate} className="back-link"><span>←</span> All stories</InternalLink>
            <div className="story-page__hero-copy">
              <p className="eyebrow" data-reveal style={{ '--reveal-delay': '120ms' }}><span />{String(storyIndex + 1).padStart(2, '0')} / 09 <i /> {story.format}</p>
              <h1 data-reveal style={{ '--reveal-delay': '260ms' }}>{story.title}</h1>
              <p className="story-page__category" data-reveal style={{ '--reveal-delay': '390ms' }}>{story.category}</p>
              <p className="story-page__tagline" data-reveal style={{ '--reveal-delay': '510ms' }}>{story.detailLine}</p>
              <InternalLink to="#story-details" navigate={navigate} className="story-page__enter" data-reveal style={{ '--reveal-delay': '660ms' }}>Move closer <span aria-hidden="true">↓</span></InternalLink>
            </div>
            <div className="story-page__hero-foot"><span>THE THINGS WE KEEP</span><span>{story.motif}</span></div>
          </div>
        </section>


        <section id="story-details" className="story-page__body section-wrap">
          <div className="story-page__main-copy">
            <p className="eyebrow" data-reveal style={{ '--reveal-delay': '70ms' }}><span />The story</p>
            <h2 data-reveal style={{ '--reveal-delay': '170ms' }}>{story.shortLine}</h2>
            {story.needsEditorialReview ? (
              <p className="story-page__synopsis" data-reveal style={{ '--reveal-delay': '290ms' }}>The story-specific description will be added once its premise and themes are confirmed.</p>
            ) : (
              <p className="story-page__synopsis" data-reveal style={{ '--reveal-delay': '290ms' }}>{story.synopsis}</p>
            )}
            {!story.needsEditorialReview && story.themes.length > 0 && <div className="story-page__themes" data-reveal style={{ '--reveal-delay': '400ms' }}><span className="story-page__themes-label">Threads within</span>{story.themes.map((theme) => <span key={theme} className="theme-chip">{theme}</span>)}</div>}
            {story.underneath && <div className="story-deep-note" data-reveal style={{ '--reveal-delay': '490ms' }}><span className="story-deep-note__eyebrow">BENEATH THE SURFACE</span><p>{story.underneath}</p></div>}
            {story.visualMotifs?.length > 0 && (
              <div className="story-motifs" data-reveal style={{ '--reveal-delay': '570ms' }}>
                <span className="story-page__themes-label">Details that linger · choose one to keep in mind</span>
                <div className="story-motifs__choices">
                  {story.visualMotifs.map((motif, index) => (
                    <button
                      type="button"
                      className={`story-motif ${selectedMotif === index ? 'is-selected' : ''}`}
                      key={motif}
                      aria-pressed={selectedMotif === index}
                      onClick={() => setSelectedMotif((current) => current === index ? null : index)}
                    >
                      <i>{String(index + 1).padStart(2, '0')}</i><span>{motif}</span><b aria-hidden="true">↗</b>
                    </button>
                  ))}
                </div>
                <p className="story-motifs__reflection" aria-live="polite">
                  {selectedMotif === null ? 'Choose a detail. Let it follow you into the story.' : `Keep this detail close: ${story.visualMotifs[selectedMotif]}.`}
                </p>
              </div>
            )}
            <div className="story-page__actions" data-reveal style={{ '--reveal-delay': '650ms' }}>
              {hasText ? (
                <InternalLink to={`/read/${story.slug}`} navigate={navigate} className="button button--light">{story.readingMode === 'full' ? 'Read the complete story — free' : 'Read the available preview'} <Arrow /></InternalLink>
              ) : (
                <a href={BOOK.kindleIndia} target="_blank" rel="noreferrer noopener" className="button button--light">Discover it in the book <Arrow diagonal /></a>
              )}
              <InternalLink to="/#book" navigate={navigate} className="text-link">Explore editions <Arrow /></InternalLink>
            </div>
          </div>
          <figure className={`story-page__figure ${imageInspected ? 'is-inspected' : ''}`} data-reveal style={{ '--reveal-delay': '140ms' }}>
            <div className={`story-page__figure-frame ${imageInspected ? 'is-inspected' : ''}`}>
              <img src={story.detailImage?.src || story.image} alt={story.detailImage?.alt || story.imageAlt} loading="lazy" decoding="async" onError={(event) => event.currentTarget.classList.add('image-layer__failed')} />
              <span className="story-page__figure-label">{story.detailImage?.caption || story.motif}</span>
              <span className="story-page__figure-index" aria-hidden="true">FIG. {String(storyIndex + 1).padStart(2, '0')}</span>
              <span className="story-page__figure-focus" aria-hidden="true" />
            </div>
            <button type="button" className="story-page__inspect" onClick={() => setImageInspected((value) => !value)} aria-pressed={imageInspected}>
              <span className="story-page__inspect-symbol" aria-hidden="true">{imageInspected ? '−' : '+'}</span>
              {imageInspected ? 'Return to the wider view' : 'Look closer at this image'}
              <span className="story-page__inspect-arrow" aria-hidden="true">↗</span>
            </button>
            <figcaption>{story.detailImage?.caption || story.motif}</figcaption>
          </figure>
        </section>

        <section className="story-page__book-strip" data-reveal>
          <div className="section-wrap story-page__book-inner">
            <div><p className="eyebrow"><span />Inside the collection</p><h2>{story.readingMode === 'full' ? 'Keep wandering through the dark.' : 'The rest of the collection is waiting.'}</h2></div>
            <a href={BOOK.kindleIndia} target="_blank" rel="noreferrer noopener" className="button button--light">Find the book <Arrow diagonal /></a>
          </div>
        </section>

        <section id="story-end" className="story-pager section-wrap" aria-label="Explore another story">
          <InternalLink to={`/stories/${previous.slug}`} navigate={navigate} className="story-pager__item"><span className="story-pager__art"><img src={previous.image} alt="" loading="lazy" decoding="async" /></span><span>← Previous door</span><strong>{previous.title}</strong></InternalLink>
          <InternalLink to="/#stories" navigate={navigate} className="story-pager__index">All nine stories <span>Return to the collection ↗</span></InternalLink>
          <InternalLink to={`/stories/${next.slug}`} navigate={navigate} className="story-pager__item story-pager__item--next"><span className="story-pager__art"><img src={next.image} alt="" loading="lazy" decoding="async" /></span><span>Next door →</span><strong>{next.title}</strong></InternalLink>
        </section>
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

function buildReaderSegments(paragraphs, images = []) {
  if (paragraphs.length < 2 || images.length === 0) {
    return paragraphs.map((text, index) => ({ type: 'paragraph', text, key: `p-${index}` }));
  }
  const placements = new Map();
  const used = new Set();
  images.slice(0, 3).forEach((image, imageIndex) => {
    let position = Math.round((paragraphs.length - 1) * (image.afterRatio ?? ((imageIndex + 1) / (images.length + 1))));
    position = Math.max(0, Math.min(paragraphs.length - 1, position));
    if (used.has(position)) {
      const next = position + 1;
      const previous = position - 1;
      if (next < paragraphs.length && !used.has(next)) position = next;
      else if (previous >= 0 && !used.has(previous)) position = previous;
      else return;
    }
    used.add(position);
    placements.set(position, [...(placements.get(position) || []), image]);
  });
  const segments = [];
  paragraphs.forEach((text, index) => {
    segments.push({ type: 'paragraph', text, key: `p-${index}` });
    (placements.get(index) || []).forEach((image, imageIndex) => {
      segments.push({ type: 'image', image, key: `img-${index}-${imageIndex}` });
    });
  });
  return segments;
}

function ReaderPage({ story, navigate }) {
  const displayedParagraphs = getStoryParagraphs(story.slug);
  const readerSegments = buildReaderSegments(displayedParagraphs, story.readerImages || []);
  const [lightbox, setLightbox] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const hasFullText = story.readingMode === 'full' && displayedParagraphs.length > 0;
  const hasSample = displayedParagraphs.length > 0;
  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress(maxScroll > 0 ? Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100)) : 0);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [story.slug]);
  useEffect(() => {
    if (!lightbox) return undefined;
    const onKeyDown = (event) => { if (event.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightbox]);
  const themeStyle = {
    '--story-accent': story.palette.accent,
    '--story-glow': story.palette.glow,
    '--story-bg': story.palette.background,
    '--story-surface': story.palette.surface,
  };
  return (
    <div className="reader-page" style={themeStyle}>
      <div className="reader-progress" style={{ '--reader-progress': `${readingProgress}%` }} aria-hidden="true"><span /></div>
      <Header navigate={navigate} active="stories" />
      <main className="reader-page__main">
        <div className="reader-page__top section-wrap">
          <InternalLink to={`/stories/${story.slug}`} navigate={navigate} className="back-link"><span>←</span> Back to the story</InternalLink>
          <div className="reader-page__meta"><span>{hasFullText ? 'FULL STORY · FREE TO READ' : 'AVAILABLE PREVIEW'}</span><span>{String(STORIES.findIndex((item) => item.slug === story.slug) + 1).padStart(2, '0')} / 09 · THE THINGS WE KEEP</span></div>
        </div>
        <section className="reader-threshold" aria-label={`Enter ${story.title}`}>
          <img className="reader-threshold__image" src={story.image} alt={story.imageAlt} fetchPriority="high" decoding="async" onError={(event) => event.currentTarget.classList.add('asset-missing')} />
          <div className="reader-threshold__shade" aria-hidden="true" />
          <div className="reader-threshold__grain" aria-hidden="true" />
          <div className="reader-threshold__content" data-reveal>
            <p className="eyebrow"><span />{String(STORIES.findIndex((item) => item.slug === story.slug) + 1).padStart(2, '0')} / 09 <i /> {hasFullText ? 'A complete story, freely shared' : 'A glimpse into this story'}</p>
            <h1>{story.title}</h1>
            <p className="reader-threshold__line">{story.shortLine}</p>
            <a className="reader-threshold__begin" href="#reading-text">{hasFullText ? 'Begin the story' : 'Enter the preview'} <span aria-hidden="true">↓</span></a>
          </div>
          <div className="reader-threshold__foot"><span>THE THINGS WE KEEP</span><span>{story.motif}</span><button type="button" onClick={() => setLightbox({ src: story.image, alt: story.imageAlt, caption: `${story.title} — visual frontispiece` })}>View image <span aria-hidden="true">↗</span></button></div>
        </section>
        <article id="reading-text" className="reader-article">
          <header className="reader-article__header" data-reveal>
            <p className="eyebrow"><span />{hasFullText ? 'Stay with the story' : 'The available passage'}</p>
            <p className="reader-article__opening-line">{story.detailLine || story.shortLine}</p>
            <div className="reader-article__ornament" aria-hidden="true">✳</div>
          </header>
          {hasSample ? (
            <div className="reader-article__text">
              {readerSegments.map((segment, segmentIndex) => segment.type === 'paragraph' ? (
                <p key={`${story.slug}-${segment.key}`} data-reveal style={{ '--reveal-delay': `${Math.min(segmentIndex % 4, 3) * 35}ms` }}>{segment.text}</p>
              ) : (
                <figure className={`reader-plate reader-plate--${segment.image.layout || 'wide'}`} key={`${story.slug}-${segment.key}`} data-reveal style={{ '--reveal-delay': `${Math.min(segmentIndex % 3, 2) * 65}ms` }}>
                  <button className="reader-plate__trigger" type="button" onClick={() => setLightbox(segment.image)} aria-label={`Enlarge image: ${segment.image.caption}`}>
                    <img src={segment.image.src} alt={segment.image.alt} loading="lazy" decoding="async" onError={(event) => event.currentTarget.classList.add('reader-plate__failed')} />
                    <span className="reader-plate__zoom" aria-hidden="true">↗</span>
                  </button>
                  <figcaption><span>{segment.image.caption}</span><small>FIG. {String((story.readerImages || []).indexOf(segment.image) + 1).padStart(2, '0')}</small></figcaption>
                </figure>
              ))}
              <div className="reader-article__ending" data-reveal>
                <span>{hasFullText ? 'END OF STORY' : 'THE SAMPLE ENDS HERE'}</span>
                <h2>{hasFullText ? 'Thank you for reading.' : 'There is more beyond this door.'}</h2>
                <p>{hasFullText ? 'The other doors are open. Find the story that stays with you next.' : 'This preview ends here. The complete story belongs to the collection.'}</p>
                {hasFullText ? <InternalLink to="/#stories" navigate={navigate} className="button button--light">Explore all stories <Arrow /></InternalLink> : <a className="button button--light" href={BOOK.kindleIndia} target="_blank" rel="noreferrer noopener">Find the collection <Arrow diagonal /></a>}
              </div>
            </div>
          ) : (
            <div className="reader-article__locked" data-reveal>
              <span className="reader-article__lockmark" aria-hidden="true">✳</span>
              <h2>This story awaits inside the collection.</h2>
              <p>We are keeping the full digital text with the book for now. Discover the story in <em>The Things We Keep</em>.</p>
              <a className="button button--light" href={BOOK.kindleIndia} target="_blank" rel="noreferrer noopener">Find the book <Arrow diagonal /></a>
            </div>
          )}
        </article>
        {lightbox && (
          <div className="reader-lightbox" role="dialog" aria-modal="true" aria-label={lightbox.caption} onMouseDown={(event) => { if (event.target === event.currentTarget) setLightbox(null); }}>
            <button className="reader-lightbox__close" type="button" onClick={() => setLightbox(null)} aria-label="Close enlarged image">Close <span>×</span></button>
            <figure>
              <img src={lightbox.src} alt={lightbox.alt} />
              <figcaption><span>{lightbox.caption}</span><small>{lightbox.alt}</small></figcaption>
            </figure>
          </div>
        )}
        <div className="reader-story-nav-heading section-wrap" data-reveal>
          <p className="eyebrow"><span />When you are ready</p>
          <h2>Another door remains open.</h2>
        </div>
        <nav className="reader-story-nav section-wrap" aria-label="Navigate between stories">
          {STORIES.map((item, index) => <InternalLink key={item.slug} to={`/stories/${item.slug}`} navigate={navigate} className={item.slug === story.slug ? 'is-current' : ''}><span className="reader-story-nav__thumb"><img src={item.image} alt="" loading="lazy" decoding="async" /></span><span className="reader-story-nav__number">{String(index + 1).padStart(2, '0')}</span><span className="reader-story-nav__title">{item.title}</span><span className="reader-story-nav__arrow" aria-hidden="true">↗</span></InternalLink>)}
        </nav>
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__afterimage" aria-hidden="true"><span /><span /><span /></div>
      <div className="site-footer__top section-wrap">
        <Brand navigate={navigate} />
        <p>Some things are lost.<br /><em>Some things refuse to leave.</em></p>
        <div className="site-footer__links">
          <InternalLink to="/#stories" navigate={navigate}>Enter the stories</InternalLink>
          <InternalLink to="/about" navigate={navigate}>About the author</InternalLink>
          <a href={BOOK.kindleIndia} target="_blank" rel="noreferrer noopener">Find the book ↗</a>
        </div>
      </div>
      <div className="site-footer__bottom section-wrap">
        <span>© {new Date().getFullYear()} Soumik Halder</span>
        <span>THE THINGS WE KEEP · DARK TALES OF GUILT AND CONSEQUENCE</span>
      </div>
    </footer>
  );
}

function NotFound({ navigate }) {
  return (
    <main className="not-found section-wrap">
      <p className="eyebrow"><span />A door misplaced</p>
      <h1>This story isn't here.</h1>
      <p>The page may have moved. The collection is still waiting.</p>
      <InternalLink to="/#stories" navigate={navigate} className="button button--light">Return to the collection <Arrow /></InternalLink>
    </main>
  );
}

export default function App() {
  const { route, navigate } = useSiteRouter();
  const currentStory = useMemo(() => route.slug ? BY_SLUG.get(route.slug) : null, [route.slug]);

  useEffect(() => {
    document.documentElement.dataset.page = route.kind;
    document.documentElement.dataset.story = currentStory?.slug || '';
    return () => {
      delete document.documentElement.dataset.page;
      delete document.documentElement.dataset.story;
    };
  }, [route.kind, currentStory?.slug]);

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
    targets.forEach((target) => {
      // React may reuse same-page elements when the slug changes; reset reveal state per route.
      target.classList.remove('is-revealed');
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, [route.kind, currentStory?.slug]);

  if (route.kind === 'home') return <HomePage stories={STORIES} navigate={navigate} />;
  if (!currentStory) return <NotFound navigate={navigate} />;
  if (route.kind === 'read') return <ReaderPage story={currentStory} navigate={navigate} />;
  return <StoryPage story={currentStory} navigate={navigate} />;
}
