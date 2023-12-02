import { AxiosPromise } from 'axios';

// PROFILE

export interface ResponseProfileData {
    id: number;
    nickname: string;
    name: string;
    picture: string;
    email: string;
  }
export type FetchProfile = () => AxiosPromise<ResponseProfileData>;

// NOTES

export interface ResponseNoteData {
    id?: number;
    userId?: number;
    title?: string;
    body?: string;
  }

export interface CreateNoteBody {
    title: string;
    body: string;
  }

export type FetchNotes = () => AxiosPromise<ResponseNoteData[]>;
export type FetchNoteById = (id: number) => AxiosPromise<ResponseNoteData>;
export type CreateNote = (data: CreateNoteBody) => AxiosPromise<ResponseNoteData>;
export type DeleteNote = (id: number) => AxiosPromise<ResponseNoteData>;

// COMMENTS

export interface ResponseCommentData {
    id: number;
    userId: number;
    noteId: number;
    body: string;
  }

export interface CreateCommentBody {
    noteId: number;
    body: string;
  }

export type FetchComments = () => AxiosPromise<ResponseCommentData[]>;
export type FetchCommentById = (id: number) => AxiosPromise<ResponseCommentData>;
export type CreateComment = (data: CreateCommentBody) => AxiosPromise<ResponseCommentData>;
export type DeleteComment = (id: number) => AxiosPromise<ResponseCommentData>;

// ETC
export interface DefaultField {
  value: string;
  error: string;
}