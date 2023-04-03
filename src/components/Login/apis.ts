import { instance } from '@/apis/instance';
import { MESSAGES } from '@/constants/messages';
import { alterModal } from '../SignIn/function';

export const login = async (data: any, dispatch: any, router: any, setCookies: any) => {
  await instance({
    method: 'POST',
    url: 'https://www.go-together.store:443/auth/login',
    data: data,
  })
    .then(async (res) => {
      console.log(res);
      if (res.status === 200 && res.data.role === 'ROLE_USER') {
        await setCookies('accessToken', res.data.accessToken as string);
        await setCookies('refreshToken', res.data.refreshToken as string);
        await alterModal(MESSAGES.LOGIN.COMPLETE_LOGIN, dispatch);
        await router.back();
      } else if (res.status === 200 && res.data.role !== 'ROLE_USER') {
        await setCookies('accessToken', res.data.accessToken as string);
        await setCookies('refreshToken', res.data.refreshToken as string);
        await setCookies('isAdmin', res.data.role);
        await alterModal(MESSAGES.LOGIN.ADMIN_LOGIN, dispatch);
        await router.push('/admin');
      } else if (res.status === 401) {
        await alterModal('탈퇴된 계정입니다. 다른 이메일로 로그인해주세요.', dispatch);
      } else if (res.status === 404) {
        await alterModal(
          '존재하지 않는 이메일이이거나 비밀번호가 틀렸습니다. 다시 확인해주세요.',
          dispatch,
        );
      } else {
        await alterModal(MESSAGES.LOGIN.ERROR_LOGIN, dispatch);
      }
    })
    .catch(async (error) => {
      console.log(error);
      await alterModal(MESSAGES.LOGIN.ERROR_LOGIN, dispatch);
      // throw new Error(error);
    });
};
