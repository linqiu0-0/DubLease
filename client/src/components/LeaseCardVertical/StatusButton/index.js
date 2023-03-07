import React from "react";
import PropTypes from "prop-types";

const shapes = {
  icbRoundedBorder8: "rounded-[8px]",
  RoundedBorder16: "rounded-[16px]",
};
const variants = {
  icbFillDeeppurpleA200: "bg-deep_purple_A200",
  icbFillDeeppurple50: "bg-deep_purple_50",
  icbFillGray50: "bg-gray_50",
  FillGreen50: "bg-green_50 text-green_600",
  FillDeeporange50: "bg-deep_orange_50 text-red_300",
  FillOrange50: "bg-orange_50 text-orange_300",
};
const sizes = { smIcn: "p-[4px]", mdIcn: "p-[10px]", sm: "p-[9px]" };

const StatusButton = ({
  children,
  className = "",
  shape,
  variant,
  size,
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${(shape && shapes[shape]) || ""} ${
        (size && sizes[size]) || ""
      } ${(variant && variants[variant]) || ""}`}
      {...restProps}
    >
      {children}
    </button>
  );
};

StatusButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  shape: PropTypes.oneOf(["icbRoundedBorder8", "RoundedBorder16"]),
  variant: PropTypes.oneOf([
    "icbFillDeeppurpleA200",
    "icbFillDeeppurple50",
    "icbFillGray50",
    "FillGreen50",
    "FillDeeporange50",
    "FillOrange50",
  ]),
  size: PropTypes.oneOf(["smIcn", "mdIcn", "sm"]),
};

StatusButton.defaultProps = {
  className: "",
  shape: "RoundedBorder16",
  variant: "FillGreen50",
  size: "sm",
};

export { StatusButton };
