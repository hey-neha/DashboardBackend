var csv = require("csvtojson");

const importUser = async (req, res) => {
  try {
    csv()
      .fromFile(req.file.path)
      .then((response) => {
        /* console.log(response); */
      });

    res.send({ status: 400, success: true, msg: "CSV Imported!!" });
  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message });
  }
};

module.exports = {
  importUser,
};
