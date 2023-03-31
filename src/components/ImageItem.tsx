import { ResponseData } from 'interfaces/AllTypes.interfaces';
import { SyntheticEvent } from 'react';

const ImageItem = ({ data }: { data: ResponseData }) => {
  /** 이미지 src 에러 발생 시 오류 이미지로 변경하는 함수 (엑스박스 방지) */
  const onErrorImg = (event: SyntheticEvent<HTMLImageElement>) => {
    (event.target as HTMLImageElement).src =
      process.env.PUBLIC_URL + '/no-image.png';
  };

  return (
    <article>
      <a href={data.doc_url}>
        <div className="image_item_div">
          <img
            className="image_item_img"
            referrerPolicy="no-referrer"
            src={data.image_url}
            onError={onErrorImg}
            alt={data.collection}
          />
          <div className="image_item_desc">
            <h2>{data.collection}</h2>
            <p>{data.datetime.slice(0, 10)}</p>
          </div>
        </div>
      </a>
    </article>
  );
};

export default ImageItem;
