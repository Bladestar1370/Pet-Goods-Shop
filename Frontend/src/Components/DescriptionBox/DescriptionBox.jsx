import React from "react";
import "./DescriptionBox.css";

export const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Give your furry friend a tasty and healthy snack with our premium
          chicken dog treats. Made from 100% real chicken, these treats are rich
          in protein and free from artificial additives. Perfect for training or
          rewarding good behavior.
        </p>
        <p>
          Give your furry friend a tasty and healthy snack with our premium
          chicken dog treats. Made from 100% real chicken, these treats are rich
          in protein and free from artificial additives. Perfect for training or
          rewarding good behavior
        </p>
      </div>
    </div>
  );
};
