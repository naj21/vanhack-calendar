import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import Button from "../common/components/elements/Button";
import Table from "../common/components/elements/Table";
import Tabs from "../common/components/elements/Tabs";
import ElipsisIcon from "../assets/v-elipsis.svg";
import InfoIcon from "../assets/info.svg";
import CompanyIcon from "../assets/company.svg";
import PinIcon from "../assets/pin.svg";
import DollarIcon from "../assets/dollar.svg";
import SkillsIcon from "../assets/skills.svg";
import UserIcon from "../assets/user-circle.svg";
import Dropdown, { Option } from "../common/components/elements/Dropdown";
import { parseISO, format } from "date-fns";
import Tag from "../common/components/elements/Tag";
import { mediaQueries } from "../common/utils/browser";
import Media from "react-media";
import TeamAvatar from "../common/components/elements/TeamAvatar";
import themes from "../common/utils/themes";
import { getCalendarThunk } from "./redux/thunks";
import { team } from "../common/utils/mocks";

export const CandidateContainer = styled.div`
  display: flex;
  @media ${mediaQueries.small} {
    flex-direction: column;
  }
  > img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin-right: 19px;
  }
  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > :first-child {
      font-size: ${({ theme }) => theme.font.sizes.medium};
      color: ${({ theme }) => theme.colors.black60};
    }
    > :last-child {
      font-size: ${({ theme }) => theme.font.sizes.small};
      color: ${({ theme }) => theme.colors.black40};
    }
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  min-height: 72px;
  padding: 0 44px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray20};
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  @media (min-width: 1441px) {
    padding-left: calc(10% - 15px);
    padding-right: calc(10% - 15px);
    margin: auto;
  }
  @media ${mediaQueries.notLarge} {
    padding: 20px 34px;
    flex-direction: column;
    align-items: unset;

    > div:first-of-type {
      margin-bottom: 20px;
    }
  }
  @media ${mediaQueries.small} {
    padding: 20px 15px;
  }

  > div {
    display: inline-flex;
    align-items: center;

    button + div {
      margin-left: 25px;
    }
  }
  h2 {
    font-size: ${({ theme }) => theme.font.sizes.large};
    font-family: "InterMedium", sans-serif;
    color: ${({ theme }) => theme.colors.gray90};
    margin-right: 12px;
    + div {
      transform: translateY(3px);
      z-index: 1;
    }
    + div button {
      width: 40px;
    }
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  > span {
    display: block;
    margin: 0 6px 8px 0;
  }
`;

const RejectText = styled.span`
  font-size: ${({ theme }) => theme.font.sizes.small};
  margin-left: 30px;
  cursor: pointer;
`;

class Calendar extends Component {
  componentDidMount() {
    this.props.getCalendar();
  }

  renderContent = (isCalendar) => {
    const fields = [
      {
        name: "Candidate",
        render: (item) => {
          return (
            <CandidateContainer>
              <img src={item.image} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <p>{item.title}</p>
              </div>
            </CandidateContainer>
          );
        },
      },
      {
        name: "Interview Step",
        key: "interviewStep",
      },
      {
        name: "Scheduled Time",
        render: (item) => {
          const waiting = item.status === "Waiting Confirmation";
          const date = parseISO(item.scheduledTime);

          return !waiting ? (
            <>
              <Media query={mediaQueries.large}>
                <time dateTime={item.scheduledTime}>
                  {format(date, "E, LLLL, d . p")}
                </time>
              </Media>
              <Media query={mediaQueries.notLarge}>
                <time dateTime={item.scheduledTime}>
                  {format(date, "LLL, d . p")}
                </time>
              </Media>
            </>
          ) : (
            <Tag outline>Waiting Confirmation</Tag>
          );
        },
      },
      {
        displaySize: mediaQueries.large,
        render: (item) => {
          const waiting = item.status === "Waiting Confirmation";
          const scheduled = item.status === "Scheduled";
          const done = item.status === "Done";
          let text;

          if (scheduled) text = "Get interview link";
          if (done) text = "Move to the next step";

          return (
            <>
              {!waiting && <Button sm>{text}</Button>}
              {done && <RejectText>Reject</RejectText>}
            </>
          );
        },
      },
      {
        render: (item) => {
          return (
            <>
              <Media query={mediaQueries.large}>
                {this.renderActions(false, item.status)}
              </Media>
              <Media query={mediaQueries.notLarge}>
                {this.renderActions(true, item.status)}
              </Media>
            </>
          );
        },
      },
    ];

    const {
      calendar: { data, loading },
    } = this.props;
    const scheduledElements = [];
    if (!loading) {
      data.forEach((element) => {
        if (element.status === "Scheduled") {
          scheduledElements.push(element);
        }
      });
    }

    return (
      <Table
        elements={isCalendar ? data : scheduledElements}
        fields={fields}
        category={isCalendar ? "status" : null}
        categoryBackgrounds={[
          {
            category: "Scheduled",
            color: themes.colors.lightBlue,
          },
        ]}
        loading={loading}
      />
    );
  };

  renderActions = (isMobile, status) => {
    const waiting = status === "Waiting Confirmation";
    const done = status === "Done";

    return (
      <Dropdown icon={ElipsisIcon} sm>
        {isMobile && !waiting && (
          <>
            <Option>Get interview link</Option>
            {done && <Option>Reject</Option>}
          </>
        )}
        <Option>{!waiting ? "Re-schedule" : "Send the request again"}</Option>
        <Option>Cancel request</Option>
        <Option>Set as Interview done</Option>
        <Option>View calendar</Option>
        <Option>Report a problem</Option>
      </Dropdown>
    );
  };

  render() {
    return (
      <div>
        <Header>
          <div>
            <h2>Principal Product Manager @Driftwood sidecorp</h2>
            <Dropdown icon={InfoIcon}>
              <Option>
                <img src={CompanyIcon} alt="company" />
                <span>Driftwood sidecorp</span>
              </Option>
              <Option>
                <img src={UserIcon} alt="user" />
                <span> 1 Position </span>
              </Option>
              <Option>
                <img src={DollarIcon} alt="company" />
                <span>$CAD 100 - 140k</span>
              </Option>
              <Option>
                <img src={PinIcon} alt="company" />
                <span>Remote</span>
              </Option>
              <Option>
                <img src={SkillsIcon} alt="company" />
                <TagContainer>
                  <Tag>Machine Learning </Tag>
                  <Tag>Signal R</Tag>
                  <Tag>Dapper</Tag>
                  <Tag>Analytics</Tag>
                  <Tag>Testing</Tag>
                </TagContainer>
              </Option>
            </Dropdown>
          </div>
          <div>
            <Button>Edit job</Button>
            <TeamAvatar team={team} displayTotal={3} />
          </div>
        </Header>
        <Tabs
          tabs={[
            { label: "Calender", content: this.renderContent(true) },
            { label: "Next interviews", content: this.renderContent() },
          ]}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    calendar: state.calendar.events,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCalendar: bindActionCreators(getCalendarThunk, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
