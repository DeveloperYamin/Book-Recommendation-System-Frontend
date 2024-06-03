/* This code snippet is a React component named `ValidationError` that is used to display an error
message with an icon if an error exists and the field has been touched. Here's a breakdown of what
the code does: */

import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
interface Props {
  error?: string;
  touched?: boolean;
}

function ValidationError({ error, touched }: Props) {
  return (
    <>
      {error && touched ? (
        <p className="text-red-400 flex items-center">
          <PriorityHighIcon
            sx={{
              fontSize: 20,
            }}
          />
          {error}
        </p>
      ) : null}
    </>
  );
}

export default ValidationError;
