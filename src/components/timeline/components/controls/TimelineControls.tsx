import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useTranslation } from '../../../../i18n';

interface TimelineControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  lang: 'fr' | 'en';
}

export function TimelineControls({ 
  isPlaying, 
  onPlay, 
  onPause, 
  onReset,
  lang 
}: TimelineControlsProps) {
  const { t } = useTranslation(lang);

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={isPlaying ? onPause : onPlay}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4" />
            {t('timeline.controls.pause')}
          </>
        ) : (
          <>
            <Play className="w-4 h-4" />
            {t('timeline.controls.play')}
          </>
        )}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        {t('timeline.controls.reset')}
      </motion.button>
    </div>
  );
}