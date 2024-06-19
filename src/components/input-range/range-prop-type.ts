import { isNumber } from "../utils";

export const rangePropType = (props: any) => {
  const { maxValue, minValue } = props;

  if (!isNumber(minValue) || !isNumber(maxValue)) {
    return new Error('"minValue" and "maxValue" must be a number');
  }

  if (minValue >= maxValue) {
    return new Error('"minValue" must be smaller than "maxValue"');
  }
};
