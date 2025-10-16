/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare global {
  interface Window {
    __homeChat?: {
      timer: number | null;
      sessionId: number;
    };
  }
}

export {};
