import { useEffect, useRef, useState } from 'react';
import ImageItem from './ImageItem';
import './ImageItemList.css';
import TopButton from './TopButton';
import Masonry from 'react-masonry-css';
import {
  ImageItemListProps,
  RequestParams,
  ResponseData,
} from 'interfaces/AllTypes.interfaces';
import Kakao from 'api/Kakao';

const ImageItemList = ({ keyword, page, setPage }: ImageItemListProps) => {
  const [prevKeyword, setPrevKeyword] = useState<string>(keyword);
  const [datas, setDatas] = useState<ResponseData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const preventRef = useRef(true); // ! 무한스크롤 중복 실행 방지
  const observerRef = useRef(null); // ! 무한스크롤 옵저버 엘리먼트용
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

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
  const imageSearch = (params: RequestParams) => {
    return Kakao.get('/v2/search/image', { params });
  };

  const imageSearchHttpHandler = async (query: string, page: number) => {
    const params = {
      query: `${query} aesthetic`,
      page,
      size: 20,
    };
    const { data } = await imageSearch(params);
    if (data.meta.is_end) {
      // * API 데이터 마지막 페이지일 경우
      setIsLastPage(true);
    }
    preventRef.current = true;
    setDatas((prev) => [...prev, ...data.documents]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (keyword !== prevKeyword) {
      // ! keyword(색상)가 바뀔 경우에는 Datas에 있는 사진을 초기화
      setDatas([]);
    }

    imageSearchHttpHandler(keyword, page);
    setPrevKeyword(keyword);
  }, [keyword, page]);

  useEffect(() => {
    window.addEventListener('resize', windowResize);
    return () => {
      window.addEventListener('resize', windowResize);
    };
  });

  const obsHandler = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];

    if (!isLastPage && target.isIntersecting && preventRef.current) {
      // ! 옵저버를 만났을 때 마지막 페이지가 아니고, 중복 실행이 아닐 경우
      preventRef.current = false; // * 옵저버 중복 실행 방지
      setPage((prev) => prev + 1); // * 페이지 값 증가
    }
  };

  useEffect(() => {
    // ! 옵저버 핸들러 호출 (종속성배열: 검색 관련 데이터로 바뀔때 재시동)
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [keyword]);

  return (
    <main>
      <section>
        {isLoading ? (
          ''
        ) : (
          <Masonry
            breakpointCols={gap}
            className="list"
            columnClassName="column"
          >
            {datas.map((data, idx) => (
              <ImageItem key={idx} data={data} />
            ))}
          </Masonry>
        )}
        <TopButton />
      </section>
      <div ref={observerRef}>{/* Observer */}</div>
    </main>
  );
};

export default ImageItemList;
