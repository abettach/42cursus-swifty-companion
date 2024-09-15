declare module 'react-native-config' {
  export interface NativeConfig {
    REACT_NATIVE_CLIENT_ID?: string;
    REACT_NATIVE_CLIENT_SECRET?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
