import { Fragment, useEffect, useState } from 'react';

/*
 * THE THINGS WE KEEP — reader-first launch page
 *
 * Before deploying, add your real URLs to BOOK_LINKS below.
 * This app deliberately does not collect payment details or store email addresses.
 * Payments and email subscriptions must use hosted checkout / signup pages.
 */
// Set this to true if the Kindle eBook is enrolled in KDP Select, false if it is not.
// Keep null until you've confirmed the setting; direct digital sale links stay hidden while unknown.
const KDP_SELECT_ENROLLED = null;

const BOOK_LINKS = {
  // Paste the public Kindle pre-order URL from your KDP detail page.
  kindle: '',
  // Add the Amazon paperback product URL when it is publicly available.
  paperback: '',
  // Add the international hardcover product URL.
  hardcover: '',
  // Add the Google Play Books listing after it is published.
  googlePlay: '',

  // Existing forms from the previous version. Keep them only if they still serve
  // the purpose described here. A Google Form is an enquiry/order form, not a payment gateway.
  indiaHardcoverOrderForm: 'https://forms.gle/LPfTPWX8zVFNH5Zj6',
  indiaDigitalOrderForm: 'https://forms.gle/YAsR1xGHD9Ptb7j58',

  // Paste actual hosted checkout links here (for example, your payment provider's payment link).
  // Do not put card/bank details into this React app.
  indiaHardcoverCheckout: '',
  indiaDigitalCheckout: '', // Use only if your distribution terms permit direct digital sales.

  // Paste a hosted email-signup form URL here (Google Forms, Buttondown, MailerLite, etc.).
  // Use a separate form specifically for consent-based story updates.
  newsletterSignup: '',
};

