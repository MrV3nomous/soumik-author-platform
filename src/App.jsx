import { useEffect, useMemo, useState } from 'react';
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

function readLocation(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  const storyPage = path.match(/^\/stories\/([^/]+)$/);
  const readerPage = path.match(/^\/read\/([^/]+)$/);
  if (storyPage) return { kind: 'story', slug: decodeURIComponent(storyPage[1]) };
  if (readerPage) return { kind: 'read', slug: decodeURIComponent(readerPage[1]) };
  if (path === '/') return { kind: 'home', slug: null };
  return { kind: 'not-found', slug: null };
}

function useSiteRouter() {
  const location = useLocation();
  const routerNavigate = useNavigate();
  const route = useMemo(() => readLocation(location.pathname), [location.pathname]);

  useEffect(() => {
    if (location.hash.length > 1) {
      window.setTimeout(() => {
        document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 70);
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
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
      <span className="brand__monogram" aria-hidden="true">SH</span>
      <span className="brand__words"><span>Soumik Halder</span><small>Fiction &amp; the things we keep</small></span>
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
          <InternalLink to="/#about" navigate={navigate} onClick={closeMenu}>The collection</InternalLink>
          <InternalLink to="/#book" navigate={navigate} onClick={closeMenu}>Editions</InternalLink>
          <InternalLink to="/about" navigate={navigate} onClick={closeMenu}>About</InternalLink>
          <a className="site-nav__buy" href={BOOK.kindleIndia} target="_blank" rel="noreferrer noopener" onClick={closeMenu}>Find the book <Arrow diagonal /></a>
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

function StoryCard({ story, index, navigate }) {
  const hasText = STORIES_WITH_TEXT.has(story.slug);
  return (
    <article className={`story-card story-card--${story.slug}`} style={{ '--story-accent': story.palette.accent, '--story-glow': story.palette.glow, '--story-surface': story.palette.surface }}>
      <InternalLink to={`/stories/${story.slug}`} navigate={navigate} className="story-card__link" aria-label={`Explore ${story.title}`}>
        <div className="story-card__art">
          <img src={story.image} alt={story.imageAlt} loading="lazy" decoding="async" onError={(event) => event.currentTarget.classList.add('image-layer__failed')} />
          <span className="story-card__wash" />
          <span className="story-card__number">{String(index + 1).padStart(2, '0')}</span>
          <span className="story-card__format">{story.format}</span>
          <span className="story-card__motif">{story.motif}</span>
          <span className="story-card__availability">{hasText ? (story.readingMode === 'full' ? 'FULL STORY · FREE' : 'READ PREVIEW') : 'IN THE COLLECTION'}</span>
          <span className="story-card__open" aria-hidden="true"><Arrow diagonal /></span>
        </div>
        <div className="story-card__copy">
          <p className="story-card__category">{story.category}</p>
          <h3>{story.title}</h3>
          <p className="story-card__description">{story.shortLine}</p>
          <span className="story-card__discover">Explore this story <Arrow /></span>
        </div>
      </InternalLink>
    </article>
  );
}

function SectionHeading({ eyebrow, title, body, align = 'left', id }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && <p className="eyebrow"><span />{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      {body && <p className="section-heading__body">{body}</p>}
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
  const lighthouse = BY_SLUG.get('the-lighthouse');
  const collectionArt = [
    BY_SLUG.get('the-girl-who-wanted-to-be-seen'),
    BY_SLUG.get('durga'),
    BY_SLUG.get('you-came-back'),
    BY_SLUG.get('karam'),
  ].filter(Boolean);
  const [query, setQuery] = useState('');
  const [activeTheme, setActiveTheme] = useState('All');
  const themes = ['All', 'Guilt', 'Grief', 'Memory', 'Obsession', 'Identity', 'Betrayal', 'Power', 'Consequence'];
  const filteredStories = stories.filter((story) => {
    const search = query.trim().toLowerCase();
    const matchesSearch = !search || [story.title, story.category, story.shortLine, story.synopsis, ...(story.themes || [])].join(' ').toLowerCase().includes(search);
    const matchesTheme = activeTheme === 'All' || (story.themes || []).some((theme) => theme.toLowerCase().includes(activeTheme.toLowerCase()));
    return matchesSearch && matchesTheme;
  });
  return (
    <>
      <Header navigate={navigate} />
      <main>
        <section className="home-hero home-hero--collection" aria-labelledby="home-title">
          <div className="home-hero__ambient" aria-hidden="true">
            <span className="home-hero__orb home-hero__orb--one" />
            <span className="home-hero__orb home-hero__orb--two" />
            <span className="home-hero__rule home-hero__rule--one" />
            <span className="home-hero__rule home-hero__rule--two" />
            <span className="home-hero__grain" />
          </div>
          <div className="home-hero__inner">
            <div className="home-hero__copy">
              <p className="eyebrow"><span />Literary psychological horror</p>
              <p className="home-hero__overline">NINE DARK WORLDS · ONE HUMAN SHADOW</p>
              <h1 id="home-title">The Things<br /><em>We Keep.</em></h1>
              <p className="home-hero__subtitle">Dark Tales of Guilt and Consequence</p>
              <p className="home-hero__description">Memory lies. Grief bargains. Guilt learns to speak in our own voice. These stories begin where the ordinary world starts to feel wrong—and stay with what we cannot bear to leave behind.</p>
              <div className="home-hero__actions">
                <InternalLink to="/#stories" navigate={navigate} className="button button--light">Enter the collection <Arrow /></InternalLink>
                <InternalLink to="/read/the-lighthouse" navigate={navigate} className="text-link text-link--light">Read one story in full <Arrow diagonal /></InternalLink>
              </div>
              <div className="home-hero__meta"><span>Eight short stories</span><i aria-hidden="true" /><span>One bonus novella</span><i aria-hidden="true" /><span>By Soumik Halder</span></div>
              <p className="home-hero__note">Not every haunting begins with a ghost.</p>
            </div>
            <div className="home-hero__visual" aria-hidden="true">
              <span className="home-hero__visual-kicker">AN ATLAS OF UNEASE</span>
              {collectionArt.map((artStory, index) => (
                <figure className={`home-art home-art--${index + 1}`} key={artStory.slug}>
                  <img src={artStory.image} alt="" loading={index < 2 ? 'eager' : 'lazy'} decoding="async" onError={(event) => event.currentTarget.classList.add('home-art__failed')} />
                  <span className="home-art__veil" />
                  <figcaption><i>{String(index + 1).padStart(2, '0')}</i>{artStory.motif}</figcaption>
                </figure>
              ))}
              <span className="home-hero__visual-caption">OBJECTS OF MEMORY / STUDIES IN CONSEQUENCE</span>
              <span className="home-hero__visual-index" aria-hidden="true">TWK—09</span>
            </div>
          </div>
          <a className="scroll-cue" href="#about"><span>Descend into the collection</span><Arrow down /></a>
          <div className="home-hero__bottom-rule" />
        </section>

        <section id="about" className="manifesto section-wrap">
          <div className="manifesto__index">A NOTE ON WHAT REMAINS <span>— 01</span></div>
          <div className="manifesto__body">
            <p className="manifesto__lead">The frightening thing is not always what comes back.</p>
            <p className="manifesto__lead manifesto__lead--muted">Sometimes, it is what never truly left.</p>
            <p className="manifesto__description">Across nine worlds, love becomes obsession, memory turns unreliable, and the past refuses to stay buried. These are stories about the fragile things we try to save—and the consequences we carry when we cannot let go.</p>
          </div>
          <div className="manifesto__seal" aria-hidden="true"><span>THE THINGS</span><b>WE KEEP</b><i /></div>
        </section>

        <section id="stories" className="stories-section section-wrap">
          <div className="stories-section__topline"><span>THE ARCHIVE</span><span>09 WORLDS · 01 COLLECTION</span></div>
          <SectionHeading eyebrow="Choose a door" title={<>Every story leaves<br /><em>something behind.</em></>} body="Enter a different atmosphere with every story. Explore the premise, the themes, and the secrets waiting inside the collection." />
          <div className="archive-controls" aria-label="Filter the story archive">
            <label className="archive-search"><span className="sr-only">Search stories</span><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.5"/><path d="m16 16 4.3 4.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a title, feeling, or theme…" /></label>
            <div className="archive-filters" role="group" aria-label="Filter by theme">{themes.map((theme) => <button key={theme} type="button" className={activeTheme === theme ? 'is-active' : ''} aria-pressed={activeTheme === theme} onClick={() => setActiveTheme(theme)}>{theme}</button>)}</div>
            <button type="button" className="archive-surprise" onClick={() => { const pool = filteredStories.length ? filteredStories : stories; const chosen = pool[Math.floor(Math.random() * pool.length)]; if (chosen) navigate(`/stories/${chosen.slug}`); }}>Choose a door for me <Arrow diagonal /></button>
          </div>
          <div className="story-grid">
            {filteredStories.map((story) => <StoryCard key={story.slug} story={story} index={stories.findIndex((item) => item.slug === story.slug)} navigate={navigate} />)}
          </div>
          {filteredStories.length === 0 && <p className="archive-empty">No story matches that combination. Try another word or theme.</p>}
          <p className="stories-section__note"><span aria-hidden="true">✳</span> The Lighthouse is available to read in full, for free. Other stories offer the previews currently available in their text files.</p>
        </section>

        <section className="sample-feature sample-feature--editorial" aria-labelledby="sample-title">
          <div className="sample-feature__inner section-wrap">
            <div className="sample-feature__index"><span>THE OPENING DOOR</span><span>FREE · 01 / 09</span></div>
            <div className="sample-feature__copy">
              <p className="eyebrow"><span />A complete story · freely available</p>
              <h2 id="sample-title">The Lighthouse</h2>
              <p className="sample-feature__deck">A night that keeps returning. A mind that cannot escape what it knows.</p>
              <blockquote>“The first thud struck the heavy steel door with the sickening finality of a hammer descending on bone.”</blockquote>
              <InternalLink to="/read/the-lighthouse" navigate={navigate} className="button button--light">Read the complete story <Arrow /></InternalLink>
            </div>
            <figure className="sample-feature__art">
              <div className="sample-feature__art-frame">
                <img src={lighthouse.image} alt={lighthouse.imageAlt} loading="lazy" decoding="async" onError={(event) => event.currentTarget.classList.add('sample-feature__art-failed')} />
                <span aria-hidden="true" />
              </div>
              <figcaption>01 — THE LIGHTHOUSE <i>READ IN FULL</i></figcaption>
            </figure>
          </div>
          <span className="sample-feature__watermark" aria-hidden="true">A FREE READING</span>
        </section>

        <section id="book" className="book-section section-wrap">
          <div className="book-section__topline"><span>THE COMPLETE COLLECTION</span><span>BY SOUMIK HALDER</span></div>
          <div className="book-section__layout">
            <BookCover />
            <div className="book-section__copy">
              <p className="eyebrow"><span />The book</p>
              <h2>Some stories<br />stay <em>with you.</em></h2>
              <p className="book-section__subtitle">The Things We Keep <span>—</span> Dark Tales of Guilt and Consequence</p>
              <p className="book-section__description">Eight short stories and one bonus novella. Psychological horror, gothic mysteries and dark human dramas about grief, memory, sacrifice, obsession, and the price of our choices.</p>
              <div className="theme-line" aria-label="Collection themes"><span>Guilt</span><i /><span>Memory</span><i /><span>Grief</span><i /><span>Consequence</span></div>
              <div className="book-section__actions">
                <a className="button button--light" href={BOOK.kindleIndia} target="_blank" rel="noreferrer noopener">Find the Kindle edition <Arrow diagonal /></a>
                <a className="button button--outline" href={BOOK.kindleGlobal} target="_blank" rel="noreferrer noopener">Other Amazon stores <Arrow diagonal /></a>
                <a className="book-section__print-link" href={BOOK.hardcoverIndia} target="_blank" rel="noreferrer noopener">Ask about the India hardcover <Arrow diagonal /></a>
              </div>
              <p className="book-section__fineprint">Digital edition links open Amazon. Hardcover enquiries are handled separately.</p>
            </div>
          </div>
        </section>

        <section className="closing-note">
          <div className="closing-note__rule" />
          <p>Some things are lost. Some are buried.</p>
          <h2>What we keep<br /><em>keeps us, too.</em></h2>
          <InternalLink to="/#stories" navigate={navigate} className="text-link">Return to the stories <Arrow /></InternalLink>
          <div className="closing-note__rule" />
        </section>
      </main>
      <Footer navigate={navigate} />
    </>
  );
}

function StoryPage({ story, navigate }) {
  const storyIndex = STORIES.findIndex((item) => item.slug === story.slug);
  const hasText = STORIES_WITH_TEXT.has(story.slug);
  const previous = STORIES[(storyIndex - 1 + STORIES.length) % STORIES.length];
  const next = STORIES[(storyIndex + 1) % STORIES.length];
  const themeStyle = {
    '--story-accent': story.palette.accent,
    '--story-glow': story.palette.glow,
    '--story-bg': story.palette.background,
    '--story-surface': story.palette.surface,
  };
  return (
    <div className="story-page" style={themeStyle}>
      <Header navigate={navigate} active="stories" />
      <main>
        <section className="story-page__hero">
          <ImageLayer story={story} className="story-page__backdrop" />
          <div className="story-page__hero-veil" aria-hidden="true" />
          <div className="story-page__hero-inner section-wrap">
            <InternalLink to="/#stories" navigate={navigate} className="back-link"><span>←</span> All stories</InternalLink>
            <div className="story-page__hero-copy">
              <p className="eyebrow"><span />{String(storyIndex + 1).padStart(2, '0')} / 09 <i /> {story.format}</p>
              <h1>{story.title}</h1>
              <p className="story-page__category">{story.category}</p>
              <p className="story-page__tagline">{story.detailLine}</p>
            </div>
            <div className="story-page__hero-foot"><span>THE THINGS WE KEEP</span><span>{story.motif}</span></div>
          </div>
        </section>

        <section className="story-page__body section-wrap">
          <div className="story-page__main-copy">
            <p className="eyebrow"><span />The story</p>
            <h2>{story.shortLine}</h2>
            {story.needsEditorialReview ? (
              <p className="story-page__synopsis">The story-specific description will be added once its premise and themes are confirmed.</p>
            ) : (
              <p className="story-page__synopsis">{story.synopsis}</p>
            )}
            {!story.needsEditorialReview && story.themes.length > 0 && <div className="story-page__themes"><span className="story-page__themes-label">Threads within</span>{story.themes.map((theme) => <span key={theme} className="theme-chip">{theme}</span>)}</div>}
            {story.underneath && <div className="story-deep-note"><span className="story-deep-note__eyebrow">BENEATH THE SURFACE</span><p>{story.underneath}</p></div>}
            {story.visualMotifs?.length > 0 && <div className="story-motifs"><span className="story-page__themes-label">Visual language</span>{story.visualMotifs.map((motif, index) => <span className="story-motif" key={motif}><i>{String(index + 1).padStart(2, '0')}</i>{motif}</span>)}</div>}
            {story.coreQuestion && <details className="story-question"><summary>One question to carry with you <span>+</span></summary><p>{story.coreQuestion}</p></details>}
            <div className="story-page__actions">
              {hasText ? (
                <InternalLink to={`/read/${story.slug}`} navigate={navigate} className="button button--light">{story.readingMode === 'full' ? 'Read the complete story — free' : 'Read the available preview'} <Arrow /></InternalLink>
              ) : (
                <a href={BOOK.kindleIndia} target="_blank" rel="noreferrer noopener" className="button button--light">Discover it in the book <Arrow diagonal /></a>
              )}
              <InternalLink to="/#book" navigate={navigate} className="text-link">Explore editions <Arrow /></InternalLink>
            </div>
          </div>
          <figure className="story-page__figure">
            <div className="story-page__figure-frame">
              <img src={story.detailImage?.src || story.image} alt={story.detailImage?.alt || story.imageAlt} loading="lazy" decoding="async" onError={(event) => event.currentTarget.classList.add('image-layer__failed')} />
              <span className="story-page__figure-label">{story.detailImage?.caption || story.motif}</span>
            </div>
            <figcaption>{story.detailImage?.alt || story.imageAlt}. Atmospheric image reference from <a href="https://unsplash.com" target="_blank" rel="noreferrer noopener">Unsplash</a>.</figcaption>
          </figure>
        </section>

        <section className="story-page__book-strip">
          <div className="section-wrap story-page__book-inner">
            <div><p className="eyebrow"><span />Inside the collection</p><h2>{story.readingMode === 'full' ? 'Keep wandering through the dark.' : 'The rest of the collection is waiting.'}</h2></div>
            <a href={BOOK.kindleIndia} target="_blank" rel="noreferrer noopener" className="button button--light">Find the book <Arrow diagonal /></a>
          </div>
        </section>

        <section className="story-pager section-wrap" aria-label="Explore another story">
          <InternalLink to={`/stories/${previous.slug}`} navigate={navigate} className="story-pager__item"><span>← Previous door</span><strong>{previous.title}</strong></InternalLink>
          <InternalLink to="/#stories" navigate={navigate} className="story-pager__index">All nine stories <span>Archive index ↗</span></InternalLink>
          <InternalLink to={`/stories/${next.slug}`} navigate={navigate} className="story-pager__item story-pager__item--next"><span>Next door →</span><strong>{next.title}</strong></InternalLink>
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
        <article className="reader-article">
          <header className="reader-article__header">
            <p className="eyebrow"><span />{hasFullText ? 'A complete story, freely shared' : 'A glimpse into this story'}</p>
            <h1>{story.title}</h1>
            <p>{story.shortLine}</p>
            <div className="reader-article__ornament" aria-hidden="true">✳</div>
          </header>
          {hasSample ? (
            <div className="reader-article__text">
              {readerSegments.map((segment) => segment.type === 'paragraph' ? (
                <p key={`${story.slug}-${segment.key}`}>{segment.text}</p>
              ) : (
                <figure className={`reader-plate reader-plate--${segment.image.layout || 'wide'}`} key={`${story.slug}-${segment.key}`}>
                  <button className="reader-plate__trigger" type="button" onClick={() => setLightbox(segment.image)} aria-label={`Enlarge image: ${segment.image.caption}`}>
                    <img src={segment.image.src} alt={segment.image.alt} loading="lazy" decoding="async" onError={(event) => event.currentTarget.classList.add('reader-plate__failed')} />
                    <span className="reader-plate__zoom" aria-hidden="true">↗</span>
                  </button>
                  <figcaption><span>{segment.image.caption}</span><small>FIG. {String((story.readerImages || []).indexOf(segment.image) + 1).padStart(2, '0')}</small></figcaption>
                </figure>
              ))}
              <div className="reader-article__ending">
                <span>{hasFullText ? 'END OF STORY' : 'THE SAMPLE ENDS HERE'}</span>
                <h2>{hasFullText ? 'Thank you for reading.' : 'There is more beyond this door.'}</h2>
                <p>{hasFullText ? 'The other doors are open. Find the story that stays with you next.' : 'This preview ends here. The complete story belongs to the collection.'}</p>
                {hasFullText ? <InternalLink to="/#stories" navigate={navigate} className="button button--light">Explore all stories <Arrow /></InternalLink> : <a className="button button--light" href={BOOK.kindleIndia} target="_blank" rel="noreferrer noopener">Find the collection <Arrow diagonal /></a>}
              </div>
            </div>
          ) : (
            <div className="reader-article__locked">
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
        <nav className="reader-story-nav section-wrap" aria-label="Navigate between stories">
          {STORIES.map((item, index) => <InternalLink key={item.slug} to={`/stories/${item.slug}`} navigate={navigate} className={item.slug === story.slug ? 'is-current' : ''}><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</InternalLink>)}
        </nav>
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__top section-wrap">
        <Brand navigate={navigate} />
        <p>Dark tales of guilt and consequence.</p>
        <div className="site-footer__links"><InternalLink to="/about" navigate={navigate}>About the author</InternalLink><InternalLink to="/#stories" navigate={navigate} className="footer-back-top">Explore the stories ↑</InternalLink></div>
      </div>
      <nav className="site-footer__directory section-wrap" aria-label="All stories">
        {STORIES.map((story, index) => <InternalLink key={story.slug} to={`/stories/${story.slug}`} navigate={navigate}><span>{String(index + 1).padStart(2, '0')}</span>{story.title}</InternalLink>)}
      </nav>
      <div className="site-footer__bottom section-wrap">
        <span>© {new Date().getFullYear()} Soumik Halder</span>
        <span>Atmospheric photography via <a href="https://unsplash.com" target="_blank" rel="noreferrer noopener">Unsplash</a></span>
        <a href={BOOK.kindleIndia} target="_blank" rel="noreferrer noopener">Find the book ↗</a>
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

  if (route.kind === 'home') return <HomePage stories={STORIES} navigate={navigate} />;
  if (!currentStory) return <NotFound navigate={navigate} />;
  if (route.kind === 'read') return <ReaderPage story={currentStory} navigate={navigate} />;
  return <StoryPage story={currentStory} navigate={navigate} />;
}
