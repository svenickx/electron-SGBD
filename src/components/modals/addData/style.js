import styled from "styled-components";

export const DataInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const NewField = styled.div`
  padding: 20px 0 0 0;
  display: flex;
  flex-direction: column;
  &:before {
    content: "";
    left: 0;
    position: absolute;
    height: 1px;
    background-color: grey;
    width: -webkit-fill-available;
    transform: translate(0px, -10px);
  }
`;
