import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { searchAnimals } from "../api/animalApi";
import AnimalCard from "../components/AnimalCard";
import AnimalDetail from "../components/AnimalDetail";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SearchResult() {
  const { state: filters } = useLocation();
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const itemsPerPage = 20; // 4개 x 5줄

  // 같은 동물 그룹화 함수
  const groupAnimals = (animalList) => {
    const grouped = {};
    
    animalList.forEach(animal => {
      const key = animal.desertionNo || animal.noticeNo;
      if (!grouped[key]) {
        grouped[key] = {
          ...animal,
          images: []
        };
      }
      
      // 이미지 추가
      if (animal.popfile1) grouped[key].images.push(animal.popfile1);
      if (animal.popfile2) grouped[key].images.push(animal.popfile2);
      if (animal.popfile) grouped[key].images.push(animal.popfile);
    });
    
    // 중복 이미지 제거
    Object.keys(grouped).forEach(key => {
      grouped[key].images = [...new Set(grouped[key].images)];
    });
    
    return Object.values(grouped);
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    searchAnimals(filters || {}, currentPage, itemsPerPage)
      .then((data) => {
        console.log("검색 결과:", data);
        const groupedAnimals = groupAnimals(data.items);
        console.log("그룹화된 결과:", groupedAnimals.length, "개");
        setAnimals(groupedAnimals);
        setTotalCount(data.totalCount);
      })
      .catch((e) => {
        console.error("검색 에러:", e);
        setError("검색 중 오류가 발생했습니다.");
      })
      .finally(() => setLoading(false));
  }, [filters, currentPage]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 페이지 번호 범위 계산 (현재 페이지 기준 앞뒤 2개씩)
  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="app-root">
      <Header />
      <main>
        <div className="container result-page">
          <div className="result-header">
            <h2>검색 결과</h2>
            {!loading && !error && (
              <p className="result-count">총 {animals.length}마리의 아이들을 찾았습니다.</p>
            )}
          </div>

          {loading && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              로딩 중...
            </div>
          )}

          {error && (
            <div
              style={{
                textAlign: "center",
                padding: "40px 0",
                color: "#d32f2f",
              }}
            >
              {error}
            </div>
          )}

          {!loading && !error && animals.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <p>검색 결과가 없습니다.</p>
              <Link
                to="/"
                style={{ color: "#1976d2", textDecoration: "underline" }}
              >
                홈으로 돌아가기
              </Link>
            </div>
          )}

          <div className="grid">
            {animals.map((a) => (
              <AnimalCard 
                key={a.desertionNo} 
                data={a} 
                onClick={setSelectedAnimal}
                imageCount={a.images.length}
              />
            ))}
          </div>

          {/* 페이지네이션 */}
          {!loading && !error && totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
              >
                &laquo; 처음
              </button>
              
              <button
                className="page-btn"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lsaquo; 이전
              </button>

              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  className={`page-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                className="page-btn"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                다음 &rsaquo;
              </button>

              <button
                className="page-btn"
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                마지막 &raquo;
              </button>
            </div>
          )}
        </div>
      </main>

      {selectedAnimal && (
        <AnimalDetail 
          animal={selectedAnimal} 
          onClose={() => setSelectedAnimal(null)}
        />
      )}
      
      <Footer />
    </div>
  );
}
