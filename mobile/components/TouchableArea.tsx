import { Pressable } from "react-native";
import React, { FC } from "react";

interface IProps {
  children: React.ReactNode;
  isSelecting: boolean;
  handlePress: () => void;
}

const TouchableArea: FC<IProps> = ({ isSelecting, handlePress, children }) => {
  return (
    <Pressable
      disabled={isSelecting}
      className={`border-dashed ${
        isSelecting && "opacity-50"
      } rounded-2xl border-slate-400 border bg-slate-50`}
      onPress={handlePress}
    >
      {children}
    </Pressable>
  );
};

export default TouchableArea;
