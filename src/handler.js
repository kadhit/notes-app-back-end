const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, h) => {
  const { title, tags, body } = req.payload;
  const id = nanoid();
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const res = h.response({
      status: 'success',
      message: 'Note successfully added.',
      data: {
        noteId: id,
      },
    });
    res.code(201);
    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'Note cannot be added.',
  });
  res.code(501);
  return res;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

module.exports = { addNoteHandler, getAllNotesHandler };
