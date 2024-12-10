import React from "react";

type SortIconProps = {
  sortOrder: "asc" | "desc" | "default";
};

export const SortIcon: React.FC<SortIconProps> = ({ sortOrder }) => {
  const isAsc = sortOrder === "asc";
  const isDesc = sortOrder === "desc";

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M12 6l4 4H8l4-4z"
        fill={isAsc ? "lime" : "black"}
      />
      <path
        d="M12 18l-4-4h8l-4 4z"
        fill={isDesc ? "lime" : "black"}
      />
    </svg>
  );
};