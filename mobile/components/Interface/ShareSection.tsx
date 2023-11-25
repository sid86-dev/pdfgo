import { View, Text } from "react-native";
import React, { FC } from "react";
import colors from "../../lib/colors";
import { ButtonSecondary, ButtonTertiary } from "../Buttons";
import { ExtractedImagesData } from "../../types";
import { Ionicons } from "@expo/vector-icons";

interface IProps {
  extractedData: ExtractedImagesData;
}

const ShareSection: FC<IProps> = ({ extractedData }) => {
  return (
    <View
      className="mt-6 flex flex-col justify-between rounded-xl p-4 py-3"
      style={{
        backgroundColor: colors.primary,
      }}
    >
      <View className="w-full">
        <Text className="text-sm font-semibold text-slate-600">
          {extractedData.total} images found
        </Text>
      </View>
      <View className="flex flex-row justify-between mt-2 h-12">
        <ButtonSecondary width={32} title="Save All" />
        <ButtonTertiary width={32} title="Share" >
          <Ionicons name="share-social" size={26} color={colors.secondary} />
        </ButtonTertiary>
      </View>
    </View>
  );
};

export default ShareSection;
