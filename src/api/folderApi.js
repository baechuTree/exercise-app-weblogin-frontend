import api from "./api";

// 모든 폴더 가져오기
export const getFolders = async () => {
  try {
    const response = await api.get("/folders"); //얘가 오류가 난다
    //api.js에서 baseapi를 설정했기 때문에 여기선 주소에 /api를 안 써줘도 됨
    return response.data;
  } catch(e) {
    if (e.response && e.response.status === 401) {
      throw new Error("로그인이 필요합니다.");
    }
    throw e;
  }
  
};

// 폴더 생성하기
export const createFolder = async (folderInfo) => {
  try {
    const response = await api.post("/folders", folderInfo);
    return response.data;
  } catch(e) {
    if (e.response && e.response.status === 401) {
      throw new Error("로그인이 필요합니다.");
    }
    throw e;
  }
  
};

// 폴더 수정하기
export const updateFolder = async (folderId, updatedInfo) => {
  try {
    const response = await api.put(`/folders/${folderId}`, updatedInfo);
    return response.data;
  } catch(e) {
    if (e.response && e.response.status === 401) {
      throw new Error("로그인이 필요합니다.");
    }
    throw e;
  }
};

// 폴더 삭제하기
export const deleteFolder = async (folderId) => {
  try {
    const response = await api.delete(`/folders/${folderId}`);
    return response.data;
  } catch(e) {
    if (e.response && e.response.status === 401) {
      throw new Error("로그인이 필요합니다.");
    }
    throw e;
  }
};