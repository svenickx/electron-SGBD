import styled from "styled-components";

export const Title = styled.h2`
  font-size: calc(10px + 2vmin);
`;

export const DbName = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 10px 0;
`;

export const TablesView = styled.div`
  padding-left: 15px;
  position: relative;
  &:before {
    content: "";
    left: 0;
    position: absolute;
    width: 1px;
    background-color: white;
    height: -webkit-fill-available;
  }
`;

export const DropdownTable = styled.div`
  & {
    height: 20px;
    width: 20px;
    cursor: pointer;
  }
  &:before {
    content: "";
    position: absolute;
    height: 13px;
    width: 1px;
    background-color: white;
    transform: ${(props) =>
      props.isActive
        ? "rotate(30deg) translate(4px, 2px)"
        : "rotate(-30deg) translate(2px, 2px)"};
  }
  &:after {
    content: "";
    position: absolute;
    height: 13px;
    width: 1px;
    background-color: white;
    transform: rotate(30deg) translate(-3px, 2px);
    transform: ${(props) =>
      props.isActive
        ? "rotate(-30deg) translate(-5px, 2px)"
        : "rotate(30deg) translate(-3px, 2px)"};
  }
`;
