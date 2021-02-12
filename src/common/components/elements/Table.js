import React from "react";
import styled from "styled-components";
import Media from "react-media";

const TableWrapper = styled.div`
  padding: 45px 60px;
  backgrgound: ${({ theme }) => theme.colors.gray10};
`;

// <thead>
const TableHead = styled.div`
  position: relative;
  display: table-header-group;
  width: inherit;
  &::after {
    position: absolute;
    content: "";
    left: 0;
    right: 0;
    border: 1px solid ${({ theme }) => theme.colors.gray20};
  }
`;

// <tbody>
const TableBody = styled.div`
  display: table-row-group;
`;

// <tr>
const TableRow = styled.div`
  display: table-row;
  position: relative;
`;

const TableGroup = styled.div`
  margin: 25px 0 12px;
  font-size: ${({ theme }) => theme.font.sizes.medium};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

// <col>
const TableColumn = styled.div`
  display: table-column;
`;

// <th>
const TableHeaderCell = styled.div`
  display: table-cell;
  vertical-align: middle;
  cursor: default;
`;

// <td>
const TableCell = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const HeaderText = styled.span`
  margin-right: 10px;
`;

const TableContainer = styled.div`
  display: table;
  width: 100%;
  text-align: left;
  border-spacing: 0;
  > ${TableBody} > ${TableRow} {
    > div {
      padding: 18px 0;
    }
    &:first-of-type {
      > div {
        padding-top: 28px;
      }
    }
    &:last-of-type {
      > div {
        padding-bottom: 28px;
      }
    }
  }

  > ${TableHead} > ${TableRow} {
    &:first-child {
      height: 45px;
    }
    + ${TableRow} {
      height: 55px;
    }
  }

  ${TableHeaderCell} {
    text-transform: capitalize;
    font-size: ${({ theme }) => theme.font.sizes.medium};
    color: ${({ theme }) => theme.colors.gray90};
  }

  ${TableCell} {
    white-space: normal;
    font-size: ${({ theme }) => theme.font.sizes.normal};
    color: ${({ theme }) => theme.colors.gray80};

    &:last-child {
      text-align: right;
      padding-right: 10px;
    }
  }
`;

function Table(props) {
  const { fields, elements, categories, loading } = props;
  const renderHeaders = () => {
    return fields.map((field, index) => {
      return (
        <TableHeaderCell key={index}>
          <HeaderContainer>
            <HeaderText>{field.name}</HeaderText>
          </HeaderContainer>
        </TableHeaderCell>
      );
    });
  };

  const renderElementFields = (element) => {
    return fields.map((field, index) => {
      let value;
      if ("key" in field) {
        value = element[field.key] ? element[field.key] : <span>-</span>;
      }
      const fieldElement = (
        <TableCell key={index}>{value ? value : field.render(element)}</TableCell>
      );
      return field.displaySize ? (
        <Media query={field.displaySize}>{fieldElement}</Media>
      ) : (
        fieldElement
      );
    });
  };

  const renderElements = () => {
    const groupedElements = {};
    elements.forEach((element) => {
      if (!groupedElements[element.status]) {
        groupedElements[element.status] = [element];
      } else {
        groupedElements[element.status].push(element);
      }
    });

    return Object.entries(groupedElements).map(([key, value]) => (
      <>
        <TableGroup key={key} colspan="3">{key}</TableGroup>
        {value.map((element, index) => (
          <TableRow key={index}>{renderElementFields(element)}</TableRow>
        ))}
      </>
    ));
  };

  return (
    <>
      {/* {!loading && ( */}
      <TableContainer>
        <TableHead>
          <TableRow>{renderHeaders()}</TableRow>
        </TableHead>
        <TableBody>{renderElements()}</TableBody>
      </TableContainer>
      {/* )} */}

      {loading && "Loading"}
    </>
  );
}

export default Table;
