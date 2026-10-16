import { NextResponse } from 'next/server'; // or standard Request/Response if pure Vite

export const config = {
  matcher: '/stories/:slug*',
};

// Master story lookup table for social scrapers
const storyMeta = {
  'the-lighthouse': {
    title: 'The Lighthouse | The Things We Keep',
    description: 'A storm, a beacon, and a secret that should have stayed lost. Read for free.',
    image: 'https://images.unsplash.com/photo-1758301064875-b46ec97564dd?auto=format&fit=crop&w=1200&q=85',
  },
  'the-things-we-keep': {
    title: 'The Things We Keep | Dark Fiction Anthology',
    description: 'Some loves refuse to let go, even in death. Read the chilling title story.',
    image: 'https://unsplash.com/photos/Tbe5ETgGmh4/download?force=true&w=1200',
  },
  'durga': {
    title: 'Durga | Psychological Horror by Soumik Halder',
    description: 'Read my horror story Durga for free this Durga puja: A home, a dress, and something watching from the ceiling.',
    image: 'https://unsplash.com/photos/S4oJgerlHas/download?force=true&w=1200',
  },
  'a-beautiful-bargain': {
    title: 'A Beautiful Bargain | The Things We Keep',
    description: 'Beauty always comes at a price. Every six months, the mirror demands another young life.',
    image: 'https://unsplash.com/photos/TPWo4zf-5c0/download?force=true&w=1200',
  },
  'you-came-back': {
    title: 'You Came Back | The Things We Keep',
    description: 'Some places don’t forget your name—and some friendships do not end at the bottom of a well.',
    image: 'https://unsplash.com/photos/PAGny_3uoyg/download?force=true&w=1200',
  },
  'the-emerald-dress': {
    title: 'The Emerald Dress | The Things We Keep',
    description: 'Every night he met her on the rooftop—until he learned she died ten years ago.',
    image: 'https://unsplash.com/photos/LLxmMb7qtjA/download?force=true&w=1200',
  },
  'the-girl-who-wanted-to-be-seen': {
    title: 'The Girl Who Wanted to Be Seen | The Things We Keep',
    description: 'Trapped forever behind the glass of her own portrait. Read the psychological horror story.',
    image: 'https://unsplash.com/photos/2ljAy5a52hQ/download?force=true&w=1200',
  },
  'the-confession': {
    title: 'The Confession | The Things We Keep',
    description: 'His punishment was not death—it was living beside the entity who heard every sin.',
    image: 'https://images.unsplash.com/photos/kFxJlgY3W6s/download?force=true&w=1200',
  },
  'karam': {
    title: 'Karam (Bonus Novella) | The Things We Keep',
    description: 'Two IIT Kharagpur best friends, an elite party blackout, and a tower of repentance.',
    image: 'https://images.unsplash.com/photos/kHG5d5g8Dvo/download?force=true&w=1200',
  },
};

export async function middleware(request) {
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || '';

  // Detect social media web crawlers
  const isBot = /facebookexternalhit|Facebot|Twitterbot|LinkedInBot|WhatsApp|TelegramBot|SkypeUriPreview/i.test(
    userAgent
  );

  if (isBot) {
    const pathSegments = url.pathname.split('/');
    const slug = pathSegments[pathSegments.length - 1];
    const meta = storyMeta[slug] || {
      title: 'The Things We Keep | Dark Fiction Anthology by Soumik Halder',
      description: 'Nine dark worlds. One human shadow.',
      image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=85',
    };

    // Fetch the base built index.html from Vercel
    const response = await fetch(new URL('/', request.url));
    let html = await response.text();

    // Replace default tags dynamically with story-specific tags
    html = html
      .replace(
        /<title>.*?<\/title>/,
        `<title>${meta.title}</title>`
      )
      .replace(
        /<meta property="og:title" content=".*?"/,
        `<meta property="og:title" content="${meta.title}"`
      )
      .replace(
        /<meta property="og:description" content=".*?"/,
        `<meta property="og:description" content="${meta.description}"`
      )
      .replace(
        /<meta property="og:image" content=".*?"/,
        `<meta property="og:image" content="${meta.image}"`
      )
      .replace(
        /<meta name="twitter:title" content=".*?"/,
        `<meta name="twitter:title" content="${meta.title}"`
      )
      .replace(
        /<meta name="twitter:description" content=".*?"/,
        `<meta name="twitter:description" content="${meta.description}"`
      )
      .replace(
        /<meta name="twitter:image" content=".*?"/,
        `<meta name="twitter:image" content="${meta.image}"`
      );

    return new NextResponse(html, {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
    });
  }

  return NextResponse.next();
}