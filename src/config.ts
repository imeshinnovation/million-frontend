const config = {
  mode: import.meta.env.MODE || 'development',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5189/api',
  },
  
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Million',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  },
  
  features: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enableDebug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
  },
  
} as const;

export default config;