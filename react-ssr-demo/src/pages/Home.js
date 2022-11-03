import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchHomeData } from "../store/actions/home";

const handleClick = () => {
  console.log("我被点击了！");
};

const Home = () => {
  const dispatch = useDispatch();
  const homeData = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchHomeData);
  }, []);

  return (
    <div>
      <h2>Home</h2>
      <ul>
        {homeData?.articles?.map((article) => (
          <li key={article?.id}>
            <p>文章标题：{article?.title}</p>
            <p>文章内容：{article?.content}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleClick}>点我</button>
    </div>
  );
};

Home.getInitialData = async (store) => {
  return store.dispatch(fetchHomeData);
};

export default Home;
