const express = require('express');
const cors = require('cors'); 
const axios = require('axios');

const router = express.Router();
router.use(cors());

router.post('/fetchData', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:8080/productsImg');
    const jsonData = response.data;
    res.json(jsonData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
