import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { getCookie } from '@/utils/cookie';
import Logo from './header/Logo_header';
import Mypage from './header/Mypage_header';
import Search from './header/Search_header';
import Login from './header/Login_header';
import { useRouter } from 'next/router';
import { instance } from '@/api/instance';

const Header = () => {
  const [cookies, setCookies] = useState('');
  useEffect(() => {
    setCookies(getCookie('accessToken'));
  }, [getCookie('accessToken')]);

  setInterval(async () => {
    if (getCookie('accessToken') && getCookie('refreshToken')) {
      await instance({
        method: 'POST',
        url: 'https://www.go-together.store:443/user/refresh',
        data: {
          refreshToken: getCookie('refreshToken'),
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, 1800000);

  const router = useRouter();

  return (
    <Container>
      <Logo />
      {router.asPath !== '/search' ? <Search /> : <div></div>}
      {cookies ? <Mypage /> : <Login />}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 30px;
`;
