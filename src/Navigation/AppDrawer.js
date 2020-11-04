import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfieScreenStack from "./ProfileStack";
import HomeScreenStack from "./HomeStack";
const AppDrawer = createDrawerNavigator();

const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="HomeTab" component={HomeScreenStack} />
      <AppDrawer.Screen name="Profile" component={ProfieScreenStack} />
    </AppDrawer.Navigator>
  );
};
export default AppDrawerScreen;