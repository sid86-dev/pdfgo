export type RootStackParamList = {
  Home;
  Profile: { userId: string };
  Feed: { sort: "latest" | "top" } | undefined;
};

export interface IFile {
  name: string;
  size?: number | undefined;
  uri: string;
  mimeType?: string | undefined;
  base64: string;
}

export type Step = number;

export interface ExtractedImagesData {
  total: number;
  images: string[];
  show: boolean;
}

export interface IWebsocket {
  url: string;
  onOpen?: () => void;
  onClose?: () => void;
  onMessage?: (data: any) => void;
  onError?: (error: any) => void;
  reconnect?: boolean;
  reconnectInterval?: number;
  protocols?: string[];
  getRef?: (ref: WebSocket) => void;
  renderError?: (e: any) => React.ReactNode;
  renderLoading?: () => React.ReactNode;
  renderClosed?: () => React.ReactNode;
  renderOpen?: () => React.ReactNode;
  renderMessage?: (data: any) => React.ReactNode;
  renderSend?: (data: any) => React.ReactNode;
  renderDebug?: (data: any) => React.ReactNode;
  renderWrapper?: (data: any) => React.ReactNode;
  renderSeparator?: (data: any) => React.ReactNode;
  renderContainer?: (data: any) => React.ReactNode;
  renderActions?: (data: any) => React.ReactNode;
  renderHeader?: (data: any) => React.ReactNode;
  renderFooter?: (data: any) => React.ReactNode;
  renderLeftActions?: (data: any) => React.ReactNode;
  renderRightActions?: (data: any) => React.ReactNode;
  renderLeftHeader?: (data: any) => React.ReactNode;
  renderRightHeader?: (data: any) => React.ReactNode;
  renderLeftFooter?: (data: any) => React.ReactNode;
  renderRightFooter?: (data: any) => React.ReactNode;
  renderLeftSend?: (data: any) => React.ReactNode;
  renderRightSend?: (data: any) => React.ReactNode;
  renderLeftDebug?: (data: any) => React.ReactNode;
  renderRightDebug?: (data: any) => React.ReactNode;
  renderLeftWrapper?: (data: any) => React.ReactNode;
  renderRightWrapper?: (data: any) => React.ReactNode;
  renderLeftSeparator?: (data: any) => React.ReactNode;
  renderRightSeparator?: (data: any) => React.ReactNode;
  renderLeftContainer?: (data: any) => React.ReactNode;
  renderRightContainer?: (data: any) => React.ReactNode;
  renderLeftActionsContainer?: (data: any) => React.ReactNode;
  renderRightActionsContainer?: (data: any) => React.ReactNode;
  renderLeftHeaderContainer?: (data: any) => React.ReactNode;
  renderRightHeaderContainer?: (data: any) => React.ReactNode;
  renderLeftFooterContainer?: (data: any) => React.ReactNode;
  renderRightFooterContainer?: (data: any) => React.ReactNode;
  renderLeftSendContainer?: (data: any) => React.ReactNode;
  renderRightSendContainer?: (data: any) => React.ReactNode;
  renderLeftDebugContainer?: (data: any) => React.ReactNode;
  renderRightDebugContainer?: (data: any) => React.ReactNode;
  renderLeftWrapperContainer?: (data: any) => React.ReactNode;
  renderRightWrapperContainer?: (data: any) => React.ReactNode;
  renderLeftSeparatorContainer?: (data: any) => React.ReactNode;
  renderRightSeparatorContainer?: (data: any) => React.ReactNode;
  renderLeftContainerContainer?: (data: any) => React.ReactNode;
  renderRightContainerContainer?: (data: any) => React.ReactNode;
  renderLeftActionsWrapper?: (data: any) => React.ReactNode;
  renderRightActionsWrapper?: (data: any) => React.ReactNode;
}

declare module "react-native-webview" {
  export interface WebViewMessageEvent {
    nativeEvent: {
      data: string;
    };
  }
}
