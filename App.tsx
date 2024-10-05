import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "@/navigation/AuthStack";
import MainStack from "@/navigation/MainStack";

import { AuthProvider, useAuth } from "@/authContext";

const Wrapper = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <MainStack /> : <AuthStack />;
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Wrapper />
      </NavigationContainer>
    </AuthProvider>
  );
}
