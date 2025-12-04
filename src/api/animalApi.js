import axios from "axios";

// 환경변수에서 서비스 키 가져오기
const SERVICE_KEY = import.meta.env.VITE_API_SERVICE_KEY;
const API_BASE_URL =
  "https://apis.data.go.kr/1543061/abandonmentPublicService_v2/abandonmentPublic_v2";

export const getRecentAnimals = async () => {
  const params = {
    serviceKey: SERVICE_KEY,
    numOfRows: 5,
    pageNo: 1,
    _type: "json",
  };

  try {
    const res = await axios.get(API_BASE_URL, { params });
    const items = res.data?.response?.body?.items?.item || [];
    const result = Array.isArray(items) ? items : items ? [items] : [];

    console.log("최근 동물 데이터:", result.length, "개");
    return result;
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
};

export const searchAnimals = async (filters = {}, page = 1, numOfRows = 30) => {
  const params = {
    serviceKey: SERVICE_KEY,
    numOfRows: numOfRows,
    pageNo: page,
    _type: "json",
  };

  // 필터 추가 - 빈 값이 아닌 경우만
  if (filters.upkind) params.upkind = filters.upkind;
  if (filters.kind) params.kind = filters.kind;
  if (filters.sex_cd) params.sex_cd = filters.sex_cd;
  if (filters.neuter_yn) params.neuter_yn = filters.neuter_yn;
  if (filters.sido) params.sido = filters.sido;

  console.log("🔍 검색 파라미터:", params);

  try {
    const res = await axios.get(API_BASE_URL, { params });
    console.log("📡 API 응답:", res.data);

    const items = res.data?.response?.body?.items?.item || [];
    const result = Array.isArray(items) ? items : items ? [items] : [];
    const totalCount = res.data?.response?.body?.totalCount || 0;

    console.log("✅ 검색 결과:", result.length, "개 / 전체:", totalCount, "개");

    return {
      items: result,
      totalCount: totalCount,
    };
  } catch (error) {
    console.error("❌ 검색 API 에러:", error);
    throw error;
  }
};
