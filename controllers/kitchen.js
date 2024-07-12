import { Kitchen } from "../models/kitchen.js";

export const getKitchenStaus = async (req, res) => {
  try {
    const status = await Kitchen.findOne();
    return res.status(200).json(status);
  } catch (error) {
    console.log("Error in set Kitchen Status", error);
    return res.status(500).json({ message: "Kitchen status not set" });
  }
};

export const setKitchenStatus = async (req, res) => {
  try {
    const status = await Kitchen.create({
      open: true,
    });
    return res.status(201).json(status);
  } catch (error) {
    console.log("Error in set Kitchen Status");
  }
};

export const updateKitchenStatus = async (req, res) => {
  try {
    const { kitchenStatus } = req.body;

    // Check if KitchenStatus is a boolean
    if (typeof kitchenStatus !== "boolean") {
      return res.status(400).send({ error: "KitchenStatus must be a boolean" });
    }

    const status = await Kitchen.findOne();
    if (!status) {
      return res.status(404).send({ error: "Kitchen status not found" });
    }

    status.open = kitchenStatus;
    const newStatus = await status.save();

    return res.status(200).send(newStatus);
  } catch (error) {
    return res
      .status(500)
      .send({ error: "An error occurred while updating the kitchen status" });
  }
};

