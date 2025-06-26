import React, { useState } from 'react'
import { createNewDiary } from '../services/diaryService';
import { type NewDiary, type DiaryFormProps, Visibility, Weather } from '../types';
import axios from 'axios';

const DiaryForm = ({ diaries, setDiaries }: DiaryFormProps) => {
  const initialDiary: NewDiary = {
    date: '',
    comment: '',
    visibility: Visibility.Ok,
    weather: Weather.Cloudy,
  }

  const [newDiary, setNewDiary] = useState<NewDiary>(initialDiary);
  const [notification, setNotification] = useState('');

  const addNewDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createNewDiary(newDiary)
      .then(data => {
        setDiaries(diaries.concat(data))
        setNewDiary(initialDiary)
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          setNotification(error?.response?.data)
        } else {
          setNotification('Some Unexpected Error Happened');
        }

        setTimeout(() => {
          setNotification('');
        }, 5000);
      });
  }

  const onChangeHandler = (value: string, property: string) => {
    setNewDiary((diary) => ({ ...diary, [property]: value }));
  }

  return (
    <div>
      {notification && 
        <div>
          <span style={{ color: 'red' }}>{notification}</span>
        </div>
      }

      <h1>Add New Diary</h1>
      <form onSubmit={addNewDiary}>
        <div>
          <label>Date: </label>
          <input value={newDiary.date} type='date' onChange={({ target }) => onChangeHandler(target.value, 'date')} />
        </div>
        <br />
        <div>
          <label>Comment: </label>
          <textarea value={newDiary.comment} onChange={({ target }) => onChangeHandler(target.value, 'comment')} />
        </div>
        <br />
        <div>
          <label>Visibility: </label>&nbsp;
          {Object.entries(Visibility).map(([ key, value ]) => 
            <span key={key}>
              {key}
              <input type='radio' name='visibility' value={value} checked={value === newDiary.visibility} onChange={({ target }) => onChangeHandler(target.value, 'visibility')} />
              &emsp;
            </span>
          )}
        </div>
        <br />
        <div>
          <label>Weather: </label>&nbsp;
            {Object.entries(Weather).map(([ key, value ]) => 
            <span key={key}>
              {key}
              <input type='radio' name='weather' value={value} checked={value === newDiary.weather} onChange={({ target }) => onChangeHandler(target.value, 'weather')} />
              &emsp;
            </span>
          )}
        </div>
        <br />
        <button type='submit'>Add</button>
      </form>
      <br />
      <hr />
    </div>
  )
}

export default DiaryForm