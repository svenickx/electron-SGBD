import styled from "styled-components";

export const TableHead = styled.th`
  border: 1px solid white;
  padding: 8px;
  margin: 5;
`;

export const Resizeable = styled.div`
  resize: horizontal;
  overflow: auto;
  margin: 0px 45px 0px 0px;
`;

export const HeaderContent = styled.div`
  display: flex;
  position: relative;
`;

export const SortButton = styled.button`
  position: absolute;
  right: 0;
`;
