import { useQuery } from '@apollo/client';

import BlogPostList from '../components/BlogPostList';
import BlogPostDetails from '../components/BlogPostDetails';

import { QUERY_BLOGS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_BLOGS);
  const posts = data?.posts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <BlogPostDetails />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <BlogPostList
              thoughts={thoughts}
              title="Tell Us About Your Passion With Music. Share & Comment..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
