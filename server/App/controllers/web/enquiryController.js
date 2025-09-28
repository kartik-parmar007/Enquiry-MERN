const enquiryModel = require('../../models/enquiry.model');

let enquiryInsert = (req, res) => {
    let { kname, kemail, kphone, kmessage } = req.body;
    let enquiry = new enquiryModel({
      name: kname,
      email: kemail,
      phone: kphone,
      message: kmessage,
    });
    enquiry
      .save()
      .then(() => {
        res.send("Enquiry Inserted");
      })
      .catch((err) => {
        res.status(500).send("Error inserting enquiry");
      });
}

let enquiryList = (req, res) => {
  enquiryModel
    .find()
    .then((inquiryData) => {
      res.status(200).json(inquiryData);
    })
    .catch((err) => {
      res.status(500).send("Error fetching enquiry list");
    });
};

let enquiryDelete = (req, res) => {
    let enquiryId = req.params.id;
    enquiryModel
      .findByIdAndDelete(enquiryId)
      .then(() => {
        res.status(200).send("Enquiry Deleted");
      })
      .catch((err) => {
        res.status(500).send("Error deleting enquiry");
      });
};

let enquiryUpdate = (req, res) => {
  let enquiryId = req.params.id;
  let { kname, kemail, kphone, kmessage } = req.body;
  enquiryModel
    .findByIdAndUpdate(enquiryId, {
      name: kname,
      email: kemail,
      phone: kphone,
      message: kmessage,
    })
    .then(() => {
      res.status(200).send("Enquiry Updated");
    })
    .catch((err) => {
      res.status(500).send("Error updating enquiry");
    });
};

module.exports = { enquiryInsert, enquiryList, enquiryDelete, enquiryUpdate };