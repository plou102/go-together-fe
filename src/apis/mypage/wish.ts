import { API_URLS } from '@/constants/apiUrls';
import { instance } from '../instance';

export const getMyWishList = async () => {
  const { data } = await instance.get(API_URLS.MYPAGE.WISH);
  return data;
};

export const deleteMyWish = async (id: object) => {
  await instance.delete(API_URLS.MYPAGE.WISH, id);
};
