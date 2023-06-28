import { useAppDispatch, useAppSelector } from './hooks/redux';
import { useEffect } from 'react';
import { fetchUsers } from './store/reducers/ActionCreators';
import { postsAPI } from './services/PostsService';

import './App.css';


function App() {
  const dispatch = useAppDispatch();

  const { users, isLoading, error } = useAppSelector((state) => state.usersReducer);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);


  // также можно получить из query функцию refresh для повторного запроса, long poll для постоянных запросов через определенное время
  // и селекторы для фильтрации
  const { data: posts, isLoading: postsLoading, error: postsError } = postsAPI.useFetchPostsQuery(100)
  // в пустом объекте ниже можно получить isLoading, error и тд.
  const [createPost, {}] = postsAPI.useCreatePostMutation();
  const [removePost, {}] = postsAPI.useDeletePostMutation();
  const [updatePost, {}] = postsAPI.useUpdatePostMutation();
  const handleAdd = async () => {
    const title = prompt('', 'default title1');
    if (title) {
      await createPost({ title: title, text: title, id: +title });
    }
  };
  const handleDelete = async (event: React.MouseEvent, post: IPost) => {
    event.stopPropagation();
    removePost(post);
  };
  const handleUpdate = async (post: IPost) => {
    const title = prompt('', 'default title1')
    if (title) {
      updatePost({ ...post, title });
    }
  };

  return (
    <div className="app__body">
      <div className="app__users-section">
        {isLoading && <h2>Loading...</h2>}
        {error && <h3>{error}</h3>}
        {users?.map((user) => (
          <div className="app__user-card" key={user.id}>
            <div>
              <h4>{user.name}</h4>
              <h5>{user.email}</h5>
            </div>
          </div>
        ))}
      </div>

      <div className="app__posts-section">
        <button onClick={handleAdd}>Add post</button>
        {postsLoading && <h2>Loading...</h2>}
        {postsError && <h3>{'error'}</h3>}
        {posts?.map((post) => (
          <div className="app__user-card" key={post.id}>
            <div onClick={() => handleUpdate(post)}>
              <h4>{post.title}</h4>
              <h5>{post.text}</h5>
            </div>
            <button onClick={(event) => handleDelete(event, post)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
