const QnA = () => {
  return (
    <>
      <p>QnA</p>
      class question {
        constructor(documentId, title, content, isPublic, userUid, date) {
          this.documentId = documentId;
          this.title = title;
          this.content = content;
          this.isPublic = isPublic;
          this.userUid = userUid;
          this.date = date;
          }
        }
      
      const newQuestion = [];

      const new


    </>
  );
};

export default QnA;

const posts = []; 

// for문을 사용해 5개의 게시물 객체를 생성하고 배열에 추가합니다.
for (let i = 0; i < 5; i++) {
  const newPost = new question(
    `docId-${i}`,
    `게시물 제목 ${i + 1}`,
    `게시물 내용 ${i + 1}번째입니다.`,
    i % 2 === 0, // 짝수 번째는 공개, 홀수 번째는 비공개
    `user-${i}`,
    new Date() // 현재 시간
  );
  posts.push(newPost);
}
