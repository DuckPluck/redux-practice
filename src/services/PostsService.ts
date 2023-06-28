import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const postsAPI = createApi({
  reducerPath: 'postsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  // по-умолчанию редакс не знает куда добавлять новые посты, чтобы указать нужны теги
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    fetchPosts: builder.query<IPost[], number>({
      query: (limit) => ({
        url: `/posts`,
        params: {
          _limit: limit,
        },
      }),
      // Указываем, что этот эндпоинт получает данные (кстати в колбэке можно вызвать аргумент result для динамики)
      providesTags: () => ['Post'],
    }),
    createPost: builder.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts`,
        method: 'POST',
        body: post,
      }),
      // Указываем, что данные становятся не актуальными, соответственно их заново получим
      invalidatesTags: () => ['Post'],
    }),
    updatePost: builder.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PUT',
        body: post,
      }),
      // Указываем, что данные становятся не актуальными, соответственно их заново получим
      invalidatesTags: () => ['Post'],
    }),
    deletePost: builder.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'DELETE',
      }),
      // Указываем, что данные становятся не актуальными, соответственно их заново получим
      invalidatesTags: () => ['Post'],
    }),
  }),
});

export const { useFetchPostsQuery } = postsAPI;
