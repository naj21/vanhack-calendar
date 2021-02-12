import React, { useState } from "react";
import styled from "styled-components";
import { mediaQueries } from "../../utils/browser";

function Tabs(props) {
  const { tabs } = props;
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <TabList className="container">
        {tabs.map((tab, i) => (
          <Tab
            key={i}
            onClick={() => setSelectedTab(i)}
            className={`${i === selectedTab && "active"}`}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabContent className="container">{tabs[selectedTab].content}</TabContent>
    </div>
  );
}

export default Tabs;

const TabList = styled.ul`
  display: flex;
  background: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 13px 44px;
  @media (min-width: 1440px) {
    padding-left: calc(10% - 15px);
    padding-right: calc(10% - 15px);
    margin: auto;
  }
  @media ${mediaQueries.small} {
    padding: 13px 15px;
  }

  > :not(:last-child) {
    margin-right: 35px;
  }
`;

export const Tab = styled.li`
  position: relative;
  color: ${({ theme }) => theme.colors.gray90};
  list-style: none;
  font-size: ${({ theme }) => `calc(${theme.font.sizes.small} + 1px)`};

  &:hover {
    cursor: default;
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    &::after {
      position: absolute;
      content: "";
      width: 100%;
      border: 2px solid ${({ theme }) => theme.colors.primary};
      border-radius: ${({ theme }) => theme.border.radius.small};
      left: 0;
      bottom: -13px;
    }
  }
`;

export const TabContent = styled.div`
  padding: 45px 60px;
  background: ${({ theme }) => theme.colors.gray10};
  overflow-x: hidden;
  @media (min-width: 1440px) {
    padding-left: 10%;
    padding-right: 10%;
    margin: auto;
  }
  @media ${mediaQueries.small} {
    padding: 45px 15px;
  }
`;
