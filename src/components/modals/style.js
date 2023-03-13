import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.664);
`;

export const CreateModal = styled.div`
  padding: 40px;
  border-radius: 5px;
  background-color: white;
  color: black;
  text-align: center;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  margin: 0 0 30px 0;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 30px 0 0 0;
`;

export const Cancel = styled.div`
  background-color: rgb(255, 124, 124);
  border-radius: 4px;
  cursor: pointer;
  padding: 5px 10px;
`;

export const Confirm = styled.div`
  background-color: rgb(62, 226, 62);
  border-radius: 4px;
  cursor: pointer;
  padding: 5px 10px;
`;
