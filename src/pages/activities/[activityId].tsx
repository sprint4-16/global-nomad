import { useRouter } from 'next/router';

export default function Activity() {
  const router = useRouter();

  return <>Activity page #{router.query.activityId}</>;
}
