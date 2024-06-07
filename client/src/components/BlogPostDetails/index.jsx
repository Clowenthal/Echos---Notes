import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_POST } from '../../utils/mutations';
import { QUERY_BLOGS } from '../../utils/queries';

import Auth from '../../utils/auth';

const BlogPostDetails = () => {
  const [blogComment, setBlogComment] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addPOST, { error }] = useMutation
  (ADD_POST, {
    refetchQueries: [
      QUERY_BLOGS,
      'getBlogs'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPOST({
        variables: {
          blogComment,
          blogAuthor: Auth.getProfile().data.username,
        },
      });

      setBlogComment('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'blogComment' && value.length <= 280) {
      setBlogComment(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Share your love for music</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="blogComment"
                placeholder="Music, Artist, Festival..."
                value={blogComment}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Blog Post
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          Login or signup to join the community{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default BlogPostDetails;