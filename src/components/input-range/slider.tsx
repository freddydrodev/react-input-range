import * as React from "react";
import PropTypes from "prop-types";
import autobind from "autobind-decorator";
import Label from "./Label";

/**
 * @ignore
 */
const Slider: React.FC = () => {
  // /**
  //  * Accepted propTypes of Slider
  //  * @override
  //  * @return {Object}
  //  * @property {Function} ariaLabelledby
  //  * @property {Function} ariaControls
  //  * @property {Function} className
  //  * @property {Function} formatLabel
  //  * @property {Function} maxValue
  //  * @property {Function} minValue
  //  * @property {Function} onSliderDrag
  //  * @property {Function} onSliderKeyDown
  //  * @property {Function} percentage
  //  * @property {Function} type
  //  * @property {Function} value
  //  */
  // static get propTypes() {
  //   return {
  //     ariaLabelledby: PropTypes.string,
  //     ariaControls: PropTypes.string,
  //     classNames: PropTypes.objectOf(PropTypes.string).isRequired,
  //     formatLabel: PropTypes.func,
  //     maxValue: PropTypes.number,
  //     minValue: PropTypes.number,
  //     onSliderDrag: PropTypes.func.isRequired,
  //     onSliderKeyDown: PropTypes.func.isRequired,
  //     percentage: PropTypes.number.isRequired,
  //     type: PropTypes.string.isRequired,
  //     value: PropTypes.number.isRequired,
  //   };
  // }

  // /**
  //  * @param {Object} props
  //  * @param {string} [props.ariaLabelledby]
  //  * @param {string} [props.ariaControls]
  //  * @param {InputRangeClassNames} props.classNames
  //  * @param {Function} [props.formatLabel]
  //  * @param {number} [props.maxValue]
  //  * @param {number} [props.minValue]
  //  * @param {Function} props.onSliderKeyDown
  //  * @param {Function} props.onSliderDrag
  //  * @param {number} props.percentage
  //  * @param {number} props.type
  //  * @param {number} props.value
  //  */
  // constructor(props) {
  //   super(props);

  //   /**
  //    * @private
  //    * @type {?Component}
  //    */
  //   this.node = null;
  // }

  // /**
  //  * @ignore
  //  * @override
  //  * @return {void}
  //  */
  // componentWillUnmount() {
  //   this.removeDocumentMouseMoveListener();
  //   this.removeDocumentMouseUpListener();
  //   this.removeDocumentTouchEndListener();
  //   this.removeDocumentTouchMoveListener();
  // }

  /**
   * @private
   * @return {Object}
   */
  const getStyle = () => {
    const perc = (this.props.percentage || 0) * 100;
    const style = {
      position: "absolute",
      left: `${perc}%`,
    };

    return style;
  };

  /**
   * Listen to mousemove event
   * @private
   * @return {void}
   */
  const addDocumentMouseMoveListener = () => {
    this.removeDocumentMouseMoveListener();
    this.node.ownerDocument.addEventListener("mousemove", this.handleMouseMove);
  };

  /**
   * Listen to mouseup event
   * @private
   * @return {void}
   */
  const addDocumentMouseUpListener = () => {
    this.removeDocumentMouseUpListener();
    this.node.ownerDocument.addEventListener("mouseup", this.handleMouseUp);
  };

  /**
   * Listen to touchmove event
   * @private
   * @return {void}
   */
  const addDocumentTouchMoveListener = () => {
    this.removeDocumentTouchMoveListener();
    this.node.ownerDocument.addEventListener("touchmove", this.handleTouchMove);
  };

  /**
   * Listen to touchend event
   * @private
   * @return {void}
   */
  const addDocumentTouchEndListener = () => {
    this.removeDocumentTouchEndListener();
    this.node.ownerDocument.addEventListener("touchend", this.handleTouchEnd);
  };

  /**
   * @private
   * @return {void}
   */
  const removeDocumentMouseMoveListener = () => {
    this.node.ownerDocument.removeEventListener(
      "mousemove",
      this.handleMouseMove
    );
  };

  /**
   * @private
   * @return {void}
   */
  const removeDocumentMouseUpListener = () => {
    this.node.ownerDocument.removeEventListener("mouseup", this.handleMouseUp);
  };

  /**
   * @private
   * @return {void}
   */
  const removeDocumentTouchMoveListener = () => {
    this.node.ownerDocument.removeEventListener(
      "touchmove",
      this.handleTouchMove
    );
  };

  /**
   * @private
   * @return {void}
   */
  const removeDocumentTouchEndListener = () => {
    this.node.ownerDocument.removeEventListener(
      "touchend",
      this.handleTouchEnd
    );
  };

  /**
   * @private
   * @return {void}
   */
  // @autobind
  const handleMouseDown = () => {
    this.addDocumentMouseMoveListener();
    this.addDocumentMouseUpListener();
  };

  /**
   * @private
   * @return {void}
   */
  // @autobind
  const handleMouseUp = () => {
    this.removeDocumentMouseMoveListener();
    this.removeDocumentMouseUpListener();
  };

  /**
   * @private
   * @param {SyntheticEvent} event
   * @return {void}
   */
  // @autobind
  const handleMouseMove = (event) => {
    this.props.onSliderDrag(event, this.props.type);
  };

  /**
   * @private
   * @return {void}
   */
  // @autobind
  const handleTouchStart = () => {
    this.addDocumentTouchEndListener();
    this.addDocumentTouchMoveListener();
  };

  /**
   * @private
   * @param {SyntheticEvent} event
   * @return {void}
   */
  // @autobind
  const handleTouchMove = (event) => {
    this.props.onSliderDrag(event, this.props.type);
  };

  /**
   * @private
   * @return {void}
   */
  // @autobind
  const handleTouchEnd = () => {
    this.removeDocumentTouchMoveListener();
    this.removeDocumentTouchEndListener();
  };

  /**
   * @private
   * @param {SyntheticEvent} event
   * @return {void}
   */
  // @autobind
  const handleKeyDown = (event) => {
    this.props.onSliderKeyDown(event, this.props.type);
  };

  /**
   * @override
   * @return {JSX.Element}
   */
  const style = getStyle();

  return (
    <span
      className={this.props.classNames.sliderContainer}
      ref={(node) => {
        this.node = node;
      }}
      style={style}
    >
      <Label
        classNames={this.props.classNames}
        formatLabel={this.props.formatLabel}
        type="value"
      >
        {this.props.value}
      </Label>

      <div
        aria-labelledby={this.props.ariaLabelledby}
        aria-controls={this.props.ariaControls}
        aria-valuemax={this.props.maxValue}
        aria-valuemin={this.props.minValue}
        aria-valuenow={this.props.value}
        className={this.props.classNames.slider}
        draggable="false"
        onKeyDown={this.handleKeyDown}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        role="slider"
        tabIndex="0"
      />
    </span>
  );
};

export default Slider;
