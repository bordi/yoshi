import { createContext } from 'react';

export type IBILoggerContext = any;
export const BILoggerContext = createContext<IBILoggerContext>({});
