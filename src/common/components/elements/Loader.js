import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  display: block;
  border: 2px solid ${({ theme }) => theme.colors.bgGray};
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: auto;
  animation: ${spin} 1s linear infinite;
`;

export default Loader;
