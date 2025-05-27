import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UpdateArticleForm() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });


  // Fetch to prefill a form and update an existing article
  useEffect(() => {
    axios.put(`http://localhost:5000/articles/${id}`, updatedata)
    .then(response => setForm(response.data))
    .catch(err => console.error('Error fetching article:', err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update article with axios
    try {
      await axios.put(`http://localhost:5000/articles/${id}`, form);
      alert('Article updated successfully!');
      // Optionally redirect or reset form
    } catch (error) {
      console.error('Error updating article:', error);
      alert('Failed to update article. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Article</h3>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required /><br />
      <input name="journalistId" value={form.journalistId} onChange={handleChange} placeholder="Journalist ID" required /><br />
      <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" required /><br />
      <button type="submit">Update</button>
    </form>
  );
}
