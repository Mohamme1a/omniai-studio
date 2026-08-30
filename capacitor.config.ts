import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mohamme1a.omniaistudio',
  appName: 'OmniAI Studio',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
