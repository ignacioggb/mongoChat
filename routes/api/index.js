const router = require("express").Router();
const bookRoutes = require("./chatRoute");

// Book routes
router.use("/chat", chatRoutes);

module.exports = router;
