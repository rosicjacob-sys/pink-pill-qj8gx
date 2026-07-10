export const tokens = {
  color: {
    porcelain: '#FDF6FA',
    pureWhite: '#FFFFFF',
    royalPink: '#FF2E88',
    deepPink: '#C4126B',
    plum: '#1A0A14',
    warmBlack: '#1C0D16',
    muted: '#8A7E84',
  },
  font: {
    display: "'Playfair Display', serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  spacing: {
    section: 'min-h-screen',
    content: 'max-w-7xl mx-auto px-6 lg:px-12',
  },
  motion: {
    revealDuration: 0.9,
    revealStagger: 0.032,
    hoverSnap: 0.15,
    scrubDamping: 0.6,
    magneticStrength: 0.3,
    magneticRadius: 100,
  },
} as const;
