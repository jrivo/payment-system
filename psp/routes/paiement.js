const { Router } = require("express");
const router = Router();

router.post("", (req, res) => {
    const body = req.body;
    console.log(body);
});

module.exports = router;
