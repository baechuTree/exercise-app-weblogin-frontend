import api from "./api";

// 특정 폴더의 기록 가져오기
export const getRecords = async (folderId) => {
  const response = await api.get(`/records/${folderId}`);
  return response.data;
};

// 기록 생성하기
export const createRecord = async (folderId, recordData) => {
  const response = await api.post(`/records/${folderId}`, recordData);
  return response.data;
};

// 기록 수정하기
export const updateRecord = async (recordId, updatedData) => {
  const response = await api.put(`/records/${recordId}`, updatedData);
  return response.data;
};

// 기록 삭제하기
export const deleteRecord = async (recordId) => {
  const response = await api.delete(`/records/${recordId}`);
  return response.data;
};