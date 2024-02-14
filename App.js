import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./src/navigations/authNavigation";
import "react-native-get-random-values";

//firebase import

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
