import * as React from "react";
import { InputRangeClassNames } from "../types";

export const Label: React.FC<{
  children: React.ReactNode;
  classNames: InputRangeClassNames;
  formatLabel?: (children: React.ReactNode, type: string) => any;
  type: string;
}> = (props) => {
  const labelValue = props.formatLabel
    ? props.formatLabel(props.children, props.type)
    : props.children;

  return (
    <span className={(props.classNames as any)[`${props.type}Label`] ?? ""}>
      <span className={props.classNames.labelContainer}>{labelValue}</span>
    </span>
  );
};
