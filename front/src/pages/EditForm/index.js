import { css } from "@emotion/css";
import { Col, Divider, Row } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

// import { css, jsx } from "@emotion/react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import SignatureCanvas from "react-signature-canvas";
import {
  editConsultForm,
  postFile,
} from "../../features/consultForm/consultFormSlice";

import { useParams } from "react-router-dom";
import {
  Button,
  ButtonPrimary,
  Container,
  InputDate,
  InputDateAndTime,
  InputFile,
  InputIndividual,
  InputRadio,
  InputText,
  InputTime,
  TextArea,
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

const EditForm = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message, consultForm } = useSelector(
    (state) => state.consultForm,
  );
  const params = useParams();
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
    console.log("id: ", params, params.id);
    // dispatch(getFormById(params.id));
  }, [params.id]);

  useEffect(() => {
    // dispatch(getFormById
    if (isSuccess) {
      // alert("Saved!");
      reset();
    }
  }, [isSuccess]);

  // useEffect(() => {
  //   if (consultForm) {
  //     console.log(consultForm);
  //   }
  //   console.log(consultForm);
  // }, [consultForm]);

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
    // console.log("data: ", (...data, { fileId:consultForm._id})});
    dispatch(editConsultForm(...data, { fileId: consultForm._id }));

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
                id="fileId"
                defaultValue={consultForm._id}
                {...register("fileId")}
              />
            </InputIndividual>
            <InputIndividual>
              <label htmlFor="clientName">
                <p>내담자 성명</p>
                <p>Client Name (Last, First)</p>
              </label>
              <InputText
                id="clientName"
                defaultValue={consultForm.clientName}
                {...register("clientName")}
              />
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
                  defaultValue={dayjs(consultForm.DOB).format("YYYY-MM-DD")}
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
                    type="radio"
                    name="gender"
                    value="Male"
                    id="male"
                    defaultChecked={consultForm.gender === "Male"}
                    {...register("gender")}
                  />
                  <span className="radioSpot"> Male </span>
                  {/* <span className="radioSpot">Male</span> */}
                </label>
                <label htmlFor="female">
                  {/* Female */}
                  <InputRadio
                    type="radio"
                    name="gender"
                    value="Female"
                    id="female"
                    defaultChecked={consultForm.gender === "Female"}
                    {...register("gender")}
                  />
                  <span>Female</span>
                </label>
              </div>
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="phone">
                <p>전화번호</p>
                <p>Phone Number</p>
              </label>
              {/* value: phoneNumber -> phone 수정됨*/}
              <InputText
                type="text"
                name="phone"
                id="phone"
                defaultValue={consultForm.phone}
                {...register("phone")}
              />
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="marital">
                <p>혼인여부</p>
                <p>Marital Status</p>
              </label>
              <div className="radioButton">
                <label htmlFor="single">
                  <InputRadio
                    type="radio"
                    name="marital"
                    value="Single"
                    id="single"
                    defaultChecked={consultForm.marital === "Single"}
                    {...register("marital")}
                  />
                  <span>Single</span>
                </label>
                <label htmlFor="married">
                  <InputRadio
                    type="radio"
                    name="marital"
                    value="Married"
                    id="married"
                    defaultChecked={consultForm.marital === "Married"}
                    {...register("marital")}
                  />
                  <span>Married</span>
                </label>
                <label htmlFor="separated">
                  <InputRadio
                    type="radio"
                    name="marital"
                    value="Separated"
                    id="separated"
                    defaultChecked={consultForm.marital === "Separated"}
                    {...register("marital")}
                  />
                  <span>Separated</span>
                </label>
                <label htmlFor="divored">
                  <InputRadio
                    type="radio"
                    name="marital"
                    value="Divored"
                    id="divored"
                    defaultChecked={consultForm.marital === "Divored"}
                    {...register("marital")}
                  />
                  <span>Divored</span>
                </label>
                <label htmlFor="widowed">
                  <InputRadio
                    type="radio"
                    name="marital"
                    value="Widowed"
                    id="widowed"
                    defaultChecked={consultForm.marital === "Widowed"}
                    {...register("marital")}
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
              {/* value: address -> postalCode -> address수정됨 */}
              <InputText
                type="text"
                name="address"
                defaultValue={consultForm.address}
                id="address"
                {...register("address")}
              />
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="email">
                <p>이메일 주소</p>
                <p>Email Address</p>
              </label>
              <InputText
                type="text"
                name="email"
                defaultValue={consultForm.email}
                id="email"
                {...register("email")}
              />
            </InputIndividual>
          </Col>
          <Col xs={24} md={8}>
            <InputIndividual>
              {/* 값 넣고 테스트 해보기. 현재 입력 저장된 값이 없는듯 */}
              <label htmlFor="intakeCoordinator">
                <p>접수자</p>
                <p>Intake Coordinator</p>
              </label>
              <InputText
                type="text"
                name="intakeCoordinator"
                defaultValue={consultForm.intakeCoordinator}
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
                  // defaultValue={dayjs(consultForm.intakeStartTime).format("HH:mm")}
                  defaultValue={consultForm.intakeStartTime}
                  {...register("intakeStartTime")}
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
                  defaultValue={consultForm.intakeEndTime}
                  {...register("intakeEndTime")}
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
                    defaultChecked={consultForm.immigrationStatus === "Citizen"}
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
                    defaultChecked={consultForm.immigrationStatus === "PR"}
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
                    defaultChecked={
                      consultForm.immigrationStatus === "TemporaryWorker"
                    }
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
                    defaultChecked={consultForm.immigrationStatus === "Student"}
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
                    defaultChecked={consultForm.immigrationStatus === "Visitor"}
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
                    defaultChecked={consultForm.immigrationStatus === "Refugee"}
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
                  defaultValue={dayjs(consultForm.canadaArrivalDate).format(
                    "YYYY-MM-DD",
                  )}
                  {...register("canadaArrivalDate", { valueAsDate: true })}
                />
              </div>
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="occupation">
                <p>직업</p>
                <p>Occupation</p>
              </label>
              <InputText
                type="text"
                name="occupation"
                id="occupation"
                defaultValue={consultForm.occupation}
                {...register("occupation")}
              />
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="education">
                <p>학력</p>
                <p>Education</p>
              </label>
              <InputText
                id="education"
                defaultValue={consultForm.education}
                {...register("education")}
              />
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="englishLevel">
                <p>영어능력</p>
                <p>English Level</p>
              </label>
              <InputText
                id="englishLevel"
                defaultValue={consultForm.englishLevel}
                {...register("englishLevel")}
              />
            </InputIndividual>
          </Col>
          <Col xs={24} md={8}>
            <InputIndividual>
              <label htmlFor="counselor">
                <p>담당 상담사</p>
                <p>Counselor</p>
              </label>
              <InputText
                id="counselor"
                defaultValue={consultForm.counselor}
                {...register("counselor")}
              />
            </InputIndividual>
            <InputIndividual>
              <label htmlFor="reasonForVisit">
                <p>방문이유</p>
                <p>Reason For Service</p>
              </label>
              <InputText
                id="reasonForVisit"
                defaultValue={consultForm.reasonForVisit}
                {...register("reasonForVisit")}
              />
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
                  defaultValue={dayjs(consultForm.registerDateAndTime).format(
                    "YYYY-MM-DDTHH:mm",
                  )}
                  {...register("registerDateAndTime", { valueAsDate: true })}
                />
              </div>
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
                  defaultValue={dayjs(consultForm.nextApptDateTime).format(
                    "YYYY-MM-DDTHH:mm",
                  )}
                  {...register("nextApptDateTime", { valueAsDate: true })}
                />
              </div>
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="servicePath">
                <p>서비스 경로</p>
                <p>How did you hear about KSSC?</p>
              </label>
              <TextArea
                rows="4"
                id="servicePath"
                defaultValue={consultForm.servicePath}
                {...register("servicePath")}
              />
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="memo">
                <p>담당자 메모</p>
                <p>Coordinator's Note</p>
              </label>
              <TextArea rows="4" id="memo" defaultValue={consultForm.memo} />
            </InputIndividual>
            <InputIndividual>
              <label htmlFor="file">
                <p>첨부파일</p>
                <p>file</p>
              </label>
              <InputFile
                id="file"
                name="attachment"
                onChange={onChangeFile}
                onInput={onInputFile}
                type="file"
                {...register("file")}
              />
            </InputIndividual>
          </Col>
        </Row>
        <Divider />

        <ButtonPrimary
          className="submit-btn"
          type="submit"
          onClick={() => {
            console.log("click");
          }}>
          Save Form
        </ButtonPrimary>
      </form>
    </Container>
  );
};

export default EditForm;

/* ReactDOM.render(<ConsultForm />, setAppElement); */
