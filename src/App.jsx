import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  //sates
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    body: "",
  });

  //useEffect
  useEffect(() => {
    fetchNotes();
  }, [notes]);

  //functions
  const fetchNotes = async () => {
    //fetch notes
    const res = await axios.get(
      "https://note-app-server-ne8r.onrender.com/notes"
    );

    setNotes(res.data.notes);
    //set to state
  };

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;

    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  const createNote = async (e) => {
    e.preventDefault();
    await axios.post(
      "https://note-app-server-ne8r.onrender.com/notes",
      createForm
    );

    //clear form state
    setCreateForm({ title: "", body: "" });
  };

  const deleteNote = async (id) => {
    await axios.delete(`https://note-app-server-ne8r.onrender.com/notes/${id}`);
  };
  const handleUpdateFieldChange = async (e) => {
    const { value, name } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const toggleUpdate = (note) => {
    //Set state on update form
    setUpdateForm({ title: note.title, body: note.body, _id: note._id });
  };

  const updateNote = async (e) => {
    e.preventDefault();
    const { title, body } = updateForm;
    //send the update request to
    await axios.put(
      `https://note-app-server-ne8r.onrender.com/notes/${updateForm._id}`,
      {
        title,
        body,
      }
    );
    setUpdateForm({ _id: null, title: "", body: "" });
  };

  return (
    <>
      <div>
        <h2>Notes:</h2>
        {notes &&
          notes.map((note) => (
            <div key={note._id}>
              <h3>{note.title}</h3>
              <button onClick={() => deleteNote(note._id)}>delete item</button>
              <button onClick={() => toggleUpdate(note)}>Update Note</button>
            </div>
          ))}
      </div>
      {updateForm._id && (
        <div>
          <h3>Update Note:</h3>
          <form action="" onSubmit={updateNote}>
            <input
              type="text"
              name="title"
              value={updateForm.title}
              onChange={handleUpdateFieldChange}
            />
            <textarea
              name="body"
              id=""
              cols="30"
              rows="10"
              value={updateForm.body}
              onChange={handleUpdateFieldChange}
            ></textarea>
            <button type="submit">update note</button>
          </form>
        </div>
      )}

      {!updateForm._id && (
        <div>
          <h3>Create Note</h3>
          <form action="" onSubmit={createNote}>
            <input
              type="text"
              name="title"
              value={createForm.title}
              onChange={updateCreateFormField}
            />
            <textarea
              name="body"
              id=""
              cols="30"
              rows="10"
              value={createForm.body}
              onChange={updateCreateFormField}
            ></textarea>
            <button type="submit">Create a Note</button>
          </form>
        </div>
      )}
    </>
  );
}

export default App;
