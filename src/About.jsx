import React from 'react';

function About() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-gray-700 selection:text-white pb-24">
      
      <nav className="w-full py-8 px-6 sm:px-12 flex justify-between items-center bg-[#0a0a0a] border-b border-gray-900">
        <a href="/" className="font-sans font-medium tracking-[0.2em] text-[10px] sm:text-xs text-gray-400 hover:text-gray-200 transition-colors uppercase">
          &larr; Back to Story
        </a>
        <span className="font-sans tracking-[0.2em] text-[10px] sm:text-xs text-gray-500 uppercase">
          About the Author
        </span>
      </nav>

      <article className="max-w-[65ch] mx-auto px-6 pt-24 pb-20">
        <h1 className="font-serif text-4xl sm:text-5xl text-gray-200 font-semibold mb-16 tracking-wide text-center">
          Soumik Halder
        </h1>
        
        <div className="font-serif text-[19px] sm:text-[21px] leading-[1.75] text-gray-300 space-y-8">
          <p>
            Soumik Halder is an author, software engineer, and product builder based in West Bengal, India. By day, he architects web applications and artificial intelligence tools; by night, he explores the darkest corners of human psychology through horror fiction.
          </p>
          <p>
            Drawing from his technical background, he approaches storytelling like complex system design—layering atmosphere, moral rot, and psychological tension until the structure finally collapses on the characters. <i>The Things We Keep</i> is his debut collection.
          </p>
        </div>
        
        <div className="mt-24 pt-12 border-t border-gray-800 text-center">
           <a href="/" className="inline-block border border-gray-600 text-gray-300 font-sans text-xs tracking-widest uppercase px-8 py-4 hover:border-gray-400 hover:text-white transition-colors">
            Read The Lighthouse
          </a>
        </div>
      </article>

    </main>
  );
}

export default About;