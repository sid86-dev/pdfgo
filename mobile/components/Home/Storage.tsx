import { View, Text } from "react-native";
import React, { FC } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../lib/colors";

type StorageType = {
  total: number;
  avalable: number;
  used: number;
};

interface IProps {
  storage: StorageType;
}

const Storage: FC<IProps> = ({ storage }) => {
  return (
    <View className="flex flex-row justify-between items-center bg-[#DEE9BE] rounded-3xl px-8 py-5">
      <View className="p-4 bg-white rounded-2xl">
        <MaterialIcons name="storage" size={30} color={colors.secondary} />
      </View>
      <View className="flex flex-col items-start ml-4 justify-center">
        {/*  Bar */}
        <View className="flex flex-row bg-[#F3F7E9] w-[90%] h-4 items-center justify-items-center justify-center rounded-full">
          {/* Used */}
          <View
            className="h-full"
            style={{
              width: `${(storage.used / storage.total) * 100}%`,
              borderTopLeftRadius: 6,
              borderBottomLeftRadius: 6,
              backgroundColor: colors.secondary,
            }}
          >
            <Text className="text-white text-xs text-center my-auto">
              {storage.used.toFixed(2)} GB
            </Text>
          </View>
          {/* Available */}
          <View
            className="w-full h-full"
            style={{
              width: `${(storage.avalable / storage.total) * 100}%`,
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6,
              backgroundColor: colors.primary,
            }}
          >
            <Text className="text-[#53B436] text-xs text-center my-auto">
              {storage.avalable.toFixed(2)} GB
            </Text>
          </View>
        </View>
        {/* Content */}
        <View className="flex flex-col mt-5">
          {/* Used Storage */}
          <View className="flex flex-row mb-2">
            <View className="bg-[#53B436] p-2 rounded-full" />
            <Text className="text-[#53B436] font-bold  mx-3">Used Storage</Text>
          </View>
          {/* Available Storage */}
          <View className="flex flex-row">
            <View className="bg-[#F3F7E9] p-2 rounded-full" />
            <Text className="text-[#F3F7E9] font-bold  mx-3">
              Avalable Storage
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Storage;
