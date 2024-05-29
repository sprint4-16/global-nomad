import { useEffect, useState } from 'react';
import MyPageForm from '@/components/MyPage/MyPageForm/MyPageForm';
import MyPageLayout from '@/components/MyPage/MyPageLayout/MyPageLayout';
import SideNavigationMenu from '@/components/SideNavigationMenu/SideNavigationMenu';
import { NavState } from '@/components/SideNavigationMenu/SideNavigationType';

export default function MyPage() {
  const [selectedState, setSelectedState] = useState<NavState>('profile');
  const [isMounted, setIsMounted] = useState(false);

  const handleNavClick = (state: NavState) => {
    setSelectedState(state);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <MyPageForm />;
}
