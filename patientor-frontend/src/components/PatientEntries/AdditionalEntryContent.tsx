import { CardContent, Typography } from "@mui/material";
import { Entry } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import type { SvgIconProps } from "@mui/material";

interface AdditionalEntryContentProps {
  entry: Entry,
}

const AdditionalEntryContent = ({ entry }: AdditionalEntryContentProps) => {
  const healthCheckRatingColor = (healthCheckRating: number): SvgIconProps['color'] => {
    switch (healthCheckRating) {
      case 0:
        return "success";
      case 1:
        return "info";
      case 2:
        return "warning";
      case 3:
        return "error";
      default:
        return "inherit";
    }
  };

  const EntryDetails = (entry: Entry): React.ReactElement<typeof CardContent> | undefined => {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <CardContent>
            <Typography><b>Health Check Rating:</b>  <FavoriteIcon color={healthCheckRatingColor(entry.healthCheckRating)} /></Typography>
          </CardContent>
        );
      case "OccupationalHealthcare":
        return (
          <CardContent>
            <Typography><b>Employed by:</b> {entry.employerName}</Typography>
            {entry.sickLeave?.startDate && entry.sickLeave.endDate && 
              <Typography>{entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</Typography>
            }
          </CardContent>
        );
      case "Hospital":
        return (
          <CardContent>
            <Typography>
              {entry.discharge.date}
            </Typography>
            <Typography>
              {entry.discharge.criteria}
            </Typography>
          </CardContent>
        );
      default:
        return;
    }
  };

  return (
    <div>{EntryDetails(entry)}</div>
  );
};

export default AdditionalEntryContent;