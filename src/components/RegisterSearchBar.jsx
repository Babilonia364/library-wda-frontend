import { ButtonBase, Typography } from '@material-ui/core';
import React from 'react'

function RegisterSearchBar({ pageTitle, buttonText, handleClick }) {
  return (
    <div className="bg-light">
      <Typography variant="h6" className="text-center fw-bold">{pageTitle}</Typography>
      <nav className="navbar navbar-expand-lg navbar-light pt-3 pb-1 d-flex justify-content-start">
        <ButtonBase className="bg-primary text-white col-6 col-md-1 py-1 rounded shadow-sm" onClick={handleClick}>{buttonText}</ButtonBase>
      </nav>
    </div>
  );
}

export default RegisterSearchBar;