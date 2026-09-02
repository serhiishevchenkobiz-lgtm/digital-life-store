export type BookFormat = "ebook" | "audio" | "bundle";

export interface Book {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  category: string;
  formats: BookFormat[];
  priceCents: number;
  audioPriceCents?: number;
  bundlePriceCents?: number;
  cover: {
    palette: "ember" | "moss" | "ink" | "sand" | "inkwell" | "rose";
    spineLabel: string;
    motif: "compass" | "lamp" | "wave" | "leaf" | "arch" | "sun";
  };
  shortDescription: string;
  longDescription: string;
  readingMinutes: number;
  pages: number;
  publishedAt: string;
  highlights: string[];
  isbn: string;
  audioSampleMinutes: number;
  language: "en-US";
}

export const books: Book[] = [
  {
    slug: "the-quiet-architecture",
    title: "The Quiet Architecture",
    subtitle: "Designing a daily life that holds you, gently.",
    author: "Digital Life Press",
    category: "Lifestyle",
    formats: ["ebook", "audio", "bundle"],
    priceCents: 1400,
    audioPriceCents: 1800,
    bundlePriceCents: 2600,
    cover: { palette: "ember", spineLabel: "01", motif: "lamp" },
    shortDescription:
      "A practical field guide to building routines, spaces and habits that quietly protect your focus and energy.",
    longDescription:
      "The Quiet Architecture is a working manual for anyone whose days have become loud. Across seven concise chapters, it offers a calm, research-aware approach to designing the small systems — morning rituals, weekly reviews, room layouts, attention budgets — that determine how your life actually feels. No productivity theatre. No moralising. Just a steady set of decisions you can make, then make again.",
    readingMinutes: 195,
    pages: 184,
    publishedAt: "2026-08-12",
    highlights: [
      "Seven field-tested chapters, under 200 pages.",
      "Reflection prompts and printable worksheets.",
      "Audio edition narrated at a humane pace.",
    ],
    isbn: "978-1-9999999-0-1",
    audioSampleMinutes: 12,
    language: "en-US",
  },
  {
    slug: "letters-on-attention",
    title: "Letters on Attention",
    subtitle: "Twelve short letters for a world that never stops asking for yours.",
    author: "Digital Life Press",
    category: "Mind",
    formats: ["ebook", "audio"],
    priceCents: 1200,
    audioPriceCents: 1500,
    cover: { palette: "moss", spineLabel: "02", motif: "leaf" },
    shortDescription:
      "Twelve short, essayistic letters on protecting attention in an economy of distraction.",
    longDescription:
      "A small, deliberate book. Twelve letters, each five to seven pages, written to a friend who keeps losing the thread of their own afternoon. It draws on philosophy, design history and quiet science, and refuses the usual productivity swagger. Read one letter with tea. Put it down. Live a day. Return.",
    readingMinutes: 95,
    pages: 96,
    publishedAt: "2026-06-02",
    highlights: [
      "Twelve standalone essays.",
      "Audio edition read in a calm, low-arousal voice.",
      "Designed for one-letter-per-evening reading.",
    ],
    isbn: "978-1-9999999-0-2",
    audioSampleMinutes: 8,
    language: "en-US",
  },
  {
    slug: "a-small-book-of-routines",
    title: "A Small Book of Routines",
    subtitle: "Mornings, evenings, weeks — built to bend without breaking.",
    author: "Digital Life Press",
    category: "Productivity",
    formats: ["ebook", "bundle"],
    priceCents: 1500,
    bundlePriceCents: 2200,
    cover: { palette: "sand", spineLabel: "03", motif: "sun" },
    shortDescription:
      "Twenty adaptable routines for the parts of the day that quietly run your life.",
    longDescription:
      "Routines are the load-bearing walls of a calm life. This book gives you twenty of them — for mornings that need to start softly, evenings that need to land, weeks that need a shape, and seasons that change. Each routine is one page of text, one page of variations, and one page of 'if it breaks'.",
    readingMinutes: 130,
    pages: 112,
    publishedAt: "2026-04-18",
    highlights: [
      "Twenty adaptable routines.",
      "Printable routine cards included as PDF.",
      "Built to survive travel, illness and small children.",
    ],
    isbn: "978-1-9999999-0-3",
    audioSampleMinutes: 0,
    language: "en-US",
  },
  {
    slug: "the-house-you-live-in",
    title: "The House You Live In",
    subtitle: "A field guide to the spaces, objects and light that shape you.",
    author: "Digital Life Press",
    category: "Home",
    formats: ["ebook", "audio", "bundle"],
    priceCents: 1600,
    audioPriceCents: 2000,
    bundlePriceCents: 2900,
    cover: { palette: "inkwell", spineLabel: "04", motif: "arch" },
    shortDescription:
      "How to arrange a room, a desk and a window so they quietly do less harm and more good.",
    longDescription:
      "An unhurried guide to the physical environment you actually live in. Drawing on architectural writing, environmental psychology and a great deal of common sense, this book walks through every room — and what to do with it. Illustrated with diagrams. Readable in a weekend, useful for a decade.",
    readingMinutes: 170,
    pages: 156,
    publishedAt: "2026-02-09",
    highlights: [
      "Room-by-room field guide.",
      "Dozens of small, low-cost interventions.",
      "Audio edition ideal for long walks.",
    ],
    isbn: "978-1-9999999-0-4",
    audioSampleMinutes: 10,
    language: "en-US",
  },
  {
    slug: "the-compass-and-the-cup",
    title: "The Compass and the Cup",
    subtitle: "Direction, rest and the small rituals that keep you whole.",
    author: "Digital Life Press",
    category: "Lifestyle",
    formats: ["ebook"],
    priceCents: 1100,
    cover: { palette: "ink", spineLabel: "05", motif: "compass" },
    shortDescription:
      "A short, generous book about goals, recovery and the everyday practice of staying oriented.",
    longDescription:
      "Half workbook, half letter. The Compass and the Cup is a 90-page companion for people who want to keep moving — without losing themselves in the motion. Five sections, one quiet exercise at the end of each, and a final chapter designed to be reread once a year.",
    readingMinutes: 85,
    pages: 90,
    publishedAt: "2025-11-22",
    highlights: [
      "Five short sections, one annual reread.",
      "Built-in reflection prompts.",
      "Pairs well with the Audio Sampler Pack.",
    ],
    isbn: "978-1-9999999-0-5",
    audioSampleMinutes: 0,
    language: "en-US",
  },
  {
    slug: "tides-and-small-tasks",
    title: "Tides and Small Tasks",
    subtitle: "Energy, focus and a kinder way to plan a week.",
    author: "Digital Life Press",
    category: "Productivity",
    formats: ["ebook", "audio"],
    priceCents: 1300,
    audioPriceCents: 1700,
    cover: { palette: "rose", spineLabel: "06", motif: "wave" },
    shortDescription:
      "Plan by energy, not by to-do. A short book on working with the grain of your week.",
    longDescription:
      "Built from interviews with working parents, surgeons, writers and night-shift nurses, Tides and Small Tasks argues that the to-do list is the wrong tool — and that energy, attention and the shape of the day are. It offers a single weekly practice, with variations, that has held up across wildly different lives.",
    readingMinutes: 110,
    pages: 104,
    publishedAt: "2025-09-30",
    highlights: [
      "One core weekly practice.",
      "Variations for shift work, parenting and travel.",
      "Audio edition for slow mornings.",
    ],
    isbn: "978-1-9999999-0-6",
    audioSampleMinutes: 6,
    language: "en-US",
  },
];

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}