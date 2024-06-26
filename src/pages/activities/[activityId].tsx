import { useRouter } from 'next/router';
import useCookies from '@/hooks/useCookies';

import ActivityDetailLayout from '@/pageLayouts/ActivityDetailLayout';
import { COOKIE, ROUTE } from '@/constants';
import AlertModal from '@/components/Popup/AlertModal/AlertModal';
import Header from './_skeleton-ui/skeleton-header';
import { useGetActivity } from '@/apis/apiHooks/temporary';

export default function Activity() {
  const router = useRouter();

  const { data, isLoading } = useGetActivity({ activityId: router.query.activityId?.toString() ?? '' });

  const { getCookie } = useCookies();
  const accessToken = getCookie(COOKIE.ACCESS_TOKEN);
  const onConfirm = () => {
    router.replace(ROUTE.LOGIN);
  };

  const handleModalOpen = () => {};

  if (!accessToken) {
    return (
      <AlertModal
        alertMessage="로그인 후에 이용할 수 있습니다."
        onConfirm={onConfirm}
        isModalOpen={true}
        handleModalOpen={handleModalOpen}
      />
    );
  }

  return <>{isLoading ? <Header /> : <ActivityDetailLayout data={data} />}</>;
}
