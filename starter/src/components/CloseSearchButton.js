import React from "react";
import { Link } from "react-router-dom";

// CloseSearchButton component: Renders a link to close the search page
const CloseSearchButton = React.memo(() => {
  return (
    <Link to="/" className="close-search">
      Close
    </Link>
  );
});

// Using React.memo for performance optimization
export default CloseSearchButton;
