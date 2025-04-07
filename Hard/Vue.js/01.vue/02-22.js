// 새로운 Promise 객체 생성
let p = new Promise((resolve, reject) => {
  resolve('first!'); // 바로 'first!' 메시지로 성공 처리(resolve)
});

// 첫 번째 then 블록: 위에서 resolve된 값을 받아옴
p.then((msg) => {
  console.log(msg); // 콘솔에 'first!' 출력
  // throw new Error("## 에러!!") // ← 이 줄이 주석 해제되면 아래 체이닝은 실행되지 않고 catch로 이동함
  return 'second'; // 다음 then으로 'second' 전달
})
  // 두 번째 then 블록: 앞에서 return한 'second'를 받아옴
  .then((msg) => {
    console.log(msg); // 콘솔에 'second' 출력
    return 'third'; // 다음 then으로 'third' 전달
  })
  // 세 번째 then 블록: 앞에서 return한 'third'를 받아옴
  .then((msg) => {
    console.log(msg); // 콘솔에 'third' 출력
  })
  // 에러 처리 블록: 위 체이닝 중 에러가 발생하면 여기서 catch함
  .catch((error) => {
    console.log('오류 발생 ==> ' + error); // 에러 메시지 출력
  });
