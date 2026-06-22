
export interface Design {
  name: string;
  description: string;
  installs: string;
  bookmarks: string;
  isNew?: boolean;
  logoLight: string;
  logoDark: string;
  slug: string;
  motionDir: string;
}

export const designs: Design[] = [
  {
    name: "Figma",
    description:
      "Design platform. Playful micro-interactions, spring-based transitions, smooth canvas zooming, and gradient motion.",
    installs: "3.3K",
    bookmarks: "368",
    isNew: true,
    logoLight: "/logos/figma.svg",
    logoDark: "/logos/figma.svg",
    slug: "figma",
    motionDir: "figma",
  },
  {
    name: "Clerk",
    description:
      "Authentication infrastructure. Crisp UI transitions, polished loading states, smooth form feedback, and developer-focused interactions.",
    installs: "943",
    bookmarks: "28",
    isNew: true,
    logoLight: "/logos/clerk-icon-light.svg",
    logoDark: "/logos/clerk-icon-dark.svg",
    slug: "clerk",
    motionDir: "clerk",
  },
  {
    name: "Contralabs",
    description:
      "Authentication infrastructure. Crisp UI transitions, polished loading states, smooth form feedback, and developer-focused interactions.",
    installs: "943",
    bookmarks: "28",
    isNew: true,
    logoLight: "/logos/contralabs.png",
    logoDark: "/logos/contralabs-dark.png",
    slug: "contralabs",
    motionDir: "contralabs",
  },
  {
    name: "Railway",
    description:
      "Cloud deployment platform. Terminal-inspired aesthetics, fluid dashboard animations, animated metrics, and fast state transitions.",
    installs: "623",
    bookmarks: "7",
    isNew: true,
    logoLight: "/logos/railway.svg",
    logoDark: "/logos/railway_dark.svg",
    slug: "railway",
    motionDir: "railway",
  },

  {
    name: "Apple",
    description:
      "Consumer technology. Cinematic scroll storytelling, layered parallax effects, elegant fades, and premium motion choreography.",
    installs: "29K",
    bookmarks: "4K",
    logoLight: "/logos/apple.svg",
    logoDark: "/logos/apple_dark.svg",
    slug: "apple",
    motionDir: "apple",
  },

  {
    name: "Arc Browser",
    description:
      "Modern web browser. Spatial navigation, fluid panel transitions, playful interactions, and highly polished motion design.",
    installs: "29K",
    bookmarks: "4K",
    logoLight: "/logos/arc_browser.svg",
    logoDark: "/logos/arc_browser.svg",
    slug: "arc",
    motionDir: "arc",
  },

  {
    name: "Airbnb",
    description:
      "Travel marketplace. Smooth map interactions, delightful booking flows, card-based animations, and warm, approachable motion.",
    installs: "11K",
    bookmarks: "1.2K",
    logoLight: "/logos/airbnb.svg",
    logoDark: "/logos/airbnb.svg",
    slug: "airbnb",
    motionDir: "airbnb",
  },

  {
    name: "Claude",
    description:
      "AI assistant by Anthropic. Editorial layouts, subtle page transitions, refined typography animations, and distraction-free interactions.",
    installs: "18K",
    bookmarks: "1.8K",
    logoLight: "/logos/claude-ai-icon.svg",
    logoDark: "/logos/claude-ai-icon.svg",
    slug: "claude",
    motionDir: "claude",
  },

  {
    name: "Branch",
    description:
      "Developer tooling. Clean, terminal-native motion, fast transitions, and purpose-built interactions.",
    installs: "1.7K",
    bookmarks: "172",
    isNew: true,
    logoLight: "https://cdn.simpleicons.org/branch/000000",
    logoDark: "https://cdn.simpleicons.org/branch/ffffff",
    slug: "branch",
    motionDir: "branch",
  },

  {
    name: "Jitter",
    description:
      "Motion design tool. Clean white SaaS aesthetics, product preview animations, and subtle micro-interactions.",
    installs: "2.1K",
    bookmarks: "210",
    logoLight: "https://cdn.simpleicons.org/jittervideo/000000",
    logoDark: "https://cdn.simpleicons.org/jittervideo/ffffff",
    slug: "jitter-video",
    motionDir: "jitter-video",
  },
];

export function getDesignBySlug(slug: string): Design | undefined {
  return designs.find((d) => d.slug === slug);
}

