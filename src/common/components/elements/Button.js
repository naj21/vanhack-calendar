import styled, { css } from "styled-components";

/**
 * Button examples
 *
 * @example ./docs/Button.md
 */

const Button = styled.button`
  color: white;
  padding: 12px 27px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.border.radius.small};
  font-size: ${({ theme }) => `calc(${theme.font.sizes.small} + 1px)`};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  cursor: pointer;

  ${({ sm }) =>
    sm &&
    css`
      padding: 6px 0;
      width: 137px;
      font-size: ${({ theme }) => theme.font.sizes.small};
    `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.9;
  }
`;

/** @component */
export default Button;
