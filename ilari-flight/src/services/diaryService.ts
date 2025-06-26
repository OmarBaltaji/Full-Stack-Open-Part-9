import axios from "axios"
import type { DiaryType, NewDiary } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = () => {
  return axios.get<DiaryType[]>(baseUrl)
    .then(({ data }) => data);
}

export const createNewDiary = (newDiary: NewDiary): Promise<DiaryType> => {
  return axios.post<DiaryType>(baseUrl, newDiary)
    .then(({ data }) => data);
}