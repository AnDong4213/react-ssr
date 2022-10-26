import React from "react";

const handleClick = () => {
  console.log("我被点击了！");
};

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <button onClick={handleClick}>点我</button>
    </div>
  );
};

export default Home;
