export type NavState = 'profile' | 'history' | 'experiences' | 'status';

export interface NavItem {
  id: number;
  icon: JSX.Element;
  title: string;
  state: NavState;
}

export interface SideNavigationMenuProps {
  onNavClick: (state: NavState) => void;
}
