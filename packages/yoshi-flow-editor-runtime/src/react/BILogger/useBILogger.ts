import { useContext } from 'react';
import { BILoggerContext } from './BILoggerContext';

export function useBi() {
  return useContext(BILoggerContext);
}
