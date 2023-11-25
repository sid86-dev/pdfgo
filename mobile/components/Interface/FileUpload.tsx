import { Pressable, Text, View } from "react-native";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { IFile, Step } from "../../types";
import { Ionicons } from "@expo/vector-icons";
import { blobToBase64 } from "../../lib/utils";
import TouchableArea from "../TouchableArea";
interface IProps {
  setFile: (file: IFile) => void;
  setStep: Dispatch<SetStateAction<Step>>;
}

const FileUpload: FC<IProps> = ({ setFile, setStep }) => {
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  const handleUploadPDF = async () => {
    // Open document picker
    setIsSelecting(true);
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
        multiple: false,
      });
      if (file.type === "success") {
        // Get file info
        const { uri, name, mimeType, size } = file;

        // Convert blob to base64
        let blob: Blob = await fetch(uri).then((res) => res.blob());
        let base64 = (await blobToBase64(blob)) as string;

        base64 = base64.replace("data:application/pdf;base64,", "");

        setFile({
          uri,
          size,
          name,
          mimeType,
          base64: base64,
        });
        setStep(0.45);
      }
      setIsSelecting(false);
    } catch (error) {
      console.error("Error uploading PDF:", error);
      setIsSelecting(false);
    }
  };
  return (
    <TouchableArea isSelecting={isSelecting} handlePress={handleUploadPDF}>
      <View className="justify-center items-center py-8">
        <Ionicons name="cloud-upload-outline" size={34} color="gray" />
        <Text className="font-semibold mt-5 text-slate-500">
          Select a PDF file to upload
        </Text>
        <Text className="text-slate-500 text-xs my-1">
          {"("}Maximum file size is 25MB{")"}
        </Text>
      </View>
    </TouchableArea>
  );
};

export default FileUpload;
