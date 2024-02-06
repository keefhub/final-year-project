import * as React from "react";
import { View, useWindowDimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import UserProfile from "./userProfile";
import TravelLog from "./travelLog";

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "#000" }} // Set the background color of the active tab
    style={{ backgroundColor: "#fff" }}
    renderLabel={({ route, focused }) => (
      <Text
        style={{
          color: focused ? "#000" : "#3498db",
        }}
      >
        {route.title}
      </Text>
    )}
  />
);

const TravelLogTab = () => (
  <View style={{ flex: 1 }}>
    <TravelLog />
  </View>
);

const UserProfileTab = () => (
  <View style={{ flex: 1 }}>
    <UserProfile />
  </View>
);

const renderScene = SceneMap({
  first: TravelLogTab,
  second: UserProfileTab,
});

export default function Tabs() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "My Travel Log" },
    { key: "second", title: "My Profile" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}
