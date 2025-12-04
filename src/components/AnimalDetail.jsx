import React, { useState } from "react";

export default function AnimalDetail({ animal, onClose }) {
  if (!animal) return null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = animal.images || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-body">
          <div className="modal-image">
            {images.length > 0 ? (
              <div className="image-slider">
                <img
                  src={
                    images[currentImageIndex] ||
                    "https://via.placeholder.com/600x400?text=No+Image"
                  }
                  alt={`${animal.kindFullNm || animal.kindCd} - ${
                    currentImageIndex + 1
                  }`}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x400?text=No+Image";
                  }}
                />

                {images.length > 1 && (
                  <>
                    <button className="image-nav prev" onClick={prevImage}>
                      ‹
                    </button>
                    <button className="image-nav next" onClick={nextImage}>
                      ›
                    </button>
                    <div className="image-indicator">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                    <div className="image-dots">
                      {images.map((_, idx) => (
                        <span
                          key={idx}
                          className={`dot ${
                            idx === currentImageIndex ? "active" : ""
                          }`}
                          onClick={() => setCurrentImageIndex(idx)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <img
                src="https://via.placeholder.com/600x400?text=No+Image"
                alt="이미지 없음"
              />
            )}
          </div>

          <div className="modal-info">
            <h2>{animal.kindFullNm || animal.kindCd}</h2>

            <div className="info-grid">
              <div className="info-item">
                <span className="info-label"> 공고번호</span>
                <span className="info-value">
                  {animal.noticeNo || animal.desertionNo || "정보 없음"}
                </span>
              </div>

              <div className="info-item">
                <span className="info-label"> 공고기간</span>
                <span className="info-value">
                  {animal.noticeSdt || "정보 없음"} ~{" "}
                  {animal.noticeEdt || "정보 없음"}
                </span>
              </div>

              <div className="info-item">
                <span className="info-label"> 나이</span>
                <span className="info-value">{animal.age || "정보 없음"}</span>
              </div>

              <div className="info-item">
                <span className="info-label"> 성별</span>
                <span className="info-value">
                  {animal.sexCd === "M"
                    ? "수컷"
                    : animal.sexCd === "F"
                    ? "암컷"
                    : animal.sexCd === "Q"
                    ? "미상"
                    : "정보 없음"}
                </span>
              </div>

              <div className="info-item">
                <span className="info-label"> 색상</span>
                <span className="info-value">
                  {animal.colorCd || "정보 없음"}
                </span>
              </div>

              <div className="info-item">
                <span className="info-label"> 체중</span>
                <span className="info-value">
                  {animal.weight || "정보 없음"}
                </span>
              </div>

              <div className="info-item">
                <span className="info-label"> 중성화</span>
                <span className="info-value">
                  {animal.neuter_yn === "Y"
                    ? "완료"
                    : animal.neuter_yn === "N"
                    ? "미완료"
                    : animal.neuter_yn === "U"
                    ? "미상"
                    : "정보 없음"}
                </span>
              </div>

              <div className="info-item">
                <span className="info-label"> 발견장소</span>
                <span className="info-value">
                  {animal.happenPlace || "정보 없음"}
                </span>
              </div>
            </div>

            {animal.specialMark && (
              <div className="special-mark">
                <h3> 특징</h3>
                <p>{animal.specialMark}</p>
              </div>
            )}

            <div className="shelter-info">
              <h3> 보호소 정보</h3>
              <p>
                <strong>보호소:</strong> {animal.careNm || "정보 없음"}
              </p>
              <p>
                <strong>주소:</strong> {animal.careAddr || "정보 없음"}
              </p>
              <p>
                <strong>연락처:</strong> {animal.careTel || "정보 없음"}
              </p>
            </div>

            <div className="modal-footer">
              <p className="adoption-notice">
                입양을 원하시면 보호소로 연락하세요!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
