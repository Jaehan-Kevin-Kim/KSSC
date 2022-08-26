import ReactDOM from "react-dom";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { Row, Col, Form, Checkbox, Input, Divider } from "antd";
import { css, cx } from "@emotion/css";

// import { css, jsx } from "@emotion/react";
import SignatureCanvas from "react-signature-canvas";
import Modal, { setAppElement } from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  createConsultForm,
  postFile,
} from "../../features/consultForm/consultFormSlice";
import {
  InputIndividual,
  InputText,
  InputRadio,
  InputDate,
  InputTime,
  InputDateAndTime,
  TextArea,
  InputFile,
  Button,
  ButtonPrimary,
  Container,
} from "./styles";

// const InputIndividual = styled.div`
//   display: flex;
// `;

const modalStyle = {
  overlay: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    width: "45%",
    height: "40%",
  },
  content: {
    position: "absolute",
    top: "40px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
    width: "100%",
  },
};

Modal.setAppElement("#root");

const ConsultForm = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.consultForm,
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [trimmedCoordinatorSigDataUrl, setTrimmedCoordinatorSigDataUrl] =
    useState(null);
  const [trimmedClientSigDataUrl, setTrimmedClientSigDataUrl] = useState(null);
  const [isCoordinatorSigModal, setIsCoordinatorSigModal] = useState(false);
  const [isClientSigModal, setIsClientSigModal] = useState(false);

  // let sigCanvas = useRef({});
  let sigCoordinatorCanvas = useRef({});
  let sigClientCanvas = useRef({});

  useEffect(() => {
    if (isSuccess) {
      alert("Saved!");
      reset();
    }
  }, [isSuccess]);

  const clearSigCanvas = (e) => {
    if (isCoordinatorSigModal) {
      sigCoordinatorCanvas.current.clear();
    }
    if (isClientSigModal) {
      sigClientCanvas.current.clear();
    }
    // sigCanvas.current.clear();
    console.log(e);
  };

  const saveSigCanvas = () => {
    if (isCoordinatorSigModal) {
      setTrimmedCoordinatorSigDataUrl(
        sigCoordinatorCanvas.current.getTrimmedCanvas().toDataURL("image/url"),
      );
    }

    isClientSigModal &&
      setTrimmedClientSigDataUrl(
        sigClientCanvas.current.getTrimmedCanvas().toDataURL("image/url"),
      );
    setIsCoordinatorSigModal(false);
    setIsClientSigModal(false);
    setModalIsOpen(false);
  };

  const onChangeFile = (e) => {
    console.log("filechange");
    console.log("attachment: ", e.target);
  };

  const onInputFile = (e) => {
    console.log("attachment: ", e.target.files[0]);
    const fileFormData = new FormData();
    fileFormData.append("attachment", e.target.files[0]);
    // console.log("fileFormData in onInputFile", fileFormData);
    // for (let [key, value] of fileFormData) {
    //   console.log(`${key}: ${value}`);
    // }

    // for (const value of fileFormData.values()) {
    //   console.log(value);
    // }
    dispatch(postFile(fileFormData));
  };
  const onSubmit = (data) => {
    console.log("submit");
    console.log("data: ", data);
    dispatch(createConsultForm(data));

    // const { fullName, exampleRequired } = data;
    // console.log(fullName, exampleRequired);
  };

  // const onError = (errors, e) => console.log(errors, e);

  // const saveSigCanvas = (name) => (e) => {
  //   console.log("saveSigCanvas: ", e);
  //   console.log("saveSigCanvasNam: ", name);
  //   console.log("clicked");
  //   if (name === "coordinatorSig") {
  //     setTrimmedDataUrl(
  //       sigCanvas.current.getTrimmedCanvas().toDataURL("image/url"),
  //     );
  //   } else {
  //   }
  //   setModalIsOpen(false);

  // Save to desktop as a file
  // const image = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
  // const link = document.createElement("a");
  // link.href = image;
  // link.download = "sign_image.png";
  // link.click();
  // setTrimmedDataUrl(() => {
  //   sigCanvas.current.getTrimmedCanvas().toDataURL("image/url");
  // });
  // };

  return (
    <Container>
      <Modal
        style={modalStyle}
        isOpen={modalIsOpen}
        onRequestClose={() => {
          console.log("clicked");
          setModalIsOpen(false);
        }}>
        <p>Please sign in here.</p>
        <div
          className={css`
            position: relative;
            /* width: 300px;
            height: 400px; */
            width: 100%;
            height: 70%;
            .sigClientCanvas,
            .sigCoordinatorCanvas {
              position: absolute;
              width: 100%;
              height: 100%;
            }
          `}>
          {isCoordinatorSigModal && (
            <SignatureCanvas
              penColor="blue"
              backgroundColor="lightgray"
              canvasProps={{
                /* // width: 400,
            // height: 200, */
                /* position: absolute; */
                className: "sigCoordinatorCanvas",
              }}
              ref={sigCoordinatorCanvas}
            />
          )}
          {isClientSigModal && (
            <SignatureCanvas
              penColor="blue"
              backgroundColor="lightgray"
              canvasProps={{
                /* // width: 400,
            // height: 200, */
                /* position: absolute; */
                className: "sigClientCanvas",
              }}
              ref={sigClientCanvas}
            />
          )}
        </div>
        <Button onClick={clearSigCanvas}>Clear</Button>
        {/* <Button onClick={saveSigCanvas("coordinatorSig")}>Save</Button> */}
        <Button onClick={saveSigCanvas}>Save</Button>
        <Button
          onClick={() => {
            setIsCoordinatorSigModal(false);
            setIsClientSigModal(false);
            setModalIsOpen(false);
          }}>
          Close
        </Button>
      </Modal>
      {/* <Form onSubmit={handleSubmit(onSubmit, onError)}> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={8}>
          <Col xs={24} md={8}>
            <InputIndividual>
              <label htmlFor="fileId">
                <p>파일 ID</p>
                <p>File ID</p>
              </label>
              <InputText
                className="disabled"
                disabled
                id="clientName"
                {...register("fileId")}
              />
            </InputIndividual>
            <InputIndividual>
              <label htmlFor="clientName">
                <p>내담자 성명</p>
                <p>Client Name (Last, First)</p>
              </label>
              <InputText id="clientName" {...register("clientName")} />
            </InputIndividual>
            <InputIndividual>
              <label htmlFor="DOB">
                <p>생년월일</p>
                <p>Date of Birth</p>
              </label>
              <div className="DOB">
                <InputDate
                  id="DOB"
                  type="date"
                  {...register("DOB", { valueAsDate: true })}
                />
              </div>
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="gender">
                <p>성별</p>
                <p>Gender</p>
              </label>
              <div className="radioButton">
                <label htmlFor="male">
                  {/* <span className="radioText">Male</span> */}
                  <InputRadio
                    {...register(
                      "gender",
                      // , { required: true }
                    )}
                    type="radio"
                    name="gender"
                    value="Male"
                    id="male"
                  />
                  <span className="radioSpot"> Male </span>
                  {/* <span className="radioSpot">Male</span> */}
                </label>
                <label htmlFor="female">
                  {/* Female */}
                  <InputRadio
                    {...register(
                      "gender",
                      // , { required: true }
                    )}
                    type="radio"
                    name="gender"
                    value="Female"
                    id="female"
                  />
                  <span>Female</span>
                </label>
              </div>
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="phoneNumber">
                <p>전화번호</p>
                <p>Phone Number</p>
              </label>
              <InputText id="phoneNumber" {...register("phoneNumber")} />
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="marital">
                <p>혼인여부</p>
                <p>Marital Status</p>
              </label>
              <div className="radioButton">
                <label htmlFor="single">
                  <InputRadio
                    {...register(
                      "marital",
                      // , { required: true                   }
                    )}
                    type="radio"
                    name="marital"
                    value="Single"
                    id="single"
                  />
                  <span>Single</span>
                </label>
                <label htmlFor="married">
                  <InputRadio
                    {...register(
                      "marital",
                      // , { required: true }
                    )}
                    type="radio"
                    name="marital"
                    value="Married"
                    id="married"
                  />
                  <span>Married</span>
                </label>
                <label htmlFor="separated">
                  <InputRadio
                    {...register(
                      "separated",
                      // , { required: true }
                    )}
                    type="radio"
                    name="marital"
                    value="Separated"
                    id="separated"
                  />
                  <span>Separated</span>
                </label>
                <label htmlFor="divored">
                  <InputRadio
                    {...register(
                      "marital",
                      // , { required: true }
                    )}
                    type="radio"
                    name="marital"
                    value="Divored"
                    id="divored"
                  />
                  <span>Divored</span>
                </label>
                <label htmlFor="widowed">
                  <InputRadio
                    {...register(
                      "marital",
                      // , { required: true }
                    )}
                    type="radio"
                    name="marital"
                    value="Widowed"
                    id="widowed"
                  />
                  <span>Widowed</span>
                </label>
              </div>
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="address">
                <p>주소 (우편번호)</p>
                <p>Address (Postal Code)</p>
              </label>
              <InputText id="address" {...register("address")} />
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="email">
                <p>이메일 주소</p>
                <p>Email Address</p>
              </label>
              <InputText id="email" {...register("email")} />
            </InputIndividual>
          </Col>
          <Col xs={24} md={8}>
            <InputIndividual>
              <label htmlFor="intakeCoordinator">
                <p>접수자</p>
                <p>Intake Coordinator</p>
              </label>
              <InputText
                id="intakeCoordinator"
                {...register("intakeCoordinator")}
              />
            </InputIndividual>
            <InputIndividual>
              <label htmlFor="intakeStartTime">
                <p>상담 시작시간</p>
                <p>Intake Start Time</p>
              </label>
              <div className="intakeStartTime">
                <InputTime
                  id="intakeStartTime"
                  type="time"
                  {...register("intakeStartTime")}
                  // {...register("intakeStartTime", { valueAsDate: true })}
                />
              </div>
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="intakeEndTime">
                <p>상담 종료시간</p>
                <p>Intake End Time</p>
              </label>
              <div className="intakeEndTime">
                <InputTime
                  id="intakeEndTime"
                  type="time"
                  {...register("intakeEndTime")}
                  // {...register("intakeEndTime", { valueAsDate: true })}
                />
              </div>
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="immigrationStatus">
                <p>이민자 신분</p>
                <p>Immigration Status</p>
              </label>
              <div className="radioButton">
                <label htmlFor="citizen">
                  <InputRadio
                    {...register(
                      "immigrationStatus",
                      // , { required: true }
                    )}
                    type="radio"
                    name="immigrationStatus"
                    value="Citizen"
                    id="citizen"
                  />
                  <span>Citizen</span>
                </label>
                <label htmlFor="pr">
                  <InputRadio
                    {...register(
                      "immigrationStatus",
                      // , { required: true }
                    )}
                    type="radio"
                    name="immigrationStatus"
                    value="PR"
                    id="pr"
                  />
                  <span>PR</span>
                </label>
                <label htmlFor="temporaryWorker">
                  <InputRadio
                    {...register(
                      "immigrationStatus",
                      // , { required: true }
                    )}
                    type="radio"
                    name="immigrationStatus"
                    value="TemporaryWorker"
                    id="temporaryWorker"
                  />
                  <span>TemporaryWorker</span>
                </label>
                <label htmlFor="student">
                  <InputRadio
                    {...register(
                      "immigrationStatus",
                      // , { required: true }
                    )}
                    type="radio"
                    name="immigrationStatus"
                    value="Student"
                    id="student"
                  />
                  <span>Student</span>
                </label>
                <label htmlFor="visitor">
                  <InputRadio
                    {...register(
                      "immigrationStatus",
                      // , { required: true }
                    )}
                    type="radio"
                    name="immigrationStatus"
                    value="Visitor"
                    id="visitor"
                  />
                  <span>Visitor</span>
                </label>
                <label htmlFor="refugee">
                  <InputRadio
                    {...register(
                      "immigrationStatus",
                      // , { required: true }
                    )}
                    type="radio"
                    name="immigrationStatus"
                    value="Refugee"
                    id="refugee"
                  />
                  <span>Refugee</span>
                </label>
              </div>
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="canadaArrivalDate">
                <p>캐나다 도착일</p>
                <p>Arrival Date To Canada</p>
              </label>
              <div className="canadaArrivalDate">
                <InputDate
                  id="canadaArrivalDate"
                  type="date"
                  {...register("canadaArrivalDate", { valueAsDate: true })}
                />
              </div>
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="occupation">
                <p>직업</p>
                <p>Occupation</p>
              </label>
              <InputText id="occupation" {...register("occupation")} />
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="education">
                <p>학력</p>
                <p>Education</p>
              </label>
              <InputText id="education" {...register("education")} />
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="englishLevel">
                <p>영어능력</p>
                <p>English Level</p>
              </label>
              <InputText id="englishLevel" {...register("englishLevel")} />
            </InputIndividual>
          </Col>
          <Col xs={24} md={8}>
            <InputIndividual>
              <label htmlFor="counselor">
                <p>담당 상담사</p>
                <p>Counselor</p>
              </label>
              <InputText id="counselor" {...register("counselor")} />
            </InputIndividual>
            <InputIndividual>
              <label htmlFor="reasonForVisit">
                <p>방문이유</p>
                <p>Reason For Service</p>
              </label>
              <InputText id="reasonForVisit" {...register("reasonForVisit")} />
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="nextApptDateTime">
                <p>다음 상담 날짜&시간</p>
                <p>Next Appointment Date & Time</p>
              </label>
              <div className="nextApptDateTime">
                <InputDateAndTime
                  id="nextApptDateTime"
                  type="datetime-local"
                  {...register("nextApptDateTime", { valueAsDate: true })}
                />
              </div>
            </InputIndividual>
            <InputIndividual>
              <label htmlFor="registerDateAndTime">
                <p>접수 날짜&시간</p>
                <p>Register Date & Time</p>
              </label>
              <div className="registerDateAndTime">
                <InputDateAndTime
                  id="registerDateAndTime"
                  type="datetime-local"
                  {...register("registerDateAndTime", { valueAsDate: true })}
                />
              </div>
            </InputIndividual>

            {/* <InputIndividual>
              <label htmlFor="intakeTime">
                <p>접수시간</p>
                <p>Intake Time</p>
              </label>
              <div className="intakeTime">
                <InputTime
                  id="intakeTime"
                  type="time"
                  {...register("intakeTime", { valueAsDate: true })}
                />
              </div>
            </InputIndividual> */}

            <InputIndividual>
              <label htmlFor="servicePath">
                <p>서비스 경로</p>
                <p>How did you hear about KSSC?</p>
              </label>
              <TextArea
                rows="4"
                id="servicePath"
                {...register("servicePath")}
              />
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="memo">
                <p>담당자 메모</p>
                <p>Coordinator's Note</p>
              </label>
              <TextArea rows="4" id="memo" {...register("memo")} />
            </InputIndividual>
            <InputIndividual>
              <label htmlFor="file">
                <p>첨부파일</p>
                <p>file</p>
              </label>
              <InputFile
                ref={register}
                id="file"
                name="attachment"
                onChange={onChangeFile}
                onInput={onInputFile}
                {...register("file")}
                type="file"
              />
            </InputIndividual>
          </Col>
        </Row>
        <Divider />

        <div className="agreement">
          <p>개인정보 수집이용 제공동의서</p>
          <p>Service Agreement</p>
          <p>
            나는 내 개인정보가 기밀사항임을 알고 있습니다. 그러나,
            한인사회복지센터(KSSC)에서 제공하는 서비스를 이용하기 위해 나의
            개인정보가 한인복지센터의 상담사들과 관련 기관들, 그리고 관련 펀딩
            정부기관에 한하여 사용될 수 있는 것을 충분히 숙지하였으며, 개인정보
            수집, 이용, 제공하는 것에 동의합니다.
          </p>
          <p>
            I am aware that my personal information is confidential, However, I
            have been advised that some, or all of this information provided is
            requried for use by only authorized KSSC staff, select community
            service agencies, and government funders.
          </p>
        </div>
        <Divider />

        <div
          // className="signature"
          // css={css`
          className={css`
            display: flex;

            justify-content: space-between;
          `}>
          <div
            className={css`
              width: 50%;
              display: flex;
            `}>
            <div>
              <p>접수자 서명</p>
              <p>Intake Coordinator Signature </p>
              <Button
                onClick={() => {
                  setModalIsOpen(true);
                  setIsCoordinatorSigModal(true);
                }}>
                Click to Sign
              </Button>
            </div>

            <div
              className={css`
                width: 80%;
              `}>
              {trimmedCoordinatorSigDataUrl && (
                <img
                  className={css`
                    width: 100%;
                  `}
                  src={trimmedCoordinatorSigDataUrl}
                  alt="Coordinator Signature"
                />
              )}
            </div>
          </div>

          <div
            className={css`
              width: 50%;
            `}>
            <p>내담자 서명</p>
            <p>Client Signature </p>

            <Button
              onClick={() => {
                setModalIsOpen(true);
                setIsClientSigModal(true);
              }}>
              Click to Sign
            </Button>
            <div
              className={css`
                width: 80%;
              `}>
              {trimmedClientSigDataUrl && (
                <img
                  className={css`
                    width: 100%;
                  `}
                  src={trimmedClientSigDataUrl}
                  alt="Coordinator Signature"
                />
              )}
            </div>
          </div>
        </div>

        <ButtonPrimary
          className="submit-btn"
          type="submit"
          onClick={() => {
            console.log("click");
          }}>
          Submit Form
        </ButtonPrimary>
      </form>
    </Container>
  );
};

export default ConsultForm;

/* ReactDOM.render(<ConsultForm />, setAppElement); */
