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
const KDP_SELECT_ENROLLED = null;

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
          alt=""
          loading="lazy"
          decoding="async"
          onError={(event) => { event.currentTarget.classList.add('image-failed'); }}
        />
        <div className="story-image__shade" aria-hidden="true" />
        <div className="story-image__fog" aria-hidden="true" />
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

  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const root = document.documentElement;
        const maxScroll = root.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? root.scrollTop / maxScroll : 0;
        setScrollProgress(Math.min(1, Math.max(0, progress)));
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
        .wind-overlay { position:fixed; z-index:9; inset:0; overflow:hidden; pointer-events:none; opacity:.78; mix-blend-mode:screen; }
        .wind-thread { position:absolute; left:-75%; width:250%; height:clamp(90px,18vh,230px); border-radius:50%; filter:blur(19px); transform:rotate(-8deg); will-change:transform; }
        .wind-thread--one { top:5%; background:radial-gradient(ellipse at 50% 50%,rgba(197,211,207,.105),rgba(197,211,207,.035) 27%,transparent 65%),linear-gradient(180deg,transparent 34%,rgba(204,214,209,.04) 51%,transparent 70%); animation:wind-sweep-one 47s ease-in-out infinite alternate; }
        .wind-thread--two { top:31%; height:clamp(100px,21vh,265px); opacity:.68; background:radial-gradient(ellipse at 46% 48%,rgba(186,202,199,.09),transparent 62%),linear-gradient(180deg,transparent 32%,rgba(196,208,204,.045) 49%,transparent 71%); animation:wind-sweep-two 59s ease-in-out infinite alternate; }
        .wind-thread--three { top:61%; height:clamp(85px,16vh,205px); opacity:.54; background:radial-gradient(ellipse at 54% 50%,rgba(192,205,203,.085),transparent 63%),linear-gradient(180deg,transparent 34%,rgba(196,208,204,.035) 49%,transparent 69%); animation:wind-sweep-three 53s ease-in-out infinite alternate; }
        .wind-thread--four { top:82%; height:clamp(65px,12vh,160px); opacity:.48; filter:blur(26px); background:radial-gradient(ellipse at 50% 50%,rgba(177,193,190,.09),transparent 65%); animation:wind-sweep-one 67s ease-in-out infinite alternate-reverse; }
        .wind-grain { position:absolute; inset:-30%; opacity:.1; background:repeating-linear-gradient(168deg,transparent 0 54px,rgba(218,226,219,.12) 55px,transparent 57px,transparent 116px); mask-image:linear-gradient(180deg,transparent,#000 18%,#000 82%,transparent); animation:wind-grain-drift 36s linear infinite; }
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
        .story-image__fog { position:absolute; inset:-20%; opacity:.32; background:radial-gradient(ellipse at 40% 75%,rgba(203,208,198,.28),transparent 32%),linear-gradient(90deg,transparent,rgba(199,205,197,.08),transparent); animation:fog-float 22s ease-in-out infinite alternate; pointer-events:none; }
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
        @keyframes wind-sweep-one { from { transform:translate3d(-7%,2%,0) rotate(-8deg); } to { transform:translate3d(7%,-3%,0) rotate(-5deg); } }
        @keyframes wind-sweep-two { from { transform:translate3d(6%,-3%,0) rotate(-5deg) scaleX(1); } to { transform:translate3d(-8%,2%,0) rotate(-10deg) scaleX(1.08); } }
        @keyframes wind-sweep-three { from { transform:translate3d(-5%,1%,0) rotate(-10deg) scaleX(1.04); } to { transform:translate3d(8%,-2%,0) rotate(-6deg) scaleX(.97); } }
        @keyframes wind-grain-drift { from { transform:translate3d(-2%,1%,0); } to { transform:translate3d(2%,-1%,0); } }
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
          .hero-photo,.hero-fallback__beam,.hero-fog,.hero-beam,.story-image__photo,.story-image__fog,.collection__fog,.reader-ending::before,.wind-thread,.wind-grain { animation:none !important; }
          .wind-overlay { opacity:.22; }
          .progress-fill,.action-link,.cover-stage__frame,.edition-card { transition:none !important; }
          .edition-card:hover,.action-link:hover,.cover-stage__frame:hover { transform:none; }
        }
      `}</style>

      <a className="skip-link" href="#story">Skip to story</a>
      <div className="progress-track" aria-hidden="true"><div className="progress-fill" style={{ width: `${scrollProgress * 100}%` }} /></div>
      <div className="wind-overlay" aria-hidden="true">
        <span className="wind-thread wind-thread--one" />
        <span className="wind-thread wind-thread--two" />
        <span className="wind-thread wind-thread--three" />
        <span className="wind-thread wind-thread--four" />
        <span className="wind-grain" />
      </div>

      <nav className="site-nav" aria-label="Main navigation">
        <div className="nav-inner">
          <a href="#top" className="brand-lockup" aria-label="Soumik Halder, home">
            <span className="brand-name">Soumik Halder</span>
            <span className="brand-subtitle">Fiction &amp; the things we keep</span>
          </a>
          <div className="nav-links">
            <a href="#story">Read the story</a>
            <a href="#book">The collection</a>
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
          <img className="hero-photo" src={VISUALS.hero} alt="" fetchPriority="high" decoding="async" onError={(event) => { event.currentTarget.classList.add('image-failed'); }} />
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
          <img src={VISUALS.hero} alt="" loading="lazy" decoding="async" onError={(event) => { event.currentTarget.classList.add('image-failed'); }} />
        </div>
        <div className="collection__veil" aria-hidden="true" />
        <div className="collection__fog" aria-hidden="true" />
        <div className="collection__inner">
          <div className="collection__hero">
            <div className="cover-stage">
              <div className="cover-stage__halo" aria-hidden="true" />
              <div className="cover-stage__frame">
                <img src="/book-mockup.png" alt="The Things We Keep by Soumik Halder, a collection of dark psychological horror stories" loading="lazy" decoding="async" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
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
              <EditionCard eyebrow="Digital · Kindle" title="eBook" description="Read on a Kindle device or with the free Kindle app." status="Pre-order · October 15, 2026" storeLinks={BOOK_LINKS.kindleMarkets} action="Pre-order on Amazon · US" featured expandMarkets quickMarketCount={4} />
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
