import * as Clipboard from "expo-clipboard";

// Convert blob to base64
export function blobToBase64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export const addMimeType = (base64: string) => {
  var signatures: any = {
    R0lGODdh: "image/gif",
    R0lGODlh: "image/gif",
    iVBORw0KGgo: "image/png",
    "/9j/": "image/jpg",
  };

  function detectMimeType(b64: string) {
    for (var s in signatures) {
      if (b64.indexOf(s) === 0) {
        return signatures[s];
      }
    }
  }

  return `data:${detectMimeType(base64)};base64,${base64}`;
};

// Generate a unique ID
export function generateId() {
  return Math.random().toString(36).substr(2, 8);
}

// Copy to clipboard
export const copyToClipboard = async (text: string) => {
  await Clipboard.setStringAsync(text);
};
