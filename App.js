import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./src/navigations/authNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
