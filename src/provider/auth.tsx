import { GoogleOAuthProvider } from "@react-oauth/google";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId="379851236255-ge09c30lblo2cn439ngd33c2e9ee8pg3.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
};
