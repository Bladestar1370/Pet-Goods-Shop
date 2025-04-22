import React from "react";
import "./DescriptionBox.css";

export const DescriptionBox = ({ description }) => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        {description ? (
          description.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))
        ) : (
          <p>No description available.</p>
        )}
      </div>
    </div>
  );
};