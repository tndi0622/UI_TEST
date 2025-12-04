import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    upkind: "",
    sex_cd: "",
    neuter_yn: "",
    kind: "",
  });

  const update = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const submit = () => {
    console.log("검색 필터:", filters);
    navigate("/search", { state: filters });
  };

  return (
    <div className="search-box">
      <h2>보호 동물 검색</h2>
      <div className="search-controls">
        <select
          onChange={(e) => update("upkind", e.target.value)}
          value={filters.upkind}
        >
          <option value="">동물 종류 (전체)</option>
          <option value="417000">개</option>
          <option value="422400">고양이</option>
          <option value="429900">기타</option>
        </select>

        <select
          onChange={(e) => update("sex_cd", e.target.value)}
          value={filters.sex_cd}
        >
          <option value="">성별 (전체)</option>
          <option value="M">수컷</option>
          <option value="F">암컷</option>
          <option value="Q">미상</option>
        </select>

        <select
          onChange={(e) => update("neuter_yn", e.target.value)}
          value={filters.neuter_yn}
        >
          <option value="">중성화 (전체)</option>
          <option value="Y">완료</option>
          <option value="N">미완료</option>
          <option value="U">미상</option>
        </select>

        {/* <input
          type="text"
          placeholder=""
          value={filters.kind}
          onChange={(e) => update("kind", e.target.value)}
        /> */}

        <button onClick={submit}>검색</button>
      </div>
    </div>
  );
}
