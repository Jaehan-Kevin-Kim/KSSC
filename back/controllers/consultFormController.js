const asyncHandler = require("express-async-handler");
const ConsultForm = require("../models/consultFormModel");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("Create uploads folder");
  fs.mkdirSync("uploads");
}

const postForm = async (req, res) => {
  const bodyValue = req.body;
  try {
    const consultForm = await ConsultForm.create(bodyValue);
    res.status(200).json(consultForm);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

const getForms = asyncHandler(async (req, res) => {
  try {
    const consultForms = await ConsultForm.find();
    res.status(200).json(consultForms);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

const getForm = async (req, res) => {
  const id = req.params.id;
  try {
    const consultForm = await ConsultForm.findById(id);
    res.status(200).json(consultForm);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

const updateForm = async (req, res) => {
  const id = req.params.id;
  try {
    // if (!req.user){
    //   res.status(401);

    // }
    const updatedConsultForm = await ConsultForm.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      },
    );
    res.status(200).json(updatedConsultForm);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

const postFile = async (req, res) => {
  try {
    console.log(req.file);
    if (req.file) {
      res.status(200).json(req.file.filename);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

//Admin
const deleteForm = async (req, res) => {
  const id = req.params.id;
  try {
    const consultForm = await ConsultForm.findById(id);
    await consultForm.remove();
    res.status(200).json({ message: `${id} is removed` });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

module.exports = {
  getForms,
  getForm,
  postForm,
  updateForm,
  deleteForm,
  postFile,
};
