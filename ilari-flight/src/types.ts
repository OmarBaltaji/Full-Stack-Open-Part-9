export interface DiaryType {
  id: number,
  date: string,
  weather: Weather,
  visibility: Visibility,
  comment: string,
}

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Windy = 'windy',
  Stormy = 'stormy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface DiaryProps {
  diary: DiaryType
}

export interface DiaryFormProps {
  diaries: DiaryType[]
  setDiaries: React.Dispatch<React.SetStateAction<DiaryType[]>>
}

export type NewDiary = Omit<DiaryType, 'id'>;