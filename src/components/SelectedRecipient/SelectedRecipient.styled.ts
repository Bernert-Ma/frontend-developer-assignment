import React from "react";
import { SystemStyleObject } from "@chakra-ui/react";

export const headerStyle: React.CSSProperties = {
  paddingBottom: 16,
};

export const selectedRecipientWrapper: SystemStyleObject = {
  "@media screen and (max-width: 380px)": {
    display: "grid",
  },
  "@media screen and (max-width: 964px)": {
    minW: "100%",
    maxH: "92%",
  },
};

export const accordionButtonHover: SystemStyleObject = {
  bgColor: "none",
};

export const accordionPanelBodyStyle: React.CSSProperties = {
  paddingLeft: "42px",
};
