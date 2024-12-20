import { springConfig } from './spring';

export const hoverScale = {
  scale: 1.05,
  transition: springConfig.gentle
};

export const tapScale = {
  scale: 0.95,
  transition: springConfig.stiff
};

export const dragConstraints = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  bounce: 0.5
};