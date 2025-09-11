import React, { useEffect, useState } from "react";

const postData = [
  {
    documentId: "doc_101",
    title: "title1",
    content: "content1",
    isPublic: true,
    userUid: "abc",
    date: "2024-05-15T10:00:00Z",
  },
  {
    documentId: "doc_102",
    title: "title2",
    content: "content2",
    isPublic: true,
    userUid: "def",
    date: "2024-05-16T11:30:00Z",
  },
];

const QnA = () => {
  const [posts, setPosts] = useState(postData); // `posts` 상태와 상태 업데이트 함수 `setPosts`를 정의

  const postElements = [];
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    postElements.push(
      <div
        key={post.documentId} // key는 루프 내부에서 고유해야 합니다.
      >
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
    <div>
      <h1>QnA</h1>
      {postElements.length > 0 ? (
        <div>
          <>{postElements}</>
        </div>
      ) : (
        <p>아직 게시물이 없습니다.</p>
      )}
    </div>
  );
};

export default QnA;
