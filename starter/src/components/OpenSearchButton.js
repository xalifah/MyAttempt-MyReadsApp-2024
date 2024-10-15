import React from "react";
import { Link } from "react-router-dom";

// OpenSearchButton component: Renders a button to navigate to the search page
const OpenSearchButton = React.memo(() => {
  return (
    <div className="open-search">
      {/* Link component is used for client-side routing */}
      {/* 'to' prop specifies the target route */}
      {/* 'aria-label' provides accessibility information */}
      <Link to="/search" aria-label="Add a book">
        Add a book
      </Link>
    </div>
  );
});

// React.memo is used for performance optimization by memoizing the component
export default OpenSearchButton;
