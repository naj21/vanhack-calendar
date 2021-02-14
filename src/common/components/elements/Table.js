import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Media from "react-media";
import Loader from "./Loader";

// <thead>
const TableHead = styled.div`
  position: relative;
  display: table-header-group;
  width: inherit;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray20};
`;

// <tbody>
const TableBody = styled.div`
  display: table-row-group;
`;

// <tr>
const TableRow = styled.div`
  display: table-row;

  &::after {
    position: absolute;
    content: "";
    height: ${({ height }) => `${height}px`};
    left: 0;
    right: 0;
    background: ${({ background }) => background || "none"};
  }
`;

const TableGroup = styled.div`
  margin: 30px 0 12px;
  color: ${({ theme }) => theme.colors.black80};
  font-size: ${({ theme }) => theme.font.sizes.medium};
  font-weight: ${({ theme }) => theme.font.weight.bolder};
  font-family: "InterMedium", sans-serif;
`;

// <th>
const TableHeaderCell = styled.div`
  display: table-cell;
  vertical-align: middle;
  cursor: default;
`;

// <td>
const TableCell = styled.div`
  position: relative;
  display: table-cell;
  vertical-align: middle;
  z-index: 1;
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
  border-collapse: collapse;
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
    font-size: ${({ theme }) => `calc(${theme.font.sizes.small} + 1px)`};
    color: ${({ theme }) => theme.colors.gray80};

    &:last-child {
      text-align: right;
      padding-right: 10px;
    }
  }
`;

/**
 * Table examples
 *
 * @example ./docs/Table.md
 */

function Table(props) {
  const { fields, elements, category, loading, categoryBackgrounds } = props;
  const [ref, setRef] = useState();
  const [rowHeight, setRowHeight] = useState();

  const onRefChange = useCallback((node) => {
    setRef(node);
    if (node) {
      setRowHeight(node.offsetHeight + 6);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setRowHeight(ref && ref.offsetHeight + 6);
    });
    return () => window.removeEventListener("resize", null);
  });

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
        <Media query={field.displaySize} key={index}>
          {fieldElement}
        </Media>
      ) : (
        fieldElement
      );
    });
  };

  const renderElements = () => {
    if (category) {
      const groupedElements = {};
      elements.forEach((element) => {
        if (!groupedElements[element[category]]) {
          groupedElements[element[category]] = [element];
        } else {
          groupedElements[element[category]].push(element);
        }
      });

      return Object.entries(groupedElements).map(([key, value]) => (
        <>
          <TableGroup key={key} colspan="3">
            {key}
          </TableGroup>
          {value.map((element, index) => {
            const background =
              categoryBackgrounds &&
              categoryBackgrounds.find((item) => item.category === key);
            const color = background && background.color;

            return (
              <TableRow
                key={index}
                background={color}
                ref={onRefChange}
                height={rowHeight}
              >
                {renderElementFields(element)}
              </TableRow>
            );
          })}
        </>
      ));
    } else {
      return elements.map((element, index) => (
        <TableRow key={index}>{renderElementFields(element)}</TableRow>
      ));
    }
  };

  return (
    <>
      {!loading ? (
        <TableContainer>
          <TableHead>
            <TableRow>{renderHeaders()}</TableRow>
          </TableHead>
          <TableBody>{renderElements()}</TableBody>
        </TableContainer>
      ) : (
        <Loader />
      )}
    </>
  );
}

/** @component */
export default Table;
