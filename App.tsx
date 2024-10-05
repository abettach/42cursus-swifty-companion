import { AuthProvider, useAuth } from "@/authContext";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "@/navigation/AuthStack";
import MainStack from "@/navigation/MainStack";

const Wrapper = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <MainStack />;
  }

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
