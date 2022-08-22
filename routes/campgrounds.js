const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");

// =============== Index =================

router.get("", catchAsync(campgrounds.index));

// =============== New =================

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.post(
  "",
  isLoggedIn,
  validateCampground,
  catchAsync(campgrounds.createCampground)
);

// =============== Show =================

router.get("/:id", catchAsync(campgrounds.showCampground));

// =============== Edit =================

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

router.put(
  "/:id",
  validateCampground,
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.updateCampground)
);

// =============== Delete =================

router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.deleteCampground)
);

module.exports = router;
