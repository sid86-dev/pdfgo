import { Pressable } from "react-native";
import React, { FC, useEffect, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import colors from "./colors";
import * as Animatable from "react-native-animatable";
import { TabScreens } from "./constants";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const TabButton: FC<any> = (props) => {
    const { onPress, item, accessibilityState } = props;

    let focused = accessibilityState.selected;

    let btnRef = useRef<any>(null);
    let cameraRef = useRef<any>(null);

    useEffect(() => {
      if (focused) {
        btnRef.current?.animate({ 0: { scale: 1 }, 1: { scale: 1.1 } });
      } else {
        btnRef.current?.animate({ 0: { scale: 1.1 }, 1: { scale: 1 } });
      }
    }, [focused]);

    return (
      <Pressable
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: 65,
          height: 65,
          //   marginTop: 5,
          top: item.icon === "camera" ? -20 : 0,
        }}
        onPress={onPress}
      >
        {/* Animated Icon */}
        <Animatable.View
          ref={item.icon === "camera" ? cameraRef : btnRef}
          duration={400}
          animation="zoomIn"
          style={{
            flex: 1,
            width: 65,
            height: 100,
            borderRadius: 50,
            backgroundColor: item.icon === "camera" ? colors.secondary : "",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            // style={{ color: colors.secondary }}
            name={focused ? item.icon : item.focusedIcon}
            size={item.icon === "camera" ? 40 : 30}
            color={item.icon === "camera" ? colors.tertiary : colors.secondary}
          />
        </Animatable.View>
      </Pressable>
    );
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: "10%",
          backgroundColor: colors.tertiary,
          position: "absolute",
          borderColor: colors.secondary,
          borderTopWidth: 0,
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
        },
      }}
    >
      {/* Render all Tab Screens */}
      {TabScreens.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props) => <TabButton {...props} item={screen} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
