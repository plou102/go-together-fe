export const API_URLS = {
  EMAIL_DUPL_CHECK: '/auth/email/check',
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  SEARCH_BY_KEYWORD: (
    keyword: string,
    page = 1,
    sort = 'recent',
    people = 1,
    dateOption: string | null = '',
  ) =>
    `/products/search?keyword=${keyword}&page=${page}&sort=${sort}&people=${people}&dateOption=${dateOption}`,
  SEARCH_BY_CATEGORY: (
    category: string,
    page: number,
    sort = 'recent',
    people = 1,
    dateOption: string | null = '',
  ) =>
    `/products/categories/${category}?page=${page}&sort=${sort}&people=${people}&dateOption=${dateOption}`,
  DETAIL: (id: string) => `/products/detail/${id}`,
  BUY: (id: string) => `/buy/${id}`,
  BUY_LIST: (page: number) => `/buy/${page}`,
  CART: '/cart',
  ORDER: '/order',
  WISHLIST: '/wishlist',
  BOARD: (type: string, keyword: string | null = '', pageNumber: number) =>
    keyword === null
      ? `/board?type=${type}&pageNumber=${pageNumber}`
      : `/board?type=${type}&keyword=${keyword}&pageNumber=${pageNumber}`,
  BOARD_AUTH: (id: string) => `/board/authority/${id}`,
  BOARD_DETAIL: (id: number) => `/board/${id}`,
  BOARD_ADD: '/board',
  BOARD_EDIT: (boardId: number) => `/board/${boardId}`,
  CATEGORY: '/categories',
  CATEGORY_DETAIL: (id: string) => `/categories/${id}`,
  UPLOAD_IMAGE: (category: string) => `/image?category=${category}`,
  USER_TYPE: '/user/type',
  PRODUCT_TYPE: '/page/group/products',
  MYPAGE: {
    RESERVATIONS: '/reservations',
    RESERVATIONS_BY_ID: (id: number) => `/reservations/${id}`,
    REVIEW: '/board/myreviews',
  },
  ADMIN: {
    PRODUCT: '/admin/products',
    PRODUCT_BY_ID: (id: string) => `/admin/products/${id}`,
    PRODUCT_PAGE: (page = 1) => `/admin/products?page=${page}`,
    PRODUCT_DETAIL: (id: string) => `/admin/products/detail/${id}`,
    CATEGORY: '/categories',
    CATEGORY_BY_ID: (id: string) => `/categories/${id}`,
    RECOMMEND: '/page/popular/regions',
    RECOMMEND_PAGE: (page = 1) => `/page/popular/regions?page=${page}`,
    RECOMMEND_BY_ID: (id: string) => `/admin/regions/${id}`,
    BANNERLIST: '/admin/page/bannerlist',
    BANNER_BY_ID: (id: number) => `/admin/page/banner/${id}`,
    BANNER_ADD: '/admin/page/banner',
    BANNER_EDIT: (id: number) => `/admin/page/banner/${id}`,
  },
  BANNERLIST: '/bannerlist',
  PRODUCT_BY_ID: (id: number) => `/products/detail/${id}`,
  RELATED_PRODUCTS: (id: number) => `/products/related/${id}`,
  POPULAR_REGIONS: '/page/popular/regions',
  POPULAR_PRODUCTS: (id: number | undefined) =>
    id ? `/page/popular/products?categoryId=${id}` : '/page/popular/products',
  GROUP_PRODUCTS: '/page/group/products',
  USER_INFO: '/user/myInfo',
};
