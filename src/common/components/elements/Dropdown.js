import React, { useState, useEffect, useRef } from "react";
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
  top: -5px;
  right: -10px;
  z-index: 10;

  ${({ position }) =>
    position === "left" &&
    css`
      left: 0;
    `}
  ${(position) =>
    position === "center" &&
    css`
      transform: translateX(40%);
    `}
`;

export const Option = styled.a`
  display: flex;
  font-size: ${({ theme }) => theme.font.sizes.medium};
  cursor: default;
  color: ${({ theme }) => theme.colors.darkGray};
  text-decoration: none;

  :not(:last-of-type) {
    margin-bottom: 25px;
  }

  :hover {
    background: ${({ theme }) => theme.colors.gray10};
  }

  > img {
    width: 20px;
    margin-right: 17px;
    align-self: flex-start;
  }
`;

/**
 * Dropdown examples
 *
 * @example ./docs/Dropdown.md
 */

const Dropdown = ({ children, text, position, icon, sm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
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
      {isOpen && (
        <OptionsContainer
          onClick={() => setIsOpen(false)}
          position={position}
          sm={sm}
        >
          {children}
        </OptionsContainer>
      )}
    </DropdownContainer>
  );
};

/** @component */
export default Dropdown;
