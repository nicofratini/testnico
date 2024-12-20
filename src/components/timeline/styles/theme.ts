export const TIMELINE_THEME = {
  spacing: {
    container: {
      vertical: 'py-16 md:py-24',
      horizontal: 'px-6 md:px-12'
    },
    node: {
      gap: 'gap-8 md:gap-16',
      icon: {
        size: 'w-16 h-16 md:w-20 md:h-20',
        inner: 'w-8 h-8 md:w-10 md:h-10'
      },
      label: {
        width: 'w-32 md:w-40',
        spacing: 'mt-4'
      }
    }
  },
  colors: {
    gradient: 'from-blue-500 via-purple-500 to-emerald-500',
    active: 'text-gray-900',
    inactive: 'text-gray-600',
    hover: 'text-gray-800'
  },
  animations: {
    duration: 0.5,
    stagger: 0.1
  }
} as const;