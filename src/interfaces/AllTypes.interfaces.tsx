interface ImageItemListProps {
  keyword: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

interface ColorPaletteProps {
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

interface HeaderProps extends ColorPaletteProps {
  keyword: string;
}

interface RequestParams {
  query: string;
  page: number;
  size: number;
}

interface ResponseData {
  collection: string;
  datetime: string;
  display_sitename: string;
  doc_url: string;
  height: number;
  image_url: string;
  thumbnail_url: string;
  width: number;
}

export type {
  ImageItemListProps,
  HeaderProps,
  ColorPaletteProps,
  RequestParams,
  ResponseData,
};
