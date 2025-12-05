import React from "react";

export default function AnimalCard({ data, onClick }) {
  // ✅ 첫 번째 이미지 사용
  const imageUrl = data.images && data.images.length > 0 
    ? data.images[0] 
    : data.popfile1 || data.popfile2 || data.popfile;

  return (
    <article className="animal-card" onClick={() => onClick(data)} style={{ cursor: 'pointer' }}>
      <div className="card-image-wrapper">
        <img
          src={imageUrl || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={data.kindFullNm || data.kindCd}
          onError={(e) => {
            console.error("이미지 로드 실패:", imageUrl);
            e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
          }}
        />
      </div>
      <div className="card-body">
        <h4>{data.kindFullNm || data.kindCd}</h4>
        <p>나이: {data.age || "정보 없음"}</p>
        <p>
          성별:{" "}
          {data.sexCd === "M"
            ? "수컷"
            : data.sexCd === "F"
            ? "암컷"
            : data.sexCd === "Q"
            ? "미상"
            : "정보 없음"}
        </p>
        <p>색상: {data.colorCd || "정보 없음"}</p>
        <p>보호소: {data.careNm || "정보 없음"}</p>
        <p className="detail-link">🔍 클릭하여 상세정보 보기</p>
      </div>
    </article>
  );
}
