import { View, Text, Image } from "react-native";
import React, { FC } from "react";
import { IFile } from "../../types";
import colors from "../../lib/colors";

interface IProps {
  file: IFile;
}

const FileView: FC<IProps> = ({ file }) => {
  return (
    <View
      className="rounded-2xl w-full py-9 h-40"
      style={{
        backgroundColor: colors.tertiary,
      }}
    >
      <View className="flex flex-row  px-5 w-full">
        <View>
          <Image
            source={require("../../assets/images/icons/pdf.png")}
            style={{ width: 80, height: 80 }}
          />
        </View>
        <View className="ml-5 w-[65%]">
          <Text className="font-bold text-xs">
            {file.name.substring(0, 50)} {file.name.length > 50 && "....pdf"}
          </Text>
          <Text className="text-xs text-slate-500 absolute bottom-0">
            {(file.size && file.size / 1024)?.toFixed(1)} KB
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FileView;
