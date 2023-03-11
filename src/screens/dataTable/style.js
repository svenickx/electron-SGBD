import styled from "styled-components";

export const TableContainer = styled.div`
  max-width: 75vw;
  overflow-x: auto;
`;

export const Table = styled.table`
  padding: 10px;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  border: 1px solid white;
  padding: 8px;
`;

export const TableData = styled.td`
  border: 1px solid white;
  padding: 8px;
  overflow: auto;
`;

export const TableRow = styled.tr`
  margin: 10px 0;
`;

export const Resizeable = styled.div`
  resize: horizontal;
  overflow: auto;
`;
