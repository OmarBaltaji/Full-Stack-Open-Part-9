import React from 'react'
import { type DiaryProps } from '../types'

const Diary = ({ diary }: DiaryProps) => (
  <div>
    <h2>Diary #{diary.id}</h2>
    <h3>{diary.date}</h3>
    <div><span>Visibility: </span>{diary.visibility}</div>
    <div><span>Weather: </span>{diary.weather}</div>
    {diary.comment && <div><span>Comment: </span>{diary.comment}</div>}
    <br />
  </div>
)

export default Diary;