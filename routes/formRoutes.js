const express = require("express");
const router = express.Router();
const formController = require("../controllers/formControllers");

router.post("/help-requests/", formController.createHelpRequest);
router.get("/help-requests/", formController.getAllHelpRequests);
router.get("/help-requests/:id", formController.getHelpRequestById);
router.patch("/help-requests/:id/status", formController.updateHelpStatus);

// routes/contactRequests.js

router.post("/contact-requests/", formController.createContactRequest);
router.get("/contact-requests/", formController.getAllContactRequests);
router.get("/contact-requests/:id", formController.getContactRequestById);
router.patch(
  "/contact-requests/:id/status",
  formController.updateContactStatus
);

module.exports = router;
