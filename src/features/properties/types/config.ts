export interface ApiConfig {
  baseUrl: string;
}

export interface AppConfig {
  nodeEnv: 'development' | 'production';
  port: number;
  api: ApiConfig;
  logLevel: string;
  corsOrigin: string;
  isDev: boolean;
  isProd: boolean;
}