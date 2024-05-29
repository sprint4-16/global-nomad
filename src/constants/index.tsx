export const ROUTE = {
  HOME: '/',
  LOGIN: '/signin',
  SIGNUP: '/signup',

  // 체험 상세 페이지
  ACTIVITY_DETAIL: '/activity-detail',

  // 내 정보 페이지
  USER: 'user',

  // 예약 내역 페이지
  RESERVATIONS: '/user/reservations',

  // 내 체험 관리 페이지
  USER_ACTIVITIES: '/user/activities',

  // 내 체험 등록 페이지
  ACTIVITIY_POST: '/user/activity-post',

  // 내 체험 수정 페이지
  ACTIVITIY_EDIT: '/user/activity-edit',

  // 예약 현황 페이지
  RESERVATION_CALENDAR: '/user/reservation-calendar',
} as const;

export const GNB_REQUIRES: string[] = [
  ROUTE.HOME,
  ROUTE.ACTIVITY_DETAIL,
  ROUTE.USER,
  ROUTE.RESERVATIONS,
  ROUTE.USER_ACTIVITIES,
  ROUTE.ACTIVITIY_POST,
  ROUTE.ACTIVITIY_EDIT,
  ROUTE.RESERVATION_CALENDAR,
] as const;

export const SIDE_NAV_MENU_REQUIRES: string[] = [
  ROUTE.USER,
  ROUTE.RESERVATIONS,
  ROUTE.USER_ACTIVITIES,
  ROUTE.ACTIVITIY_POST,
  ROUTE.ACTIVITIY_EDIT,
  ROUTE.RESERVATION_CALENDAR,
] as const;
