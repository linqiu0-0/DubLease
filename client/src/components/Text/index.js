import React from "react";
const variantClasses = {
  h1: "font-semibold md:text-[48px] sm:text-[48px] text-[64px]",
  h2: "font-normal sm:text-[40px] md:text-[46px] text-[50px]",
  h3: "font-semibold sm:text-[38px] md:text-[44px] text-[48px]",
  h4: "font-bold sm:text-[36px] md:text-[38px] text-[40px]",
  h5: "font-bold sm:text-[28px] md:text-[30px] text-[32px]",
  h6: "font-normal text-[300px] md:text-[48px] sm:text-[48px]",
  body1: "font-bold sm:text-[26px] md:text-[28px] text-[30px]",
  body2: "text-[24px]",
  body3: "text-[20px]",
  body4: "text-[18px]",
  body5: "text-[16px]",
  body6: "text-[14px]",
  body7: "text-[12px]",
};
const Text = ({ children, className, variant, as, ...restProps }) => {
  const Component = as || "span";
  return (
    <Component
      className={`${className} ${variantClasses[variant]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
