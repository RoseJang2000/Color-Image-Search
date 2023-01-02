import { useEffect, useState } from 'react';
import ImageItem from '../components/ImageItem';
import axios from 'axios';
import './ImageItemList.css';
import TopButton from './TopButton';
import Masonry from 'react-masonry-css';

const ImageItemList = ({ keyword, page, setPage }) => {
  const [prevKeyword, setPrevKeyword] = useState(keyword);
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // * 화면 크기에 따라 layout column 숫자 변경
  const changeGap = () => {
    const size = window.innerWidth;
    if (size <= 649) {
      return 2;
    } else if (size <= 899) {
      return 3;
    } else if (size <= 1599) {
      return 4;
    }
    return 5;
  };

  const windowResize = () => {
    setGap(() => changeGap());
  };

  const [gap, setGap] = useState(() => changeGap());

  // ! 카카오 검색 API 데이터 가져오기
  const Kakao = axios.create({
    baseURL: 'https://dapi.kakao.com',
    headers: {
      Authorization: process.env.REACT_APP_KAKAO_REST_API_KEY,
    },
  });

  const imageSearch = (params) => {
    return Kakao.get('/v2/search/image', { params });
  };

  const imageSearchHttpHandler = async (query, page) => {
    const params = {
      query: `${query} aesthetic`,
      page,
      size: 20,
    };
    const { data } = await imageSearch(params);

    setDatas((prev) => [...prev, ...data.documents]);
    setIsLoading(false);
  };

  useEffect(() => {
    // console.log('page: ', page);
    // console.log('keyword: ', keyword);
    // console.log('prevKeyword: ', prevKeyword);

    if (keyword !== prevKeyword) {
      // ! keyword(색상)가 바뀔 경우에는 Datas에 있는 사진을 초기화
      // console.log('Clear Data!');
      setDatas([]);
    }

    imageSearchHttpHandler(keyword, page);
    setPrevKeyword(keyword);
  }, [keyword, page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', windowResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.addEventListener('resize', windowResize);
    };
  });

  const handleScroll = () => {
    const scrollHeight = Math.ceil(document.documentElement.scrollHeight);
    const scrollTop = Math.ceil(document.documentElement.scrollTop);
    const clientHeight = Math.ceil(document.documentElement.clientHeight);

    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <main>
      <section>
        {isLoading ? (
          ''
        ) : (
          <Masonry breakpointCols={gap} className="list" columnClassName="column">
            {datas.map((data, idx) => (
              <ImageItem key={idx} data={data} />
            ))}
          </Masonry>
        )}
        <TopButton />
      </section>
    </main>
  );
};

export default ImageItemList;
