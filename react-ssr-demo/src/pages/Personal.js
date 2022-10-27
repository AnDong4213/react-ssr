import React from "react";

const handlePersonal = () => {
  console.log('handlePersonal')
}

const Personal = () => {
  return (
    <div>
      <h2 onClick={handlePersonal}>Personal </h2>
    </div>
  );
};

export default Personal;
