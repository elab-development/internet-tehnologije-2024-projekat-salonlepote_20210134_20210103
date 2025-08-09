import React from "react";
import { Link } from "react-router-dom";

function Breadcrumbs({ paths }) {
  return (
    <nav
      aria-label="breadcrumb"
      style={{
        margin: "10px 0",
        padding: "5px 10px",
        backgroundColor: "#f0e6ff",
        borderRadius: "6px",
        fontSize: "14px",
      }}
    >
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        return (
          <span key={index}>
            {!isLast ? (
              <>
                <Link
                  to={path.link}
                  style={{ color: "#a341ff", textDecoration: "none" }}
                >
                  {path.name}
                </Link>
                <span style={{ margin: "0 5px" }}>{">"}</span>
              </>
            ) : (
              <span style={{ fontWeight: "bold", color: "#4b0bd6" }}>
                {path.name}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;

