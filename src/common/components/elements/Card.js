import styled, { css } from "styled-components";

/**
 * Card examples
 * @example ./docs/Card.md
 */

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
  border-radius: ${({ theme }) => theme.border.radius.medium};
  padding: 20px 0;
  min-width: 320px;
  max-width: 347px;
  > * {
    padding-left: 30px;
    padding-right: 30px;
  }

  ${({ sm, theme }) =>
    sm &&
    css`
      padding: 10px 0;
      border-radius: ${theme.border.radius.small};
      min-width: 230px;
      > * {
        padding-left: 20px;
        padding-right: 20px;
      }
    `}
`;

/** @component */
export default Card;
