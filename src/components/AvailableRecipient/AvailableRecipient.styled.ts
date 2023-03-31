import React from "react";
import { SystemStyleObject } from "@chakra-ui/react";

export const availableRecipientRoot: SystemStyleObject = {
  "@media screen and (max-width: 964px)": {
    display: "grid",
    marginBottom: "24px",
  },
};

export const availableRecipientWrapper: SystemStyleObject = {
  "@media screen and (max-width: 380px)": {
    display: "grid",
  },
  "@media screen and (max-width: 964px)": {
    minW: "100%",
    maxH: "100%",
  },
};

export const singleRecipientContainer: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0px 8px 19px",
};

export const accordionHeader: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  paddingLeft: "19px",
};

export const accordionButtonHover: SystemStyleObject = {
  bgColor: "none",
};

export const accordionPanelBodyStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
