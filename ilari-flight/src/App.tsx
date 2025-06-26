import { useEffect, useState } from 'react'
import './App.css'
import { type Diary } from './types';
import { getAllDiaries } from './services/diaryService';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);


  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, []);

  return (
    <div>
      <h1>Diary Entries</h1>
      {diaries.map(diary =>
        <div key={diary.id}>
          <h2>Diary #{diary.id}</h2>
          <h3>{diary.date}</h3>
          <div><span>visibility: </span>{diary.visibility}</div>
          <div><span>weather: </span>{diary.weather}</div>
          {diary.comment && <li>{diary.comment}</li>}
          <br />
        </div>
      )}
    </div>
  )
}

export default App
