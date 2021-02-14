import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import Button from "./Button";
import Card from "./Card";

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled(Button)`
  padding: 0;
  width: 100%;
  max-height: 20px;
  background-color: unset;
  border: unset;
`;

const OptionsContainer = styled(Card)`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 10;

  ${({ top, left }) =>
    css`
      top: calc(${top}px - 5px);
      left: ${left}px;
      transform: translateX(-100%);
    `}
`;

export const Option = styled.a`
  display: flex;
  font-size: ${({ theme }) => theme.font.sizes.medium};
  cursor: default;
  color: ${({ theme }) => theme.colors.gray90};
  text-decoration: none;
  padding-top: 12px;
  padding-bottom: 12px;

  :hover {
    background: ${({ theme }) => theme.colors.gray10};
  }

  > img {
    width: 20px;
    margin-right: 17px;
    align-self: flex-start;
  }
`;

const getTopPosition = (ref) => {
  return ref.current && ref.current.getBoundingClientRect().top + window.scrollY;
};

const getLeftPosition = (ref) => {
  return ref.current && ref.current.getBoundingClientRect().right + window.scrollX;
};

/**
 * Dropdown examples
 *
 * @example ./docs/Dropdown.md
 */

const Dropdown = ({ children, icon, sm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const ref = useRef();
  const dropDownPortalContainer = document.createElement("div");
  const dropDownPortalElement = document.getElementById("dropdown");

  useEffect(() => {
    window.addEventListener("resize", () => {
      setTop(getTopPosition(ref));
      setLeft(getLeftPosition(ref));
    });
    return () => window.removeEventListener("resize", null);
  });

  useEffect(() => {
    isOpen && dropDownPortalElement.appendChild(dropDownPortalContainer);
  }, [dropDownPortalElement, dropDownPortalContainer, isOpen]);

  useEffect(() => {
    setTop(getTopPosition(ref));
    setLeft(getLeftPosition(ref));
    const handleClickOutside = (e) => {
      if (ref && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <DropdownContainer ref={ref}>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        <img src={icon} alt="dropdown-icon" />
      </DropdownButton>
      {ReactDOM.createPortal(
        <OptionsContainer
          onClick={() => setIsOpen(false)}
          sm={sm}
          top={top}
          left={left}
        >
          {children}
        </OptionsContainer>,
        dropDownPortalContainer
      )}
    </DropdownContainer>
  );
};

/** @component */
export default Dropdown;
