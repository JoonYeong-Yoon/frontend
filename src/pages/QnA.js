import React, { useEffect, useState } from "react";
// import { useUser } from '....';  // userUid를 가져오기. 경로 추가 필요

const QnA = () => {
  // 기존 게시물 데이터
  const [posts, setPosts] = useState([]);

  // user: 새로운 게시물 작성을 위한 상태
  // const { userUid } = useUser();
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  // 게시물 작성 폼을 보여줄지 여부를 결정(true: 게시물 작성폼 / false: 게시물 목록)
  const [isItEdited, setBeingEdited] = useState(false);

  // 게시물 저장 후 새로고침 방지
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 새로운 게시물 객체 생성
    const newPost = {
      documentId: `doc_${Date.now()}`, // 자동 생성
      title: newPostTitle, // 유저 작성
      content: newPostContent, // 유저 작성
      isPublic: isPublic, // 유저 선택
      // userUid: userUid.uid, // 유저 ID 연동 필요
      date: new Date().toISOString(), // 자동 기록
    };

    // 가상의 백엔드 연결 코드
    // 실제로는 여기에 `fetch`나 `axios`를 사용하여 백엔드 API를 호출합니다.
    try {
      // 예를 들어, POST 요청을 보내는 코드입니다.
      // const response = await fetch('/api/posts', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(newPost),
      // });
      // const result = await response.json();
      // console.log("Success:", result);

      // 백엔드 통신 성공시 게시판 업데이트
      // 기존 배열에 새로운 게시물을 추가하고 새 배열을 만듦
      setPosts([...posts, newPost]);

      // 입력 필드 초기화
      setNewPostTitle("");
      setNewPostContent("");
      setIsPublic(true);

      // 게시물 제출 후 게시판으로 돌아가기
      setBeingEdited(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // 게시물 목록을 for문으로 렌더링
  const postElements = [];
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    postElements.push(
      <div key={post.documentId}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <div>
          <span>{post.userUid}</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
      </div>
    );
  }

  return (
    //이하, 게시물 작성 폼
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
              {/* <button
                type="submit"
                 onClick={
                게시판 불러오기 함수: isItEdited가 false로 되어야 / 리스트 setPostsv/</div>
                }
              >
                SEND
              </button> */}
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
                    <span>{new Date(post.date).toLocaleDateString()}</span>
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
