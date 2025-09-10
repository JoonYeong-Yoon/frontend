class diseaseImage {
  contructor(documentId, userUid, fileName, diseaseName, accuracy) {
    this.documentId = documentId; // 16자리 a~z, A~Z, 0~9 string
    this.userUid = userUid; // 질병사진 올린 사용자 아이디 string
    this.fileName = fileName; // 질병사진 파일 이름 string
    this.diseaseName = diseaseName; // 질병명 string
    this.accuracy = accuracy; // 질병 판별 정확도 0~1 float32
  }
}

class aHospitalSearchWord {
  constructor(searchWord) {
    this.searchWord = searchWord; // 병원 찾기에 대한 검색어 string
  }
}

class aHospital {
  constructor(documentId, name, latitude, longitude, address, phoneNumber) {
    this.documentId = documentId; // 16자리 a~z, A~Z, 0~9 string
    this.name = name; // 병원명 string
    this.latitude = latitude; // 위도 float32
    this.longitude = longitude; // 경도 float32
    this.address = address; // 주소 string
    this.phoneNumber = phoneNumber; // 전화번호, '-' 유무는 백엔드에서 결정하셔요, string
  }
}

class aNewByApp {
  constructor(documentId, title, content, isPublic, userUid, date) {
    this.documentId = documentId;
    this.title = title; // 제목, string
    this.content = content; // 내용, string
    this.isPublic = isPublic; // 공개여부, boolean
    this.userUid = userUid; // 13자리 a~z, A~Z, 0~9 string
    this.date = date; // 마지막 수정 시간, Date
  }
}

class question {
  constructor(documentId, title, content, isPublic, userUid, date) {
    this.documentId = documentId; // 16자리 a~z, A~Z, 0~9 string
    this.title = title; // 제목, string
    this.content = content; // 내용, string
    this.isPublic = isPublic; // 공개여부, boolean
    this.userUid = userUid; // 13자리 a~z, A~Z, 0~9 string
    this.date = date; // 마지막 수정 시간, Date
  }
}

class answer {
  constructor(documentId, targetDocumentId, userUid, content, date) {
    this.documentId = documentId; // 16자리 a~z, A~Z, 0~9 string
    this.targetDocumentId = content; // 응답에 해당하는 question의 documentId, string
    this.userUid = userUid; // 13자리 a~z, A~Z, 0~9 string
    this.content = content; // 응답 내용 string
    this.date = date; // 마지막 수정 시간, Date
  }
}

class userInformation {
  constructor(documentId, userUid, name, mobile) {
    this.documentId = documentId; // 16자리 a~z, A~Z, 0~9 string
    this.userUid = userUid; // 13자리 a~z, A~Z, 0~9 string
    this.name = name; // 사용자 이름
    this.mobile = mobile; // 전화번호
  }
}

class loginInfo {
  constructor(documentId, userUid, password) {
    this.documentId = documentId; // 16자리 a~z, A~Z, 0~9 string
    this.userUid = userUid; // 13자리 a~z, A~Z, 0~9 string
    this.password = password; // 8자리 이상 16자리 이하 a~z, A~Z, 0~9 string
  }
}
