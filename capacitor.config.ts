import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'BMA Student Portal',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;