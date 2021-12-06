const faker = require("faker");
const db = require("../config/firebase");

const generateFakeAnimals = async (req, res) => {
  try {
    const users = [];
    let usersCollection = await db.collection("users").get();
    let no_records = req.params.no_records;

    usersCollection.docs.map((animal) => {
      users.push(animal.id);
    });

    for (let i = 0; i < no_records; i++) {
      let animalType = "";
      let animalBreed = "";
      let animalGender = "";
      if (i % 2 == 0) {
        animalGender = "F";
      } else {
        animalGender = "M";
      }
      if (i % 3 == 0) {
        animalBreed = faker.animal.dog();
        animalType = "Dog";
      } else {
        animalBreed = faker.animal.cat();
        animalType = "Cat";
      }

      let animalName = faker.name.firstName();
      if (animalName[animalName.length - 1] === "a") {
        animalGender = "F";
      }
      let animalDescription = faker.lorem.sentence(4);

      let userId = faker.random.arrayElement(users);

      const fakeAnimal = {
        animalType: animalType,
        animalBreed: animalBreed,
        animalName: animalName,
        animalGender: animalGender,
        animalDescription: animalDescription,
        userId: userId,
      };
      await db.collection("animals").add(fakeAnimal);
    }
    res.status(201).json({
      message: "Animals successfully added!",
    });
  } catch (e) {
    res.status(500).json({
      message: `Server error: ${e}`,
    });
  }
};

const addAnimal = async (req, res) => {
  try {
    const userId = req.params.userId;
    let animal = { ...req.body };
    animal.userId = userId;
    await db.collection("animals").add(animal);
    res.status(201).json({
      message: "Animal successfully added!",
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const updateAnimal = async (req, res) => {
  try {
    const animalId = req.params.animalId;
    let animal = { ...req.body };
    await db.collection("animals").doc(animalId).update(animal);
    res.status(202).json({
      message: "Animal successfully updated!",
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const deleteAnimal = async (req, res) => {
  try {
    const animalId = req.params.animalId;
    await db.collection("animals").doc(animalId).delete();
    res.status(202).json({
      message: "Animal successfully deleted!",
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const getUsersAnimals = async (req, res) => {
  try {
    const userId = req.params.userId;
    let animals = [];
    await db
      .collection("animals")
      .where("userId", "==", userId)
      .get()
      .then((querySnapshot) => {
        let animal;
        querySnapshot.forEach((doc) => {
          animal = doc.data();
          animal.id = doc.id;
          animals.push(animal);
        });
      });

    res.status(200).json({
      message: "Success!",
      animals: animals,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const getAllAnimals = async (req, res) => {
  try {
    let animals = [];
    await db
      .collection("animals")
      .get()
      .then((querySnapshot) => {
        let animal;
        querySnapshot.forEach((doc) => {
          animal = doc.data();
          animal.id = doc.id;
          animals.push(animal);
        });
      });

    res.status(200).json({
      message: "Success!",
      animals: animals,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};
module.exports = {
  generateFakeAnimals,
  addAnimal,
  updateAnimal,
  deleteAnimal,
  getUsersAnimals,
  getAllAnimals,
};
