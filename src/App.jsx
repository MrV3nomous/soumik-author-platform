import { useEffect, useState } from 'react';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (windowHeight <= 0) return;
      
      const scroll = Math.min(1, Math.max(0, totalScroll / windowHeight));
      setScrollProgress(scroll);
    };
    
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-gray-700 selection:text-white pb-24">
      
      <div 
        className="fixed top-0 left-0 h-[2px] bg-gray-500 z-50 motion-reduce:hidden"
        style={{ width: `${scrollProgress * 100}%` }}
        aria-hidden="true"
      />

      <nav className="w-full py-8 px-6 sm:px-12 flex justify-between items-center bg-[#0a0a0a]">
        <span className="font-sans font-medium tracking-[0.2em] text-[10px] sm:text-xs text-gray-400 uppercase">
          Soumik Halder
        </span>
        <div className="flex gap-8 items-center">
          <a href="#book" className="font-sans font-medium tracking-[0.2em] text-[10px] sm:text-xs text-gray-400 hover:text-gray-200 transition-colors uppercase">
            The Book
          </a>
        </div>
      </nav>

      <article>
        <header className="max-w-[65ch] mx-auto px-6 pt-16 pb-20 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl text-gray-200 font-semibold mb-6 tracking-wide">
            The Lighthouse
          </h1>
          <p className="font-sans text-gray-500 text-xs sm:text-sm tracking-[0.2em] uppercase">
            A Short Story from The Things We Keep
          </p>
        </header>

        <div className="story-prose max-w-[65ch] mx-auto px-6 text-[19px] sm:text-[21px] leading-[1.75] text-gray-300 pb-20">
          
          <p>
            The first thud struck the heavy steel door with the sickening finality of a hammer descending upon a fractured bone.
          </p>
          <p>
            A second blow followed, sharper and infinitely closer. Its violent tremor reverberated through the salt-stained ironwork, settling deep within the marrow of the lighthouse. By the third resounding strike, Jack was violently awake. His heart hammered against his ribs like a trapped bird, his body jolting against the mildewed mattress as though the storm’s lightning had bypassed the thick stone walls to claw directly through his chest.
          </p>
          <p>
            His trembling hand swept blindly across the cluttered desk, grazing a forest of empty vodka bottles—glass monuments to his own slow decay—before his fingers closed around the wire frames of his spectacles. The insulated deafness of his drunken slumber shattered under the unrelenting scream of the gale outside. Jagged, purplish veins of lightning slashed the bruised sky, momentarily illuminating the perilous cliffs far below, where the black, churning ocean gnashed at the rocks like an enraged leviathan starved for flesh. His cramped cabin, corroded with rust and perpetually choked by the cloying stench of brine, remained a fragile, blind cocoon suspended precariously within the howling maelstrom.
          </p>
          <p>
            Jack’s ears had long grown fluent in the unforgiving vocabulary of the tempest. He had forcibly accustomed his mind to the mournful shriek of the wind and the ceaseless, rhythmic pounding of the tide. He yawned, his limbs profoundly heavy, weighed down by a toxic amalgamation of residual spirits and an encroaching, formless despair. Then, another thud echoed. It was louder this time, possessing a rhythmic, almost predatory insistence that demanded absolute acknowledgment.
          </p>
          <p>
            Scowling into the oppressive gloom, he hooked his round glasses over his ears and struck his heavy brass lighter. A hesitant flame kissed the charred wick of his oil lamp, and the room shivered into a sickly, yellow wakefulness. The glass bottles glinted in the dimness like a congregation of dead, accusatory eyes. The stagnant air reeked of stale tobacco, dried sea salt, and a quiet rot that seemed to emanate from Jack’s very pores. When the thud persisted, violently shaking the rusted iron hinges, whatever meagre patience Jack still possessed completely eroded, replaced by a sudden, irrational flare of anger that masked his underlying terror.
          </p>
          <p>
            He crossed the uneven floorboards, his bare feet registering the freezing dampness of the wood, unlatched the heavy deadbolt, and hauled the iron door inward. He braced himself, expecting the wind to strike him with a physical barrage of icy rain, yet the narrow, curving landing was utterly desolate. There was only the wrought-iron spiral staircase, coiling upward into the suffocating darkness and downward into the abyss like the fossilized spine of some colossal serpent. He peered up into the shifting shadows and down into the pitch-black well of the tower, finding nothing but the crushing gravitational weight of his own isolation. Frowning, his pulse quickening with a newfound paranoia, he forced the door shut against the howling drafts.
          </p>
          <p>
            Time began to lose its structure, dripping away like cold, black tar as he sat back upon his cot. Acrid smoke from a half-burnt cigar thickened in the stagnant air, blurring the confines of the room into a suffocating grey haze that mirrored the fog creeping into his own mind. The lightning had become a mundane pulse, the thunder a morbid, deafening lullaby, yet his thoughts writhed with a creeping anxiety—a profound sense of wrongness that gnawed at the edges of his sanity. Before the heavy, merciful veil of sleep could reclaim him, another blow struck the door with deliberate, metallic finality, vibrating right through the floorboards.
          </p>
          <p>
            Jack jolted upright. He watched the meagre flame of his lamp quiver violently on its dying wick, his breath catching in a paralyzed throat. Snatching the brass handle with white-knuckled desperation, he threw the door open once more to find the same mocking emptiness. A cold, serpentine dread began to coil tightly around his spine, whispering that he was no longer alone, or perhaps, far worse, that he was entirely alone with something born of his own fractured mind.
          </p>
          <p>
            Driven by an intense, suffocating need to anchor himself to reality, he descended the spiralling iron steps toward the lower quarters. His hand trailed against the freezing, condensation-slicked wall until he came to a halt before his older coworker’s cabin. He pounded his fist frantically against Mr. Crawley’s door, desperate for the comforting mundane reality of another human voice.
          </p>
          <p>
            "Crawley! Open the door, damn it!" Jack shouted into the suffocating belly of the storm.
          </p>
          <p>
            The only reply was the hollow, mocking echo of his own voice spiralling down into the darkness. A profound, dizzying confusion rooted him to the spot. They had shared a meagre supper of salted beef and stale bread at the galley table scarcely an hour ago. He distinctly remembered the scrape of Crawley's fork, the older man's unnerving, prolonged silence, and the hollow, vacant stare he had fixed upon the churning sea. Yet, the silence emanating from the room now felt ancient, undisturbed, as if the space had been sealed and lifeless for centuries.
          </p>
          <p>
            Trembling, gripped by a sudden revulsion he could not entirely name, Jack climbed back to his own quarters. He bolted the heavy door with frantic haste and tended to the suffocating lamp, feeding it fresh kerosene until the flame hissed and flared with a desperate, blinding vigour. He sat rigidly on the edge of his cot, exhaling thick, nervous plumes of smoke until the room itself seemed to breathe in tandem with him—slow, restless, and unspeakably heavy.
          </p>
          <p>
            Then, the phantom assault returned. It was so violent, so fiercely deliberate, it threatened to tear the heavy iron door entirely from its masonry frame. Jack froze, his blood turning to ice as the forgotten cigar slipped from his numb fingers to smoulder harmlessly on the damp floorboards. His heartbeat roared in his ears, deafening him to the thunder outside, and every step he took toward the threshold felt meticulously measured, an agonizing countdown to some unseen damnation waiting just beyond the wood.
          </p>
          <p>
            He flung the door wide to the empty stairwell, ready to scream. But this time, cutting sharply through the chaotic, bass-heavy roar of the tempest, he heard them: faint, sodden footsteps climbing the iron grating above. They were not frantic, nor were they lost. Their rhythm was terrifyingly deliberate, unhurried, and deeply ritualistic—the sound of an executioner ascending the scaffold.
          </p>
          <p>
            Seizing his flickering lamp, Jack pursued the phantom tread, his own breathing ragged and loud in the enclosed space. The heavy grilled hatch above stood ajar, swinging slightly on its hinges, leading out onto the fully exposed, circular gallery of the main light chamber. Outside, the storm reigned in its full, primordial fury, a monstrous, formless entity of wind and freezing water violently battering the steel parapets. His lamp died the instant he crossed the threshold, suffocated by the driving rain, leaving him blind in the howling void.
          </p>
          <p>
            In one brilliant, skeletal flash of lightning that tore the sky asunder, he saw him. A solitary, drenched figure stood precariously at the very edge of the precipice, arms raised in silent, triumphant communion with the maelstrom, as if conducting the apocalyptic wrath of the heavens.
          </p>
          <p>
            Jack took a tentative, trembling step across the slick metal grating, his mind desperately grasping for rational explanations that were rapidly disintegrating. Just as another flash illuminated the chaotic world, rapid, desperate footsteps slapped violently against the iron grating behind him. He whirled around to see Mr. Crawley bursting onto the gallery, sprinting toward the solitary, worshiping figure with a frantic urgency. The older man was as silent as carved stone, but his eyes were wide with a stark, bulging terror that bordered on absolute madness.
          </p>
          <p>
            "Hey, Crawley! I’ve been pounding at your door!" Jack roared over the deafening shriek of the tempest, reaching out to grab the older man’s slick coat.
          </p>
          <p>
            The old keeper did not flinch, nor did he acknowledge Jack’s presence by even a fraction of an inch. He collided squarely with Jack’s chest and passed seamlessly through his torso like a rush of cold, damp smoke. It left behind a sickening sensation of absolute nothingness, a chilling void where physical impact should have been.
          </p>
          <p>
            Jack stumbled backward, gasping, looking down at his own trembling hands as Crawley rushed straight toward the man by the rail. Slowly, agonizingly, the conjuring figure lowered his arms and turned his head back to face the gallery, looking past the weeping, spectral form of Crawley directly at Jack.
          </p>
          <p>
            Another jagged stroke of lightning etched the man’s face in stark, merciless, brilliant white. Jack’s breath caught in a paralyzed throat, his heart stopping altogether as he stared into a perfect, flawless mirror. It was his own exhausted, bloodshot eyes, his own hollow cheeks, and his own mouth twisted into a grotesque, knowing smirk—a malevolent doppelgänger reveling in the doom he had brought upon them. Before Jack’s shattered mind could process the impossibility, the smirking figure cast himself backward with a theatrical grace, plummeting into the churning, black abyss of the sea below.
          </p>
          <p>
            Instantly, the ocean responded to the sacrifice. A monstrous, impossibly high wall of black water rose from the chaotic depths, a leviathan of crushing pressure and freezing sea-foam that struck the upper gallery with the force of an exploding mountain. It devoured the screaming, tragic spectre of Crawley in a singular, violent instant, wiping him from the walkway.
          </p>
          <p>
            Jack stood rooted to the vibrating iron, bracing for the bone-crushing impact, watching the catastrophic spray and the deafening, watery chaos engulfs the world around him. Yet, as the wave crashed through the gallery, tearing away the railings and shattering the great glass lenses behind him, Jack remained entirely, horrifyingly untouched. Not a single drop of rain clung to his face. The furious, hurricane-force winds completely failed to stir the fabric of his clothes.
          </p>
          <p>
            The catastrophic, world-ending deluge had passed directly through his body, washing away the last fragile tether of his denial. It cemented the inescapable truth that he was no longer a living, breathing inhabitant of the waking world, but a fractured echo trapped in a purgatory of his own design.
          </p>
          <p>
            Slowly, mechanically, completely devoid of hope or fear, he climbed back down the spiralling iron steps. That same grotesque, knowing smirk was now etched permanently, agonizingly across his own pale face, while the tempest hammered the lighthouse walls like skeletal fists demanding entry. He walked into his room, locked his heavy door against a threat that did not exist, poured a measure of bitter tonic with steady, perfectly translucent hands, and sank into his cot as the storm outside faded into a heavy, suffocating, eternal silence.
          </p>
          <p>
            An hour later, the first thud struck his steel door with the sickening finality of a hammer descending upon a fractured bone.
          </p>

        </div>
      </article>

      <section id="book" className="max-w-2xl mx-auto px-6 pt-24 border-t border-gray-800 text-center">
        
        <h2 className="font-serif text-2xl sm:text-3xl text-gray-200 mb-16">
          The Lighthouse is only the beginning.
        </h2>
        
        <div className="w-full max-w-[320px] mx-auto mb-10 shadow-lg">
           <img 
             src="/book-mockup.png" 
             alt="The Things We Keep by Soumik Halder" 
             loading="lazy"
             className="w-full h-auto"
           />
        </div>

        <h3 className="font-serif text-3xl text-gray-200 mb-2">
          The Things We Keep
        </h3>
        <p className="font-sans text-gray-400 text-sm tracking-widest uppercase mb-8">
          Dark Tales of Guilt and Consequence
        </p>
        
        <p className="font-serif text-lg text-gray-400 mb-12 leading-relaxed max-w-lg mx-auto">
          Eight stories. One bonus novella.<br/>
          Guilt. Memory. Grief. Sacrifice. Consequence.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
          <a 
            href="https://forms.gle/YAsR1xGHD9Ptb7j58" 
            className="inline-block bg-gray-200 text-gray-950 font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 hover:bg-white transition-colors"
          >
            Buy the eBook
          </a>
          <a 
            href="https://forms.gle/LPfTPWX8zVFNH5Zj6" 
            className="inline-block border border-gray-600 text-gray-300 font-sans text-xs tracking-widest uppercase px-8 py-4 hover:border-gray-400 hover:text-white transition-colors"
          >
            Pre-Order Hardcover (India)
          </a>
        </div>

        <div className="pt-8 pb-4">
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-gray-400 mb-2">
            Soumik Halder
          </p>
          <p className="font-serif text-gray-500 text-sm mb-4">
            Author of <i>The Things We Keep</i>
          </p>
          <a href="/about" className="font-sans text-[10px] tracking-widest uppercase text-gray-600 hover:text-gray-400 transition-colors">
            About the author &rarr;
          </a>
        </div>
        
        <div className="mt-12 text-center">
          <p className="font-sans text-[10px] text-gray-600 uppercase tracking-widest">
            &copy; 2026 Soumik Halder
          </p>
        </div>

      </section>

    </main>
  );
}

export default App;