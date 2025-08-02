import * as React from "react";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";

const IconBadge = ({ title, icon, link }) => {
  return (
    <Link href={link}>
      <Tooltip title={title} sx={{ fontSize: "20px", color: "#f97a00" }}>
        <Badge
          badgeContent={1}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "#f97a00",
              color: "white", 
              fontSize: "0.7rem",
            },
          }}
        >
          {icon}
        </Badge>
      </Tooltip>
    </Link>
  );
};

export default IconBadge;
