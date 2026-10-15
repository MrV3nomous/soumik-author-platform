import { Fragment, useEffect, useState } from 'react';



/*

 * THE THINGS WE KEEP — reader-first launch page

 *

 * Before deploying, add your real URLs to BOOK_LINKS below.

 * This app deliberately does not collect payment details or store email addresses.

 * Payments and email subscriptions must use hosted checkout / signup pages.

 */

// Set to true if the Kindle eBook is enrolled in KDP Select, false if it is not.

// Keep null until confirmed; direct digital sale links stay hidden while unknown.

const KDP_SELECT_ENROLLED = true;



const BOOK_LINKS = {

  kindleMarkets: [

    { label: 'US', href: 'https://kdp.amazon.com/amazon-dp-action/us/dualbookshelf.marketplacelink/B0HML17SSR' },

    { label: 'India', href: 'https://kdp.amazon.com/amazon-dp-action/in/dualbookshelf.marketplacelink/B0HML17SSR' },

    { label: 'UK', href: 'https://kdp.amazon.com/amazon-dp-action/uk/dualbookshelf.marketplacelink/B0HML17SSR' },

    { label: 'Australia', href: 'https://kdp.amazon.com/amazon-dp-action/au/dualbookshelf.marketplacelink/B0HML17SSR' },

    { label: 'Germany', href: 'https://kdp.amazon.com/amazon-dp-action/de/dualbookshelf.marketplacelink/B0HML17SSR' },

    { label: 'France', href: 'https://kdp.amazon.com/amazon-dp-action/fr/dualbookshelf.marketplacelink/B0HML17SSR' },

    { label: 'Spain', href: 'https://kdp.amazon.com/amazon-dp-action/es/dualbookshelf.marketplacelink/B0HML17SSR' },

    { label: 'Italy', href: 'https://kdp.amazon.com/amazon-dp-action/it/dualbookshelf.marketplacelink/B0HML17SSR' },

    { label: 'Netherlands', href: 'https://kdp.amazon.com/amazon-dp-action/nl/dualbookshelf.marketplacelink/B0HML17SSR' },

    { label: 'Japan', href: 'https://kdp.amazon.com/amazon-dp-action/jp/dualbookshelf.marketplacelink/B0HML17SSR' },

    { label: 'Brazil', href: 'https://kdp.amazon.com/amazon-dp-action/br/dualbookshelf.marketplacelink/B0HML17SSR' },

    { label: 'Canada', href: 'https://kdp.amazon.com/amazon-dp-action/ca/dualbookshelf.marketplacelink/B0HML17SSR' },

    { label: 'Mexico', href: 'https://kdp.amazon.com/amazon-dp-action/mx/dualbookshelf.marketplacelink/B0HML17SSR' },

  ],

  hardcoverMarkets: [

    { label: 'US', href: 'https://kdp.amazon.com/amazon-dp-action/us/dualbookshelf.marketplacelink/B0HMST7VLV' },

    { label: 'UK', href: 'https://kdp.amazon.com/amazon-dp-action/uk/dualbookshelf.marketplacelink/B0HMST7VLV' },

    { label: 'Germany', href: 'https://kdp.amazon.com/amazon-dp-action/de/dualbookshelf.marketplacelink/B0HMST7VLV' },

    { label: 'France', href: 'https://kdp.amazon.com/amazon-dp-action/fr/dualbookshelf.marketplacelink/B0HMST7VLV' },

    { label: 'Spain', href: 'https://kdp.amazon.com/amazon-dp-action/es/dualbookshelf.marketplacelink/B0HMST7VLV' },

    { label: 'Italy', href: 'https://kdp.amazon.com/amazon-dp-action/it/dualbookshelf.marketplacelink/B0HMST7VLV' },

    { label: 'Netherlands', href: 'https://kdp.amazon.com/amazon-dp-action/nl/dualbookshelf.marketplacelink/B0HMST7VLV' },

    { label: 'Poland', href: 'https://kdp.amazon.com/amazon-dp-action/pl/dualbookshelf.marketplacelink/B0HMST7VLV' },

    { label: 'Sweden', href: 'https://kdp.amazon.com/amazon-dp-action/se/dualbookshelf.marketplacelink/B0HMST7VLV' },

    { label: 'Belgium', href: 'https://kdp.amazon.com/amazon-dp-action/be/dualbookshelf.marketplacelink/B0HMST7VLV' },

    { label: 'Ireland', href: 'https://kdp.amazon.com/amazon-dp-action/ie/dualbookshelf.marketplacelink/B0HMST7VLV' },

  ],

  paperbackMarkets: [],

  googlePlay: '',

  indiaHardcoverOrderForm: 'https://forms.gle/LPfTPWX8zVFNH5Zj6',

  indiaDigitalOrderForm: 'https://forms.gle/YAsR1xGHD9Ptb7j58',

  indiaHardcoverCheckout: '',

  indiaDigitalCheckout: '',

  newsletterSignup: '',

};



// Each item is one reader paragraph. Paragraph boundaries are intentionally paced.

const STORY = [

  `The first thud struck the heavy steel door with the sickening finality of a hammer descending on bone.`,

  `A second blow followed, and then a third. Jack awoke with a start, his heart racing beneath his ribs. He reached blindly across the cluttered desk, knocking against a row of empty vodka bottles before finding his spectacles. Outside, lightning flashed over the cliffs, revealing the black sea raging against the rocks below.`,

  `His cabin stank of damp wood, stale tobacco and salt. Rust crept along the walls, and the wind found its way through every crack in the ancient tower. Jack had grown accustomed to the storm. He had lived in the lighthouse long enough for its nightly violence to become a kind of companionship, something to drown out the thoughts he preferred not to hear.`,

  `But the knocking was new.`,

  `He lit his oil lamp and sat listening. The flame trembled in the draught, casting long shadows across the bottles scattered beside his bed. Another blow shook the door.`,

  `‘Who’s there?’ he called.`,

  `Only the wind answered.`,

  `With a curse, Jack crossed the room and drew back the deadbolt. He pulled the door open, expecting a rush of rain, but the narrow landing was empty. The iron staircase wound upwards towards the light chamber and descended into darkness below. He looked in both directions, then stepped out far enough to peer over the railing.`,

  `Nothing.`,

  `He shut the door and returned to his bed. Perhaps a loose shutter had broken free somewhere above him. Perhaps the storm had driven something against the tower. He tried to convince himself that either explanation was sufficient, but when he closed his eyes, he could still feel the vibration of the blows travelling through the floor.`,

  `He had almost fallen asleep when the knocking came again.`,

  `This time, he was on his feet before the third blow. He opened the door so quickly that it struck the wall behind it. The landing was empty, just as before.`,

  `Jack stood there for a moment, staring into the darkness. Then he took his lamp and descended the staircase to Mr Crawley’s quarters.`,

  `Crawley had been the lighthouse’s senior keeper for nearly thirty years. He was a quiet, peculiar man who rarely spoke about his past, but Jack had come to rely on his presence. They had eaten supper together scarcely an hour earlier, sitting across from each other at the galley table while rain rattled against the windows. Jack remembered the older man staring out at the sea, turning his fork between his fingers without eating much.`,

  `He knocked on Crawley’s door.`,

  `‘Crawley! Open up.’`,

  `No answer.`,

  `He knocked again, harder this time. The sound travelled down the stairwell and returned to him in a thin, hollow echo.`,

  `‘Come on, old man. I know you’re in there.’`,

  `He tried the handle. The door did not move.`,

  `Jack waited, listening for footsteps on the other side, but there was nothing. He remembered Crawley complaining about a pain in his chest that evening, and for a moment he wondered whether something had happened to him. Yet he could not bring himself to force the door open. The storm, the knocking and the unnatural silence had begun to unsettle him, and he wanted nothing more than to return to his own room.`,

  `He climbed back upstairs, bolted his door and poured himself a measure of vodka. His hands had begun to shake. He drank, lit a cigar and sat on the edge of his bed, watching the lamp.`,

  `The next blow nearly tore the door from its hinges.`,

  `Jack sprang up, knocking the bottle from the desk. It shattered against the floor, and the smell of spirits rose sharply into the room. He stared at the door, waiting for another strike.`,

  `It came.`,

  `He seized the handle and flung the door open.`,

  `The stairwell lay empty. Beyond the railing, the darkness seemed deeper than before. Jack was about to retreat when he heard a sound above him.`,

  `Footsteps.`,

  `They moved slowly across the iron grating, descending from the direction of the light chamber. Each step rang clearly through the tower, unhurried and steady, as though whoever was approaching had all the time in the world.`,

  `Jack lifted his lamp and began to climb.`,

  `At the top, the heavy hatch stood ajar. Wind drove rain through the opening, and the flame in his lamp guttered as he stepped onto the gallery surrounding the great lantern room. The sea was almost invisible beneath the storm. Lightning flickered behind the clouds, briefly illuminating the waves far below.`,

  `Then the sky flashed white.`,

  `A man stood at the edge of the gallery, his back to Jack, his arms raised towards the sea. His clothes clung to his body, and water streamed from his hair. He stood so close to the railing that a single misstep would send him plunging into the darkness.`,

  `‘Hey!’ Jack shouted. ‘Get away from there!’`,

  `The figure did not move.`,

  `Jack took a step forwards. The wind tore at his clothes, and the lamp went out in his hand. He stumbled against the railing, cursing, and reached for the man.`,

  `Before he could touch him, another set of footsteps came pounding up the stairs.`,

  `‘Crawley?’`,

  `The older keeper emerged onto the gallery. His face was pale, and his eyes were fixed on the man at the edge. He seemed not to notice Jack at all.`,

  `‘Crawley, what the hell is going on?’`,

  `Jack caught the older man by the shoulder. His hand passed straight through him. For an instant, Jack felt nothing but a strange coldness, as though he had plunged his arm into deep water. He staggered backwards. Crawley continued towards the railing without looking round.`,

  `Lightning flashed again. Jack saw the man at the edge turn. It was his own face. The same hollow cheeks, the same bloodshot eyes, the same small scar beside his mouth. Yet the expression was unfamiliar. The man was smiling, not with amusement but with the quiet satisfaction of someone who had been waiting a very long time.`,

  `Jack could not move. The figure looked directly at him, then stepped backwards over the railing. He vanished into the sea.`,

  `A moment later, a great wave rose from the darkness below. It struck the lighthouse with a roar, sweeping across the gallery and tearing the iron railing from its supports. Glass shattered behind Jack. The force of the water swallowed Crawley, carrying him into the night.`,

  `Jack stood waiting for the impact. It never came. The water passed through him. He looked down at his hands. They were pale and almost transparent in the faint light from the lantern room. Rain fell through his fingers. The wind moved through his clothes without stirring them.`,

  `He turned towards the stairs, and something in him finally gave way.`,

  `Jack descended the staircase. The storm raged around him, but he no longer felt the cold. He returned to his cabin, shut the door and sat on the edge of his bed. His broken bottle lay on the floor, its contents spreading through the cracks between the boards. He stared at it for a long time before lying down.`,

  `Outside, the sea continued to batter the cliffs. The lantern revolved above him, sending its pale beam across the black water. An hour later, the first thud struck his steel door with the sickening finality of a hammer descending upon a fractured bone.`,

  `Jack opened his eyes.`,

];



const isConfiguredUrl = (url) => typeof url === 'string' && /^https?:\/\//i.test(url.trim());



const VISUALS = {

  hero: 'https://images.unsplash.com/photo-1758301064875-b46ec97564dd?auto=format&fit=crop&w=2400&q=88',

  sea: 'https://images.unsplash.com/photo-1766759622568-e27b4128af95?auto=format&fit=crop&w=1800&q=86',

  door: 'https://images.unsplash.com/photo-1768807086823-d80d37e06b63?auto=format&fit=crop&w=1800&q=86',

  stairs: 'https://images.unsplash.com/photo-1667099761510-dc70ac156c43?auto=format&fit=crop&w=1800&q=86',

  wave: 'https://images.unsplash.com/photo-1570187853757-b599d3fc5fbd?auto=format&fit=crop&w=2000&q=86',

};


