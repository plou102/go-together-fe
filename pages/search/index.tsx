import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { IoSearchOutline } from 'react-icons/io5';
import Product from '../product';
import { getStorage, setStorage, removeStorage, deleteStorageItem } from '@/utils/storage';
import { useDispatch } from 'react-redux';
import { setModal } from '@/store/modal';
import { MESSAGES } from '@/constants/messages';
import PageTitle from '@/components/common/PageTitle';
import { Chip, TextField, Button, Divider } from '@mui/material';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { getProductList } from '@/apis/product';
import { ROUTES } from '@/constants/routes';
import { RootState } from '@/store';
import dayjs from 'dayjs';

const recommendKeywords = [
  '싱가포르',
  '프랑스',
  '산티아고',
  '일본',
  '이탈리아',
  '산티아고',
  '싱가포르',
  '프랑스',
  '이탈리아',
  '일본',
];

const Search = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [cookies, setCookies, removeCookies] = useCookies();
  const [isSaveRecentKeyword, setIsSaveRecentKeyword] = useState(cookies.isSaveRecentKeyword);
  const [showProduct, setShowProduct] = useState(false);
  const [showKeyword, setShowKeyword] = useState(true);
  const [recentKeywords, setRecentKeywords] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('recent');
  const [dateOption, setDateOption] = useState<Date | null>(null);
  const [people, setPeople] = useState(1);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    setRecentKeywords(getStorage('recentKeywords'));
  }, []);

  useEffect(() => {
    if (keyword) handleClickSearch();
  }, [sort, people, dateOption]);

  const handleClickSearch = async (item?: string) => {
    if (!item && !keyword) {
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.PRODUCT.CHECK_KEYWORD,
        }),
      );
    }
    setShowProduct(true);
    setShowKeyword(false);
    setKeyword(item ? item : keyword);

    const data = await getProductList(
      item ? item : keyword,
      page,
      sort,
      people,
      dateOption ? dayjs(dateOption).format('YYYY-MM-DD') : '',
    );
    setProduct(data.content);

    if (isSaveRecentKeyword) {
      setStorage('recentKeywords', item ? item : keyword);
      setRecentKeywords(getStorage('recentKeywords'));
    }
    // router.push(ROUTES.SEARCH_BY_KEYWORD(item ? item : keyword, 1));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.nativeEvent.isComposing === false && event.key) === 'Enter') {
      handleClickSearch();
    }
  };

  const handleFocusSearch = () => {
    setShowKeyword(true);
    setShowProduct(false);
  };

  const onDeleteKeyword = (item: string) => {
    deleteStorageItem('recentKeywords', item);
    setRecentKeywords(getStorage('recentKeywords'));
  };

  const onDeleteAllKeyword = () => {
    removeStorage('recentKeywords');
    setRecentKeywords(getStorage('recentKeywords'));
  };

  const onToggleSaveKeyword = () => {
    if (isSaveRecentKeyword) {
      removeCookies('isSaveRecentKeyword');
    } else {
      setCookies('isSaveRecentKeyword', true);
    }
    setIsSaveRecentKeyword((prev: boolean) => !prev);
  };

  return (
    <Container>
      <PageTitle title="상품 검색" />
      <SearchInputWrap>
        <TextField
          placeholder="검색어를 입력해 주세요."
          size="small"
          value={keyword}
          onChange={(event) => {
            if (showProduct) setShowProduct(false);
            if (!showKeyword) setShowKeyword(true);
            setKeyword(event.target.value);
          }}
          onFocus={handleFocusSearch}
          onKeyDown={handleKeyDown}
          fullWidth
        />
        <Button variant="text" onClick={() => handleClickSearch()}>
          <IoSearchOutline size={'22px'} />
        </Button>
      </SearchInputWrap>
      {showKeyword && (
        <>
          <RecentKeywords>
            <KeywordsHeader>
              <p>최근 검색어</p>
              <MenuList>
                {isSaveRecentKeyword && recentKeywords && (
                  <Button variant="text" onClick={onDeleteAllKeyword}>
                    전체 삭제
                  </Button>
                )}
                <Button variant="text" onClick={onToggleSaveKeyword}>
                  {isSaveRecentKeyword ? '자동저장 끄기' : '자동저장 켜기'}
                </Button>
              </MenuList>
            </KeywordsHeader>
            <Keywords>
              {isSaveRecentKeyword ? (
                recentKeywords.length > 0 ? (
                  recentKeywords.map((item: string, idx: number) => (
                    <Chip
                      key={idx}
                      label={item}
                      variant="outlined"
                      onDelete={() => onDeleteKeyword(item)}
                      onClick={() => handleClickSearch(item)}
                    />
                  ))
                ) : (
                  <p>최근 검색어가 없습니다</p>
                )
              ) : (
                <p>최근 검색어 저장이 꺼져있습니다.</p>
              )}
            </Keywords>
          </RecentKeywords>
          <RecommendKeywords>
            <KeywordsHeader>
              <p>인기 여행지</p>
            </KeywordsHeader>
            <Keywords>
              {recommendKeywords.map((item, idx) => (
                <Button key={idx} variant="contained" onClick={() => handleClickSearch(item)}>
                  {item}
                </Button>
              ))}
            </Keywords>
          </RecommendKeywords>
        </>
      )}
      <Divider />
      {showProduct && (
        <Product
          type="search"
          data={product}
          sort={sort}
          people={people}
          dateOption={dateOption}
          setSort={setSort}
          setPeople={setPeople}
          setDateOption={setDateOption}
        />
      )}
    </Container>
  );
};

export default Search;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 0;
  @media (max-width: 1200px) {
    padding: 16px;
  }
`;

const SearchInputWrap = styled.div`
  display: flex;
`;

const RecentKeywords = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RecommendKeywords = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const KeywordsHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Keywords = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const MenuList = styled.ul`
  display: flex;
  gap: 10px;
`;
