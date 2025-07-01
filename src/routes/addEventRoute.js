const express = require("express");
const router = express.Router();
const { db } = require("../config/db");
const { ObjectId } = require("mongodb");
const verifyToken = require("../middlewares/verifyToken");

const eventsCollection = db.collection("events");

// save event
router.post("/add-event", verifyToken, async (req, res) => {
  const eventInfo = req.body;

  const { organizerName, title, description, date, time, location, userEmail } =
    eventInfo;

  if (
    !organizerName ||
    !title ||
    !description ||
    !date ||
    !time ||
    !location ||
    !userEmail
  ) {
    return res.status(400).send({ message: "All fields are required" });
  }

  eventInfo.createdAt = new Date();

  try {
    const result = await eventsCollection.insertOne(eventInfo);

    if (result.insertedId) {
      return res
        .status(200)
        .send({ result, message: "Event added successfully" });
    } else {
      return res.status(500).send({ message: "Failed to add event" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

// get all events
router.get("/events", async (req, res) => {
  try {
    const result = await eventsCollection.find({}).toArray();

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// get events for a specific user
router.get("/events/:email", verifyToken, async (req, res) => {
  const email = req.params.email;
  try {
    const result = await eventsCollection.find({ userEmail: email }).toArray();

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// patch update event
router.patch("/events/:id", async (req, res) => {
  const id = req.params.id;

  const updatedEvent = req.body;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await eventsCollection.updateOne(query, {
      $set: updatedEvent,
    });

    if (result.modifiedCount) {
      return res
        .status(200)
        .send({ result, message: "Event updated successfully" });
    } else {
      return res.status(400).send({ message: "Failed to update event" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

// delete event
router.delete("/events/:id", verifyToken, async (req, res) => {
  const id = req.params.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await eventsCollection.deleteOne(query);

    if (result.deletedCount) {
      return res
        .status(200)
        .send({ result, message: "Event deleted successfully" });
    } else {
      return res.status(400).send({ message: "Failed to delete event" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
