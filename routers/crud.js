const express = require("express");
const fs = require("fs");
const path = require("path");

const croute = express.Router();
croute.use(express.json());

function savePerson(personFile, data) {
  const filePath = path.join(__dirname, "..", "database", personFile);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function loadPerson(personFile) {
  const filePath = path.join(__dirname, "..", "database", personFile);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

// select person
croute.get("/select/:person", (req, res) => {
  const map = {
    person1: "person1.json",
    person2: "person2.json",
    person3: "person3.json"
  };

  const file = map[req.params.person];
  if (!file) return res.redirect("/");

  req.session.personName = req.params.person;
  req.session.personData = loadPerson(file);

  res.redirect("/");
});

// ================= LISTINGS =================

croute.post("/listings/edit", (req, res) => {
  const { index, newValue } = req.body;
  const personName = req.session.personName;

  if (!personName) return res.status(400).send("No person selected");

  const file = `${personName}.json`;
  const data = loadPerson(file);

  data.listings[index] = newValue;
  savePerson(file, data);

  req.session.personData = data;
  res.sendStatus(200);
});

croute.post("/listings/delete", (req, res) => {
  const { index } = req.body;
  const personName = req.session.personName;

  if (!personName) return res.status(400).send("No person selected");

  const file = `${personName}.json`;
  const data = loadPerson(file);

  data.listings.splice(index, 1);
  savePerson(file, data);

  req.session.personData = data;
  res.sendStatus(200);
});

croute.post("/listings/add", (req, res) => {
  const { value } = req.body;
  const personName = req.session.personName;

  if (!personName) return res.status(400).send("No person selected");

  const file = `${personName}.json`;
  const data = loadPerson(file);

  data.listings.push(value.trim());
  savePerson(file, data);

  req.session.personData = data;
  res.sendStatus(200);
});

// ================= REVIEWS (FIXED) =================

croute.post("/reviews/edit", (req, res) => {
  const { index, newValue } = req.body;
  const personName = req.session.personName;

  if (!personName) return res.status(400).send("No person selected");

  const file = `${personName}.json`;
  const data = loadPerson(file);

  data.reviews[index] = newValue;
  savePerson(file, data);

  req.session.personData = data;
  res.sendStatus(200);
});

croute.post("/reviews/delete", (req, res) => {
  const { index } = req.body;
  const personName = req.session.personName;

  if (!personName) return res.status(400).send("No person selected");

  const file = `${personName}.json`;
  const data = loadPerson(file);

  data.reviews.splice(index, 1);
  savePerson(file, data);

  req.session.personData = data;
  res.sendStatus(200);
});


module.exports = croute;
