import React, { useEffect, useState } from "react";
import axios from "axios";

const QnA = () => {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [isItEdited, setBeingEdited] = useState(false);

  const BACKEND_URL = "http://localhost:5000";

  // ----------------- 게시물 불러오기 -----------------
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/posts`, {
        withCredentials: true,
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
    };

    try {
      const res = await axios.post(`${BACKEND_URL}/api/posts`, newPost, {
        withCredentials: true,
      });

      // 새로운 게시물 화면에 바로 추가
      setPosts([res.data, ...posts]); // 최신 게시물이 위로 오도록

      setNewPostTitle("");
      setNewPostContent("");
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
              <button type="submit">등록</button>
              <button type="button" onClick={() => setBeingEdited(false)}>
                취소
              </button>
            </div>
          </form>
        </>
      ) : (
        <div>
          <h1>QnA 게시판</h1>
          <button onClick={() => setBeingEdited(true)}>게시물 작성</button>

          {posts.length > 0 ? (
            <table border="1" cellPadding="5" style={{ marginTop: "10px" }}>
              <thead>
                <tr>
                  <th>순서</th>
                  <th>제목</th>
                  <th>내용</th>
                  <th>게시자</th>
                  <th>게시일자</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={post.documentId}>
                    <td>{index + 1}</td>
                    <td>{post.title}</td>
                    <td>{post.content}</td>
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
        </div>
      )}
    </div>
  );
};

export default QnA;




////이하 금일 원본
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
