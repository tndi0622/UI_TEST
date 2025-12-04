import React, { useEffect, useState } from "react";
import { getRecentAnimals } from "../api/animalApi";
import AnimalDetail from "../components/AnimalDetail";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

export default function Slider() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getRecentAnimals()
      .then((data) => {
        if (isMounted) {
          console.log("슬라이더 데이터:", data);
          setAnimals(data.slice(0, 5));
          setError(null);
        }
      })
      .catch((e) => {
        console.error("API 오류:", e);
        if (isMounted) {
          setError("데이터를 불러오는데 실패했습니다.");
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => (isMounted = false);
  }, []);

  if (loading) {
    return (
      <section className="slider-section">
        <div style={{ textAlign: "center", padding: "60px 0" }}>로딩 중...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="slider-section">
        <div
          style={{ textAlign: "center", padding: "60px 0", color: "#d32f2f" }}
        >
          {error}
        </div>
      </section>
    );
  }

  if (animals.length === 0) {
    return (
      <section className="slider-section">
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          보호 동물 정보가 없습니다.
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="slider-section">
        <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }} loop={true}>
          {animals.map((a, index) => {
            // ✅ v2 API는 popfile1, popfile2 사용
            const imageUrl = a.popfile1 || a.popfile2;

            return (
              <SwiperSlide key={a.desertionNo || index}>
                <div
                  className="slide-item"
                  onClick={() => setSelectedAnimal(a)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={
                      imageUrl ||
                      "https://via.placeholder.com/800x420?text=No+Image"
                    }
                    alt={a.kindFullNm || a.kindCd}
                    className="slide-img"
                    onError={(e) => {
                      console.error("이미지 로드 실패:", imageUrl);
                      e.target.src =
                        "https://via.placeholder.com/800x420?text=No+Image";
                    }}
                  />
                  <div className="slide-caption">
                    <h3>{a.kindFullNm || a.kindCd}</h3>
                    <p>
                      {a.noticeSdt
                        ? `보호일: ${a.noticeSdt}`
                        : "최근 보호된 아이"}
                    </p>
                    <p className="slide-contact"> 클릭하여 상세정보 보기</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>

      {selectedAnimal && (
        <AnimalDetail
          animal={selectedAnimal}
          onClose={() => setSelectedAnimal(null)}
        />
      )}
    </>
  );
}
