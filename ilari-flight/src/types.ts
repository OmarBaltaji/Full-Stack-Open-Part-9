export interface Diary {
  id: number,
  date: 'string',
  weather: Weather,
  visibility: Visibility,
  comment: string,
}

enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Windy = 'windy',
  Stormy = 'stormy',
}

enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}