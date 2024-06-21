export const ROUTE = {
  HOME: '/',
  LOGIN: '/auth/signin',
  SIGNUP: '/auth/signup',

  // 체험 상세 페이지
  ACTIVITY_DETAIL: '/activity-detail',

  // 내 정보 페이지
  USER: '/user',

  // 내 정보 모바일 페이지
  USER_MOBILE: '/my-page',

  // 예약 내역 페이지
  RESERVATIONS: '/user/reservations',

  // 내 체험 관리 페이지
  USER_ACTIVITIES: '/user/activities',

  // 내 체험 등록 페이지
  ACTIVITY_POST: '/user/activity-post',

  // 내 체험 수정 페이지
  ACTIVITY_EDIT: '/user/activity-edit',

  // 예약 현황 페이지
  RESERVATION_CALENDAR: '/user/reservation-calendar',
} as const;

export const GNB_REQUIRES: string[] = [
  ROUTE.HOME,
  ROUTE.ACTIVITY_DETAIL,
  ROUTE.USER,
  ROUTE.USER_MOBILE,
  ROUTE.RESERVATIONS,
  ROUTE.USER_ACTIVITIES,
  ROUTE.ACTIVITY_POST,
  ROUTE.ACTIVITY_EDIT,
  ROUTE.RESERVATION_CALENDAR,
] as const;

export const END_POINT = {
  LOGIN: '/auth/login',
  TOKENS: '/auth/tokens',

  ACTIVITIES: '/activities',

  MY_ACTIVITIES: '/my-activities',

  MY_NOTIFICATIONS: '/my-notifications',

  MY_RESERVATIONS: '/my-reservations',

  USERS: '/users',
} as const;

export const COOKIE_NAMES = ['accessToken', 'refreshToken', 'nickname', 'profileImageUrl'] as const;

export const SIDE_NAV_MENU_REQUIRES: string[] = [
  ROUTE.USER,
  ROUTE.RESERVATIONS,
  ROUTE.USER_ACTIVITIES,
  ROUTE.ACTIVITY_POST,
  ROUTE.ACTIVITY_EDIT,
  ROUTE.RESERVATION_CALENDAR,
] as const;

export const RESERVATION_STATE_LABEL_MAP = {
  pending: '예약 신청',
  confirmed: '예약 완료',
  canceled: '예약 취소',
  declined: '예약 거절',
  completed: '체험 완료',
} as const;

export const COOKIE = {
  ACCESS_TOKEN: 'accessToken',
  PROFILE_IMAGE_URL: 'profileImageUrl',
  NICKNAME: 'nickname',
};
