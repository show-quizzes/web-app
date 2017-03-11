import React, { PropTypes } from 'react';

const Header = ({ episode }) => {
  return (
    <header>
      <div id="episode-name">"{ episode }"</div>
    </header>
  )
};

export default Header;
