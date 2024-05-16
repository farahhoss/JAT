import React from "react";

export default function NotFound() {
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center  "
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          color: "rgba(244, 101, 110, 1)",
        }}
      >
        <div
          className=" "
          style={{
            minHeight: "90vh",
          }}
        >
          <p
            style={{
              fontSize: "300px",
              width: " 669.72px",
              height: "330.88px",
            }}
          >
            {" "}
            404
          </p>
          <p className="fs-2  text-center " style={{ paddingRight: "100px" }}>
            notfound
          </p>
        </div>
      </div>
    </>
  );
}
