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

  // 9.12 수정. ===== [ADDED] 제출 상태 =====
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // 9.12. 수정 ===== [ADDED] 전송 시작 플래그 =====
    setIsSubmitting(true);

    try {
      const res = await axios.post(`${BACKEND_URL}/api/posts`, newPost, {
        withCredentials: true, // 세션 쿠키 포함
      });

      // 백엔드 응답에서 documentId, userUid, date 받음
      setPosts((prev) => [res.data, ...prev]); // 9.12 수정. 작성한 글을 목록 "최상단"에 즉시 반영 (prepend)

      setNewPostTitle("");
      setNewPostContent("");
      setIsPublic(true);
      setBeingEdited(false);
    } catch (err) {
      console.error("게시물 작성 실패:", err);
      // 9.12. 수정= ==== [ADDED] 실패 알림(선택) =====
      alert("작성에 실패했습니다. 콘솔을 확인하세요.");
    } finally {
      // 9.12. 수정===== [FIXED] 성공/실패와 무관하게 목록 화면으로 전환 보장 =====
      setBeingEdited(false);
      setIsSubmitting(false);
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
                // 9.12. 수정===== [ADDED] 전송 중 비활성화 =====
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="content">내용</label>
              <textarea
                id="content"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                required
                // 9.12. 수정===== [ADDED] 전송 중 비활성화 =====
                disabled={isSubmitting}
              ></textarea>
            </div>
            <div>
              <input
                type="checkbox"
                id="isPublic"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                // 9.12. 수정===== [ADDED] 전송 중 비활성화 =====
                disabled={isSubmitting}
              />
              <label htmlFor="isPublic">공개 게시물</label>
            </div>
            <div>
              <button type="submit">SEND</button>
              {/* 9.12. 수정===== [ADDED] 취소 버튼 ===== */}
              <button
                type="button"
                onClick={() => setBeingEdited(false)}
                disabled={isSubmitting}
              >
                취소
              </button>
            </div>
          </form>
        </>
      ) : (
        <div>
          <h1>QnA</h1>
          <div>
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.documentId}>
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                  <div>
                    <span>{post.userUid}</span>
                    <span>
                      {post.date
                        ? new Date(post.date).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>아직 게시물이 없습니다.</p>
            )}
          </div>
          <button onClick={() => setBeingEdited(true)}>게시물 작성</button>
        </div>
      )}
    </div>
  );
};

export default QnA;

