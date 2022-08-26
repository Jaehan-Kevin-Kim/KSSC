import styled from "@emotion/styled";
import { Input, Space } from "antd";
// import { Container } from "../ConsultForm/styles";
const { Search } = Input;

export const SearchBar = styled(Search)`
  width: 80%;
  display: block;
  margin: 0 auto 20px auto;

  /* text-align: ; */
`;

export const buttonIcon = styled.button`
  color: blue;
  cursor: pointer !important;
`;
