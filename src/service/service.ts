import axios from 'axios';
import { getToken } from '../utils/localStorage';
import { CreateComment, CreateNote, CreateNoteBody, DeleteComment, DeleteNote, FetchCommentById, FetchComments, FetchNoteById, FetchNotes, FetchProfile } from '../types/types';

export const endpoint = (path: string) => `${process.env.BACK_API_URL}${path}`;
export const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
    }

//  PROFILE
export const fetchProfile: FetchProfile = () => {
  return axios({
    url: endpoint('/profile'),
    method: 'GET',
    headers,
  });
};

//  NOTES
export const fetchNotes: FetchNotes = () => {
    return axios({
      url: endpoint('/notes'),
      method: 'GET',
      headers,
    });
  };

export const fetchNoteById: FetchNoteById = (id) => {
    return axios({
        url: endpoint(`/notes/${id}`),
        method: 'GET',
        headers,
    });
};

export const createNote: CreateNote = ({title, body}) => {
    return axios({
        url: endpoint(`/notes`),
        method: 'POST',
        data: {
            title,
            body,
          },
        headers,
    });
};

export const deleteNote: DeleteNote = (id) => {
    return axios({
        url: endpoint(`/notes/${id}`),
        method: 'DELETE',
        headers,
    });
};

//  COMMENTS
export const fetchComment: FetchComments = () => {
    return axios({
      url: endpoint('/comments'),
      method: 'GET',
      headers,
    });
  };

export const fetchCommentById: FetchCommentById = (id) => {
    return axios({
        url: endpoint(`/comments/${id}`),
        method: 'GET',
        headers,
    });
};

export const createComment: CreateComment = ({noteId, body}) => {
    return axios({
        url: endpoint(`/comments`),
        method: 'POST',
        data: {
            noteId,
            body,
          },
        headers,
    });
};

export const deleteComment: DeleteComment = (id) => {
    return axios({
        url: endpoint(`/comments/${id}`),
        method: 'DELETE',
        headers,
    });
};