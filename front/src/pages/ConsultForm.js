import React from "react";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { Row, Col } from "antd";

const InputIndividual = styled.div`
  display: flex;
`;

const ConsultForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("submit");
    console.log("data: ", data);
    // const { fullName, exampleRequired } = data;
    // console.log(fullName, exampleRequired);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={8}>
          <Col xs={24} md={8}>
            <InputIndividual>
              <label htmlFor="clientName">
                <p>내담자 성명</p>
                <p>Client Name (Last, First)</p>
              </label>
              <input id="clientName" {...register("clientName")} />
            </InputIndividual>
            <InputIndividual>
              <label htmlFor="dateOfBirth">
                <p>생년월일</p>
                <p>Date of Birth (YYYY-MM-DD)</p>
              </label>
              <div className="dateOfBirth">
                <input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth", { valueAsDate: true })}
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
                  <input
                    {...register(
                      "gender",
                      // , { required: true }
                    )}
                    type="radio"
                    name="gender"
                    value="Male"
                    id="male"
                  />
                  Male
                </label>
                <label htmlFor="female">
                  <input
                    {...register(
                      "gender",
                      // , { required: true }
                    )}
                    type="radio"
                    name="gender"
                    value="Female"
                    id="female"
                  />
                  Female
                </label>
              </div>
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="maritalStatus">
                <p>혼인여부</p>
                <p>Marital Status</p>
              </label>
              <div className="radioButton">
                <label htmlFor="single">
                  <input
                    {...register(
                      "maritalStatus",
                      // , { required: true                   }
                    )}
                    type="radio"
                    name="maritalStatus"
                    value="Single"
                    id="single"
                  />
                  Single
                </label>
                <label htmlFor="married">
                  <input
                    {...register(
                      "maritalStatus",
                      // , { required: true }
                    )}
                    type="radio"
                    name="maritalStatus"
                    value="Married"
                    id="married"
                  />
                  Married
                </label>
                <label htmlFor="separated">
                  <input
                    {...register(
                      "separated",
                      // , { required: true }
                    )}
                    type="radio"
                    name="maritalStatus"
                    value="Separated"
                    id="separated"
                  />
                  Separated
                </label>
                <label htmlFor="divored">
                  <input
                    {...register(
                      "maritalStatus",
                      // , { required: true }
                    )}
                    type="radio"
                    name="maritalStatus"
                    value="Divored"
                    id="divored"
                  />
                  Divored
                </label>
                <label htmlFor="widowed">
                  <input
                    {...register(
                      "maritalStatus",
                      // , { required: true }
                    )}
                    type="radio"
                    name="maritalStatus"
                    value="Widowed"
                    id="widowed"
                  />
                  Widowed
                </label>
              </div>
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="phoneNumber">
                <p>전화번호</p>
                <p>Phone Number</p>
              </label>
              <input id="phoneNumber" {...register("phoneNumber")} />
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="address">
                <p>주소 (우편번호)</p>
                <p>Address (Postal Code)</p>
              </label>
              <input id="address" {...register("address")} />
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="emailAddress">
                <p>이메일 주소</p>
                <p>Email Address</p>
              </label>
              <input id="emailAddress" {...register("emailAddress")} />
            </InputIndividual>
          </Col>
          <Col xs={24} md={8}>
            <InputIndividual>
              <label htmlFor="intakeCoordinator">
                <p>접수자</p>
                <p>Intake Coordinator</p>
              </label>
              <input
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
                <input
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
                <input
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
                  <input
                    {...register(
                      "immigrationStatus",
                      // , { required: true }
                    )}
                    type="radio"
                    name="immigrationStatus"
                    value="Citizen"
                    id="citizen"
                  />
                  Citizen
                </label>
                <label htmlFor="pr">
                  <input
                    {...register(
                      "immigrationStatus",
                      // , { required: true }
                    )}
                    type="radio"
                    name="immigrationStatus"
                    value="PR"
                    id="pr"
                  />
                  PR
                </label>
                <label htmlFor="temporaryWorker">
                  <input
                    {...register(
                      "immigrationStatus",
                      // , { required: true }
                    )}
                    type="radio"
                    name="immigrationStatus"
                    value="TemporaryWorker"
                    id="temporaryWorker"
                  />
                  TemporaryWorker
                </label>
                <label htmlFor="student">
                  <input
                    {...register(
                      "immigrationStatus",
                      // , { required: true }
                    )}
                    type="radio"
                    name="immigrationStatus"
                    value="Student"
                    id="student"
                  />
                  Student
                </label>
                <label htmlFor="visitor">
                  <input
                    {...register(
                      "immigrationStatus",
                      // , { required: true }
                    )}
                    type="radio"
                    name="immigrationStatus"
                    value="Visitor"
                    id="visitor"
                  />
                  Visitor
                </label>
                <label htmlFor="refugee">
                  <input
                    {...register(
                      "immigrationStatus",
                      // , { required: true }
                    )}
                    type="radio"
                    name="immigrationStatus"
                    value="Refugee"
                    id="refugee"
                  />
                  Refugee
                </label>
              </div>
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="arrivalDateToCanada">
                <p>캐나다 도착일</p>
                <p>Arrival Date To Canada</p>
              </label>
              <div className="arrivalDateToCanada">
                <input
                  id="arrivalDateToCanada"
                  type="date"
                  {...register("arrivalDateToCanada", { valueAsDate: true })}
                />
              </div>
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="occupation">
                <p>직업</p>
                <p>Occupation</p>
              </label>
              <input id="occupation" {...register("occupation")} />
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="education">
                <p>학력</p>
                <p>Education</p>
              </label>
              <input id="education" {...register("education")} />
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="englishLevel">
                <p>영어능력</p>
                <p>English Level</p>
              </label>
              <input id="englishLevel" {...register("englishLevel")} />
            </InputIndividual>
          </Col>
          <Col xs={24} md={8}>
            <InputIndividual>
              <label htmlFor="counselor">
                <p>담당 상담사</p>
                <p>Counselor</p>
              </label>
              <input id="counselor" {...register("counselor")} />
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="reasonForService">
                <p>방문이유</p>
                <p>Reason For Service</p>
              </label>
              <input id="reasonForService" {...register("reasonForService")} />
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="intakeDateAndTime">
                <p>접수 날짜&시간</p>
                <p>Intake Date</p>
              </label>
              <div className="intakeDateAndTime">
                <input
                  id="intakeDateAndTime"
                  type="datetime-local"
                  {...register("intakeDateAndTime", { valueAsDate: true })}
                />
              </div>
            </InputIndividual>

            {/* <InputIndividual>
              <label htmlFor="intakeTime">
                <p>접수시간</p>
                <p>Intake Time</p>
              </label>
              <div className="intakeTime">
                <input
                  id="intakeTime"
                  type="time"
                  {...register("intakeTime", { valueAsDate: true })}
                />
              </div>
            </InputIndividual> */}

            <InputIndividual>
              <label htmlFor="fileId">
                <p>파일 ID</p>
                <p>File ID</p>
              </label>
              <input id="clientName" {...register("fileId")} />
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="servicePath">
                <p>서비스 경로</p>
                <p>How did you hear about KSSC?</p>
              </label>
              <textarea id="servicePath" {...register("servicePath")} />
            </InputIndividual>

            <InputIndividual>
              <label htmlFor="memo">
                <p>담당자 메모</p>
                <p>Coordinator's Note</p>
              </label>
              <textarea id="memo" {...register("memo")} />
            </InputIndividual>
            <InputIndividual>
              <label htmlFor="attachments">
                <p>첨부파일</p>
                <p>Attachments</p>
              </label>
              <input
                ref={register}
                id="attachments"
                {...register("attachments")}
                type="file"
              />
            </InputIndividual>
          </Col>
        </Row>
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
        <div className="signature"></div>
        <input type="submit" />
        <button type="submit"> Submit Button</button>
      </form>
    </>
  );
};

export default ConsultForm;
