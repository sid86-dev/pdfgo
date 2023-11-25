import {
  View,
  Text,
  Pressable,
  Animated,
  Dimensions,
  ActivityIndicator,
  Platform,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import React, { FC, useEffect, useRef, useState } from "react";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import FileUpload from "../components/Interface/FileUpload";
import FileView from "../components/Interface/FileView";
import { ExtractedImagesData, IFile, Step } from "../types";
import colors from "../lib/colors";
import { Ionicons } from "@expo/vector-icons";
import { FlatGrid } from "react-native-super-grid";
import * as Progress from "react-native-progress";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import TouchableArea from "../components/TouchableArea";
import { copyToClipboard, generateId } from "../lib/utils";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

interface IProps {
  navigation: any;
}

const ExtractImagesScreen: FC<IProps> = ({ navigation }) => {
  const [file, setFile] = useState<IFile | null>(null);
  const [fileKey, setFileKey] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [extractedData, setExtractedData] = useState<ExtractedImagesData>({
    total: 0,
    images: [],
    show: false,
  });
  const [step, setStep] = useState<Step>(0.1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [resultState, setResultState] = useState({
    isDownloading: false,
    isSaved: false,
  });

  const translateLeftValue = useState(new Animated.Value(0))[0];
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const stepViewRef = useRef<any>(null);
  let screenWidth = Dimensions.get("window").width;
  let screenHeight = Dimensions.get("window").height;

  const ws = new WebSocket("wss://pdfgo-server.onrender.com");
  //  const ws = new WebSocket("wss://localhost:3000");

  // Animate the Translate View to the left
  function animateLeft() {
    Animated.timing(translateLeftValue, {
      toValue: 500,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  // Animate the Translate View to the right
  function animateRight() {
    Animated.timing(translateLeftValue, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }

  // Reset the state to the initial state
  const resetState = () => {
    setFile(null);
    setExtractedData({ total: 0, images: [], show: false });
    setStep(0.1);
    setIsProcessing(false);
    setImages([]);
    setTotal(0);
    setResultState({ isDownloading: false, isSaved: false });
    // ws.close();
  };

  // Register the client with a unique ID on the server
  const sendDataToWS = async () => {
    setIsProcessing(true);
    const clientId = await SecureStore.getItemAsync("token");
    const fileId = generateId();
    setFileKey(fileId);
    const registerData = {
      base64: file?.base64,
      client_id: clientId,
      file_id: fileId,
    };
    console.log({
      base64: file?.base64.substring(0, 100),
      client_id: clientId,
      file_id: fileId,
    });
    ws.send(JSON.stringify(registerData));

    setExtractedData({ ...extractedData, show: true });
  };

  // Handle incoming data from the server
  ws.onmessage = (e: any) => {
    try {
      const data = JSON.parse(e.data);
      // Handle incoming data from the server
      if (data.total) {
        setTotal(data.total);
      }
      if (data.url) {
        setImages((prev) => [...prev, data.url]);
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  };

  // Download image
  const downloadPhoto = async (photoUrl: string) => {
    const fileName = photoUrl.replace(/^.*[\\\/]/, "");
    let imageFullPathInLocalStorage = FileSystem.documentDirectory + fileName;
    return new Promise(async (resolve) => {
      FileSystem.downloadAsync(photoUrl, imageFullPathInLocalStorage).then(
        async ({ uri }) => {
          MediaLibrary.saveToLibraryAsync(imageFullPathInLocalStorage);
          return resolve(imageFullPathInLocalStorage);
        }
      );
    });
  };

  // save all images
  const saveAllImageToGallery = async () => {
    setResultState({ ...resultState, isDownloading: true });

    let client_id = (await SecureStore.getItemAsync("token")) as string;

    getShortUrl(client_id, fileKey);

    const promises = images.map((image) => downloadPhoto(image));
    await Promise.all(promises);
    animateLeft();
    setTimeout(() => {
      setResultState({ ...resultState, isDownloading: false, isSaved: true });
    }, 160);
  };

  // get short url
  const getShortUrl = async (client_id: string, key: string) => {
    console.log("client_id", client_id);
    console.log("key", key);
    const response = await fetch(`https://gopdf-server.onrender.com/shorturl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `https://gopdf-web.vercel.app/view?client_id=${client_id}&key=${key}`,
      }),
    });
    const data = await response.json();
    setShortUrl(data.url);
  };

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Link copied to clipboard 🚀",
      position: "top",
      topOffset: 80,
      visibilityTime: 1400,
    });
  };

  // Shake animation
  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 6,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -6,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 6,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Handle images extraction
  useEffect(() => {
    if (images.length === total && total > 0) {
      setExtractedData({ total, images, show: true });
      setIsProcessing(false);
      setStep(1);
      console.log(images);
    }
  }, [images]);

  // Handle websocket connection
  useEffect(() => {
    if (!ws) return;

    ws.onopen = () => {
      console.log("Connected to the WebSocket server.");
    };

    ws.onerror = (e) => {
      // an error occurred
      console.log(e);
    };

    return () => {
      ws.onclose = () => {
        console.log("Connection to the WebSocket server closed.");
      };
    };
  }, []);

  // Animate slide up
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue:
        Dimensions.get("window").height /
        (isProcessing || extractedData.total > 0
          ? Platform.OS === "ios"
            ? 1.05
            : 1
          : Platform.OS === "ios"
          ? 2.8
          : 2.6),
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isProcessing, extractedData]);

  // Animate step view
  useEffect(() => {
    if (step === 1) {
      stepViewRef.current?.animate({ 0: { scale: 1 }, 1: { scale: 0.8 } });
    } else {
      stepViewRef.current?.animate({ 0: { scale: 1 }, 1: { scale: 1 } });
    }
  }, [step]);

  return (
    <Wrapper>
      <Header isBack={true} />

      <View className="mt-6">
        <Text className="mb-5 text-xl">
          Upload
          <Text className="font-semibold"> File</Text>
        </Text>
        {/* File upload Box */}
        {!file ? (
          <Animated.View
            style={{ transform: [{ translateX: shakeAnimation }] }}
          >
            <FileUpload setStep={setStep} setFile={setFile} />
          </Animated.View>
        ) : (
          <>
            <FileView file={file} />
            <Pressable
              className="items-center absolute bottom-4 right-4"
              onPress={() => {
                setFile(null);
                setStep(0.1);
              }}
            >
              <Ionicons
                name="trash-bin-sharp"
                size={25}
                color={colors.secondary}
              />
            </Pressable>
          </>
        )}
      </View>

      {/* Process button */}
      <Pressable
        className={`rounded-xl flex items-center justify-center mt-12 h-14 animate-bounce ${
          isProcessing && "opacity-80"
        }`}
        onPress={() => (!file ? startShake() : sendDataToWS())}
        disabled={isProcessing}
        style={{
          backgroundColor: colors.secondary,
        }}
      >
        {isProcessing ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <Text className="text-white font-bold text-xl text-center">
            Process
          </Text>
        )}
      </Pressable>

      {/* Bottom Sheet */}
      <Animated.View
        className="bg absolute -bottom-10 rounded-3xl w-screen"
        style={[{ height: slideAnim, backgroundColor: colors.tertiary }]}
      >
        {/* Content within the sliding component */}
        <View className="px-7 pt-5">
          <ScrollView className="mb-20" showsVerticalScrollIndicator={false}>
            {/* Done Button */}
            {step > 0.6 && (
              <Pressable
                className="flex flex-row items-center justify-center py-3 absolute top-0 right-0 z-50 rounded-2xl "
                onPress={resetState}
              >
                <Text
                  className="font-semibold mt-1 underline"
                  style={{
                    color: colors.secondary,
                    fontSize: 16,
                  }}
                >
                  Done
                </Text>
              </Pressable>
            )}

            {/* Step */}
            <View className="mt-0">
              <Text className="font-bold text-2xl mb-2">
                Step {step < 0.12 ? 1 : step < 1 ? 2 : 3}{" "}
                <Text className="text-2xl font-medium">of</Text> 3
              </Text>
              <Progress.Bar
                unfilledColor={colors.primary}
                color={colors.secondary}
                progress={step}
                borderWidth={0}
                animated={true}
                animationConfig={{
                  speed: 1,
                }}
              />
            </View>

            {/* Body */}
            <View className={`mt-3 h-full`}>
              {/* Title */}
              <Text className="font-bold text-xl">
                Effortlessly extract images from
              </Text>
              <Text
                className="font-bold text-xl"
                style={{
                  color: colors.secondary,
                }}
              >
                your PDF files
              </Text>

              {/* Resut Section */}
              {extractedData.show && (
                <Animated.View
                  className="mt-8 h-full"
                  style={[
                    {
                      transform: [
                        {
                          translateX: translateLeftValue,
                        },
                      ],
                      display: resultState.isSaved ? "none" : "flex",
                    },
                  ]}
                >
                  {/* Progress and Save Buttton */}
                  <View
                    className="rounded-xl"
                    style={{
                      backgroundColor: colors.primary,
                    }}
                  >
                    <Pressable
                      className={`h-14 
                       rounded-xl flex items-center justify-center`}
                      style={{
                        width: `${
                          images.length === 0
                            ? 10
                            : 10 +
                              parseInt(
                                ((images.length / total) * 90).toFixed(0)
                              )
                        }%`,
                        backgroundColor: colors.secondary,
                      }}
                      onPress={
                        !isProcessing ? () => saveAllImageToGallery() : () => {}
                      }
                    >
                      <Text
                        className={`font-bold ${!isProcessing && "text-xl"}`}
                        style={{
                          color: colors.primary,
                        }}
                      >
                        {resultState.isDownloading ? (
                          <ActivityIndicator
                            size="small"
                            color={colors.primary}
                          />
                        ) : isProcessing && images.length === 0 ? (
                          "2%"
                        ) : isProcessing && images.length > 0 ? (
                          ((images.length / total) * 100).toFixed(0) + "%"
                        ) : (
                          "Save All"
                        )}
                      </Text>
                    </Pressable>
                  </View>

                  <Text className="text-center mt-1 text-xs text-slate-900">
                    {images.length === 0
                      ? "Processing..."
                      : isProcessing
                      ? "Extracting images..."
                      : "Tap to save all images to gallery"}
                  </Text>

                  {images.length > 0 && (
                    <>
                      {/* Text */}
                      <Text className="text-lg mt-8 ml-1">
                        Total
                        <Text className="font-bold">
                          {" "}
                          {images.length}/{total}{" "}
                        </Text>
                        images extracted
                      </Text>

                      {/* Render extracted Images */}
                      <View className="my-2 pb-20">
                        <View className="flex flex-row flex-wrap">
                          {images.map((item) => (
                            <Pressable className="rounded-xl overflow-hidden p-0 m-1">
                              <Image
                                source={{ uri: item }}
                                style={{
                                  width: screenWidth / 3 - 30,
                                  height: screenHeight / 6 - 30,
                                }}
                              />
                            </Pressable>
                          ))}
                        </View>
                      </View>
                    </>
                  )}
                </Animated.View>
              )}

              {/* Share Section */}
              {resultState.isSaved && (
                <View className="mt-5">
                  {/* Back Button */}
                  <Pressable
                    className="flex flex-row items-center justify-center py-3 absolute top-0 left-0"
                    onPress={() => {
                      animateRight();
                      setTimeout(() => {
                        setResultState({
                          isSaved: false,
                          isDownloading: false,
                        });
                      }, 160);
                    }}
                  >
                    <Ionicons
                      name="arrow-back-sharp"
                      size={28}
                      color={colors.secondary}
                      className="mr-1"
                    />
                  </Pressable>

                  {/* Text */}
                  <Text className="font-bold text-xl text-center mb-2 mt-16">
                    Saved{" "}
                    <Ionicons
                      name="checkmark-circle-sharp"
                      size={20}
                      color={colors.secondary}
                      className="ml-1"
                    />
                  </Text>
                  <Text className="mb-8">
                    All <Text className="font-bold">{images.length}</Text>{" "}
                    images have been saved to your gallery. Click on the button
                    below to share the link with your friends.
                  </Text>

                  {/* Share Button */}
                  <TouchableArea handlePress={() => {}} isSelecting={false}>
                    <View className="flex flex-row items-center justify-center py-3">
                      <Text className="font-semibold text-lg text-slate-500 mx-3">
                        {shortUrl}
                      </Text>
                      <Ionicons
                        onPress={() => {
                          copyToClipboard(shortUrl);
                          showToast();
                        }}
                        name="copy-outline"
                        size={20}
                        color={colors.secondary}
                        className="ml"
                      />
                    </View>
                  </TouchableArea>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </Animated.View>
    </Wrapper>
  );
};

export default ExtractImagesScreen;

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});
