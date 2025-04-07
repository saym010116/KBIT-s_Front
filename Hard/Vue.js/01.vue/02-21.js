// 새로운 Promise 객체 생성
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    let num = Math.random(); // 0 이상 1 미만의 난수 생성
    if (num >= 0.8) {
      // 생성된 숫자가 0.8 이상이면 실패 처리
      reject('생성된 숫자가 0.8이상임 - ' + num);
    }
    // 그 외에는 성공 처리
    resolve(num);
  }, 2000); // 2초(2000ms) 후 실행
});

// 성공(resolve)한 경우 호출되는 블록
p.then((result) => {
  console.log('처리 결과 : ', result); // 난수 출력
})

  // 실패(reject)한 경우 호출되는 블록
  .catch((error) => {
    console.log('오류 : ', error); // 에러 메시지 출력
  });

console.log('## Promise 객체 생성!'); // 비동기 타이머 실행 전 먼저 출력됨
