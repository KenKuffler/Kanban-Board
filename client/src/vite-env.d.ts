/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL_LOCAL: string;
    readonly VITE_API_URL_PRODUCTION: string;
    // Add other environment variables as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

