import { View, Text, Pressable, Dimensions } from "react-native";
import React, { FC } from "react";
import { IHomeScreenCard } from "../../lib/constants.types";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../../lib/colors";

interface IProps extends IHomeScreenCard {
  index: number;
  onPress: () => void;
}

const Card: FC<IProps> = ({ title, icon, color, index, onPress }) => {
  let screenWidth = Dimensions.get("window").width;
  return (
    <Pressable
      onPress={onPress}
      style={{
        elevation: 0.5,
        backgroundColor: colors.primary,
        width: screenWidth / 2 - 50,
      }}
      className={`shadow-inner rounded-3xl mb-2 py-6 ${
        index % 2 === 0 ? "mr-4" : "ml-4"
      } ${index === 0 || index === 1 ? "mt-0" : "mt-6"}`}

    >
      {/* Content */}
      <View className="flex flex-col items-center justify-center justify-items-center">
        <FontAwesome5 name={icon} size={50} color={color} />
        <Text
          className="mt-4 font-semibold"
          style={{
            fontSize: 16,
          }}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

export default Card;
