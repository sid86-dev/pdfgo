import { View, Text } from "react-native";
import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../lib/colors";
// @ts-ignore
import Pulse from "react-native-pulse";
import * as Progress from "react-native-progress";

interface IProps {
  step: number;
}

const TimeLine: FC<IProps> = ({ step }) => {
  return (
    <View className="px-6 flex-1 mx-2 items-center">
      <View className="h-2 w-full items-center">
        <Progress.Bar
          progress={(step - 1) / 2}
          unfilledColor={colors.primary}
          width={null}
          useNativeDriver={true}
          color={colors.secondary}
          borderWidth={0}
          height={6}
          className="w-[115%] top-[1px]"
          animated={true}
          animationType="timing"
          animationConfig={
            {
              duration: 1000,
              bounciness: 30,
            }
          }
        />
      </View>
      <View className="absolute z-50 -top-[12px] -left-2">
        <Ionicons name="radio-button-on" size={30} color={colors.secondary} />
        {step === 1 && (
          <Pulse
            color={colors.secondary}
            numPulses={5}
            diameter={45}
            speed={50}
            duration={4000}
          />
        )}
      </View>
      <Text className="absolute mt-5 -left-4 text-xs font-semibold">
        Choose file
      </Text>
      <View className="absolute z-50 -top-[12px] left-[55%] w-[30px]">
        <Ionicons name="radio-button-on" size={30} color={"#53B436"} />
        {step === 2 && (
          <Pulse
            color={colors.secondary}
            numPulses={5}
            diameter={45}
            speed={50}
            duration={4000}
          />
        )}
      </View>
      <Text className="absolute mt-5 left-[50%] text-xs font-semibold">
        Extraction
      </Text>
      <View className="absolute -top-[12px] -right-2">
        <Ionicons name="radio-button-on" size={30} color={colors.secondary} />
        {step === 3 && (
          <Pulse
            color={colors.secondary}
            numPulses={5}
            diameter={45}
            speed={50}
            duration={4000}
          />
        )}
      </View>
      <Text className="absolute mt-5 -right-4 text-xs font-semibold">
        View Result
      </Text>
    </View>
  );
};

export default TimeLine;
