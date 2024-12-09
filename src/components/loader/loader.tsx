import { FC, useEffect } from "react";
import { createPortal } from "react-dom";

import { LoaderProps } from "./loader.types";

import "./loader.styles.css";

export const Loader: FC<LoaderProps> = ({ isLoading }) => {
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <div>
      {isLoading
        ? createPortal(
            <div className="loader-wrapper">
              <div className="loader" />
            </div>,
            document.body
          )
        : ""}
    </div>
  );
};
