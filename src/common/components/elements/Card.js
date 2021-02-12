import styled, { css } from "styled-components";

/**
 * Card examples
 * @example ./docs/Card.md
 */

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
  border-radius: ${({ theme }) => theme.border.radius.large};
  padding: 30px;
  min-width: 347px;

  ${({ sm, theme }) =>
    sm &&
    css`
      padding: 20px;
      border-radius: ${theme.border.radius.medium};
      min-width: 200px;
    `}
`;

/** @component */
export default Card;
