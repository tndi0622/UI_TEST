import React from "react";
import Slider from "../components/Slider";
import SearchBox from "../components/SearchBox";

export default function Home() {
  return (
    <div className="home-page container">
      <Slider />
      <SearchBox />
      <section className="intro-box">
        <h3>입양 안내</h3>
        <p>
          관심 있는 동물을 선택하고 보호소에 연락하여 입양 절차를 진행하세요.
        </p>
      </section>
    </div>
  );
}
