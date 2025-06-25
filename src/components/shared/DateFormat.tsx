import * as React from "react";
import { format } from "date-fns";
import { DateFormatPropsType } from "@/types";

const DateFormat: React.FC<DateFormatPropsType> = ({ dateString }) => {
  return (
    <time dateTime={dateString} className="text-muted-foreground p-0">
      {format(dateString, "dd/MM/yyyy")}
    </time>
  );
};

export default DateFormat;