const STORY = [
  'The first thud struck the heavy steel door with the sickening finality of a hammer descending upon a fractured bone.',
  'A second blow followed, sharper and infinitely closer. Its violent tremor reverberated through the salt-stained ironwork, settling deep within the marrow of the lighthouse. By the third resounding strike, Jack was violently awake. His heart hammered against his ribs like a trapped bird, his body jolting against the mildewed mattress as though the storm’s lightning had bypassed the thick stone walls to claw directly through his chest.',
  'His trembling hand swept blindly across the cluttered desk, grazing a forest of empty vodka bottles—glass monuments to his own slow decay—before his fingers closed around the wire frames of his spectacles. The insulated deafness of his drunken slumber shattered under the unrelenting scream of the gale outside. Jagged, purplish veins of lightning slashed the bruised sky, momentarily illuminating the perilous cliffs far below, where the black, churning ocean gnashed at the rocks like an enraged leviathan starved for flesh. His cramped cabin, corroded with rust and perpetually choked by the cloying stench of brine, remained a fragile, blind cocoon suspended precariously within the howling maelstrom.',
  'Jack’s ears had long grown fluent in the unforgiving vocabulary of the tempest. He had forcibly accustomed his mind to the mournful shriek of the wind and the ceaseless, rhythmic pounding of the tide. He yawned, his limbs profoundly heavy, weighed down by a toxic amalgamation of residual spirits and an encroaching, formless despair. Then, another thud echoed. It was louder this time, possessing a rhythmic, almost predatory insistence that demanded absolute acknowledgment.',
  'Scowling into the oppressive gloom, he hooked his round glasses over his ears and struck his heavy brass lighter. A hesitant flame kissed the charred wick of his oil lamp, and the room shivered into a sickly, yellow wakefulness. The glass bottles glinted in the dimness like a congregation of dead, accusatory eyes. The stagnant air reeked of stale tobacco, dried sea salt, and a quiet rot that seemed to emanate from Jack’s very pores. When the thud persisted, violently shaking the rusted iron hinges, whatever meagre patience Jack still possessed completely eroded, replaced by a sudden, irrational flare of anger that masked his underlying terror.',
  'He crossed the uneven floorboards, his bare feet registering the freezing dampness of the wood, unlatched the heavy deadbolt, and hauled the iron door inward. He braced himself, expecting the wind to strike him with a physical barrage of icy rain, yet the narrow, curving landing was utterly desolate. There was only the wrought-iron spiral staircase, coiling upward into the suffocating darkness and downward into the abyss like the fossilized spine of some colossal serpent. He peered up into the shifting shadows and down into the pitch-black well of the tower, finding nothing but the crushing gravitational weight of his own isolation. Frowning, his pulse quickening with a newfound paranoia, he forced the door shut against the howling drafts.',
  'Time began to lose its structure, dripping away like cold, black tar as he sat back upon his cot. Acrid smoke from a half-burnt cigar thickened in the stagnant air, blurring the confines of the room into a suffocating grey haze that mirrored the fog creeping into his own mind. The lightning had become a mundane pulse, the thunder a morbid, deafening lullaby, yet his thoughts writhed with a creeping anxiety—a profound sense of wrongness that gnawed at the edges of his sanity. Before the heavy, merciful veil of sleep could reclaim him, another blow struck the door with deliberate, metallic finality, vibrating right through the floorboards.',
  'Jack jolted upright. He watched the meagre flame of his lamp quiver violently on its dying wick, his breath catching in a paralyzed throat. Snatching the brass handle with white-knuckled desperation, he threw the door open once more to find the same mocking emptiness. A cold, serpentine dread began to coil tightly around his spine, whispering that he was no longer alone, or perhaps, far worse, that he was entirely alone with something born of his own fractured mind.',
  'Driven by an intense, suffocating need to anchor himself to reality, he descended the spiralling iron steps toward the lower quarters. His hand trailed against the freezing, condensation-slicked wall until he came to a halt before his older coworker’s cabin. He pounded his fist frantically against Mr. Crawley’s door, desperate for the comforting mundane reality of another human voice.',
  '"Crawley! Open the door, damn it!" Jack shouted into the suffocating belly of the storm.',
  'The only reply was the hollow, mocking echo of his own voice spiralling down into the darkness. A profound, dizzying confusion rooted him to the spot. They had shared a meagre supper of salted beef and stale bread at the galley table scarcely an hour ago. He distinctly remembered the scrape of Crawley\'s fork, the older man’s unnerving, prolonged silence, and the hollow, vacant stare he had fixed upon the churning sea. Yet, the silence emanating from the room now felt ancient, undisturbed, as if the space had been sealed and lifeless for centuries.',
  'Trembling, gripped by a sudden revulsion he could not entirely name, Jack climbed back to his own quarters. He bolted the heavy door with frantic haste and tended to the suffocating lamp, feeding it fresh kerosene until the flame hissed and flared with a desperate, blinding vigour. He sat rigidly on the edge of his cot, exhaling thick, nervous plumes of smoke until the room itself seemed to breathe in tandem with him—slow, restless, and unspeakably heavy.',
  'Then, the phantom assault returned. It was so violent, so fiercely deliberate, it threatened to tear the heavy iron door entirely from its masonry frame. Jack froze, his blood turning to ice as the forgotten cigar slipped from his numb fingers to smoulder harmlessly on the damp floorboards. His heartbeat roared in his ears, deafening him to the thunder outside, and every step he took toward the threshold felt meticulously measured, an agonizing countdown to some unseen damnation waiting just beyond the wood.',
  'He flung the door wide to the empty stairwell, ready to scream. But this time, cutting sharply through the chaotic, bass-heavy roar of the tempest, he heard them: faint, sodden footsteps climbing the iron grating above. They were not frantic, nor were they lost. Their rhythm was terrifyingly deliberate, unhurried, and deeply ritualistic—the sound of an executioner ascending the scaffold.',
  'Seizing his flickering lamp, Jack pursued the phantom tread, his own breathing ragged and loud in the enclosed space. The heavy grilled hatch above stood ajar, swinging slightly on its hinges, leading out onto the fully exposed, circular gallery of the main light chamber. Outside, the storm reigned in its full, primordial fury, a monstrous, formless entity of wind and freezing water violently battering the steel parapets. His lamp died the instant he crossed the threshold, suffocated by the driving rain, leaving him blind in the howling void.',
  'In one brilliant, skeletal flash of lightning that tore the sky asunder, he saw him. A solitary, drenched figure stood precariously at the very edge of the precipice, arms raised in silent, triumphant communion with the maelstrom, as if conducting the apocalyptic wrath of the heavens.',
  'Jack took a tentative, trembling step across the slick metal grating, his mind desperately grasping for rational explanations that were rapidly disintegrating. Just as another flash illuminated the chaotic world, rapid, desperate footsteps slapped violently against the iron grating behind him. He whirled around to see Mr. Crawley bursting onto the gallery, sprinting toward the solitary, worshiping figure with a frantic urgency. The older man was as silent as carved stone, but his eyes were wide with a stark, bulging terror that bordered on absolute madness.',
  '"Hey, Crawley! I’ve been pounding at your door!" Jack roared over the deafening shriek of the tempest, reaching out to grab the older man’s slick coat.',
  'The old keeper did not flinch, nor did he acknowledge Jack’s presence by even a fraction of an inch. He collided squarely with Jack’s chest and passed seamlessly through his torso like a rush of cold, damp smoke. It left behind a sickening sensation of absolute nothingness, a chilling void where physical impact should have been.',
  'Jack stumbled backward, gasping, looking down at his own trembling hands as Crawley rushed straight toward the man by the rail. Slowly, agonizingly, the conjuring figure lowered his arms and turned his head back to face the gallery, looking past the weeping, spectral form of Crawley directly at Jack.',
  'Another jagged stroke of lightning etched the man’s face in stark, merciless, brilliant white. Jack’s breath caught in a paralyzed throat, his heart stopping altogether as he stared into a perfect, flawless mirror. It was his own exhausted, bloodshot eyes, his own hollow cheeks, and his own mouth twisted into a grotesque, knowing smirk—a malevolent doppelgänger reveling in the doom he had brought upon them. Before Jack’s shattered mind could process the impossibility, the smirking figure cast himself backward with a theatrical grace, plummeting into the churning, black abyss of the sea below.',
  'Instantly, the ocean responded to the sacrifice. A monstrous, impossibly high wall of black water rose from the chaotic depths, a leviathan of crushing pressure and freezing sea-foam that struck the upper gallery with the force of an exploding mountain. It devoured the screaming, tragic spectre of Crawley in a singular, violent instant, wiping him from the walkway.',
  'Jack stood rooted to the vibrating iron, bracing for the bone-crushing impact, watching the catastrophic spray and the deafening, watery chaos engulf the world around him. Yet, as the wave crashed through the gallery, tearing away the railings and shattering the great glass lenses behind him, Jack remained entirely, horrifyingly untouched. Not a single drop of rain clung to his face. The furious, hurricane-force winds completely failed to stir the fabric of his clothes.',
  'The catastrophic, world-ending deluge had passed directly through his body, washing away the last fragile tether of his denial. It cemented the inescapable truth that he was no longer a living, breathing inhabitant of the waking world, but a fractured echo trapped in a purgatory of his own design.',
  'Slowly, mechanically, completely devoid of hope or fear, he climbed back down the spiralling iron steps. That same grotesque, knowing smirk was now etched permanently, agonizingly across his own pale face, while the tempest hammered the lighthouse walls like skeletal fists demanding entry. He walked into his room, locked his heavy door against a threat that did not exist, poured a measure of bitter tonic with steady, perfectly translucent hands, and sank into his cot as the storm outside faded into a heavy, suffocating, eternal silence.',
  'An hour later, the first thud struck his steel door with the sickening finality of a hammer descending upon a fractured bone.',
];

