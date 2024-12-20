export const TIMELINE_CONSTANTS = {
  spacing: {
    container: {
      vertical: 'py-24 md:py-32', // Plus d'espace vertical
      horizontal: 'px-8 md:px-16', // Plus d'espace horizontal
      maxWidth: 'max-w-7xl mx-auto' // Largeur maximale centrée
    },
    node: {
      gap: 'gap-12 md:gap-24', // Plus d'espace entre les nodes
      icon: {
        size: 'w-20 h-20 md:w-24 md:h-24', // Icons plus grands
        inner: 'w-10 h-10 md:w-12 md:h-12'
      },
      label: {
        width: 'w-40 md:w-48', // Labels plus larges
        top: '-top-24', // Plus d'espace pour les labels
        bottom: '-bottom-24'
      }
    },
    connector: {
      height: 'h-1.5', // Ligne plus épaisse
      position: 'top-10 md:top-12' // Alignement ajusté
    }
  },
  colors: {
    gradient: 'from-blue-500 via-purple-500 to-emerald-500',
    glow: 'shadow-[0_0_15px_rgba(59,130,246,0.5)]' // Effet de lueur
  },
  animations: {
    duration: 0.6,
    stagger: 0.15
  }
} as const;