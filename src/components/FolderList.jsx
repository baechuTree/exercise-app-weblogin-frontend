import React, { useState, useEffect } from "react";
import { getFolders, createFolder, updateFolder, deleteFolder } from "../api/folderApi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TbTrash, TbPencil, TbFolderPlus } from "react-icons/tb";
import { Container, Modal, Overlay } from "../styles/SharedStyleComponents";
import TopBar from "./shared/TopBar";

// Styled Components

//폴더 리스트
const FolderListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

//폴더
const FolderItem = styled.div`
  flex: 1 1 calc(100% - 20px); //모바일: 1열열
  max-width: calc(100% - 20px);
  background: ${(props) => props.color || "#f5f5f5"}; //FolderItem이 props로 전달한 색을 적용
  border-radius: 8px;
  padding: 10px 12px;
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(90%);
  }

  &:active {
    filter: brightness(70%);
  }

  @media (min-width: 768px) {
    flex: 1 1 calc(50% - 30px); //태블릿: 2열
    max-width: calc(50% - 30px);
    margin: 0;
  }

  @media (min-width: 950px) {
    flex: 1 1 calc(33% - 28px); //PC: 3열
    max-width: calc(33% - 28px);
    margin: 0;
  }

  span {
    font-size: 16px;
    font-weight: bold;
  }

  //폴더 내 아이콘 모음
  .icon-btn {
    display: flex;
    gap: 0;

    button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 22px;
      color: #555;
      padding: 2px 0 0 8px;

      &:hover {
        color: #000;
      }
    }
  }
`;

//오른쪽 아래 추가버튼
const AddButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    background: #0056b3;
  }
`;

//로딩 창
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  h1 {
    font-size: 24px;
  }
`;

const FolderList = () => {
  const [folders, setFolders] = useState([]);
  const [editingFolder, setEditingFolder] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderColor, setNewFolderColor] = useState("#f5f5f5")
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // React Router로 이동 처리

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await getFolders();
        setFolders(response);
      } catch (error) {
        if (error.message === "로그인이 필요합니다.") {
          alert("로그인이 필요합니다. 로그인 창으로 이동합니다.")
          navigate("/login"); // 로그인 페이지로 이동
        } else {
          console.error("폴더 목록을 가져오는 중 에러 발생:", error);
          alert("저장된 데이터에 접근하는 데 실패했습니다. 인터넷 연결을 확인하고 창을 새로고침해 주세요. 이 창이 나오는 한, 지금부터 변경한 모든 데이터는 저장되지 않을 수 있습니다.")
        }
      } finally {
        setLoading(false);
      }
    };
    fetchFolders();

    // *아래 문구로 경고문 삭제함
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddFolder = async () => {
    if (!newFolderName.trim()) {
      alert("폴더 이름을 입력해주세요!");
      return;
    }

    try {
      const response = await createFolder({ name: newFolderName, color: newFolderColor });
      setFolders([response.folder, ...folders]);
      setNewFolderName("");
      setNewFolderColor("#f5f5f5");
      setShowAddModal(false);
    } catch (error) {
      if (error.message === "로그인이 필요합니다.") {
        alert("시간이 만료되어 재로그인이 필요합니다. 로그인 창으로 이동합니다.")
        navigate("/login"); // 로그인 페이지로 이동
      } else {
        console.error("폴더 추가 중 에러 발생:", error);
        alert("폴더 추가 중 에러 발생")
      }
    }
  };

  const handleEditFolder = (folderId) => {
    const folder = folders.find((folder) => folder._id === folderId);
    setEditingFolder(folder);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editingFolder.name.trim()) {
      alert("폴더 이름을 입력해주세요!");
      return;
    }

    try {
      const response = await updateFolder(editingFolder._id, { name: editingFolder.name, color: editingFolder.color });
      setFolders(
        folders.map((folder) =>
          folder._id === editingFolder._id ? response.folder : folder
        )
      );
      setShowEditModal(false);
      setEditingFolder(null);
    } catch (error) {
      if (error.message === "로그인이 필요합니다.") {
        alert("시간이 만료되어 재로그인이 필요합니다. 로그인 창으로 이동합니다.")
        navigate("/login"); // 로그인 페이지로 이동
      } else {
        console.error("폴더 수정 중 에러 발생:", error);
        alert("폴더 수정 중 에러 발생")
      }
    }
  };

  const handleDeleteFolder = async (folderId) => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        await deleteFolder(folderId);
        setFolders(folders.filter((folder) => folder._id !== folderId));
      } catch (error) {
        if (error.message === "로그인이 필요합니다.") {
          alert("시간이 만료되어 재로그인이 필요합니다. 로그인 창으로 이동합니다.")
          navigate("/login"); // 로그인 페이지로 이동
        } else {
          console.error("폴더 삭제 중 에러 발생:", error);
          alert("폴더 삭제 중 에러 발생")
        }
      }
    }
  };

  const handleNavigateToFolder = (folderInfo) => {
    navigate(`/folder/${folderInfo._id}`, {state: {
      folderId: folderInfo._id,
      folderName: folderInfo.name,
    }}); // 폴더 클릭 시 이동
  };

  if (loading) {
    return (
      <LoadingContainer>
        <h1>Loading...</h1>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <TopBar>
        {"기록하자!"}
      </TopBar>
      <FolderListContainer>
        {folders.map((folder) => (
          <FolderItem
            key={folder._id}
            color={folder.color}
            onClick={() => handleNavigateToFolder(folder)}
          >
            <span>{folder.name}</span>
            <div className="icon-btn">
              <button onClick={(e) => { e.stopPropagation(); handleEditFolder(folder._id); }}>
                <TbPencil />
              </button>
              <button onClick={(e) => { e.stopPropagation(); handleDeleteFolder(folder._id); }}>
                <TbTrash />
              </button>
            </div>
          </FolderItem>
        ))}
      </FolderListContainer>
      <AddButton onClick={() => setShowAddModal(true)}>
        <TbFolderPlus />
      </AddButton>

      {showAddModal && (
        <Overlay>
          <Modal>
            <h2>폴더 추가</h2>
            <div>
              <label>이름</label>
              <input
                type="text"
                placeholder="폴더 이름"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
            </div>
            <div>
              <label>색상</label>
              <input
                type="color"
                value={newFolderColor}
                onChange={(e) => setNewFolderColor(e.target.value)}
              />
            </div>
            <div>
              <button onClick={handleAddFolder}>추가</button>
              <button onClick={() => setShowAddModal(false)}>취소</button>
            </div>
          </Modal>
        </Overlay>
      )}

      {showEditModal && (
        <Overlay>
          <Modal>
            <h2>폴더 수정</h2>
            <div>
              <label>이름</label>
              <input
                type="text"
                value={editingFolder.name}
                onChange={(e) =>
                  setEditingFolder({ ...editingFolder, name: e.target.value })
                }
              />
            </div>
            <div>
              <label>색상</label>
              <input
                type="color"
                value={editingFolder.color}
                onChange={(e) =>
                  setEditingFolder({ ...editingFolder, color: e.target.value })
                }
              />
            </div>
            <div>
              <button onClick={handleSaveEdit}>저장</button>
              <button onClick={() => setShowEditModal(false)}>취소</button>
            </div>
          </Modal>
        </Overlay>
      )}
    </Container>
  );
};

export default FolderList;
