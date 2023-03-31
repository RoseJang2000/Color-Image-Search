import { ColorPaletteProps } from 'interfaces/AllTypes.interfaces';
import { useState } from 'react';
import './ColorPalette.css';

const ColorPalette = ({ setKeyword, setPage }: ColorPaletteProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const colors = [
    'red',
    'pink',
    'purple',
    'orange',
    'beige',
    'yellow',
    'green',
    'blue',
    'black',
    'white',
  ];
  const onClick = (color: string, idx: number) => {
    // ! 색상 페이지가 바뀔때 스크롤의 위치로 인해 무한스크롤 이벤트가 작동하는 것 방지
    window.scrollTo({
      top: 0,
    });
    setPage(1); // & 색상 페이지가 바뀌면 무한스크롤 데이터 불러오기를 위한 page 상태를 1로 초기화
    setKeyword(color);
    setCurrentIdx(idx);
  };

  return (
    <div className="palette_wrapper">
      {colors.map((color, idx) => (
        <div
          key={idx}
          className={`item_wrapper ${idx === currentIdx ? 'item_focus' : null}`}
          onClick={() => onClick(color, idx)}
        >
          <div
            style={{
              backgroundColor: `var(--color-${color})`,
            }}
            className="palette_item"
          ></div>
          <div className="item_text">
            {color[0].toUpperCase() + color.slice(1)}
          </div>
        </div>
      ))}
      <span className="palette_item_text">
        WHAT'S
        <br />
        YOUR
        <br />
        FAVE COLOR?
      </span>
    </div>
  );
};

export default ColorPalette;
