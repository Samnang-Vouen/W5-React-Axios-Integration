import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/articles/${id}`);
        setArticle(res.data);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Could not fetch article.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>No article found.</div>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <div>
        <strong>Journalist ID:</strong> {article.journalistId}
      </div>
      <div>
        <strong>Category ID:</strong> {article.categoryId}
      </div>
    </div>
  );
}