import axios from "axios";
import React, { useEffect, useState } from "react";

const QnA = () => {
  // 기존 게시물 데이터
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  // 게시물 작성 폼을 보여줄지 여부를 결정(true: 게시물 작성폼 / false: 게시물 목록)
  const [isItEdited, setBeingEdited] = useState(false);

  const BACKEND_URL = "http://localhost:5000"; // 백엔드 주소

  // ----------------- 게시물 불러오기 -----------------
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/posts`, {
        withCredentials: true, // 세션 쿠키 포함
      });
      setPosts(res.data);
    } catch (err) {
      console.error("게시물 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ----------------- 게시물 작성 -----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title: newPostTitle,
      content: newPostContent,
      isPublic, // 프론트 변수 유지, 백엔드에선 현재 미사용
    };

    try {
      const res = await axios.post(`${BACKEND_URL}/api/posts`, newPost, {
        withCredentials: true, // 세션 쿠키 포함
      });

      // 백엔드 응답에서 documentId, userUid, date 받음
      setPosts([...posts, res.data]);

      setNewPostTitle("");
      setNewPostContent("");
      setIsPublic(true);
      setBeingEdited(false);
    } catch (err) {
      console.error("게시물 작성 실패:", err);
    }
  };

  return (
    <div>
      {isItEdited ? (
        <>
          <h2>게시물 작성</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">제목</label>
              <input
                type="text"
                id="title"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="content">내용</label>
              <textarea
                id="content"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <input
                type="checkbox"
                id="isPublic"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              <label htmlFor="isPublic">공개 게시물</label>
            </div>
            <div>
              <button type="submit">SEND</button>
              {/* ===== [ADDED FROM #2] 작성 취소 버튼 시작 ===== */}
              <button type="button" onClick={() => setBeingEdited(false)}>
                취소
              </button>
              {/* ===== [ADDED FROM #2] 작성 취소 버튼 끝 ===== */}
            </div>
          </form>
        </>
      ) : (
        <div>
          {/* ===== [ADDED FROM #2] 헤더 텍스트 교체 시작 ===== */}
          <h1>QnA 게시판</h1>
          {/* ===== [ADDED FROM #2] 헤더 텍스트 교체 끝 ===== */}

          <button onClick={() => setBeingEdited(true)}>게시물 작성</button>

          {/* ===== [ADDED FROM #2] 게시판 프레임(테이블) 시작 ===== */}
          {posts.length > 0 ? (
            <table border="1" cellPadding="5" style={{ marginTop: "10px" }}>
              <thead>
                <tr>
                  <th>순서</th>
                  <th>제목</th>
                  <th>게시자</th>
                  <th>게시일자</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={post.documentId}>
                    <td>{index + 1}</td>
                    <td>{post.title}</td>
                    <td>{post.username || post.userUid}</td>
                    <td>
                      {post.date
                        ? new Date(post.date).toLocaleDateString()
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>아직 게시물이 없습니다.</p>
          )}
          {/* ===== [ADDED FROM #2] 게시판 프레임(테이블) 끝 ===== */}

          {/* (참고) 기존 1번 코드의 카드형 목록은 테이블로 대체됨 */}
        </div>
      )}
    </div>
  );
};

export default QnA;
