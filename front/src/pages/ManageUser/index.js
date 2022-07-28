import React, { useEffect, useState } from "react";
import { Input, Space, Table } from "antd";
import { Container } from "../ConsultForm/styles";
import { SearchBar, buttonIcon } from "./styles";
import { MdEdit, MdDelete } from "react-icons/md";
import { css } from "@emotion/css";
import { useDispatch, useSelector } from "react-redux";
import { getForms } from "../../features/consultForm/consultFormSlice";
const { Search } = Input;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Register Date & Time",
    dataIndex: "dateTime",
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

let dataTest = [
  {
    key: "1",
    name: "John Brown",
    email: "test@test.com",
    /* phone: "1234567890", */
    phone: changePhoneFormat2("1234567890"),
    dateTime: "2022-06-07T20:45:00.000+00:00",
  },
  {
    key: "2",
    name: "Jim Green",
    email: "test2@test2.com",
    phone: "0000007890",
    dateTime: "2022-02-11@09:21",
  },
];

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
    console.log(consultForms);
    data = consultForms.map((v) => ({
      key: v.email,
      name: v.clientName,
      email: v.email,
      /* phone: v.phone, */
      phone: changePhoneFormat(v.phone),
      dateTime: v.registerDateAndTime,
    }));
    /* console.log(tableData); */
    /* data.push(tableData); */

    /* data = convertedData; */

    console.log("data: ", data);
  }, []);

  const changePhoneFormat = (phoneNumber) => {
    const match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  const registerDateFormat = (registerInfo) => {
    const match = registerInfo.match(/^[0-9].*[T](\d{2}:\d{2})/);
  };

  const keys = ["name", "email", "phone", "dateTime"];

  const search = (d) => {
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
