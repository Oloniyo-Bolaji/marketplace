"use client"

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";

import React from "react";

const IconTooltip = ({ title, icon, link }) => {
  return (
    <Link href={link}>
      <Tooltip title={title}>
        <IconButton>{icon}</IconButton>
      </Tooltip>
    </Link>
  );
};

export default IconTooltip;
