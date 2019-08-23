const router = require("express").Router();
const handle = require("../handlers");
const auth = require("../middlewares/auth");

// router.get("/", handle.showPolls);
// router.post("/", handle.createPoll);
router.
route("/").
get(handle.showPolls).
post(auth, handle.createPoll);

router.
route("/user").
get(auth, handle.usersPolls);

router.
route("/:id").
get(handle.getPoll).
post(auth, handle.vote).
delete(auth, handle.deletePoll);

module.exports = router;
