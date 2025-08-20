const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { authenticateToken } = require("../middleware/authMiddleware");

const prisma = new PrismaClient();

// GET all notes for the authenticated user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// POST a note
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title} = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newNote = await prisma.note.create({
      data: {
        title,
        userId: req.user.userId,
      },
    });
    console.log(newNote);

    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Failed to create note" });
  }
});

// PUT update a note
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title} = req.body;

    const note = await prisma.note.findUnique({
      where: { id: parseInt(id) },
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.userId !== req.user.userId) {
      return res.status(403).json({ error: "Not authorized to update this note" });
    }

    const updatedNote = await prisma.note.update({
      where: { id: parseInt(id) },
      data: { title },
    });

    res.json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Failed to update note" });
  }
});

// DELETE a note
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const note = await prisma.note.findUnique({
      where: { id: parseInt(id) },
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.userId !== req.user.userId) {
      return res.status(403).json({ error: "Not authorized to delete this note" });
    }

    await prisma.note.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
});

module.exports = router;
