// Everything you'll want to edit lives here.
// Photos: drop files into /public/images and set the `src` paths below.
// Links: leave a URL as "" until you have the real one; unset links render as plain text.

export type Photo = {
  src: string; // e.g. "/images/hero-blue-sky.jpg" — "" shows a labeled placeholder
  alt: string;
  label: string; // shown only on the placeholder, describes the photo that belongs here
  focus?: string; // which part of the photo to keep when cropped, e.g. "50% 30%" (x y). Default: center
};

export const site = {
  name: "Katrina Saya Webb",
  url: "https://katrinasayawebb.com",
  location: "San Francisco, California",
  tagline: "Work, ideas, and everything in between.",
  // The tagline as it breaks on the homepage hero (desktop). Mobile wraps naturally.
  heroLines: ["Work, ideas, and", "everything", "in between."],
  intro:
    "I'm Katrina. I work with data, technology, and business systems. Here you'll find the things I'm building, what I'm learning, and the places and ideas that inspire me.",
  description:
    "Katrina Saya Webb — data, technology, and business systems, plus writing on Japan, design, and AWARÉ.",
};

export const links = {
  email: "katrinasayawebb@gmail.com",
  github: "https://github.com/katrinasayawebb",
  linkedin: "https://www.linkedin.com/in/katrina-saya-webb/",
  substack: "https://substack.com/@katrinasaya",
  resume: "/katrina-saya-webb-resume.pdf",
};

// The four pillars. `title` and `intro` open each pillar's landing page.
export const pillars = [
  {
    number: "01",
    name: "Build",
    href: "/build",
    line: "Tools, systems, and experiments.",
    title: "What I'm making.",
    intro: "Tools, systems, and experiments in Python, SQL, automation, and AI.",
    photo: { src: "/images/pillars/build.jpg", alt: "A snake plant and a cane chair beside a desk with a closed laptop, in late afternoon light", label: "Build — desk or laptop still life" },
  },
  {
    number: "02",
    name: "Learn",
    href: "/learn",
    line: "Notes from the learning process.",
    title: "What I'm figuring out.",
    intro: "Notes on systems thinking, engineering concepts, debugging, and learning to build.",
    photo: { src: "/images/pillars/learn.jpg", alt: "An open kraft-paper notebook with a pen and a cup of black coffee on a dark marble table", label: "Learn — notebook or reading" },
  },
  {
    number: "03",
    name: "Live",
    href: "/live",
    line: "Places, ideas, and everyday life.",
    title: "What inspires me.",
    intro: "Japan, travel, fashion, design, architecture, cities, and everyday observations.",
    photo: { src: "/images/pillars/live.jpg", alt: "Rice fields seen through the window of a Japanese local train, above a red bench seat", label: "Live — Japan or travel" },
  },
  {
    number: "04",
    name: "Create",
    href: "/create",
    line: "Independent projects and AWARÉ.",
    title: "What I'm bringing into the world.",
    intro: "Independent and creative projects. Right now, that means AWARÉ.",
    photo: { src: "/images/pillars/create.jpg", alt: "A wall of indigo shibori-dyed cloths in wooden frames", label: "Create — AWARÉ object" },
  },
] satisfies Array<{
  number: string;
  name: string;
  href: string;
  line: string;
  title: string;
  intro: string;
  photo: Photo;
}>;

export function getPillar(href: string) {
  return pillars.find((p) => p.href === href)!;
}

// Homepage AWARÉ feature (text comes from content/create/aware.mdx)
export const aware = {
  href: "/create/aware",
  photo: {
    src: "/images/aware-feature.jpg",
    alt: "A ceramic tea bowl and a wrapped furoshiki bag on a wooden table, cherry blossoms in the window behind",
    label: "AWARÉ feature — wide still life",
    focus: "50% 70%",
  },
};

// About — homepage preview and the full /about page. DRAFT copy: edit freely.
export const about = {
  preview:
    "My background is in advertising technology, analytics, and business operations. I'm moving from operating complex systems to building them, with a focus on Python, SQL, automation, AI, and analytics engineering. Outside work, I think about Japan, writing, fashion, design, travel, and cities.",
  intro: [
    "I'm Katrina. I live in San Francisco and work where business problems meet the data systems meant to describe them.",
    "I grew up moving between Japanese and English, and a lot of how I work still looks like translation: between teams, between tools, and between what a business needs and what its data actually says.",
    "This site keeps the parts of my life that don't fit on a resume in the same place as the parts that do.",
  ],
  background: [
    "I've worked in advertising technology since 2019, on both the agency and platform side, mostly across CTV, video, and measurement. Most of that work is pacing, reconciliation, troubleshooting, and the data work that connects them.",
    "Lately it has moved closer to the systems themselves: SQL, Python, validation, and automation. I'm learning to build the tools I used to operate, and writing down what I learn along the way.",
  ],
  technical: ["Python", "SQL", "Data pipelines and validation", "Automation", "AI-assisted workflows", "Analytics engineering"],
  elsewhere: ["Japan", "Writing", "Fashion", "Design and architecture", "Travel and cities", "Entrepreneurship"],
};

export const photos = {
  hero: {
    src: "/images/hero-blue-sky.jpg",
    focus: "55% 20%", // keeps the face and the sky above it in every crop
    alt: "Katrina Saya Webb outdoors against a blue sky",
    label: "Hero portrait — outdoor, blue sky",
  },
  aboutPreview: {
    src: "/images/about-bw.jpg",
    focus: "50% 22%",
    alt: "Black-and-white portrait of Katrina Saya Webb, laughing, seated in a dark coat",
    label: "About portrait — black and white",
  },
  create: {
    src: "/images/founder-portrait.jpg",
    focus: "50% 30%",
    alt: "Portrait of Katrina Saya Webb in a black blazer against a white wall",
    label: "Create portrait",
  },
} satisfies Record<string, Photo>;
