import { View, Text } from "react-native";
import React from "react";

const Test = () => {
  return (
    <View>
      {extractedData && extractedData?.images?.length > 0 && (
        <>
          <View className="mt-6 w-full h-64 flex items-center">
            <Image
              source={{ uri: selectImage }}
              className="w-full h-full rounded-xl"
            />
            <Pressable
              // onPress={() => SaveImageToLib(selectImage)}
              className="absolute bottom-3 right-3 p-1 rounded-md"
              style={{
                backgroundColor: colors.primary,
              }}
            >
              <MaterialIcons
                name="file-download"
                size={27}
                color={colors.secondary}
              />
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              borderRadius: 15,
            }}
            indicatorStyle="white"
          >
            {images.map((image, index) => (
              <TouchableOpacity
                key={index}
                className="mt-2 flex items-center"
                onPress={() => setSelectImage(image)}
              >
                <Image
                  source={{ uri: image }}
                  className="w-20 h-20 rounded-xl mr-2 mt-2 opacity-75"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          {total > 4 && (
            <Text
              className="mt-2 text-slate-500"
              style={{
                fontSize: 12,
              }}
            >
              Swipe right to view more images
            </Text>
          )}
          {/* Functionality buttons */}
          <ShareSection extractedData={extractedData} />
        </>
      )}
    </View>
  );
};

export default Test;
