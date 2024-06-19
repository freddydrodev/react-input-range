import * as React from "react";
import { InputRangeClassNames, Range } from "../types";

export const Track: React.FC<{
  children: React.ReactNode;
  classNames: InputRangeClassNames;
  percentages: Range;
  draggableTrack?: boolean;
  onTrackDrag?: (event: MouseEvent, dragEvent: MouseEvent) => void;
  onTrackMouseDown?: (
    event: MouseEvent,
    position: {
      x: number;
      y: number;
    }
  ) => void;
}> = (props) => {
  const [trackDragEvent, setTrackDragEvent] = React.useState<MouseEvent | null>(
    null
  );

  const node = React.useRef<HTMLDivElement>(null);

  const getClientRect = () => {
    return node.current?.getBoundingClientRect();
  };

  const getActiveTrackStyle = () => {
    const width = `${(props.percentages.max - props.percentages.min) * 100}%`;
    const left = `${props.percentages.min * 100}%`;

    return { left, width };
  };

  const addDocumentMouseMoveListener = () => {
    removeDocumentMouseMoveListener();
    node.current?.addEventListener("mousemove", handleMouseMove);
  };

  const addDocumentMouseUpListener = () => {
    removeDocumentMouseUpListener();
    node.current?.addEventListener("mouseup", handleMouseUp);
  };

  const removeDocumentMouseMoveListener = () => {
    node.current?.removeEventListener("mousemove", handleMouseMove);
  };

  const removeDocumentMouseUpListener = () => {
    node.current?.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!props.draggableTrack) {
      return;
    }

    if (trackDragEvent !== null) {
      props.onTrackDrag?.(event, trackDragEvent);
    }

    setTrackDragEvent(event);
  };

  const handleMouseUp = () => {
    if (!props.draggableTrack) {
      return;
    }

    removeDocumentMouseMoveListener();
    removeDocumentMouseUpListener();
    setTrackDragEvent(null);
  };

  const handleMouseDown = (event: any) => {
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    const trackClientRect = getClientRect();

    const position = {
      x: clientX - (trackClientRect?.left ?? 0),
      y: 0,
    };

    props.onTrackMouseDown?.(event, position);

    if (props.draggableTrack) {
      addDocumentMouseMoveListener();
      addDocumentMouseUpListener();
    }
  };

  const handleTouchStart = (event: any) => {
    event.preventDefault();

    handleMouseDown(event);
  };

  const activeTrackStyle = getActiveTrackStyle();

  return (
    <div
      className={props.classNames.track}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      ref={node}
    >
      <div style={activeTrackStyle} className={props.classNames.activeTrack} />
      {props.children}
    </div>
  );
};
