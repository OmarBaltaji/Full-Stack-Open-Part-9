import React from 'react'
import { type DiaryProps } from '../types'

const Diary = ({ diary }: DiaryProps) => (
  <div key={diary.id}>
    <h2>Diary #{diary.id}</h2>
    <h3>{diary.date}</h3>
    <div><span>visibility: </span>{diary.visibility}</div>
    <div><span>weather: </span>{diary.weather}</div>
    {diary.comment && <li>{diary.comment}</li>}
    <br />
  </div>
)

export default Diary;