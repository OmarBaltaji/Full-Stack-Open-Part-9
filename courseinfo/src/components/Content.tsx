import { ContentProps } from "../types"

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map(coursePart => 
        <p>
          {coursePart.name} {coursePart.exerciseCount}
        </p>
      )}
    </div>
  )
}

export default Content