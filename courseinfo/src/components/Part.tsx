import { CoursePart } from "../types"

const Part = ({ part }: {part: CoursePart}) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const displayNameAndCount = ({ name, exerciseCount }: { name: string, exerciseCount: number }) => <><b>{name} {exerciseCount}</b><br/></>;
  const displayDescription = (description: string) => <><i>{description}</i><br/></>;

  switch(part.kind) {
    case 'basic':
      return ( 
        <p>
          {displayNameAndCount(part)}
          {displayDescription(part.description)}
        </p>
      )
    case 'group':
      return (
        <p>
          {displayNameAndCount(part)}
          <span>project exercises {part.groupProjectCount}</span>
        </p>
      )
    case 'background':
      return (
        <p>
          {displayNameAndCount(part)}
          {displayDescription(part.description)}
          <span>submit to {part.backgroundMaterial}</span>
        </p>
      )
    case 'special':
      return (
        <p>
          {displayNameAndCount(part)}
          {displayDescription(part.description)}
          <span>required skills: {part.requirements.join(', ')}</span>
        </p>
      )
    default:
      assertNever(part);
      break;
  }
}

export default Part