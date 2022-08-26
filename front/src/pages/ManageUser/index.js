import React, { useEffect, useState } from "react";
import { Input, Space, Table } from "antd";
import { Container } from "../ConsultForm/styles";
import { SearchBar, buttonIcon } from "./styles";
import { MdEdit, MdDelete } from "react-icons/md";
import { css } from "@emotion/css";
import { useDispatch, useSelector } from "react-redux";
import { getForms } from "../../features/consultForm/consultFormSlice";
import Highlighter from "react-highlight-words";
const { Search } = Input;

let searchKeyword;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    // render: (text) => <a>{text}</a>,
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[searchKeyword]}
        autoEscape
        textToHighlight={text}
      />
    ),
  },
  {
    title: "Email",
    key: "email",
    dataIndex: "email",
    render: (text, _, index, record) => {
      console.log(text, _, index, record);
      return (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchKeyword]}
          autoEscape
          textToHighlight={text}
        />
      );
    },
  },
  {
    title: "Phone",
    key: "phone",
    dataIndex: "phone",
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[searchKeyword]}
        autoEscape
        textToHighlight={text}
      />
    ),
  },
  {
    title: "Register Date & Time",
    key: "dateTime",
    dataIndex: "dateTime",
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[searchKeyword]}
        autoEscape
        textToHighlight={text}
      />
    ),
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <button
          className={css`
            color: blue;
            cursor: pointer;
            border: none;
            background: none;
            font-size: 18px;
          `}>
          <MdEdit />
        </button>
        <button
          className={css`
            color: red;
            cursor: pointer;
            border: none;
            background: none;
            font-size: 18px;
          `}>
          <MdDelete />
        </button>
      </Space>
    ),
  },
];

const changePhoneFormat2 = (phoneNumber) => {
  const match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return null;
};

let data = [];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows,
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};
let convertedData;

const ManageUser = () => {
  const [query, setQuery] = useState("");

  const [selectionType, setSelectionType] = useState("checkbox");
  const { isSuccess, isLoading, message, consultForms } = useSelector(
    (state) => state.consultForm,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getForms());
  }, []);

  useEffect(() => {
    data = consultForms.map((v) => ({
      key: v.email,
      name: v.clientName,
      email: v.email,
      phone: changePhoneFormat(v.phone),
      dateTime: registerDateFormat(v.registerDateAndTime),
      /* phone: v.phone,
      dateTime: v.registerDateAndTime, */
    }));
  }, [consultForms, query]);

  const changePhoneFormat = (phoneNumber) => {
    const match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
    /* if (match) { */
    const result = `${match[1]}-${match[2]}-${match[3]}`;
    console.log("result type: ", typeof result);
    return result;
    /* } */
    /* return phoneNumber; */
  };

  const registerDateFormat = (registerInfo) => {
    const match = registerInfo.match(/(^[0-9].*)([T])(\d{2}:\d{2})/);
    return `${match[1]}@${match[3]}`;
  };

  /* const keys = ["name", "email", "phone", "dateTime"]; */

  const search = (d) => {
    if (!query) {
      searchKeyword = query;
      return d;
    }
    searchKeyword = query;
    console.log("searchKeyword: ", searchKeyword);
    return d.filter((item) =>
      /* keys.some((key) => item[key].toLowerCase().includes(query)), */
      Object.keys(item).some((key) => item[key].toLowerCase().includes(query)),
    );
  };

  /* 
  위 처럼, keys를 안쓰고 하는 방법 생각 해 보기
  const search = (d) => {
    return d.filter((item) => {
      Object.values(item).some((key) => {
        console.log("key: ", key);
        console.log("includes: ", key.toLowerCase().includes(query));
      });
    });
  }; */

  return (
    <Container>
      <SearchBar
        placeholder="Search Consult Forms"
        enterButton="Search"
        size="large"
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />

      <div>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={search(data)}
        />
      </div>
    </Container>
  );
};

export default ManageUser;
