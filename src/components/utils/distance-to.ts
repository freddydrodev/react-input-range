import { Point } from "../types";

export const distanceTo = (pointA: Point, pointB: Point): number => {
  const xDiff = (pointB.x - pointA.x) ** 2;
  const yDiff = (pointB.y - pointA.y) ** 2;

  return Math.sqrt(xDiff + yDiff);
};
