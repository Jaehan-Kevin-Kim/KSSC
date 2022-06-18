import { useForm } from "react-hook-form";
import { Row, Col } from "antd";
import styled from "@emotion/styled";

const InputIndividual = styled.div`
  display: flex;
`;

const HookFormTest = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data: ", data);
    const { fullName, exampleRequired } = data;
    console.log(fullName, exampleRequired);
  };

  return (
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
            <label htmlFor="dayOfBirth">
              <p>생년월일</p>
              <p>Date of Birth (YYYY-MM-DD)</p>
            </label>
            <div className="dayOfBirth">
              <input
                id="dayOfBirth"
                type="date"
                {...register("dayOfBirth", { valueAsDate: true })}
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
        <input type="submit" />
        <button type="submit"> Submit Button</button>
      </Row>
    </form>
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <Row>
    //     <Col xs={24} md={8}>
    //       <label htmlFor="name">Name</label>
    //       <input id="name" defaultValue="" {...register("fullName")} />

    //       <input {...register("exampleRequired", { required: true })} />

    //       {errors.exampleRequired && <span> This field is required</span>}
    //     </Col>
    //     <Col xs={24} md={8}>
    //       <div className="radioButton">
    //         <p>I love:</p>
    //         <div className="form-check">
    //           <label htmlFor="ted-lasso">
    //             <input
    //               {...register("favShow", { required: true })}
    //               type="radio"
    //               name="favShow"
    //               value="Ted Lasso"
    //               className="form-check-input"
    //               id="ted-lasso"
    //             />{" "}
    //             Ted Lasso
    //           </label>
    //         </div>

    //         <div className="form-check">
    //           <label htmlFor="got">
    //             <input
    //               {...register("favShow", { required: true })}
    //               type="radio"
    //               name="favShow"
    //               value="GOT"
    //               className="form-check-input"
    //               id="got"
    //             />{" "}
    //             GOT
    //           </label>
    //         </div>

    //         <div className="form-check">
    //           <label htmlFor="breadking-bad">
    //             <input
    //               {...register("favShow", { required: true })}
    //               type="radio"
    //               name="favShow"
    //               value="Breaking Bad"
    //               className="form-check-input"
    //               id="breadking-bad"
    //             />
    //             Breaking Bad
    //           </label>
    //         </div>
    //       </div>
    //     </Col>
    //     <Col xs={24} md={8}>
    //       <label htmlFor="date"></label>
    //       <div>
    //         <input
    //           {...register("dateTime", { valueAsDate: true })}
    //           type="date"
    //           id="date"
    //         />
    //         <input
    //           type="date"
    //           {...register("test", {
    //             valueAsDate: true,
    //           })}
    //         />
    //       </div>
    //     </Col>
    //     <input type="submit" />
    //   </Row>
    // </form>
  );
};

export default HookFormTest;
