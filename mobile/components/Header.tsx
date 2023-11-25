import { View, Text, Platform, Pressable } from "react-native";
import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../lib/colors";
// import { useNavigation, NavigationProp } from "@react-navigation/native";

interface IProps {
  isBack?: boolean;
}

const Header: FC<IProps> = ({ isBack }) => {
  // let navigation = useNavigation<NavigationProp<any, any>>();
  return (
    <View
      className={`flex flex-row justify-between ${
        Platform.OS === "android" && "mt-8"
      }`}
    >
      {/* Icon */}
      <Text
        className="font-bold text-inherit shadow shadow-white text-3xl"
        style={{
          color: colors.tertiary,
        }}
      >
        Pdf
        <Text
          className="font-bold text-inherit  text-2xl"
          style={{
            color: colors.secondary,
          }}
        >
          Go
        </Text>
      </Text>
      <Pressable className="bg-white p-3 rounded-full ">
        <Ionicons name={"search"} size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default Header;
