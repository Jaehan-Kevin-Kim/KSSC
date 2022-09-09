const mongoose = require("mongoose");

const consultFormSchema = mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
    phone: String,
    address: String,
    email: { type: String, required: true, unique: true },
    gender: String,
    marital: String,
    // intakeCoordinator: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
    intakeCoordinator: { type: String },
    intakeStartTime: { type: String },
    intakeEndTime: { type: String },
    nextApptDateTime: { type: Date, required: true },
    canadaArrivalDate: { type: Date },
    immigrationStatus: String,
    occupation: String,
    education: String,
    englishLevel: String,
    counselor: { type: String, required: true },
    reasonForVisit: String,
    registerDateAndTime: { type: Date, required: true },
    servicePath: String,
    memo: String,
    // file: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("ConsultForm", consultFormSchema);

// const a = {
// "clientName": "Juyoung Lee",
// "DOB":"1998-01-22",
// "phone": "4034703411",
// "postalCode": "T2V2W7",
// "email": "email@email.com",
// "gender": "Female",
// "marital": "Single",
// "nextApptDateTime": "2022-05-13T19:26",
// "canadaArrivalDate": "2022-04-12",
// "immigrationStatus": "PR",
// "occupation": "Student",
// "education": "Diploma",
// "englishLevel": "Advanced",
// "counselor": "Kevin Kim",
// "reasonForVisit": "Test",
// "registerDateAndTime": "2022-05-14T21:26",
// "servicePath": "servicePath",
// "memo": "hi",
// "file": "file",}

// const b = {
// "clientName": "Jay Hee",
// "DOB":"1921-01-22",
// "phone": "1234567897",
// "postalCode": "V1D2I4",
// "email": "2mail@email.com",
// "gender": "male",
// "marital": "Single",
// "nextApptDateTime": "2022-05-13T19:26",
// "canadaArrivalDate": "2022-04-12",
// "immigrationStatus": "PR",
// "occupation": "Student",
// "education": "Diploma",
// "englishLevel": "Advanced",
// "counselor": "Owen Kim",
// "reasonForVisit": "I don't know",
// "registerDateAndTime": "2022-03-14T21:26",
// "servicePath": "servicePaths",
// "memo": "hello",
// "file": "files"}
