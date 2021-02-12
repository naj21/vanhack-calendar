import styled, { css } from "styled-components";

/**
 * Tag examples
 * @example ./docs/Tag.md
 */

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.gray20};
  color: ${({ theme }) => theme.colors.black70};
  font-size: ${({ theme }) => theme.font.sizes.medium};
  border-radius: ${({ theme }) => theme.border.radius.small};
  padding: 6px;
  white-space: nowrap;

  ${({ outline, theme }) =>
    outline &&
    css`
      font-size: ${({ theme }) => `calc(${theme.font.sizes.small} + 1px)`};
      color: ${({ theme }) => theme.colors.yellow};
      padding: 2px 10px;
      border-radius: ${theme.border.radius.large};
      border: 1px solid ${({ theme }) => theme.colors.gray30}; ;
    `}
`;

/** @component */
export default Tag;
