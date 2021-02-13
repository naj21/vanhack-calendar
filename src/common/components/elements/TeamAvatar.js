import styled, { css } from "styled-components";

const AvatarStyle = css`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  ${({ position }) =>
    position &&
    css`
      &:not(:first-of-type),
      &:only-of-type {
        left: calc(${position} * -5px);
      }
    `}
`;

const Avatar = styled.img`
  ${AvatarStyle}
  border: 1px solid ${({ theme }) => theme.colors.white};
`;

const LeftOver = styled.div`
  ${AvatarStyle}
  background: ${({ theme }) => theme.colors.darkBgGray};
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: ${({ theme }) => theme.font.weight.bolder};
  text-align: center;
  line-height: 30px;
`;

const AvatarContainer = styled.div`
  display: flex;
`;

/**
 * TeamAvatar examples
 * @example ./docs/TeamAvatar.md
 */

const TeamAvatar = ({ team = [], displayTotal = 3 }) => {
  const truncatedTeam = [];
  Object.assign(truncatedTeam, team);
  truncatedTeam.length = displayTotal;
  const leftoverCount = team.length - displayTotal;

  return (
    <AvatarContainer>
      {truncatedTeam.map((user, index) => (
        <Avatar
          src={user.image}
          alt={user.name}
          position={index + 1}
          key={user.id}
        />
      ))}
      {leftoverCount > 0 && (
        <LeftOver position={displayTotal + 1}>+{leftoverCount}</LeftOver>
      )}
    </AvatarContainer>
  );
};

/** @component */
export default TeamAvatar;
