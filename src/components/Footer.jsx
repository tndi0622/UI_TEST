import React from "react";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3> 유기동물 입양 정보</h3>
          <p>유기동물에게 새로운 가족을 찾아주세요</p>
        </div>

        <div className="footer-section">
          <h3> 데이터 출처</h3>
          <p>
            본 서비스는{" "}
            <a
              href="https://www.data.go.kr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              공공데이터포털
            </a>
            의{" "}
            <a
              href="https://www.data.go.kr/data/15098931/openapi.do"
              target="_blank"
              rel="noopener noreferrer"
            >
              농림축산식품부 농림축산검역본부_유기동물 조회 서비스
            </a>
            를 활용합니다.
          </p>
        </div>

        <div className="footer-section">
          <h3> 프로젝트 정보</h3>
          <p>
            본 프로젝트는 <strong>비영리 목적</strong>의 학습용 프로젝트입니다.
          </p>
          <p>
            웹 개발 학습과 유기동물 보호 인식 제고를 목적으로 제작되었습니다.
          </p>
        </div>

        <div className="footer-section">
          <h3> 유용한 링크</h3>
          <ul className="footer-links">
            <li>
              <a
                href="https://www.animal.go.kr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                동물보호관리시스템
              </a>
            </li>
            <li>
              <a
                href="https://www.data.go.kr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                공공데이터포털
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>
            © 2025 Animal Rescue App. 본 사이트는 학습 목적으로 제작되었으며,
            영리적 목적이 없습니다.
          </p>
          <p className="footer-attribution">Made with for abandoned animals</p>
        </div>
      </div>
    </footer>
  );
}
