import Camera from "../screens/Camera";
import SettingsScreen from "../screens/SettingsScreen";
import StackNavigator from "./StackNavigator";
import { IHomeScreenCard, TabScreen } from "./constants.types";

export const HomeScreenCards: IHomeScreenCard[] = [
  {
    title: "Pdf Reader",
    icon: "file-pdf",
    color: "red",
    route: "PdfReader",
  },
  {
    title: "Extract Images",
    icon: "file-image",
    color: "#ff8c00",
    route: "ExtractImages",
  },
  {
    title: "Pdf to Word",
    icon: "file-word",
    color: "skyblue",
    route: "PdfToWord",
  },
  {
    title: "Pdf to Excel",
    icon: "file-excel",
    color: "green",
    route: "PdfToExcel",
  },
];

export const TabScreens: TabScreen[] = [
  {
    id: 1,
    name: "Main",
    component: StackNavigator,
    icon: "ios-home-sharp",
    focusedIcon: "ios-home-outline",
  },

  {
    id: 2,
    name: "Camera",
    component: Camera,
    icon: "camera",
    focusedIcon: "camera-outline",
  },
  {
    id: 3,
    name: "Settings",
    component: SettingsScreen,
    icon: "settings",
    focusedIcon: "settings-outline",
  },
];
