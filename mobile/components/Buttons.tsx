import { Text, PressableProps, Pressable, View } from "react-native";
import React, { FC } from "react";
import colors from "../lib/colors";

const ButtonSecondary: FC<
  {
    title: string;
    width?: number | string;
    height?: number | string;
    textSize?: string;
  } & PressableProps
> = ({ title, height, width, textSize = "lg", ...props }) => {
  return (
    <Pressable
      {...props}
      className={`rounded-xl flex items-center justify-center h-full w-full`}
      style={{
        backgroundColor: colors.secondary,
      }}
    >
      <Text
        className={`font-bold text-${textSize}`}
        style={{
          color: colors.primary,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const ButtonTertiary: FC<
  {
    title?: string;
    children?: React.ReactNode;
    width?: number | string;
    height?: number | string;
  } & PressableProps
> = ({ children, title, height, width, ...props }) => {
  return (
    <Pressable
      {...props}
      className={`${height && "h-" + height} ${
        width && "w-" + width
      } rounded-md flex items-center justify-center`}
      style={{
        backgroundColor: colors.tertiary,
      }}
    >
      <View className="flex flex-row items-center justify-center">
        {title && (
          <Text
            className="font-bold text-lg mx-2"
            style={{
              color: colors.secondary,
            }}
          >
            {title}
          </Text>
        )}
        {children}
      </View>
    </Pressable>
  );
};

export { ButtonSecondary, ButtonTertiary };