// Serve a right-sized Unsplash image for each screen instead of always downloading
// the largest source. The original URL remains the fallback for older browsers.
const buildUnsplashSrcSet = (src) => {
  if (typeof src !== 'string' || !src.includes('images.unsplash.com') || !/[?&]w=\d+/.test(src)) return undefined;
  const widths = [480, 768, 1080, 1440, 1920, 2400];
  return widths
    .map((width) => `${src.replace(/([?&]w=)\d+/, (_, prefix) => `${prefix}${width}`)} ${width}w`)
    .join(', ');
};



const REVEAL_BEATS = new Set([

  'But the knocking was new.',

  'Only the wind answered.',

  'Nothing.',

  'No answer.',

  'The next blow nearly tore the door from its hinges.',

  'It came.',

  'Footsteps.',

  'Then the sky flashed white.',

  'He turned towards the stairs, and something in him finally gave way.',

  'Jack opened his eyes.',

]);



function ArrowUpRight() {

  return (

    <svg aria-hidden="true" viewBox="0 0 16 16" className="link-arrow" fill="none">

      <path d="M4 12 12 4M5 4h7v7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />

    </svg>

  );

}



function ActionLink({ href, children, variant = 'light', className = '' }) {

  if (!isConfiguredUrl(href)) return null;

  return (

    <a href={href} target="_blank" rel="noreferrer noopener" className={`action-link action-link--${variant} ${className}`}>

      <span>{children}</span><ArrowUpRight />

    </a>

  );

}



function EditionCard({ eyebrow, title, description, status, href, storeLinks = [], action, note, featured = false, expandMarkets = false, quickMarketCount = 1 }) {

  const availableStores = storeLinks.filter((store) => isConfiguredUrl(store.href));

  const quickOtherStores = availableStores.slice(1, quickMarketCount);

  const additionalStores = availableStores.slice(quickMarketCount);



  return (

    <article className={`edition-card ${featured ? 'edition-card--featured' : ''}`}>

      <p className="eyebrow">{eyebrow}</p>

      <h3>{title}</h3>

      <p className="edition-description">{description}</p>

      <p className="edition-status">{status}</p>

      {availableStores.length > 1 && expandMarkets ? (

        <div className="edition-markets edition-markets--expandable">

          <ActionLink href={availableStores[0].href} variant={featured ? 'light' : 'outline'} className="edition-action">

            {action || `Buy on Amazon ${availableStores[0].label}`}

          </ActionLink>

          {quickOtherStores.length > 0 && (

            <div className="edition-market-links edition-market-links--quick" aria-label="More popular Amazon stores">

              {quickOtherStores.map((store) => (

                <a key={`${title}-${store.label}`} href={store.href} target="_blank" rel="noreferrer noopener">

                  {store.label}<span aria-hidden="true"> ↗</span>

                </a>

              ))}

            </div>

          )}

          {additionalStores.length > 0 && (

            <details className="edition-market-details">

              <summary>More Amazon stores ({additionalStores.length})</summary>

              <div className="edition-market-links">

                {additionalStores.map((store) => (

                  <a key={`${title}-${store.label}`} href={store.href} target="_blank" rel="noreferrer noopener">

                    {store.label}<span aria-hidden="true"> ↗</span>

                  </a>

                ))}

              </div>

            </details>

          )}

        </div>

      ) : availableStores.length > 1 ? (

        <div className="edition-markets">

          <p className="edition-markets__label">Choose your Amazon store</p>

          <div className="edition-market-links">

            {availableStores.map((store) => (

              <a key={`${title}-${store.label}`} href={store.href} target="_blank" rel="noreferrer noopener">

                {store.label}<span aria-hidden="true"> ↗</span>

              </a>

            ))}

          </div>

        </div>

      ) : isConfiguredUrl(availableStores[0]?.href) ? (

        <ActionLink href={availableStores[0].href} variant={featured ? 'light' : 'outline'} className="edition-action">{action || 'View edition'}</ActionLink>

      ) : isConfiguredUrl(href) && action ? (

        <ActionLink href={href} variant={featured ? 'light' : 'outline'} className="edition-action">{action}</ActionLink>

      ) : (

        <p className="edition-note">{note || 'Purchase link will appear here when the listing is available.'}</p>

      )}

    </article>

  );

}



function StoryImage({ src, type, number, kicker, caption, creditUrl }) {

  return (

    <figure className={`story-image story-image--${type}`}>

      <div className="story-image__frame">

        <div className="story-image__fallback" aria-hidden="true" />

        <img

          className="story-image__photo"

          src={src}

          srcSet={buildUnsplashSrcSet(src)}

          sizes="(max-width: 640px) 100vw, (max-width: 1100px) 92vw, 1100px"

          alt=""

          loading="lazy"

          decoding="async"

          onError={(event) => { event.currentTarget.classList.add('image-failed'); }}

        />

        <div className="story-image__shade" aria-hidden="true" />


        <div className="story-image__copy">

          <span className="story-image__number">{number}</span>

          <span className="story-image__kicker">{kicker}</span>

          <p>{caption}</p>

        </div>

      </div>

      {creditUrl && <figcaption className="story-image__credit"><a href={creditUrl} target="_blank" rel="noreferrer noopener">View photograph on Unsplash ↗</a></figcaption>}

    </figure>

  );

}



