const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const animalsController = require("../controllers/animals");
const middlewares = require("../controllers/middlewares");
const auth = require("../controllers/auth");

router.use("/auth/login", auth.loginUser);
router.use("/auth/register", auth.registerUser);
router.use("/users/generate/:no_records", userController.generateFakeUsers);

router.use(
  "/animals/generate/:no_records",
  animalsController.generateFakeAnimals
);
router.use(
  "/animals/create/:userId",
  middlewares.verifyToken,
  animalsController.addAnimal
);
router.use("/animals/getAllAnimals", animalsController.getAllAnimals);
router.use(
  "/animals/update/:animalId",
  middlewares.verifyToken,
  animalsController.updateAnimal
);
router.use(
  "/animals/delete/:animalId",
  middlewares.verifyToken,
  animalsController.deleteAnimal
);
router.use("/animals/:userId", animalsController.getUsersAnimals);

module.exports = router;
