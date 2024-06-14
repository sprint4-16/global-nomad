import { COOKIE_NAMES } from '@/constants/';
import Cookies from 'js-cookie';

export default function useCookies() {
  const getCookie = (cookieName: string) => {
    return Cookies.get(cookieName);
  };

  const updateCookie = (cookieName: string, value: string | number) => {
    Cookies.set(cookieName, value.toString());
  };

  const deleteCookie = (cookieName: string) => {
    Cookies.remove(cookieName);
  };

  const deleteAllCookie = () => {
    COOKIE_NAMES.forEach((cookieName) => {
      deleteCookie(cookieName);
    });
  };

  return { getCookie, updateCookie, deleteCookie, deleteAllCookie };
}
