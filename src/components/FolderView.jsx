//기능 import
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRecords, createRecord, updateRecord, deleteRecord } from "../api/recordApi";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

//디자인, 컴포넌트 import
import styled from "styled-components";
import { TbTrash, TbPencil, TbPlaylistAdd } from "react-icons/tb";
import { Overlay, Modal, Container } from "../styles/SharedStyleComponents";
import TopBar from "./shared/TopBar";

// Styled Components

//기록 리스트
const RecordTable = styled.div`
  table {
    margin-top: 20px;
    padding-bottom: 50px;
    width: 100%;
    border-spacing: 0;
    background: rgba(255, 255, 255, 1);

    th {
      padding: 10px;
      text-align: left;
    }

    td {
      padding: 0.25rem 10px;
      text-align: left;
    }

    th:nth-child(1) { //열: 1번 기록. 기록이 45% 공간 차지
      width: 45%;
    }

    td:nth-child(2) { //열: 2번 날짜.
      font-size: 0.88rem;
    }

    td:last-child { //열: 3번 수정/삭제 아이콘 모음.
      text-align: center;
      display: flex;
      justify-content: flex-end;
      gap: 2px;
    }

    button { //수정/삭제 아이콘 디자인
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.1rem;
      color: #555;
      padding: 4px 0 0 0;

      &:hover {
        color: #000;
      }
    }

    @media (min-width: 768px) { //태블릿, PC
      margin: 20px 2.5% 50px;
      width: 95%;
      border-radius: 3px;
    }
  }
`;

//기록 추가 칸
const InputSection = styled.div`
  position: fixed;
  bottom: 0;
  width: calc(100% - 2px);
  display: flex;
  align-items: center;
  gap: 0px;
  margin-top: 20px;
  border: 1px solid #bbb;
  border-radius: 20px;
  overflow: hidden;

  input {
    flex: 1;
    padding: 10px;
    border: 0px;
    height: 18px;
  }

  input[type=text] {
    border-radius: 20px 0 0 20px;
  }

  button {
    background: #007bff;
    color: #fff;
    border: none;
    height: 38px;
    padding: 7px 10px 3px 10px;
    cursor: pointer;
    font-size: 22px;

    &:hover {
      background: #0056b3;
    }
  }

  @media (min-width: 768px) { //태블릿, PC
    position: static;
    width: 95%;
    margin: 20px 2.5% 0;
  }
`;

const FolderView = () => {
  const today = new Date().toISOString().split("T")[0];
  const location = useLocation();
  const { folderId, folderName } = location.state ? location.state : { folderId: null, folderName: null };
  const navigate = new useNavigate();

  const [records, setRecords] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newRecord, setNewRecord] = useState({ folderId, text: "", date: today });
  const [editingRecord, setEditingRecord] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        if (location.state === null) {
          alert("잘못된 접근입니다. 메인 페이지로 돌아갑니다.");
          navigate("/");
        }
        const response = await getRecords(folderId);
        setRecords(response);
      } catch (error) {
        if (error.message === "로그인이 필요합니다.") {
          alert("로그인이 필요합니다. 로그인 창으로 이동합니다.")
          navigate("/login"); // 로그인 페이지로 이동
        } else {
          console.error("기록을 가져오는 중 에러 발생:", error);
          alert("저장된 데이터에 접근하는 데 실패했습니다. 인터넷 연결을 확인하고 창을 새로고침해 주세요. 이 창이 나오는 한, 지금부터 변경한 모든 데이터는 저장되지 않을 수 있습니다.")  
        }
      }
    };

    fetchRecords();

    // *아래 문구로 경고문 삭제함
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId]);

  const handleAddRecord = async () => {
    if (!newRecord.text.trim()) {
      alert("기록을 입력해주세요!");
      return;
    }

    try {
      const response = await createRecord(folderId, newRecord);
      setRecords([...records, response.record].sort((a, b) => new Date(b.date) - new Date(a.date)));
      setNewRecord({ folderId, text: "", date: today });
    } catch (error) {
      console.error("Error adding record:", error);
    }
  };

  const handleEditRecord = (recordId) => {
    const record = records.find((rec) => rec._id === recordId);
    setEditingRecord({ ...record, date: record.date.split("T")[0] });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editingRecord.text.trim()) {
      alert("기록을 입력해주세요!");
      return;
    }

    try {
      const response = await updateRecord(editingRecord._id, editingRecord);
      setRecords(
        records.map((rec) => (rec._id === editingRecord._id ? response.record : rec))
          .sort((a, b) => new Date(b.date) - new Date(a.date))
      );
      setShowEditModal(false);
      setEditingRecord(null);
    } catch (error) {
      console.error("Error editing record:", error);
    }
  };

  const handleDeleteRecord = async (recordId) => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        await deleteRecord(recordId);
        setRecords(records.filter((rec) => rec._id !== recordId));
      } catch (error) {
        console.error("Error deleting record:", error);
      }
    }
  };

  return (
    <Container>
      <TopBar isBackNeeded="true">
        {folderName}
      </TopBar>
      <RecordTable>
        <InputSection>
            <input
            type="text"
            placeholder="기록을 입력하세요"
            value={newRecord.text}
            onChange={(e) => setNewRecord({ ...newRecord, text: e.target.value })}
            />
            <input
            type="date"
            value={newRecord.date}
            onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
            />
            <button onClick={handleAddRecord}>
            <TbPlaylistAdd />
            </button>
        </InputSection>

        <table>
          <thead>
          <tr>
            <th>기록</th>
            <th>날짜</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {records.map((record) => (
            <tr key={record._id}>
              <td>{record.text}</td>
              <td>{format(new Date(record.date), "yyyy-MM-dd")}</td>
              <td>
                <button onClick={() => handleEditRecord(record._id)}>
                  <TbPencil />
                </button>
                <button onClick={() => handleDeleteRecord(record._id)}>
                  <TbTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </RecordTable>

      {showEditModal && (
        <Overlay>
          <Modal>
            <h2>기록 수정</h2>
            <input
              type="text"
              value={editingRecord.text}
              onChange={(e) =>
                setEditingRecord({ ...editingRecord, text: e.target.value })
              }
            />
            <input
              type="date"
              value={editingRecord.date}
              onChange={(e) =>
                setEditingRecord({ ...editingRecord, date: e.target.value })
              }
            />
            <button onClick={handleSaveEdit}>저장</button>
            <button onClick={() => setShowEditModal(false)}>취소</button>
          </Modal>
        </Overlay>
      )}
    </Container>
  );
};

export default FolderView;
