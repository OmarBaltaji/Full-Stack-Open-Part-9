import { ContentProps } from "../types"
import Part from "./Part"

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map(coursePart => 
        <Part part={coursePart} />
      )}
    </div>
  )
}

export default Content