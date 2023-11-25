export interface IHomeScreenCard {
  title: string;
  icon: string;
  color: string;
  route: string;
}

type TabScreen = {
  id: number;
  name: string;
  component: React.FC;
  icon: string;
  focusedIcon: string;
};
