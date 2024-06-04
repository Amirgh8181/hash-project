import React from 'react';
const md5 = require("blueimp-md5");

function MD5Algorithm() {
  var hash = md5("Hello, world!");
  return (
    <div>
      <h2>MD5 Hash:</h2>
      <p>{hash}</p>
    </div>
  );
}

export default MD5Algorithm;
