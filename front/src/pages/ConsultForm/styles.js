import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 20px;
`;

export const InputIndividual = styled.div`
  /* display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  padding: 0 5px; */
  display: grid;
  grid-template-columns: 45% 55%;
  align-items: center;
  margin: 5px 0;
  padding: 0 5px;
  /* grid-template-columns: 1fr 2fr; */

  label {
    p {
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  input {
    box-sizing: border-box;
    margin: 0;
    font-variant: tabular-nums;
    list-style: none;
    font-feature-settings: "tnum";
    position: relative;
    display: inline-block;
    /* width: 100%; */
    min-width: 0;
    padding: 4px 11px;
    color: #000000d9;
    font-size: 14px;
    line-height: 1.5715;
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    transition: all 0.3s;
    overflow: hidden;

    &:focus {
      outline: none;
      /* border: solid 1px #5468ff; */
      /* border-style: none; */
      box-shadow: inset 0 0 0 2px #5468ff;
    }
  }

  .disabled {
    background: rgba(239, 239, 239, 0.7);
  }

  .radioButton {
    label {
      cursor: pointer;
      display: flex;
      align-items: center;

      span {
        padding: 0 5px;
      }
    }
  }

  /* .radioButton {
    width: 100%;

    label {
      display: block;
      position: relative;

      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      & input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }

      span {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
        border-radius: 50%;
      }

      &:hover input ~ span {
        background-color: #ccc;
      }

      & input:checked ~ span {
        background-color: #2196f3;
      }

      span:after {
        content: "";
        position: absolute;
        display: none;
      }

      & input:checked ~ span:after {
        display: block;
      }

      & span:after {
        top: 9px;
        left: 9px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: white;
      }
    } */

  /* 
    input:checked ~ span {
      background-color: #2196f3;
    }

    span:after {
      content: "";
      position: absolute;
      display: none;
    }

    input:checked ~ span:after {
      display: block;
    }

    span:after {
      top: 9px;
      left: 9px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: white;
    } 
  }*/
`;

export const InputText = styled.input`
  width: 100%;
`;
export const InputRadio = styled.input`
  cursor: pointer;
  /* position: absolute;
  opacity: 0;
  height: 0;
  width: 0; */
  /* width: 100%; */
`;
export const InputDate = styled.input`
  width: 100%;
`;
export const InputTime = styled.input`
  width: 100%;
`;
export const InputDateAndTime = styled.input`
  width: 100%;
`;
export const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  display: inline-block;
  /* width: 100%; */
  min-width: 0;
  padding: 4px 11px;
  color: #000000d9;
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
  overflow: hidden;

  &:focus {
    outline: none;
    /* border: solid 1px #5468ff; */
    /* border-style: none; */
    box-shadow: inset 0 0 0 2px #5468ff;
  }
`;
export const InputFile = styled.input`
  width: 100%;
`;
export const Button = styled.button`
  margin-right: 8px;
  margin-bottom: 12px;
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px #00000004;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  color: #000000d9;
  border-color: #d9d9d9;
  background: #fff;

  .submit-btn {
    color: #fff;
    border-color: var(--ant-primary-color);
    background: var(--ant-primary-color);
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px #0000000b;
  }

  &:active,
  &:focus {
    outline: 0;
  }
  &:before,
  *:after {
    box-sizing: border-box;
    position: absolute;
    inset: -1px;
    z-index: 1;
    display: none;
    background: #fff;
    border-radius: inherit;
    opacity: 0.35;
    transition: opacity 0.2s;
    content: "";
    pointer-events: none;
  }
  &::selection {
    color: #fff;
    background: #5468ff;
  }
  &:hover {
    border-color: #5468ff;
    color: #5468ff;
  }
`;

export const ButtonPrimary = styled.button`
  margin-right: 8px;
  margin-bottom: 12px;
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px #00000004;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  color: #000000d9;
  border-color: #d9d9d9;
  background: #fff;
  color: #fff;
  border-color: #5468ff;
  background: #5468ff;
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px #0000000b;

  &:active,
  &:focus {
    outline: 0;
  }

  &:hover {
    /* border-color: #5468ff;
    color: #5468ff; */

    color: #fff;
    border-color: #5468ff;
    /* background: #5468ff; */
    /* background: black; */
    opacity: 0.8;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px #0000000b;
  }
`;
