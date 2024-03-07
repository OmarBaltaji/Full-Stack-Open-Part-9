export interface CoursePart {
  name: string;
  exerciseCount: number;
}

export interface ContentProps {
  courseParts: CoursePart[];
}

export interface HeaderProps {
  courseName: string;
}

export interface TotalProps { 
  totalExercises: number 
}