function App() {

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showReadingCta, setShowReadingCta] = useState(false);



  useEffect(() => {

    let frame = 0;

    const handleScroll = () => {

      if (frame) window.cancelAnimationFrame(frame);

      frame = window.requestAnimationFrame(() => {

        const root = document.documentElement;

        const maxScroll = root.scrollHeight - window.innerHeight;

        const progress = maxScroll > 0 ? root.scrollTop / maxScroll : 0;

        setScrollProgress(Math.min(1, Math.max(0, progress)));
        const bookTop = document.getElementById('book')?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
        const shouldShowCta = root.scrollTop > Math.max(520, window.innerHeight * 0.68) && bookTop > window.innerHeight * 0.62;
        setShowReadingCta(shouldShowCta);

      });

    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {

      if (frame) window.cancelAnimationFrame(frame);

      window.removeEventListener('scroll', handleScroll);

      window.removeEventListener('resize', handleScroll);

    };

  }, []);



  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = Array.from(document.querySelectorAll(
      '.story-image, .reader-ending, .collection__hero, .collection__manifesto, .edition-section, .edition-card, .direct-panel, .author-footer'
    ));

    if (reduceMotion || !('IntersectionObserver' in window)) return undefined;

    document.documentElement.classList.add('has-reveal');
    targets.forEach((element, index) => {
      element.classList.add('reveal-target');
      element.style.setProperty('--reveal-delay', `${(index % 4) * 85}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });

    targets.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('has-reveal');
    };
  }, []);



  const hasNewsletter = isConfiguredUrl(BOOK_LINKS.newsletterSignup);

  const hasIndiaHardcoverCheckout = isConfiguredUrl(BOOK_LINKS.indiaHardcoverCheckout);

  const hasIndiaDigitalCheckout = isConfiguredUrl(BOOK_LINKS.indiaDigitalCheckout);



  // Place imagery after story passages, not hard-coded paragraph numbers. This keeps

  // the visual rhythm correct when a paragraph is edited or the story is repaced.

  const storyVisuals = {

    [STORY.findIndex((paragraph) => paragraph.startsWith('A second blow followed,'))]: (

      <StoryImage src={VISUALS.sea} type="sea" number="I" kicker="Beyond the glass" caption="Outside, the sea had become a single moving darkness." creditUrl="https://unsplash.com/photos/dark-stormy-clouds-over-a-rough-ocean-at-night-qOkC7tHW_54" />

    ),

    [STORY.findIndex((paragraph) => paragraph.startsWith('With a curse, Jack crossed the room'))]: (

      <StoryImage src={VISUALS.door} type="door" number="II" kicker="The first silence" caption="The door opened. Nothing waited on the other side." creditUrl="https://unsplash.com/photos/a-rusty-metal-door-secured-with-a-padlock-TIbcWQjYYgA" />

    ),

    [STORY.findIndex((paragraph) => paragraph.startsWith('They moved slowly across the iron grating'))]: (

      <StoryImage src={VISUALS.stairs} type="stairs" number="III" kicker="Above him" caption="Then came the sound of footsteps on the iron grating." creditUrl="https://unsplash.com/photos/a-large-metal-spiral-staircase-AJBO97kxCUU" />

    ),

    [STORY.findIndex((paragraph) => paragraph.startsWith('At the top, the heavy hatch stood ajar'))]: (

      <StoryImage src={VISUALS.hero} type="storm" number="IV" kicker="The light chamber" caption="At the edge of the world, a figure waited in the storm." creditUrl="https://unsplash.com/photos/lighthouse-standing-on-rocks-in-dark-stormy-sea-jDlBVKsgfVA" />

    ),

    [STORY.findIndex((paragraph) => paragraph.startsWith('A moment later, a great wave rose'))]: (

      <StoryImage src={VISUALS.wave} type="wave" number="V" kicker="The sea answered" caption="The wave came. Jack remained untouched." creditUrl="https://unsplash.com/photos/a-large-wave-hitting-a-lighthouse-on-a-stormy-day-j-ukn6RzOFo" />

    ),

    [STORY.findIndex((paragraph) => paragraph.startsWith('Jack descended the staircase'))]: (

      <StoryImage src={VISUALS.hero} type="loop" number="VI" kicker="The night repeats" caption="The light kept turning over the black water." creditUrl="https://unsplash.com/photos/lighthouse-standing-on-rocks-in-dark-stormy-sea-jDlBVKsgfVA" />

    ),

  };



  return (

    <main className="site-shell">

      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@400;500;600&display=swap');

        :root { color-scheme: dark; }

        html { scroll-behavior: smooth; background: #080a0b; }

        body { margin: 0; background: #080a0b; }

        .site-shell { min-height: 100vh; overflow-x: clip; background: #080a0b; color: #e9e6de; }

        .site-shell ::selection { background:#797366; color:#fffdf7; }

        .site-shell * { box-sizing: border-box; }

        .skip-link { position:absolute; z-index:200; top:-100px; left:20px; padding:12px 16px; color:#080a0b; background:#f1eee6; text-decoration:none; font:600 10px/1.4 Inter,sans-serif; text-transform:uppercase; letter-spacing:.14em; }

        .skip-link:focus { top:16px; }

        .progress-track { position:fixed; z-index:100; top:0; left:0; width:100%; height:2px; pointer-events:none; }

        .progress-fill { height:100%; background:#d7cfba; box-shadow:0 0 14px rgba(219,210,186,.4); transition:width .08s linear; }

        .site-nav { position:absolute; z-index:20; top:0; left:0; width:100%; border-bottom:1px solid rgba(255,255,255,.1); background:linear-gradient(180deg,rgba(4,6,7,.76),rgba(4,6,7,.16)); }

        .nav-inner { max-width:1440px; margin:0 auto; padding:24px clamp(20px,5vw,74px); display:flex; align-items:center; justify-content:space-between; gap:20px; }

        .brand-lockup { display:flex; flex-direction:column; gap:5px; text-decoration:none; }

        .brand-name { font:600 10px/1.2 Inter,sans-serif; letter-spacing:.25em; text-transform:uppercase; color:#f1eee6; }

        .brand-subtitle { font:italic 15px/1.1 'Crimson Pro',Georgia,serif; color:#bbb7ad; }

        .nav-links { display:flex; align-items:center; gap:clamp(16px,3vw,38px); }

        .nav-links a { color:#ddd9ce; text-decoration:none; font:500 9px/1.3 Inter,sans-serif; letter-spacing:.19em; text-transform:uppercase; transition:color .2s; }

        .nav-links a:hover { color:white; }

        .hero { position:relative; isolation:isolate; min-height:min(880px,100vh); display:flex; align-items:flex-end; background:#101517; overflow:hidden; }

        .hero-media { position:absolute; z-index:0; inset:0; overflow:hidden; }

        .hero-fallback { position:absolute; inset:0; overflow:hidden; background:radial-gradient(ellipse at 75% 28%,rgba(151,164,165,.24),transparent 34%),linear-gradient(180deg,#172125 0%,#080c0e 75%); }

        .hero-photo { position:absolute; inset:0; width:100%; height:100%; display:block; object-fit:cover; object-position:center 46%; opacity:.88; animation:slow-zoom 34s ease-in-out infinite alternate; }

        .hero-photo.image-failed { display:none; }

        .hero-fallback__tower { position:absolute; bottom:-5%; right:17%; width:clamp(75px,11vw,150px); height:57%; background:linear-gradient(90deg,#0a0e10,#262d30 48%,#080c0e); clip-path:polygon(24% 0,76% 0,100% 100%,0 100%); opacity:.8; filter:drop-shadow(0 0 24px rgba(0,0,0,.8)); }

        .hero-fallback__lantern { position:absolute; top:34%; right:16.8%; width:clamp(80px,12vw,165px); height:clamp(30px,4vw,54px); border:1px solid rgba(219,214,190,.45); background:linear-gradient(180deg,#363d3a,#111718); box-shadow:0 0 44px rgba(222,214,184,.2); }

        .hero-fallback__beam { position:absolute; top:34%; right:23%; width:65%; height:31%; clip-path:polygon(0 0,100% 40%,100% 62%,0 100%); transform-origin:right center; background:linear-gradient(90deg,rgba(226,218,188,.1),transparent); animation:beam-breathe 12s ease-in-out infinite alternate; }

        .hero-veil { position:absolute; inset:0; background:linear-gradient(90deg,rgba(5,7,8,.94),rgba(5,7,8,.78) 31%,rgba(5,7,8,.32) 65%,rgba(5,7,8,.1)),linear-gradient(0deg,#080a0b,rgba(8,10,11,.08) 38%,rgba(4,6,7,.25)); }

        .hero-fog { position:absolute; inset:-12%; pointer-events:none; opacity:.38; background:radial-gradient(ellipse at 62% 67%,rgba(200,205,199,.2),transparent 30%),radial-gradient(ellipse at 85% 55%,rgba(181,191,188,.12),transparent 24%); mix-blend-mode:screen; animation:fog-float 26s ease-in-out infinite alternate; }

        .hero-beam { position:absolute; top:22%; right:6%; width:70%; height:30%; pointer-events:none; opacity:.22; clip-path:polygon(100% 0,100% 78%,0 100%,0 72%); transform-origin:100% 0; background:linear-gradient(180deg,rgba(225,220,199,.42),rgba(225,220,199,0)); animation:beam-breathe 19s ease-in-out infinite alternate; }

        .hero-layout { position:relative; z-index:2; width:100%; max-width:1440px; margin:0 auto; padding:clamp(170px,23vh,240px) clamp(20px,8vw,118px) clamp(100px,13vh,150px); }

        .hero-copy { max-width:750px; }

        .hero-eyebrow { display:flex; align-items:center; gap:12px; color:#c1bba9; font:500 9px/1.4 Inter,sans-serif; letter-spacing:.26em; text-transform:uppercase; }

        .hero-eyebrow::before { content:''; width:38px; height:1px; background:#c1bba9; opacity:.65; }

        .hero-title { margin:28px 0 0; color:#f3f0e8; font:500 clamp(4.2rem,10.3vw,9.7rem)/.79 'Crimson Pro',Georgia,serif; letter-spacing:-.055em; text-transform:uppercase; text-shadow:0 5px 40px rgba(0,0,0,.35); }

        .hero-title span { display:block; }

        .hero-title span:last-child { color:#c8c4b8; font-style:italic; font-weight:400; text-transform:none; letter-spacing:-.045em; margin-left:.06em; }

        .hero-deck { max-width:490px; margin:32px 0 0; color:#ddd9cf; font:italic clamp(19px,2.3vw,26px)/1.35 'Crimson Pro',Georgia,serif; }

        .hero-meta { display:flex; flex-wrap:wrap; gap:10px 13px; margin-top:28px; color:rgba(221,218,207,.65); font:500 9px/1.6 Inter,sans-serif; letter-spacing:.16em; text-transform:uppercase; }

        .hero-meta span+span::before { content:'·'; color:#a99f86; margin-right:13px; }

        .hero-actions { display:flex; flex-wrap:wrap; gap:12px; margin-top:35px; }

        .action-link { display:inline-flex; align-items:center; justify-content:center; gap:12px; min-height:48px; padding:14px 18px; text-decoration:none; font:600 9px/1.3 Inter,sans-serif; letter-spacing:.17em; text-transform:uppercase; transition:background .22s,border-color .22s,color .22s,transform .22s; }

        .action-link:hover { transform:translateY(-2px); }

        .action-link--light { background:#e7e2d5; color:#111414; border:1px solid #e7e2d5; }

        .action-link--light:hover { background:#fffdf6; border-color:#fffdf6; }

        .action-link--outline { color:#e5e0d4; border:1px solid rgba(222,216,199,.35); background:rgba(9,11,12,.22); }

        .action-link--outline:hover { border-color:#d9d2c0; color:white; background:rgba(255,255,255,.045); }

        .link-arrow { width:14px; height:14px; flex:0 0 auto; }

        .hero-note { position:absolute; z-index:3; right:clamp(20px,4vw,56px); bottom:70px; writing-mode:vertical-rl; color:rgba(236,232,220,.56); font:500 8px/1.4 Inter,sans-serif; letter-spacing:.23em; text-transform:uppercase; }

        .hero-bottomline { position:absolute; bottom:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(225,220,200,.35),transparent); }

        .section-heading { display:flex; align-items:center; gap:14px; color:#9d9a90; font:500 9px/1.5 Inter,sans-serif; text-transform:uppercase; letter-spacing:.24em; }

        .section-heading::before { content:''; width:30px; height:1px; background:#858174; }

        .story-intro { background:linear-gradient(180deg,#080a0b,#0b0e0f); border-bottom:1px solid rgba(255,255,255,.07); }

        .story-intro__inner { max-width:1060px; margin:auto; padding:76px 24px 50px; text-align:center; }

        .story-intro h2 { max-width:700px; margin:19px auto 0; color:#e9e5dc; font:400 clamp(28px,3.7vw,45px)/1.1 'Crimson Pro',Georgia,serif; letter-spacing:-.02em; }

        .story-intro p { max-width:580px; margin:17px auto 0; color:#85857f; font:400 13px/1.8 Inter,sans-serif; }

        .story-article { max-width:1240px; margin:0 auto; padding:0 clamp(18px,3.5vw,44px); }

        .reading-topline { display:flex; justify-content:space-between; align-items:center; gap:16px; max-width:68ch; margin:0 auto; padding:26px 0; color:#777c77; border-bottom:1px solid rgba(255,255,255,.07); font:500 8px/1.5 Inter,sans-serif; letter-spacing:.22em; text-transform:uppercase; }

        .reading-topline span:last-child { text-align:right; }

        .story-copy { position:relative; padding-top:40px; }

        .story-paragraph { max-width:66ch; margin:0 auto; color:#d0cec7; font:400 clamp(18px,1.25rem,20px)/1.86 'Crimson Pro',Georgia,serif; letter-spacing:.003em; text-indent:1.35em; overflow-wrap:break-word; hyphens:auto; text-wrap:pretty; }

        .story-paragraph + .story-paragraph { margin-top:1.25em; }

        .story-paragraph:first-child { text-indent:0; }

        .story-paragraph:first-child::first-letter { float:left; font:500 5.2rem/.78 'Crimson Pro',Georgia,serif; margin:.12em .12em 0 0; color:#e9e3d4; }

        .story-paragraph--dialogue { margin-top:.75em !important; margin-bottom:.9em; text-indent:0; }

        .story-paragraph--reveal { margin-top:1.8em !important; margin-bottom:1.8em; color:#ded7c7; text-indent:0; line-height:1.72; }

        .story-paragraph--major-reveal { margin-top:2em !important; margin-bottom:2em; color:#e2ddd1; }

        .story-paragraph--ending { margin-top:2.35em !important; padding-bottom:.25em; color:#e6dfcf; text-indent:0; }

        .story-image { width:100%; max-width:1100px; margin:clamp(62px,8vw,108px) auto; }

        .story-image__frame { position:relative; isolation:isolate; min-height:260px; height:clamp(280px,39vw,495px); overflow:hidden; background:#121718; border:1px solid rgba(218,212,196,.13); }

        .story-image__fallback { position:absolute; inset:0; background:radial-gradient(ellipse at 75% 25%,rgba(162,174,169,.2),transparent 28%),linear-gradient(135deg,#222b2c,#080b0c 70%); }

        .story-image__photo { position:absolute; inset:0; display:block; width:100%; height:100%; object-fit:cover; opacity:.86; filter:saturate(.58) contrast(1.08) brightness(.7); transform:scale(1.04); animation:slow-zoom 32s ease-in-out infinite alternate; }

        .story-image__photo.image-failed { display:none; }

        .story-image--sea .story-image__photo { object-position:center 48%; }

        .story-image--door .story-image__photo { object-position:center 56%; }

        .story-image--stairs .story-image__photo { object-position:center 50%; }

        .story-image--storm .story-image__photo { object-position:center 56%; }

        .story-image--wave .story-image__photo { object-position:center 55%; }

        .story-image--loop { max-width:920px; margin-top:clamp(52px,6vw,76px); margin-bottom:clamp(52px,6vw,76px); }

        .story-image--loop .story-image__frame { height:clamp(220px,27vw,330px); min-height:200px; }

        .story-image--loop .story-image__photo { object-position:center 57%; }

        .story-image__shade { position:absolute; inset:0; background:linear-gradient(90deg,rgba(4,7,8,.81),rgba(4,7,8,.08) 82%),linear-gradient(0deg,rgba(3,5,6,.8),transparent 58%); pointer-events:none; }

        .story-image__copy { position:absolute; left:clamp(22px,5vw,56px); right:clamp(22px,5vw,56px); bottom:clamp(23px,4vw,46px); max-width:620px; z-index:2; }

        .story-image__number { display:inline-flex; align-items:center; justify-content:center; width:29px; height:29px; border:1px solid rgba(223,218,201,.52); border-radius:50%; color:#e8e1d1; font:italic 14px/1 'Crimson Pro',serif; }

        .story-image__kicker { display:block; margin-top:17px; color:#c6beaa; font:500 9px/1.4 Inter,sans-serif; letter-spacing:.24em; text-transform:uppercase; }

        .story-image__copy p { margin:9px 0 0; max-width:540px; color:#f0ece3; font:italic 400 clamp(25px,3.7vw,43px)/1.05 'Crimson Pro',Georgia,serif; letter-spacing:-.015em; text-wrap:balance; }

        .story-image__credit { display:flex; justify-content:flex-end; padding-top:9px; }

        .story-image__credit a { color:#626862; text-decoration:none; font:500 8px/1.5 Inter,sans-serif; letter-spacing:.08em; }

        .story-image__credit a:hover { color:#a3a59d; }

        .reader-ending { position:relative; max-width:790px; margin:clamp(84px,11vw,140px) auto 108px; padding:clamp(35px,6vw,68px) clamp(22px,5vw,60px); text-align:center; border:1px solid rgba(210,205,191,.15); background:radial-gradient(ellipse at 50% 105%,rgba(111,130,133,.19),transparent 60%),linear-gradient(135deg,#151a1b,#080a0b 72%); overflow:hidden; }

        .reader-ending::before { content:''; position:absolute; inset:0; pointer-events:none; background:linear-gradient(115deg,transparent 20%,rgba(210,210,198,.06) 50%,transparent 80%); transform:translateX(-70%); animation:slow-glint 17s ease-in-out infinite; }

        .reader-ending__rule { width:90px; height:1px; margin:0 auto 22px; background:linear-gradient(90deg,transparent,#9e9b8c,transparent); }

        .reader-ending__eyebrow { color:#777d77; font:500 9px/1.5 Inter,sans-serif; letter-spacing:.24em; text-transform:uppercase; }

        .reader-ending h2 { margin:16px 0 0; color:#eae6dc; font:italic 400 clamp(31px,4vw,48px)/1.1 'Crimson Pro',Georgia,serif; }

        .reader-ending p { max-width:520px; margin:17px auto 0; color:#92938d; font:400 13px/1.9 Inter,sans-serif; }

        .reader-ending a { display:inline-flex; align-items:center; gap:12px; margin-top:27px; padding-bottom:8px; color:#e6e0d1; border-bottom:1px solid #777466; text-decoration:none; font:500 9px/1.4 Inter,sans-serif; letter-spacing:.2em; text-transform:uppercase; }

        .collection { position:relative; isolation:isolate; overflow:hidden; background:#0b0e0f; border-top:1px solid rgba(255,255,255,.1); }

        .collection__backdrop { position:absolute; z-index:-3; inset:0; overflow:hidden; background:radial-gradient(ellipse at 72% 25%,rgba(107,128,130,.2),transparent 36%),linear-gradient(180deg,#101516,#080a0b 70%); }

        .collection__backdrop img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; opacity:.18; filter:grayscale(65%) brightness(.72); }

        .collection__backdrop img.image-failed { display:none; }

        .collection__veil { position:absolute; inset:0; z-index:-2; background:linear-gradient(90deg,rgba(7,9,10,.95),rgba(7,9,10,.84) 54%,rgba(7,9,10,.72)),linear-gradient(0deg,#080a0b,transparent 25%,rgba(8,10,11,.4)); }

        .collection__fog { position:absolute; inset:-10%; z-index:-1; opacity:.34; background:radial-gradient(ellipse at 72% 20%,rgba(164,177,172,.22),transparent 30%),radial-gradient(ellipse at 20% 80%,rgba(124,139,140,.12),transparent 28%); animation:fog-float 30s ease-in-out infinite alternate; }

        .collection__inner { max-width:1230px; margin:auto; padding:clamp(72px,10vw,138px) clamp(20px,5vw,66px) 46px; }

        .collection__hero { display:grid; grid-template-columns:minmax(0,.86fr) minmax(0,1.14fr); gap:clamp(36px,7vw,100px); align-items:center; }

        .cover-stage { position:relative; max-width:390px; width:100%; margin:0 auto; perspective:1400px; }

        .cover-stage__halo { position:absolute; inset:12% -12% -5% 5%; background:radial-gradient(ellipse,rgba(192,179,143,.19),transparent 70%); filter:blur(26px); }

        .cover-stage__frame { position:relative; transform:rotateY(-4deg) rotateX(1deg); box-shadow:22px 25px 65px rgba(0,0,0,.55); transition:transform .5s ease; }

        .cover-stage__frame:hover { transform:rotateY(0) translateY(-4px); }

        .cover-stage__frame img { display:block; width:100%; height:auto; border:1px solid rgba(222,216,199,.15); }

        .cover-stage__caption { margin-top:17px; text-align:center; color:#787a73; font:500 8px/1.5 Inter,sans-serif; letter-spacing:.2em; text-transform:uppercase; }

        .collection__eyebrow { color:#aaa596; font:500 9px/1.5 Inter,sans-serif; letter-spacing:.25em; text-transform:uppercase; }

        .collection__title { margin:18px 0 0; color:#f0ece3; font:500 clamp(42px,6.2vw,78px)/.95 'Crimson Pro',Georgia,serif; letter-spacing:-.045em; }

        .collection__subtitle { margin:17px 0 0; color:#beb8a9; font:italic 400 clamp(19px,2vw,25px)/1.3 'Crimson Pro',Georgia,serif; }

        .collection__hook { max-width:570px; margin:30px 0 0; color:#e0ddd5; font:400 clamp(22px,2.4vw,29px)/1.28 'Crimson Pro',Georgia,serif; }

        .collection__description { max-width:550px; margin:19px 0 0; color:#989993; font:400 13px/1.9 Inter,sans-serif; }

        .theme-list { display:flex; flex-wrap:wrap; gap:11px 17px; margin-top:28px; color:#b0ab9d; font:500 8px/1.6 Inter,sans-serif; letter-spacing:.19em; text-transform:uppercase; }

        .theme-list span+span::before { content:'／'; color:#5c605b; margin-right:14px; }

        .collection__manifesto { display:grid; grid-template-columns:1fr auto; align-items:center; gap:28px; margin-top:clamp(60px,8vw,105px); padding:clamp(27px,4vw,44px); border:1px solid rgba(221,216,201,.14); background:linear-gradient(105deg,rgba(24,30,30,.78),rgba(8,10,11,.42)); }

        .collection__manifesto p:first-child { color:#9b998f; font:500 8px/1.5 Inter,sans-serif; letter-spacing:.24em; text-transform:uppercase; }

        .collection__manifesto p:last-child { max-width:730px; margin:13px 0 0; color:#e0dcd2; font:italic 400 clamp(24px,3vw,34px)/1.15 'Crimson Pro',Georgia,serif; }

        .collection__manifesto-side { color:#666c66; font:500 8px/1.9 Inter,sans-serif; letter-spacing:.18em; text-align:right; text-transform:uppercase; }

        .edition-section { margin-top:clamp(72px,9vw,116px); padding-top:38px; border-top:1px solid rgba(255,255,255,.11); }

        .edition-section__head { display:flex; justify-content:space-between; align-items:flex-end; gap:24px; margin-bottom:27px; }

        .edition-section__head .eyebrow { color:#777d77; }

        .edition-section__head h3 { margin:10px 0 0; color:#eeeae1; font:400 clamp(28px,4vw,43px)/1.1 'Crimson Pro',Georgia,serif; }

        .edition-section__head > p { max-width:340px; margin:0; color:#757972; font:400 11px/1.7 Inter,sans-serif; text-align:right; }

        .edition-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; }

        .edition-card { position:relative; display:flex; min-height:255px; min-width:0; flex-direction:column; padding:22px; border:1px solid rgba(221,216,201,.12); background:linear-gradient(145deg,rgba(28,32,32,.62),rgba(5,7,8,.65)); transition:transform .24s ease,border-color .24s ease,background .24s ease; }

        .edition-card:hover { transform:translateY(-4px); border-color:rgba(220,215,198,.37); background:linear-gradient(145deg,rgba(39,43,42,.72),rgba(5,7,8,.78)); }

        .edition-card--featured { border-color:rgba(216,207,183,.43); background:linear-gradient(145deg,rgba(55,56,49,.58),rgba(5,7,8,.74)); }

        .eyebrow { margin:0; color:#a29d90; font:500 8px/1.5 Inter,sans-serif; letter-spacing:.2em; text-transform:uppercase; }

        .edition-card h3 { margin:16px 0 0; color:#e9e5dc; font:400 28px/1.05 'Crimson Pro',Georgia,serif; }

        .edition-description { flex:1; margin:11px 0 0; color:#999b94; font:400 11px/1.8 Inter,sans-serif; }

        .edition-status { margin:20px 0 0; padding-top:13px; color:#c2bcad; border-top:1px solid rgba(255,255,255,.09); font:500 8px/1.7 Inter,sans-serif; letter-spacing:.1em; text-transform:uppercase; }

        .edition-action { margin-top:15px; width:100%; min-height:43px; padding:12px 9px; font-size:8px; letter-spacing:.13em; }

        .edition-note { margin:13px 0 0; color:#656b66; font:400 9px/1.6 Inter,sans-serif; }

        .edition-markets { margin-top:auto; padding-top:18px; }

        .edition-markets__label { margin:0 0 10px; color:#7f827b; font:500 8px/1.4 Inter,sans-serif; letter-spacing:.15em; text-transform:uppercase; }

        .edition-market-links { display:flex; flex-wrap:wrap; gap:7px; }

        .edition-market-links a { display:inline-flex; align-items:center; padding:8px 10px; border:1px solid rgba(222,216,199,.2); color:#ddd8cc; text-decoration:none; font:500 9px/1.3 Inter,sans-serif; letter-spacing:.04em; transition:background .2s,border-color .2s,color .2s; }

        .edition-market-links a:hover { border-color:rgba(222,216,199,.55); background:rgba(255,255,255,.055); color:#fff; }

        .edition-market-details { position:relative; z-index:5; margin-top:11px; }

        .edition-market-details summary { cursor:pointer; width:max-content; max-width:100%; color:#aaa99f; font:500 8px/1.6 Inter,sans-serif; letter-spacing:.07em; text-decoration:underline; text-decoration-color:rgba(222,216,199,.32); text-underline-offset:4px; list-style:none; }

        .edition-market-details summary::-webkit-details-marker { display:none; }

        .edition-market-details summary::after { content:' +'; color:#bfb9aa; }

        .edition-market-details[open] summary::after { content:' −'; }

        .edition-market-details[open] .edition-market-links { position:absolute; top:calc(100% + 11px); left:0; width:min(280px,calc(100vw - 48px)); max-height:min(250px,46vh); overflow:auto; margin:0; padding:12px; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:6px; background:rgba(10,13,14,.97); border:1px solid rgba(222,216,199,.24); box-shadow:0 18px 55px rgba(0,0,0,.62); backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px); z-index:60; }

        .edition-market-details[open] .edition-market-links a { min-width:0; justify-content:space-between; padding:10px 9px; background:rgba(255,255,255,.018); }

        .edition-card:has(.edition-market-details[open]) { z-index:45; border-color:rgba(220,215,198,.42); }

        .edition-market-details:focus-within summary { color:#f2eee3; outline:1px solid rgba(222,216,199,.5); outline-offset:4px; }

        .direct-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:24px; }

        .direct-row:not(.direct-row--with-newsletter) .direct-panel { grid-column:1 / -1; }

        .direct-panel { min-width:0; padding:clamp(22px,3vw,32px); border:1px solid rgba(221,216,201,.13); background:rgba(4,6,7,.45); }

        .direct-panel h3 { margin:13px 0 0; color:#e9e5dc; font:400 30px/1.1 'Crimson Pro',Georgia,serif; }

        .direct-panel > p:not(.eyebrow) { max-width:500px; margin:12px 0 0; color:#959790; font:400 12px/1.8 Inter,sans-serif; }

        .direct-panel__actions { display:flex; flex-wrap:wrap; gap:10px; margin-top:20px; }

        .author-footer { margin-top:clamp(68px,8vw,105px); padding-top:25px; border-top:1px solid rgba(255,255,255,.1); text-align:center; }

        .author-footer__name { color:#d8d4c8; font:500 9px/1.4 Inter,sans-serif; letter-spacing:.26em; text-transform:uppercase; }

        .author-footer__title { margin-top:8px; color:#777a73; font:italic 16px/1.4 'Crimson Pro',Georgia,serif; }

        .author-footer__about { display:inline-block; margin-top:14px; color:#888b83; font:500 8px/1.5 Inter,sans-serif; letter-spacing:.18em; text-decoration:none; text-transform:uppercase; }

        .image-credits { margin-top:22px; color:#555b56; font:400 8px/1.8 Inter,sans-serif; overflow-wrap:anywhere; }

        .image-credits a { color:#777d76; text-decoration:none; }

        .image-credits a:hover { color:#d6d0c0; }

        @keyframes slow-zoom { from { transform:scale(1.03); } to { transform:scale(1.1); } }

        @keyframes fog-float { from { transform:translate3d(-2%,1%,0); opacity:.18; } to { transform:translate3d(2%,-1%,0); opacity:.42; } }

        @keyframes beam-breathe { from { opacity:.12; transform:rotate(-1deg); } to { opacity:.33; transform:rotate(1.3deg); } }

        @keyframes slow-glint { 0%,70% { transform:translateX(-75%); opacity:0; } 80% { opacity:.4; } 100% { transform:translateX(75%); opacity:0; } }





        @supports (height:100svh) { .hero { min-height:min(880px,100svh); } }

        @media (max-width:900px) {

          .edition-market-details[open] .edition-market-links { left:auto; right:0; }

          .collection__hero { grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr); gap:35px; }

          .edition-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }

          .edition-card { min-height:230px; }

          .hero-title { font-size:clamp(4.2rem,12vw,7rem); }

        }

        @media (max-width:640px) {

          .nav-inner { padding:17px 18px; gap:12px; }

          .brand-name { font-size:9px; }

          .brand-subtitle { font-size:13px; }

          .nav-links { gap:12px; }

          .nav-links a { font-size:7px; letter-spacing:.1em; }

          .hero { min-height:790px; min-height:90svh; align-items:flex-end; }

          .hero-photo { object-position:62% center; opacity:.72; }

          .hero-veil { background:linear-gradient(90deg,rgba(5,7,8,.78),rgba(5,7,8,.28)),linear-gradient(0deg,#080a0b,rgba(8,10,11,.17) 62%,rgba(4,6,7,.25)); }

          .hero-layout { padding:180px 23px 96px; }

          .hero-eyebrow { font-size:8px; line-height:1.7; letter-spacing:.17em; }

          .hero-title { margin-top:25px; font-size:clamp(4rem,17vw,6.2rem); }

          .hero-deck { margin-top:24px; max-width:340px; font-size:21px; }

          .hero-note { display:none; }

          .hero-actions { gap:9px; }

          .hero-actions .action-link { min-height:46px; padding:13px 14px; font-size:8px; }

          .story-intro__inner { padding:58px 23px 38px; }

          .story-intro p { font-size:12px; }

          .story-article { padding-inline:18px; }

          .reading-topline { font-size:7px; letter-spacing:.11em; gap:10px; }

          .story-copy { padding-top:30px; }

          .story-paragraph { font-size:18px; line-height:1.82; text-indent:1em; }

          .story-paragraph:first-child::first-letter { font-size:4.6rem; }

          .story-paragraph--reveal { margin-top:1.55em !important; margin-bottom:1.55em; }

          .story-paragraph--major-reveal { margin-top:1.7em !important; margin-bottom:1.7em; }

          .story-paragraph--ending { margin-top:2em !important; }

          .story-image { margin:58px auto; }

          .story-image__frame { height:clamp(310px,93vw,420px); min-height:280px; }

          .story-image--loop .story-image__frame { height:228px; min-height:228px; }

          .story-image__photo { object-position:center; }

          .story-image__copy { left:20px; right:20px; bottom:22px; }

          .story-image__copy p { font-size:clamp(27px,8vw,34px); }

          .reader-ending { margin-top:78px; margin-bottom:80px; }

          .collection__inner { padding-top:76px; }

          .collection__hero { display:flex; flex-direction:column; align-items:stretch; gap:38px; }

          .cover-stage { max-width:290px; }

          .collection__title { font-size:clamp(43px,13vw,61px); }

          .collection__hook { margin-top:23px; font-size:24px; }

          .collection__manifesto { grid-template-columns:1fr; gap:20px; margin-top:58px; }

          .collection__manifesto-side { text-align:left; }

          .edition-section { margin-top:62px; }

          .edition-section__head { display:block; }

          .edition-section__head > p { margin-top:12px; text-align:left; }

          .edition-grid { grid-template-columns:1fr; }

          .edition-market-details[open] .edition-market-links { width:min(320px,calc(100vw - 48px)); right:0; left:auto; }

          .edition-card { min-height:0; }

          .edition-description { min-height:0; }

          .direct-row { grid-template-columns:1fr; }

          .author-footer { margin-top:68px; }

        }

        @media (max-width:380px) {

          .nav-inner { align-items:flex-start; }

          .brand-subtitle { max-width:142px; line-height:1.25; }

          .nav-links { gap:9px; padding-top:2px; }

          .nav-links a { font-size:6.5px; letter-spacing:.07em; }

          .hero-layout { padding-inline:18px; }

          .hero-actions { align-items:stretch; flex-direction:column; max-width:270px; }

          .hero-actions .action-link { justify-content:space-between; }

          .story-article { padding-inline:14px; }

          .story-paragraph { font-size:17.5px; }

          .reading-topline { letter-spacing:.07em; }

          .reading-topline span:last-child { max-width:48%; }

          .edition-card { padding:19px; }

        }

        @media (prefers-reduced-motion:reduce) {

          html { scroll-behavior:auto; }

          .hero-photo,.hero-fallback__beam,.hero-fog,.hero-beam,.story-image__photo,.collection__fog,.reader-ending::before { animation:none !important; }

          .progress-fill,.action-link,.cover-stage__frame,.edition-card { transition:none !important; }

          .edition-card:hover,.action-link:hover,.cover-stage__frame:hover { transform:none; }

        }


        /* THE THINGS WE KEEP — final visual pass */
        :root { --ink:#080a0b; --paper:#eee9dd; --silver:#a9b8b7; --brass:#b7a77e; --hairline:rgba(223,216,198,.16); }
        html { scroll-padding-top:84px; }
        body { font-synthesis:none; text-rendering:optimizeLegibility; -webkit-font-smoothing:antialiased; }
        .site-shell { position:relative; isolation:isolate; }
        .site-nav { position:fixed; background:linear-gradient(180deg,rgba(6,8,9,.88),rgba(6,8,9,.52)); border-bottom-color:rgba(226,219,202,.12); backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px); transition:background .35s ease,border-color .35s ease; }
        .nav-inner { padding-top:17px; padding-bottom:17px; }
        .brand-name { letter-spacing:.29em; }
        .brand-subtitle { color:#c5c0b5; }
        .nav-links { gap:clamp(13px,2.2vw,30px); }
        .nav-links a { font-size:9px; transition:color .25s ease,opacity .25s ease,border-color .25s ease,background .25s ease,transform .25s ease; }
        .nav-links .nav-buy { display:inline-flex; align-items:center; gap:9px; padding:11px 14px; border:1px solid rgba(225,216,194,.42); color:#f0eadd; background:rgba(226,218,199,.055); }
        .nav-links .nav-buy:hover { color:#111413; border-color:#e9e0cc; background:#e9e0cc; transform:translateY(-1px); }
        .nav-buy .link-arrow { width:12px; height:12px; }
        .hero { min-height:min(940px,100svh); border-bottom:1px solid rgba(223,216,198,.18); }
        .hero-media { background:#0d1214; }
        .hero-photo { opacity:.78; filter:saturate(.66) contrast(1.12) brightness(.79); transform-origin:61% 48%; }
        .hero-veil { background:linear-gradient(90deg,rgba(5,7,8,.96) 0%,rgba(5,7,8,.79) 32%,rgba(5,7,8,.36) 67%,rgba(5,7,8,.09) 100%),linear-gradient(0deg,#080a0b 0%,rgba(8,10,11,.12) 35%,rgba(4,6,7,.38) 100%); }
        .hero-layout { padding-top:clamp(190px,25vh,265px); padding-bottom:clamp(105px,14vh,165px); }
        .hero-eyebrow { color:#d0c7b2; }
        .hero-eyebrow::before { width:50px; background:linear-gradient(90deg,#d8c9a5,transparent); }
        .hero-title { font-size:clamp(5rem,11vw,10.7rem); line-height:.73; letter-spacing:-.065em; }
        .hero-title span:last-child { color:#d4d0c4; text-shadow:0 6px 60px rgba(0,0,0,.48); }
        .hero-deck { max-width:510px; font-size:clamp(21px,2.25vw,28px); color:#e3dfd5; text-wrap:balance; }
        .hero-meta { color:rgba(229,222,207,.79); }
        .hero-actions { align-items:center; }
        .action-link { position:relative; overflow:hidden; isolation:isolate; min-height:51px; }
        .action-link::before { content:""; position:absolute; z-index:-1; inset:0; transform:translateX(-110%); background:linear-gradient(105deg,transparent,rgba(255,255,255,.26),transparent); transition:transform .65s cubic-bezier(.2,.7,.2,1); }
        .action-link:hover::before { transform:translateX(110%); }
        .action-link--light { box-shadow:0 8px 30px rgba(218,209,186,.07); }
        .hero-note { right:clamp(20px,5vw,72px); bottom:clamp(48px,8vh,94px); color:rgba(236,232,220,.72); }
        .hero-bottomline { height:1px; background:linear-gradient(90deg,transparent,rgba(220,207,176,.64),rgba(220,207,176,.18),transparent); }
        .story-intro { position:relative; overflow:hidden; }
        .story-intro::before,.story-intro::after { content:""; position:absolute; left:50%; width:min(72vw,860px); height:1px; transform:translateX(-50%); background:linear-gradient(90deg,transparent,rgba(204,192,161,.16),transparent); }
        .story-intro::before { top:0; }
        .story-intro::after { bottom:0; }
        .story-intro__inner { padding-top:clamp(72px,8vw,110px); padding-bottom:clamp(48px,6vw,72px); }
        .story-intro h2 { font-size:clamp(33px,4.5vw,54px); text-wrap:balance; }
        .story-intro p:not(.section-heading) { color:#a3a49d; line-height:1.95; }
        .reading-topline { max-width:66ch; margin-top:7px; color:#9b9d94; border-bottom-color:rgba(215,210,197,.12); }
        .story-copy { padding-top:clamp(34px,4.5vw,60px); }
        .story-paragraph { color:#d8d5cc; font-size:clamp(19px,1.42rem,22px); line-height:1.9; letter-spacing:.006em; }
        .story-paragraph--reveal { color:#eee6d5; }
        .story-paragraph--major-reveal { position:relative; isolation:isolate; width:fit-content; max-width:min(66ch,100%); }
        .story-paragraph--major-reveal::before { content:""; position:absolute; inset:-.8em -1.1em; z-index:-1; border-left:1px solid rgba(188,170,129,.4); background:linear-gradient(90deg,rgba(182,162,119,.055),transparent 75%); opacity:.9; }
        .story-paragraph--ending { color:#f1ebdc; }
        .story-image { margin-top:clamp(68px,9vw,124px); margin-bottom:clamp(68px,9vw,124px); }
        .story-image__frame { border:1px solid rgba(220,210,187,.22); box-shadow:0 30px 95px rgba(0,0,0,.26); }
        .story-image__photo { filter:saturate(.48) contrast(1.13) brightness(.66); }
        .story-image__shade { background:linear-gradient(90deg,rgba(4,7,8,.86),rgba(4,7,8,.13) 86%),linear-gradient(0deg,rgba(3,5,6,.88),transparent 65%); }
        .story-image__number { border-color:rgba(229,217,190,.7); background:rgba(9,12,12,.25); box-shadow:0 0 26px rgba(0,0,0,.18); }
        .story-image__kicker { color:#d1c6a9; }
        .story-image__copy p { max-width:570px; line-height:1.02; text-shadow:0 2px 28px rgba(0,0,0,.45); }
        .story-image__credit a { color:#777d76; }
        .reader-ending { border-color:rgba(215,204,175,.23); box-shadow:0 28px 90px rgba(0,0,0,.18); }
        .reader-ending::after { content:""; position:absolute; inset:10px; border:1px solid rgba(225,216,195,.055); pointer-events:none; }
        .reader-ending h2 { text-wrap:balance; }
        .reader-ending a { transition:color .2s ease,border-color .2s ease; }
        .reader-ending a:hover { color:#fff8e9; border-color:#d6c7a4; }
        .collection { border-top-color:rgba(224,214,190,.17); }
        .collection__backdrop img { opacity:.24; filter:grayscale(52%) brightness(.59) contrast(1.1); transform:scale(1.02); }
        .collection__veil { background:linear-gradient(90deg,rgba(7,9,10,.93),rgba(7,9,10,.78) 55%,rgba(7,9,10,.75)),linear-gradient(0deg,#080a0b,transparent 30%,rgba(8,10,11,.22)); }
        .collection__inner { padding-top:clamp(94px,11vw,155px); }
        .collection__hero { gap:clamp(46px,8vw,118px); }
        .cover-stage { max-width:410px; filter:drop-shadow(0 30px 45px rgba(0,0,0,.24)); }
        .cover-stage__halo { inset:7% -18% -9% -2%; background:radial-gradient(ellipse,rgba(177,160,119,.23),rgba(83,99,98,.09) 42%,transparent 72%); filter:blur(38px); }
        .cover-stage__frame { position:relative; isolation:isolate; overflow:hidden; aspect-ratio:2 / 3; border:1px solid rgba(229,216,182,.29); background:#111819; box-shadow:24px 32px 74px rgba(0,0,0,.62),-1px 0 0 rgba(255,255,255,.11) inset; transform:perspective(1400px) rotateY(-7deg) rotateX(1.7deg); transition:transform .7s cubic-bezier(.2,.7,.2,1),box-shadow .7s ease; }
        .cover-stage__frame::after { content:""; position:absolute; inset:0; z-index:3; pointer-events:none; background:linear-gradient(118deg,rgba(255,255,255,.13),transparent 18%,transparent 69%,rgba(0,0,0,.22)),linear-gradient(0deg,rgba(0,0,0,.3),transparent 36%); mix-blend-mode:screen; opacity:.62; }
        .cover-stage__frame:hover { transform:perspective(1400px) rotateY(-1deg) rotateX(0) translateY(-7px); box-shadow:18px 38px 90px rgba(0,0,0,.68); }
        .cover-stage__frame img { position:absolute; z-index:2; inset:0; width:100%; height:100%; object-fit:contain; border:0; }
        .cover-stage__frame img.image-failed { display:none; }
        .cover-stage__frame.has-cover-image .cover-stage__fallback { opacity:0; visibility:hidden; }
        .cover-stage__fallback { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:flex-start; padding:10% 9% 9%; text-align:center; overflow:hidden; color:#ded8c8; background:radial-gradient(ellipse at 52% 42%,rgba(155,169,163,.22),transparent 31%),linear-gradient(155deg,#263134 0%,#131b1d 42%,#070a0b 100%); }
        .cover-stage__fallback::before { content:""; position:absolute; inset:5%; border:1px solid rgba(211,199,166,.34); }
        .cover-stage__fallback::after { content:""; position:absolute; width:1px; height:57%; left:50%; top:22%; background:linear-gradient(180deg,rgba(228,216,185,.65),rgba(228,216,185,.02)); box-shadow:0 0 35px 10px rgba(218,205,167,.06); }
        .cover-stage__fallback-author { position:relative; z-index:1; font:600 clamp(7px,.75vw,10px)/1.4 Inter,sans-serif; letter-spacing:.28em; }
        .cover-stage__fallback-lighthouse { position:relative; z-index:1; width:28%; height:36%; margin-top:17%; background:linear-gradient(90deg,#090d0e,#48504c 48%,#101617); clip-path:polygon(26% 0,74% 0,100% 100%,0 100%); filter:drop-shadow(0 0 14px rgba(214,207,182,.18)); }
        .cover-stage__fallback-lighthouse::before { content:""; position:absolute; top:-4%; left:-9%; width:118%; height:13%; background:#9c9b8c; box-shadow:0 0 22px rgba(232,222,185,.6); }
        .cover-stage__fallback-lighthouse i { position:absolute; top:-10%; left:12%; width:76%; height:12%; background:#282f2d; border:1px solid rgba(215,208,188,.6); }
        .cover-stage__fallback strong { position:relative; z-index:1; margin-top:auto; font:500 clamp(25px,3vw,39px)/.9 'Crimson Pro',Georgia,serif; letter-spacing:.035em; }
        .cover-stage__fallback-subtitle { position:relative; z-index:1; margin-top:13px; color:#b2aa95; font:500 clamp(6px,.62vw,8px)/1.6 Inter,sans-serif; letter-spacing:.16em; }
        .cover-stage__fallback-rule { position:relative; z-index:1; width:26%; height:1px; margin-top:13%; background:#a79a77; }
        .cover-stage__caption { margin-top:21px; letter-spacing:.24em; }
        .collection__eyebrow { color:#c1b69a; }
        .collection__title { font-size:clamp(48px,6.7vw,88px); line-height:.88; text-wrap:balance; }
        .collection__subtitle { color:#d4c9b2; }
        .collection__hook { color:#f0ece2; font-size:clamp(23px,2.55vw,31px); line-height:1.27; text-wrap:balance; }
        .collection__description { color:#b0b0a8; max-width:530px; }
        .collection__proof { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); max-width:530px; margin-top:35px; border-top:1px solid rgba(220,211,190,.18); border-bottom:1px solid rgba(220,211,190,.18); }
        .collection__proof > div { display:flex; flex-direction:column; gap:8px; padding:18px 10px 18px 0; }
        .collection__proof > div + div { padding-left:16px; border-left:1px solid rgba(220,211,190,.13); }
        .collection__proof strong { color:#e4d9c0; font:500 23px/1 'Crimson Pro',Georgia,serif; letter-spacing:.02em; }
        .collection__proof span { color:#82877f; font:500 7px/1.6 Inter,sans-serif; letter-spacing:.13em; text-transform:uppercase; }
        .theme-list { color:#c5bead; gap:8px 13px; }
        .collection__manifesto { position:relative; overflow:hidden; border-color:rgba(220,210,185,.2); background:linear-gradient(105deg,rgba(26,33,33,.82),rgba(8,10,11,.62)); }
        .collection__manifesto::after { content:""; position:absolute; top:0; right:0; width:26%; height:100%; pointer-events:none; background:linear-gradient(90deg,transparent,rgba(191,181,154,.045)); }
        .collection__manifesto p:last-child { text-wrap:balance; }
        .edition-section { border-top-color:rgba(224,214,190,.17); }
        .edition-section__head { margin-bottom:34px; }
        .edition-section__head h3 { font-size:clamp(31px,4.2vw,47px); }
        .edition-section__head > p { color:#969990; }
        .edition-grid { gap:13px; }
        .edition-card { min-height:285px; padding:24px 22px; border-color:rgba(225,215,190,.15); background:linear-gradient(145deg,rgba(31,37,37,.72),rgba(6,8,9,.74)); }
        .edition-card::before { content:""; position:absolute; inset:0; pointer-events:none; opacity:0; background:linear-gradient(120deg,rgba(226,214,185,.08),transparent 42%); transition:opacity .3s ease; }
        .edition-card:hover::before { opacity:1; }
        .edition-card--featured { border-color:rgba(214,199,161,.5); background:linear-gradient(145deg,rgba(63,63,52,.72),rgba(8,10,11,.82)); box-shadow:0 20px 55px rgba(0,0,0,.14); }
        .edition-card--featured::after { content:"FEATURED EDITION"; position:absolute; top:0; right:0; padding:7px 9px; color:#bfb18e; border-left:1px solid rgba(214,199,161,.26); border-bottom:1px solid rgba(214,199,161,.26); font:500 6px/1.2 Inter,sans-serif; letter-spacing:.14em; }
        .edition-card h3 { font-size:31px; }
        .edition-description { font-size:11.5px; color:#afb0a8; }
        .edition-status { color:#d1c8b4; }
        .edition-action { position:relative; z-index:1; }
        .edition-markets__label { color:#a1a095; }
        .edition-market-links a { border-radius:1px; }
        .edition-market-links a:focus-visible,.edition-market-details summary:focus-visible,.nav-links a:focus-visible,.action-link:focus-visible,.reader-ending a:focus-visible,.reading-cta a:focus-visible { outline:2px solid #d2c29c; outline-offset:4px; }
        .direct-panel { border-color:rgba(225,215,190,.16); background:linear-gradient(145deg,rgba(21,26,27,.72),rgba(5,7,8,.5)); }
        .direct-panel h3 { text-wrap:balance; }
        .direct-panel > p:not(.eyebrow) { color:#a7a8a1; }
        .author-footer { padding-bottom:28px; }
        .author-footer__name { letter-spacing:.32em; }
        .image-credits { max-width:850px; margin-left:auto; margin-right:auto; line-height:2; }
        .progress-fill { background:linear-gradient(90deg,#9b9b88,#eee5cf); box-shadow:0 0 15px rgba(219,210,186,.55); }
        .reading-cta { position:fixed; z-index:75; left:50%; bottom:22px; width:min(560px,calc(100vw - 30px)); display:flex; align-items:center; gap:13px; padding:11px 13px; border:1px solid rgba(225,216,195,.22); background:rgba(11,14,15,.88); box-shadow:0 15px 50px rgba(0,0,0,.4); backdrop-filter:blur(22px); -webkit-backdrop-filter:blur(22px); opacity:0; visibility:hidden; transform:translate(-50%,18px) scale(.985); transition:opacity .45s ease,transform .45s cubic-bezier(.2,.7,.2,1),visibility .45s; }
        .reading-cta--visible { opacity:1; visibility:visible; transform:translate(-50%,0) scale(1); }
        .reading-cta__sigil { display:grid; place-items:center; flex:0 0 34px; height:34px; border:1px solid rgba(217,202,164,.33); color:#d8c8a2; font-size:16px; }
        .reading-cta__copy { min-width:0; display:flex; flex:1; flex-direction:column; gap:4px; }
        .reading-cta__copy strong { overflow:hidden; color:#eee8db; text-overflow:ellipsis; white-space:nowrap; font:500 14px/1.1 'Crimson Pro',Georgia,serif; }
        .reading-cta__copy small { color:#92958d; font:500 7px/1.4 Inter,sans-serif; letter-spacing:.1em; text-transform:uppercase; }
        .reading-cta a { display:inline-flex; align-items:center; justify-content:center; gap:8px; flex:0 0 auto; padding:12px 13px; color:#101312; background:#e8e0cf; text-decoration:none; font:600 8px/1.2 Inter,sans-serif; letter-spacing:.12em; text-transform:uppercase; transition:background .2s ease,transform .2s ease; }
        .reading-cta a:hover { background:#fff8e8; transform:translateY(-1px); }
        .reading-cta a .link-arrow { width:12px; height:12px; }
        html.has-reveal .reveal-target { opacity:0; transform:translateY(27px); transition:opacity .85s cubic-bezier(.2,.7,.2,1) var(--reveal-delay,0ms),transform .85s cubic-bezier(.2,.7,.2,1) var(--reveal-delay,0ms); }
        html.has-reveal .reveal-target.is-visible { opacity:1; transform:translateY(0); }
        html.has-reveal .edition-card { transition:opacity .75s ease var(--reveal-delay,0ms),transform .75s ease var(--reveal-delay,0ms),border-color .24s ease,background .24s ease; }
        html.has-reveal .edition-card.is-visible:hover { transform:translateY(-4px); }
        @media (max-width:900px) {
          .nav-inner { padding-left:clamp(20px,4vw,36px); padding-right:clamp(20px,4vw,36px); }
          .hero-title { font-size:clamp(5rem,13vw,8.3rem); }
          .collection__hero { gap:clamp(28px,5vw,48px); }
          .cover-stage { max-width:340px; }
          .edition-card { padding:22px 19px; }
        }
        @media (max-width:640px) {
          html { scroll-padding-top:74px; }
          .site-nav { background:rgba(7,9,10,.82); }
          .nav-inner { padding:14px 17px; }
          .nav-links { gap:9px; }
          .nav-links a { font-size:7px; letter-spacing:.075em; }
          .nav-links a:first-child { display:none; }
          .nav-links .nav-buy { padding:9px 10px; font-size:7px; }
          .nav-buy .link-arrow { display:none; }
          .hero { min-height:90svh; }
          .hero-photo { object-position:64% center; opacity:.7; }
          .hero-layout { padding:176px 23px 100px; }
          .hero-title { font-size:clamp(4.3rem,18vw,6.5rem); line-height:.77; }
          .hero-deck { max-width:320px; font-size:22px; }
          .hero-meta { gap:7px 10px; font-size:8px; }
          .story-paragraph { font-size:19px; line-height:1.88; }
          .story-paragraph--major-reveal::before { inset:-.5em -.7em; }
          .story-image__frame { height:clamp(320px,102vw,440px); }
          .collection__inner { padding-top:90px; }
          .collection__hero { gap:33px; }
          .cover-stage { max-width:min(76vw,310px); }
          .cover-stage__frame { transform:perspective(1000px) rotateY(-3deg) rotateX(1deg); }
          .collection__proof > div { padding-top:15px; padding-bottom:15px; }
          .collection__proof > div + div { padding-left:10px; }
          .collection__proof strong { font-size:21px; }
          .collection__proof span { font-size:6.5px; letter-spacing:.08em; }
          .edition-card { min-height:0; padding:22px; }
          .reading-cta { bottom:10px; gap:9px; padding:9px; width:calc(100vw - 18px); }
          .reading-cta__sigil { flex-basis:28px; height:28px; font-size:13px; }
          .reading-cta__copy strong { font-size:13px; }
          .reading-cta__copy small { font-size:6px; letter-spacing:.06em; }
          .reading-cta a { padding:11px 10px; font-size:7px; letter-spacing:.07em; }
          .reader-ending { padding:37px 22px; }
        }
        @media (max-width:380px) {
          .brand-subtitle { max-width:118px; }
          .nav-links { gap:7px; }
          .nav-links a { font-size:6.5px; }
          .nav-links .nav-buy { padding:8px 8px; }
          .hero-title { font-size:clamp(4rem,18vw,5rem); }
          .reading-cta__sigil { display:none; }
          .reading-cta__copy small { display:none; }
          .reading-cta a { padding:10px 8px; }
        }
        @media (prefers-reduced-motion:reduce) {
          .action-link::before { display:none; }
          .reading-cta,.reading-cta--visible { transition:none; transform:translate(-50%,0); }
          html.has-reveal .reveal-target { opacity:1 !important; transform:none !important; transition:none !important; }
        }


        /* SCENE-FOCUSED CINEMATIC PASS: no fixed atmospheric layers over the page */
        .hero-photo {
          opacity:.92;
          filter:saturate(.78) contrast(1.09) brightness(.88);
          animation:hero-camera-drift 42s cubic-bezier(.45,0,.55,1) infinite alternate;
          will-change:transform;
        }
        .hero-veil {
          background:linear-gradient(90deg,rgba(5,7,8,.88) 0%,rgba(5,7,8,.69) 31%,rgba(5,7,8,.24) 66%,rgba(5,7,8,.035) 100%),
                     linear-gradient(0deg,rgba(8,10,11,.88) 0%,rgba(8,10,11,.08) 32%,rgba(4,6,7,.19) 100%);
        }
        .hero-media::after {
          content:"";
          position:absolute;
          z-index:1;
          inset:0;
          pointer-events:none;
          opacity:0;
          mix-blend-mode:screen;
          background:radial-gradient(ellipse at 74% 24%,rgba(225,232,228,.45),transparent 21%),
                     linear-gradient(112deg,transparent 34%,rgba(207,221,218,.075) 49%,transparent 63%);
          animation: distant-lightning 27s linear infinite;
        }
        .hero-fog { opacity:.18; background:radial-gradient(ellipse at 63% 74%,rgba(200,205,199,.13),transparent 29%); }
        .hero-beam { opacity:.16; background:linear-gradient(180deg,rgba(225,220,199,.28),rgba(225,220,199,0)); animation:beam-sweep 22s ease-in-out infinite alternate; }
        .hero-fallback__beam { opacity:.7; }
        .story-image__frame {
          isolation:isolate;
          border-color:rgba(220,210,187,.24);
          box-shadow:0 32px 105px rgba(0,0,0,.34),0 0 0 1px rgba(255,255,255,.012) inset;
          transition:box-shadow .75s ease,border-color .75s ease,transform .75s cubic-bezier(.2,.7,.2,1);
        }
        .story-image__frame::after {
          content:"";
          position:absolute;
          z-index:2;
          top:-20%;
          bottom:-20%;
          left:-65%;
          width:35%;
          pointer-events:none;
          opacity:0;
          transform:skewX(-13deg);
          background:linear-gradient(90deg,transparent,rgba(221,227,221,.11),transparent);
          animation:frame-light-pass 18s ease-in-out infinite;
        }
        .story-image__photo {
          opacity:.96;
          filter:saturate(.66) contrast(1.08) brightness(.82);
          animation:scene-camera-drift 39s cubic-bezier(.45,0,.55,1) infinite alternate;
          will-change:transform;
          transition:filter 1s ease;
        }
        .story-image--sea .story-image__photo { object-position:center 48%; animation-duration:47s; }
        .story-image--door .story-image__photo { object-position:center 56%; animation-duration:43s; }
        .story-image--stairs .story-image__photo { object-position:center 50%; animation-duration:45s; }
        .story-image--storm .story-image__photo { object-position:center 56%; animation-duration:51s; }
        .story-image--wave .story-image__photo { object-position:center 55%; animation-duration:32s; }
        .story-image--loop .story-image__photo { object-position:center 57%; animation-duration:55s; }
        .story-image__shade {
          background:linear-gradient(90deg,rgba(4,7,8,.72),rgba(4,7,8,.045) 88%),
                     linear-gradient(0deg,rgba(3,5,6,.8),transparent 66%);
        }
        .story-image__copy { text-shadow:0 3px 25px rgba(0,0,0,.35); }
        .story-image__frame:hover { border-color:rgba(226,215,186,.43); box-shadow:0 42px 125px rgba(0,0,0,.45),0 0 34px rgba(189,177,144,.055); }
        .story-image__frame:hover .story-image__photo { filter:saturate(.78) contrast(1.07) brightness(.9); }
        .collection__backdrop img { opacity:.28; filter:grayscale(42%) brightness(.7) contrast(1.08); animation:collection-camera-drift 58s ease-in-out infinite alternate; }
        .collection__fog { opacity:.2; }
        .cover-stage__halo { animation:cover-halo-breathe 9s ease-in-out infinite alternate; }
        .cover-stage__frame { transform:rotateY(-4deg) rotateX(1deg) translateY(0); transition:transform .8s cubic-bezier(.2,.7,.2,1),box-shadow .8s ease; animation:cover-float 8s ease-in-out infinite; }
        .cover-stage__frame:hover { transform:rotateY(0deg) rotateX(0deg) translateY(-8px); box-shadow:28px 38px 85px rgba(0,0,0,.68); animation-play-state:paused; }
        .cover-stage__frame img { box-shadow:0 1px 0 rgba(255,255,255,.045) inset; }
        .edition-card { backdrop-filter:blur(5px); }
        .edition-card--featured { box-shadow:0 20px 65px rgba(0,0,0,.22),0 0 35px rgba(194,176,132,.035); }
        @keyframes hero-camera-drift {
          0% { transform:scale(1.045) translate3d(0,0,0); }
          100% { transform:scale(1.13) translate3d(-1.15%,-.65%,0); }
        }
        @keyframes scene-camera-drift {
          0% { transform:scale(1.035) translate3d(-.25%,.1%,0); }
          100% { transform:scale(1.105) translate3d(.8%,-.5%,0); }
        }
        @keyframes collection-camera-drift {
          0% { transform:scale(1.02) translate3d(0,0,0); }
          100% { transform:scale(1.09) translate3d(-.7%,-.4%,0); }
        }
        @keyframes frame-light-pass {
          0%,72% { left:-65%; opacity:0; }
          77% { opacity:.8; }
          88%,100% { left:135%; opacity:0; }
        }
        @keyframes beam-sweep {
          0% { opacity:.08; transform:rotate(-1.1deg) scaleX(.98); }
          100% { opacity:.22; transform:rotate(1.15deg) scaleX(1.025); }
        }
        @keyframes distant-lightning {
          0%,69.4%,70.1%,71.3%,100% { opacity:0; }
          69.5% { opacity:.13; }
          69.7% { opacity:0; }
          70.2% { opacity:.075; }
          70.4% { opacity:0; }
          70.8% { opacity:.035; }
          71% { opacity:0; }
        }
        @keyframes cover-float {
          0%,100% { transform:rotateY(-4deg) rotateX(1deg) translateY(0); }
          50% { transform:rotateY(-2deg) rotateX(1deg) translateY(-7px); }
        }
        @keyframes cover-halo-breathe {
          from { opacity:.58; transform:scale(.97); }
          to { opacity:1; transform:scale(1.045); }
        }
        @media (hover:hover) and (pointer:fine) {
          .story-image__frame:hover { transform:translateY(-3px); }
        }
        @media (max-width:640px) {
          .nav-inner { padding-top:13px; padding-bottom:13px; }
          .nav-links a:not(.nav-buy) { display:none; }
          .nav-links .nav-buy { padding:10px 12px; }
          .hero-photo { opacity:.83; filter:saturate(.73) contrast(1.06) brightness(.82); }
          .hero-veil { background:linear-gradient(90deg,rgba(5,7,8,.78),rgba(5,7,8,.25)),linear-gradient(0deg,rgba(8,10,11,.84),rgba(8,10,11,.08) 62%,rgba(4,6,7,.16)); }
          .hero-media::after { animation-duration:33s; }
          .story-image__frame::after { animation-duration:24s; }
        }
        @media (prefers-reduced-motion:reduce) {
          .hero-photo,.hero-fallback__beam,.hero-fog,.hero-beam,.hero-media::after,
          .story-image__photo,.story-image__frame::after,.collection__backdrop img,
          .cover-stage__halo,.cover-stage__frame { animation:none !important; }
          .cover-stage__frame { transform:none !important; }
          .story-image__frame,.story-image__photo { transition:none !important; }
        }

        /* Final fit-and-finish: no atmospheric layer sits over the full page. */
        .story-image__photo, .hero-photo, .collection__backdrop img { display:block; }
        .story-image__credit a { min-height:24px; display:inline-flex; align-items:center; }
        .nav-links a, .action-link, .edition-market-links a, .reader-ending a { -webkit-tap-highlight-color:transparent; }
        .hero-title, .collection__title, .story-intro h2 { text-wrap:balance; }
        .story-copy { scroll-margin-top:88px; }
        @media (max-width:640px) {
          .hero-title { max-width:100%; overflow-wrap:normal; }
          .reading-topline span:first-child { white-space:nowrap; }
        }

            `}</style>



      <a className="skip-link" href="#story">Skip to story</a>

      <div className="progress-track" aria-hidden="true"><div className="progress-fill" style={{ width: `${scrollProgress * 100}%` }} /></div>

      <aside className={`reading-cta ${showReadingCta ? 'reading-cta--visible' : ''}`} aria-hidden={!showReadingCta}>
        <span className="reading-cta__sigil" aria-hidden="true">✳</span>
        <span className="reading-cta__copy"><strong>The Things We Keep</strong><small>Eight stories. One bonus novella.</small></span>
        <a href="#book" tabIndex={showReadingCta ? 0 : -1}>Explore editions <ArrowUpRight /></a>
      </aside>

      <nav className="site-nav" aria-label="Main navigation">

        <div className="nav-inner">

          <a href="#top" className="brand-lockup" aria-label="Soumik Halder, home">

            <span className="brand-name">Soumik Halder</span>

            <span className="brand-subtitle">Fiction &amp; the things we keep</span>

          </a>

          <div className="nav-links">

            <a href="#story">Read the story</a>

            <a href="#book">The collection</a>

            <a href="#book" className="nav-buy">Get the book <ArrowUpRight /></a>

          </div>

        </div>

      </nav>



      <header id="top" className="hero">

        <div className="hero-media" aria-hidden="true">

          <div className="hero-fallback">

            <span className="hero-fallback__tower" />

            <span className="hero-fallback__lantern" />

            <span className="hero-fallback__beam" />

          </div>

          <img className="hero-photo" src={VISUALS.hero} srcSet={buildUnsplashSrcSet(VISUALS.hero)} sizes="100vw" alt="" fetchPriority="high" decoding="async" onError={(event) => { event.currentTarget.classList.add('image-failed'); }} />

          <div className="hero-veil" />

          <div className="hero-fog" />

          <div className="hero-beam" />

        </div>

        <div className="hero-layout">

          <div className="hero-copy">

            <p className="hero-eyebrow">A free short story · The Things We Keep</p>

            <h1 className="hero-title"><span>The</span><span>Lighthouse</span></h1>

            <p className="hero-deck">A story of isolation, denial, and the things that wait for us in the dark.</p>

            <div className="hero-meta"><span>Psychological horror</span><span>By Soumik Halder</span></div>

            <div className="hero-actions">

              <a className="action-link action-link--light" href="#story">Begin reading <span aria-hidden="true">↓</span></a>

              <a className="action-link action-link--outline" href="#book">Explore the collection <span aria-hidden="true">↗</span></a>

            </div>

          </div>

        </div>

        <p className="hero-note" aria-hidden="true">A story from the edge of the world</p>

        <div className="hero-bottomline" aria-hidden="true" />

      </header>



      <section className="story-intro" aria-labelledby="story-intro-title">

        <div className="story-intro__inner">

          <p className="section-heading" style={{ justifyContent: 'center' }}>An invitation into the storm</p>

          <h2 id="story-intro-title">Some doors should remain unopened.</h2>

          <p>The complete opening story from <i>The Things We Keep</i>. Settle in, take your time, and let the storm come to you.</p>

        </div>

      </section>



      <article id="story" className="story-article" aria-label="The Lighthouse — complete short story">

        <div className="reading-topline"><span>THE LIGHTHOUSE</span><span>Read at your own pace · Full story</span></div>

        <div className="story-copy">

          {STORY.map((paragraph, index) => {

            const isReveal = REVEAL_BEATS.has(paragraph);

            const isDialogue = paragraph.startsWith('‘');

            const isMajorReveal = paragraph.includes('His hand passed straight through him.') || paragraph.includes('It was his own face.') || paragraph.includes('The water passed through him.');

            const paragraphClassName = [

              'story-paragraph',

              isReveal && 'story-paragraph--reveal',

              isDialogue && 'story-paragraph--dialogue',

              isMajorReveal && 'story-paragraph--major-reveal',

              index === STORY.length - 1 && 'story-paragraph--ending',

            ].filter(Boolean).join(' ');



            return (

              <Fragment key={paragraph}>

                <p className={paragraphClassName}>{paragraph}</p>

                {storyVisuals[index] || null}

              </Fragment>

            );

          })}

        </div>

        <section className="reader-ending" aria-labelledby="reader-ending-title">

          <div className="reader-ending__rule" aria-hidden="true" />

          <p className="reader-ending__eyebrow">End of story · The Lighthouse</p>

          <h2 id="reader-ending-title">The Lighthouse is only the beginning.</h2>

          <p>If this story stays with you, <i>The Things We Keep</i> holds eight more journeys into guilt, memory, grief, sacrifice, and consequence.</p>

          <a href="#book">Discover the collection <span aria-hidden="true">↓</span></a>

        </section>

      </article>



      <section id="book" className="collection" aria-labelledby="collection-title">

        <div className="collection__backdrop" aria-hidden="true">

          <img src={VISUALS.hero} srcSet={buildUnsplashSrcSet(VISUALS.hero)} sizes="100vw" alt="" loading="lazy" decoding="async" onError={(event) => { event.currentTarget.classList.add('image-failed'); }} />

        </div>

        <div className="collection__veil" aria-hidden="true" />

        <div className="collection__fog" aria-hidden="true" />

        <div className="collection__inner">

          <div className="collection__hero">

            <div className="cover-stage">

              <div className="cover-stage__halo" aria-hidden="true" />

              <div className="cover-stage__frame">

                <div className="cover-stage__fallback" aria-hidden="true">
                  <span className="cover-stage__fallback-author">SOUMIK HALDER</span>
                  <span className="cover-stage__fallback-lighthouse"><i /></span>
                  <strong>THE THINGS<br />WE KEEP</strong>
                  <span className="cover-stage__fallback-subtitle">DARK TALES OF GUILT<br />AND CONSEQUENCE</span>
                  <span className="cover-stage__fallback-rule" />
                </div>
                <img src="/book-mockup.png" alt="The Things We Keep by Soumik Halder, a collection of dark psychological horror stories" loading="lazy" decoding="async" onLoad={(event) => { event.currentTarget.parentElement?.classList.add('has-cover-image'); }} onError={(event) => { event.currentTarget.classList.add('image-failed'); }} />

              </div>

              <p className="cover-stage__caption">The debut collection by Soumik Halder</p>

            </div>

            <div className="collection__copy">

              <p className="collection__eyebrow">The complete collection</p>

              <h2 className="collection__title" id="collection-title">The Things<br />We Keep</h2>

              <p className="collection__subtitle">Dark Tales of Guilt and Consequence</p>

              <p className="collection__hook">The past refuses to stay buried. Love becomes obsession. Grief becomes a place from which there is no easy return.</p>

              <p className="collection__description">Eight stories. One bonus novella. Psychological horror about the memories we carry, the truths we conceal, and the consequences that remain.</p>

              <div className="theme-list"><span>Guilt</span><span>Memory</span><span>Grief</span><span>Sacrifice</span><span>Consequence</span></div>
              <div className="collection__proof" aria-label="Inside the collection">
                <div><strong>08</strong><span>Short stories</span></div>
                <div><strong>01</strong><span>Bonus novella</span></div>
                <div><strong>AFTER</strong><span>What remains</span></div>
              </div>

            </div>

          </div>



          <div className="collection__manifesto">

            <div>

              <p>A collection of aftermaths</p>

              <p>Some things are lost. Some are buried. Some remain long after we have stopped looking for them.</p>

            </div>

            <div className="collection__manifesto-side">Dark tales<br />of what remains</div>

          </div>



          <section className="edition-section" aria-labelledby="editions-heading">

            <div className="edition-section__head">

              <div>

                <p className="eyebrow">Choose your edition</p>

                <h3 id="editions-heading">Keep reading.</h3>

              </div>

              <p>Release dates and availability vary by format and marketplace. Links open the relevant store in a new tab.</p>

            </div>

            <div className="edition-grid">

              <EditionCard eyebrow="Digital · Kindle" title="eBook" description="Read on a Kindle device or with the free Kindle app." status="Available now" storeLinks={BOOK_LINKS.kindleMarkets} action="Read on Amazon · US" featured expandMarkets quickMarketCount={4} />

              <EditionCard eyebrow="Print · Paperback" title="Paperback" description="The collection in a traditional printed edition." status="Release · October 18, 2026" storeLinks={BOOK_LINKS.paperbackMarkets} note="The Amazon listing will be added when the paperback is live." />

              <EditionCard eyebrow="Print · Hardcover" title="Hardcover" description="A durable case-laminate edition for your shelf or collection." status="Available internationally" storeLinks={BOOK_LINKS.hardcoverMarkets} action="Buy hardcover · US store" expandMarkets note="Choose an available Amazon marketplace when purchasing." />

              <EditionCard eyebrow="Digital · Google Play" title="Google Play Books" description="Read in Google Play Books on supported devices." status={isConfiguredUrl(BOOK_LINKS.googlePlay) ? 'Available on Google Play' : 'Pending review'} href={BOOK_LINKS.googlePlay} action="Read on Google Play" note="The listing will be linked once Google Play approves and publishes it." />

            </div>

          </section>



          <div className={`direct-row ${hasNewsletter ? 'direct-row--with-newsletter' : ''}`}>

            <section className="direct-panel" aria-labelledby="india-orders-title">

              <p className="eyebrow">For readers in India</p>

              <h3 id="india-orders-title">A signed copy, from the author.</h3>

              <p>Interested in a locally fulfilled hardcover? Send a no-obligation request. I’ll confirm availability, the full price including shipping, and the dispatch estimate before asking you to pay.</p>

              <div className="direct-panel__actions">

                <ActionLink href={BOOK_LINKS.indiaHardcoverOrderForm} variant="outline">Request a signed hardcover</ActionLink>

                {hasIndiaHardcoverCheckout && <ActionLink href={BOOK_LINKS.indiaHardcoverCheckout}>Pay for confirmed order</ActionLink>}

                {KDP_SELECT_ENROLLED === false && hasIndiaDigitalCheckout && <ActionLink href={BOOK_LINKS.indiaDigitalCheckout} variant="outline">Buy eBook direct</ActionLink>}

                {KDP_SELECT_ENROLLED === false && !hasIndiaDigitalCheckout && isConfiguredUrl(BOOK_LINKS.indiaDigitalOrderForm) && <ActionLink href={BOOK_LINKS.indiaDigitalOrderForm} variant="outline">Ask about direct eBook</ActionLink>}

              </div>

            </section>

            {hasNewsletter && (

              <section className="direct-panel" aria-labelledby="newsletter-title">

                <p className="eyebrow">Occasional notes</p>

                <h3 id="newsletter-title">The next story, when it arrives.</h3>

                <p>Receive occasional updates about new stories and books. Signing up is optional, and your address should only be used for the updates you agree to receive.</p>

                <div className="direct-panel__actions"><ActionLink href={BOOK_LINKS.newsletterSignup}>Join the reader list</ActionLink></div>

              </section>

            )}

          </div>



          <footer className="author-footer">

            <p className="author-footer__name">Soumik Halder</p>

            <p className="author-footer__title">The Things We Keep</p>

            <a className="author-footer__about" href="/about">About the author ↗</a>

            <p className="image-credits">Atmospheric photographs via Unsplash: <a href="https://unsplash.com/photos/dark-stormy-clouds-over-a-rough-ocean-at-night-qOkC7tHW_54" target="_blank" rel="noreferrer noopener">Heamosoo Kim</a>, <a href="https://unsplash.com/photos/a-rusty-metal-door-secured-with-a-padlock-TIbcWQjYYgA" target="_blank" rel="noreferrer noopener">Sergej Karpow</a>, <a href="https://unsplash.com/photos/a-large-metal-spiral-staircase-AJBO97kxCUU" target="_blank" rel="noreferrer noopener">Matt ODell</a>, <a href="https://unsplash.com/photos/lighthouse-standing-on-rocks-in-dark-stormy-sea-jDlBVKsgfVA" target="_blank" rel="noreferrer noopener">Thanh Nguyen</a>, and <a href="https://unsplash.com/photos/a-large-wave-hitting-a-lighthouse-on-a-stormy-day-j-ukn6RzOFo" target="_blank" rel="noreferrer noopener">Marcus Woodbridge</a>.</p>

            <p className="image-credits">© 2026 Soumik Halder · All rights reserved</p>

          </footer>

        </div>

      </section>

    </main>

  );

}



export default App;
