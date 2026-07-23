const Data = require('../models/Data');

exports.getData = async (req, res) => {
  try {
    const data = await Data.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getField = async (req, res) => {
  const field = req.params.fieldName;
  try {
    const data = await Data.find({}, { [field]: 1, _id: 0 });
    res.json(data.map(d => d[field]));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const id = req.params.id;
    const imageUrl = req.file.path;

    const updatedData = await Data.findByIdAndUpdate(
      id,
      { image: imageUrl },
      { new: true }
    );

    res.json(updatedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
