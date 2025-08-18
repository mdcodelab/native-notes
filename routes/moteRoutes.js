const prisma=require("../config/prisma");
const app = express();
const router = require('express').Router();


// GET all notes
router.get("/", async (req, res) => {
  try {
    const notes = await prisma.note.findMany();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

//POST a note
router.post("/", async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    if (!title || !userId) {
      return res.status(400).json({ error: "Title or userId are required" });
    }

    const newNote = await prisma.note.create({
      data: {
        title,
        content,
        userId: parseInt(userId), // assures integer
      },
    });

    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Failed to create note" });
  }
});

//update a note
// PUT update a note
router.put("/:id", async (req, res) => {
  try {
    const noteId = parseInt(req.params.id);
    const { title, content } = req.body;

    if (isNaN(noteId)) {
      return res.status(400).json({ error: "Invalid note id" });
    }

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: {
        title,
        content,
      },
    });

    res.json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Failed to update note" });
  }
});

// DELETE a note
// DELETE a note
router.delete("/:id", async (req, res) => {
  try {
    const noteId = parseInt(req.params.id);

    if (isNaN(noteId)) {
      return res.status(400).json({ error: "Invalid note id" });
    }

    const deletedNote = await prisma.note.delete({
      where: { id: noteId },
    });

    res.json({ message: "Note deleted successfully", deletedNote });
  } catch (error) {
    console.error("Error deleting note:", error);

    if (error.code === "P2025") {
      // P2025 = record not found în Prisma
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(500).json({ error: "Failed to delete note" });
  }
});

// Export the router
module.exports = router;
