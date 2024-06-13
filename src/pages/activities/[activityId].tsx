import { useGetActivity } from '@/apis/apiHooks/temporary';
import { useRouter } from 'next/router';

export default function Activity() {
  const router = useRouter();
  const { data, isLoading, error } = useGetActivity({ activityId: router.query.activityId?.toString() ?? '' });

  !isLoading && console.log(data);
  return <></>;
}
