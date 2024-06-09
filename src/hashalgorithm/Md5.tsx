import React from 'react';
const md5 = require("blueimp-md5");

function MD5Algorithm({ message }: { message: string }) {
  var hash = md5(message);
  return (
    <div>
      <h2>MD5 Hash:</h2>
      <p>{hash}</p>
    </div>
  );
}

export default MD5Algorithm;
