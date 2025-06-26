import { useEffect, useState } from 'react'
import './App.css'
import { type DiaryType } from './types';
import { getAllDiaries } from './services/diaryService';
import Diary from './components/Diary';

function App() {
  const [diaries, setDiaries] = useState<DiaryType[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, []);

  return (
    <div>
      <h1>Diary Entries</h1>
      {diaries.map(diary => <Diary diary={diary} />)}  
    </div>
  )
}

export default App