const isConfiguredUrl = (url) => typeof url === 'string' && /^https?:\/\//i.test(url.trim());

const VISUALS = {
  hero: 'https://images.unsplash.com/photo-1570187671278-2370524a1197?auto=format&fit=crop&w=2400&q=88',
  door: 'https://images.unsplash.com/photo-1770361016654-4e6f0f915d85?auto=format&fit=crop&w=1800&q=86',
  stairs: 'https://images.unsplash.com/photo-1544194410-50e68f7c32b9?auto=format&fit=crop&w=1800&q=86',
  storm: 'https://images.unsplash.com/photo-1758301064875-b46ec97564dd?auto=format&fit=crop&w=2000&q=86',
};

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

function EditionCard({ eyebrow, title, description, status, href, action, featured = false }) {
  return (
    <article className={`edition-card ${featured ? 'edition-card--featured' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h3>{title}</h3>
      <p className="edition-description">{description}</p>
      <p className="edition-status">{status}</p>
      {isConfiguredUrl(href) && action ? <ActionLink href={href} variant={featured ? 'light' : 'outline'} className="edition-action">{action}</ActionLink> : (
        <p className="edition-note">Purchase link will appear here when the listing is available.</p>
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

  const storyVisuals = {
    5: (
      <StoryImage
        src={VISUALS.door}
        type="door"
        number="I"
        kicker="The first silence"
        caption="The door opened. Nothing waited on the other side."
        creditUrl="https://unsplash.com/photos/grungy-industrial-hallway-with-a-closed-metal-door-1BlWCk0on4U"
      />
    ),
    13: (
      <StoryImage
        src={VISUALS.stairs}
        type="stairs"
        number="II"
        kicker="Above him"
        caption="Then came the sound of footsteps on the iron grating."
        creditUrl="https://unsplash.com/photos/black-spiral-staircase-inside-house-gg1VLHHgxug"
      />
    ),
    15: (
      <StoryImage
        src={VISUALS.storm}
        type="storm"
        number="III"
        kicker="The light chamber"
        caption="At the edge of the world, a figure waited in the storm."
        creditUrl="https://unsplash.com/photos/lighthouse-standing-on-rocks-in-dark-stormy-sea-jDlBVKsgfVA"
      />
    ),
    21: (
      <StoryImage
        src={VISUALS.hero}
        type="wave"
        number="IV"
        kicker="The sea answered"
        caption="The wave came. Jack remained untouched."
        creditUrl="https://unsplash.com/photos/a-lighthouse-surrounded-by-a-huge-wave-in-the-ocean-NcociWzk23A"
      />
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
        .skip-link { position:absolute; z-index:200; top:-100px; left:20px; padding:12px 16px; color:#080a0b; background:#f1eee6; text-decoration:none; font:600 10px/1.4 Inter,sans-serif; text-transform:uppercase; letter-spacing:.14em; }
        .skip-link:focus { top:16px; }
        .site-shell * { box-sizing: border-box; }
        .progress-track { position: fixed; z-index: 100; top: 0; left: 0; width: 100%; height: 2px; pointer-events: none; background: transparent; }
        .progress-fill { height: 100%; background: #d7cfba; box-shadow: 0 0 14px rgba(219,210,186,.4); transition: width .08s linear; }
        .site-nav { position: absolute; z-index: 20; top: 0; left: 0; width: 100%; border-bottom: 1px solid rgba(255,255,255,.1); background: linear-gradient(180deg,rgba(4,6,7,.76),rgba(4,6,7,.16)); }
        .nav-inner { max-width: 1440px; margin: 0 auto; padding: 24px clamp(20px,5vw,74px); display:flex; align-items:center; justify-content:space-between; gap:20px; }
        .brand-lockup { display:flex; flex-direction:column; gap:5px; text-decoration:none; }
        .brand-name { font: 600 10px/1.2 Inter, sans-serif; letter-spacing:.25em; text-transform:uppercase; color:#f1eee6; }
        .brand-subtitle { font: italic 15px/1.1 'Crimson Pro', serif; color:#bbb7ad; }
        .nav-links { display:flex; align-items:center; gap:clamp(16px,3vw,38px); }
        .nav-links a { color:#ddd9ce; text-decoration:none; font:500 9px/1.3 Inter,sans-serif; letter-spacing:.19em; text-transform:uppercase; transition:color .2s; }
        .nav-links a:hover { color:white; }
        .hero { position:relative; isolation:isolate; min-height:min(880px,100svh); min-height: min(880px, 100vh); display:flex; align-items:flex-end; background:#101517; overflow:hidden; }
        .hero-media { position:absolute; z-index:0; inset:0; overflow:hidden; }
        .hero-fallback { position:absolute; z-index:0; inset:0; overflow:hidden; background:radial-gradient(ellipse at 75% 28%,rgba(151,164,165,.24),transparent 34%),linear-gradient(180deg,#172125 0%,#080c0e 75%); }
        .hero-photo { position:absolute; inset:0; width:100%; height:100%; display:block; object-fit:cover; object-position:center 46%; opacity:.88; animation: slow-zoom 34s ease-in-out infinite alternate; }
        .hero-photo.image-failed { display:none; }
        .hero-fallback__tower { position:absolute; bottom:-5%; right:17%; width:clamp(75px,11vw,150px); height:57%; background:linear-gradient(90deg,#0a0e10,#262d30 48%,#080c0e); clip-path:polygon(24% 0,76% 0,100% 100%,0 100%); opacity:.8; filter:drop-shadow(0 0 24px rgba(0,0,0,.8)); }
        .hero-fallback__lantern { position:absolute; top:34%; right:16.8%; width:clamp(80px,12vw,165px); height:clamp(30px,4vw,54px); border:1px solid rgba(219,214,190,.45); background:linear-gradient(180deg,#363d3a,#111718); box-shadow:0 0 44px rgba(222,214,184,.2); }
        .hero-fallback__beam { position:absolute; top:34%; right:23%; width:65%; height:31%; clip-path:polygon(0 0,100% 40%,100% 62%,0 100%); transform-origin:right center; background:linear-gradient(90deg,rgba(226,218,188,.1),transparent); animation: beam-breathe 12s ease-in-out infinite alternate; }
        .hero-veil { position:absolute; inset:0; background:linear-gradient(90deg,rgba(5,7,8,.94) 0%,rgba(5,7,8,.78) 31%,rgba(5,7,8,.32) 65%,rgba(5,7,8,.1) 100%),linear-gradient(0deg,#080a0b 0%,rgba(8,10,11,.08) 38%,rgba(4,6,7,.25) 100%); }
        .hero-fog { position:absolute; inset:-12%; pointer-events:none; opacity:.38; background:radial-gradient(ellipse at 62% 67%,rgba(200,205,199,.2),transparent 30%),radial-gradient(ellipse at 85% 55%,rgba(181,191,188,.12),transparent 24%); mix-blend-mode:screen; animation:fog-float 26s ease-in-out infinite alternate; }
        .hero-beam { position:absolute; top:22%; right:6%; width:70%; height:30%; pointer-events:none; opacity:.22; clip-path:polygon(100% 0,100% 78%,0 100%,0 72%); transform-origin:100% 0; background:linear-gradient(180deg,rgba(225,220,199,.42),rgba(225,220,199,0)); animation: beam-breathe 19s ease-in-out infinite alternate; }
        .hero-layout { position:relative; z-index:2; width:100%; max-width:1440px; margin:0 auto; padding:clamp(170px,23vh,240px) clamp(20px,8vw,118px) clamp(100px,13vh,150px); }
        .hero-copy { max-width:750px; }
        .hero-eyebrow { display:flex; align-items:center; gap:12px; color:#c1bba9; font:500 9px/1.4 Inter,sans-serif; letter-spacing:.26em; text-transform:uppercase; }
        .hero-eyebrow::before { content:''; display:block; width:38px; height:1px; background:#c1bba9; opacity:.65; }
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
        .hero-bottomline { position:absolute; z-index:4; bottom:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(225,220,200,.35),transparent); }
        .section-heading { display:flex; align-items:center; gap:14px; color:#9d9a90; font:500 9px/1.5 Inter,sans-serif; text-transform:uppercase; letter-spacing:.24em; }
        .section-heading::before { content:''; width:30px; height:1px; background:#858174; }
        .story-intro { background:linear-gradient(180deg,#080a0b,#0b0e0f); border-bottom:1px solid rgba(255,255,255,.07); }
        .story-intro__inner { max-width:1060px; margin:auto; padding:76px 24px 50px; text-align:center; }
        .story-intro h2 { max-width:700px; margin:19px auto 0; color:#e9e5dc; font:400 clamp(28px,3.7vw,45px)/1.1 'Crimson Pro',Georgia,serif; letter-spacing:-.02em; }
        .story-intro p { max-width:580px; margin:17px auto 0; color:#85857f; font:400 13px/1.8 Inter,sans-serif; }
        .story-article { max-width:1240px; margin:0 auto; padding:0 clamp(18px,3.5vw,44px); }
        .reading-topline { display:flex; justify-content:space-between; align-items:center; gap:16px; max-width:68ch; margin:0 auto; padding:26px 0; color:#666b68; border-bottom:1px solid rgba(255,255,255,.07); font:500 8px/1.5 Inter,sans-serif; letter-spacing:.22em; text-transform:uppercase; }
        .reading-topline span:last-child { text-align:right; }
        .story-copy { position:relative; padding-top:40px; }
        .story-paragraph { max-width:68ch; margin:0 auto; color:#d0cec7; font:400 19px/1.9 'Crimson Pro',Georgia,serif; letter-spacing:.003em; text-indent:1.45em; }
        .story-paragraph + .story-paragraph { margin-top:1.25em; }
        .story-paragraph:first-child { text-indent:0; }
        .story-paragraph:first-child::first-letter { float:left; font:500 5.2rem/.78 'Crimson Pro',Georgia,serif; margin:.12em .12em 0 0; color:#e9e3d4; }
        .story-image { width:100%; max-width:1100px; margin:clamp(62px,8vw,108px) auto; }
        .story-image__frame { position:relative; isolation:isolate; min-height:260px; height:clamp(280px,39vw,495px); overflow:hidden; background:#121718; border:1px solid rgba(218,212,196,.13); }
        .story-image__fallback { position:absolute; inset:0; background:radial-gradient(ellipse at 75% 25%,rgba(162,174,169,.2),transparent 28%),linear-gradient(135deg,#222b2c,#080b0c 70%); }
        .story-image__photo { position:absolute; inset:0; display:block; width:100%; height:100%; object-fit:cover; opacity:.86; filter:saturate(.58) contrast(1.08) brightness(.7); transform:scale(1.04); animation:slow-zoom 32s ease-in-out infinite alternate; }
        .story-image__photo.image-failed { display:none; }
        .story-image--door .story-image__photo { object-position:center 58%; }
        .story-image--stairs .story-image__photo { object-position:center 50%; }
        .story-image--storm .story-image__photo { object-position:center 56%; }
        .story-image--wave .story-image__photo { object-position:center 52%; }
        .story-image__shade { position:absolute; inset:0; background:linear-gradient(90deg,rgba(4,7,8,.81),rgba(4,7,8,.08) 82%),linear-gradient(0deg,rgba(3,5,6,.8),transparent 58%); }
        .story-image__fog { position:absolute; inset:-20%; opacity:.32; background:radial-gradient(ellipse at 40% 75%,rgba(203,208,198,.28),transparent 32%),linear-gradient(90deg,transparent,rgba(199,205,197,.08),transparent); animation:fog-float 22s ease-in-out infinite alternate; pointer-events:none; }
        .story-image__copy { position:absolute; left:clamp(22px,5vw,56px); bottom:clamp(23px,4vw,46px); max-width:620px; z-index:2; }
        .story-image__number { display:inline-flex; align-items:center; justify-content:center; width:29px; height:29px; border:1px solid rgba(223,218,201,.52); border-radius:50%; color:#e8e1d1; font:italic 14px/1 'Crimson Pro',serif; }
        .story-image__kicker { display:block; margin-top:17px; color:#c6beaa; font:500 9px/1.4 Inter,sans-serif; letter-spacing:.24em; text-transform:uppercase; }
        .story-image__copy p { margin:9px 0 0; max-width:540px; color:#f0ece3; font:italic 400 clamp(25px,3.7vw,43px)/1.05 'Crimson Pro',Georgia,serif; letter-spacing:-.015em; text-wrap:balance; }
        .story-image__credit { display:flex; justify-content:flex-end; padding-top:9px; }
        .story-image__credit a { color:#515753; text-decoration:none; font:500 8px/1.5 Inter,sans-serif; letter-spacing:.08em; }
        .story-image__credit a:hover { color:#a3a59d; }
        .story-image__photo + .story-image__shade { pointer-events:none; }
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
        .edition-card { display:flex; min-height:255px; flex-direction:column; padding:22px; border:1px solid rgba(221,216,201,.12); background:linear-gradient(145deg,rgba(28,32,32,.62),rgba(5,7,8,.65)); transition:transform .24s ease,border-color .24s ease,background .24s ease; }
        .edition-card:hover { transform:translateY(-4px); border-color:rgba(220,215,198,.37); background:linear-gradient(145deg,rgba(39,43,42,.72),rgba(5,7,8,.78)); }
        .edition-card--featured { border-color:rgba(216,207,183,.43); background:linear-gradient(145deg,rgba(55,56,49,.58),rgba(5,7,8,.74)); }
        .eyebrow { margin:0; color:#a29d90; font:500 8px/1.5 Inter,sans-serif; letter-spacing:.2em; text-transform:uppercase; }
        .edition-card h3 { margin:16px 0 0; color:#e9e5dc; font:400 28px/1.05 'Crimson Pro',Georgia,serif; }
        .edition-description { flex:1; margin:11px 0 0; color:#999b94; font:400 11px/1.8 Inter,sans-serif; }
        .edition-status { margin:20px 0 0; padding-top:13px; color:#c2bcad; border-top:1px solid rgba(255,255,255,.09); font:500 8px/1.7 Inter,sans-serif; letter-spacing:.1em; text-transform:uppercase; }
        .edition-action { margin-top:15px; width:100%; min-height:43px; padding:12px 9px; font-size:8px; letter-spacing:.13em; }
        .edition-note { margin:13px 0 0; color:#656b66; font:400 9px/1.6 Inter,sans-serif; }
        .direct-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:24px; }
        .direct-row:not(.direct-row--with-newsletter) .direct-panel { grid-column:1 / -1; }
        .direct-panel { padding:clamp(22px,3vw,32px); border:1px solid rgba(221,216,201,.13); background:rgba(4,6,7,.45); }
        .direct-panel h3 { margin:13px 0 0; color:#e9e5dc; font:400 30px/1.1 'Crimson Pro',Georgia,serif; }
        .direct-panel > p:not(.eyebrow) { max-width:500px; margin:12px 0 0; color:#959790; font:400 12px/1.8 Inter,sans-serif; }
        .direct-panel__actions { display:flex; flex-wrap:wrap; gap:10px; margin-top:20px; }
        .author-footer { margin-top:clamp(68px,8vw,105px); padding-top:25px; border-top:1px solid rgba(255,255,255,.1); text-align:center; }
        .author-footer__name { color:#d8d4c8; font:500 9px/1.4 Inter,sans-serif; letter-spacing:.26em; text-transform:uppercase; }
        .author-footer__title { margin-top:8px; color:#777a73; font:italic 16px/1.4 'Crimson Pro',Georgia,serif; }
        .author-footer__about { display:inline-block; margin-top:14px; color:#888b83; font:500 8px/1.5 Inter,sans-serif; letter-spacing:.18em; text-decoration:none; text-transform:uppercase; }
        .image-credits { margin-top:22px; color:#555b56; font:400 8px/1.8 Inter,sans-serif; }
        .image-credits a { color:#777d76; text-decoration:none; }
        .image-credits a:hover { color:#d6d0c0; }
        @keyframes slow-zoom { from { transform:scale(1.03); } to { transform:scale(1.1); } }
        @keyframes fog-float { from { transform:translate3d(-2%,1%,0); opacity:.18; } to { transform:translate3d(2%,-1%,0); opacity:.42; } }
        @keyframes beam-breathe { from { opacity:.12; transform:rotate(-1deg); } to { opacity:.33; transform:rotate(1.3deg); } }
        @keyframes slow-glint { 0%,70% { transform:translateX(-75%); opacity:0; } 80% { opacity:.4; } 100% { transform:translateX(75%); opacity:0; } }
        @supports (height: 100svh) { .hero { min-height:min(880px,100svh); } }
        @media (max-width: 900px) {
          .collection__hero { grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr); gap:35px; }
          .edition-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .edition-card { min-height:230px; }
          .hero-title { font-size:clamp(4.2rem,12vw,7rem); }
        }
        @media (max-width: 640px) {
          .nav-inner { padding:17px 18px; }
          .brand-subtitle { font-size:13px; }
          .nav-links { gap:14px; }
          .nav-links a { font-size:8px; letter-spacing:.13em; }
          .hero { min-height:790px; min-height:90svh; align-items:flex-end; }
          .hero-photo { object-position:62% center; opacity:.72; }
          .hero-veil { background:linear-gradient(90deg,rgba(5,7,8,.78),rgba(5,7,8,.28)),linear-gradient(0deg,#080a0b 0%,rgba(8,10,11,.17) 62%,rgba(4,6,7,.25)); }
          .hero-layout { padding:180px 23px 96px; }
          .hero-title { margin-top:25px; font-size:clamp(4.25rem,18vw,6.2rem); }
          .hero-deck { margin-top:24px; max-width:340px; font-size:21px; }
          .hero-note { display:none; }
          .hero-actions { gap:9px; }
          .hero-actions .action-link { min-height:46px; padding:13px 14px; font-size:8px; }
          .story-intro__inner { padding:58px 23px 38px; }
          .reading-topline { font-size:7px; letter-spacing:.16em; }
          .story-copy { padding-top:30px; }
          .story-paragraph { font-size:18px; line-height:1.82; text-indent:1.05em; }
          .story-paragraph:first-child::first-letter { font-size:4.6rem; }
          .story-image { margin:58px auto; }
          .story-image__frame { height:clamp(310px,93vw,420px); }
          .story-image__photo { object-position:center; }
          .story-image__copy { left:20px; right:20px; bottom:22px; }
          .story-image__copy p { font-size:31px; }
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
          .edition-card { min-height:0; }
          .edition-description { min-height:0; }
          .direct-row { grid-template-columns:1fr; }
          .author-footer { margin-top:68px; }
        }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior:auto; }
          .hero-photo,.hero-fallback__beam,.hero-fog,.hero-beam,.story-image__photo,.story-image__fog,.collection__fog,.reader-ending::before { animation:none !important; }
          .progress-fill,.action-link,.cover-stage__frame,.edition-card { transition:none !important; }
          .edition-card:hover,.action-link:hover,.cover-stage__frame:hover { transform:none; }
        }
      `}</style>

      <a className="skip-link" href="#story">Skip to story</a>
      <div className="progress-track" aria-hidden="true"><div className="progress-fill" style={{ width: `${scrollProgress * 100}%` }} /></div>

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
          {STORY.map((paragraph, index) => (
            <Fragment key={index}>
              <p className="story-paragraph">{paragraph}</p>
              {storyVisuals[index] || null}
            </Fragment>
          ))}
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
          <img src={VISUALS.storm} alt="" loading="lazy" decoding="async" onError={(event) => { event.currentTarget.classList.add('image-failed'); }} />
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
              <p> A collection of aftermaths </p>
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
              <EditionCard eyebrow="Digital · Kindle" title="eBook" description="Read on a Kindle device or with the free Kindle app." status="Pre-order · October 15, 2026" href={BOOK_LINKS.kindle} action="Pre-order on Amazon" featured />
              <EditionCard eyebrow="Print · Paperback" title="Paperback" description="The collection in a traditional printed edition." status="Release · October 18, 2026" href={BOOK_LINKS.paperback} action="Find on Amazon" />
              <EditionCard eyebrow="Print · Hardcover" title="Hardcover" description="A durable edition for your shelf or collection." status="Available internationally" href={BOOK_LINKS.hardcover} action="Buy hardcover" />
              <EditionCard eyebrow="Digital · Google Play" title="Google Play Books" description="Read in Google Play Books on supported devices." status={isConfiguredUrl(BOOK_LINKS.googlePlay) ? 'Available on Google Play' : 'Coming soon'} href={BOOK_LINKS.googlePlay} action="Read on Google Play" />
            </div>
          </section>

          <div className={`direct-row ${hasNewsletter ? 'direct-row--with-newsletter' : ''}`}>
            <section className="direct-panel" aria-labelledby="india-orders-title">
              <p className="eyebrow">For readers in India</p>
              <h3 id="india-orders-title">A signed copy, from the author.</h3>
              <p>Interested in a locally printed hardcover? Send an enquiry for current availability, pricing, and shipping before placing your order.</p>
              <div className="direct-panel__actions">
                <ActionLink href={BOOK_LINKS.indiaHardcoverOrderForm} variant="outline">Hardcover enquiry</ActionLink>
                {hasIndiaHardcoverCheckout && <ActionLink href={BOOK_LINKS.indiaHardcoverCheckout}>Order hardcover</ActionLink>}
                {KDP_SELECT_ENROLLED === false && hasIndiaDigitalCheckout && <ActionLink href={BOOK_LINKS.indiaDigitalCheckout} variant="outline">Buy eBook direct</ActionLink>}
                {KDP_SELECT_ENROLLED === false && !hasIndiaDigitalCheckout && isConfiguredUrl(BOOK_LINKS.indiaDigitalOrderForm) && <ActionLink href={BOOK_LINKS.indiaDigitalOrderForm} variant="outline">eBook enquiry</ActionLink>}
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
            <p className="image-credits">Atmospheric photographs via Unsplash: <a href="https://unsplash.com/photos/a-lighthouse-surrounded-by-a-huge-wave-in-the-ocean-NcociWzk23A" target="_blank" rel="noreferrer noopener">Marcus Woodbridge</a>, <a href="https://unsplash.com/photos/grungy-industrial-hallway-with-a-closed-metal-door-1BlWCk0on4U" target="_blank" rel="noreferrer noopener">Turquo Cabbit</a>, <a href="https://unsplash.com/photos/black-spiral-staircase-inside-house-gg1VLHHgxug" target="_blank" rel="noreferrer noopener">Sung Jin Cho</a>, and <a href="https://unsplash.com/photos/lighthouse-standing-on-rocks-in-dark-stormy-sea-jDlBVKsgfVA" target="_blank" rel="noreferrer noopener">Thanh Nguyen</a>.</p>
            <p className="image-credits">© 2026 Soumik Halder · All rights reserved</p>
          </footer>
        </div>
      </section>
    </main>
  );
}

export default App;
