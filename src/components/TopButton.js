import styled from 'styled-components';
import { RxDoubleArrowUp } from 'react-icons/rx';
import { useEffect, useState } from 'react';

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  });

  return (
    showButton && (
      <StyledTopButton id="top" onClick={scrollToTop}>
        <RxDoubleArrowUp />
      </StyledTopButton>
    )
  );
};

const StyledTopButton = styled.div`
  cursor: pointer;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  background-color: var(--font-color-dark);
  color: #fff;
  opacity: 0.5;

  @media screen and (max-width: 539px) {
    bottom: 6.5rem;
    right: 1.5rem;
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
  }
`;

export default TopButton;
