// Pinia의 defineStore를 사용하여 store를 정의합니다.
import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import axios from 'axios';

// todoList라는 이름의 store를 생성합니다.
export const useTodoListStore = defineStore('todoList', () => {
  const BASEURI = '/api/todos'; // API 기본 주소
  const state = reactive({
    todoList: [], // 할 일 목록을 저장하는 배열
    // ※ isLoading은 사용되지 않고 있음 → 필요하면 추가 정의해야 함
  });

  // ▶ TodoList 목록을 조회하는 함수
  const fetchTodoList = async () => {
    try {
      const response = await axios.get(BASEURI); // 서버에서 목록을 가져옵니다.
      if (response.status === 200) {
        state.todoList = response.data; // 성공 시 todoList에 할 일 목록을 저장합니다.
      } else {
        alert('데이터 조회 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };

  // ▶ 새로운 Todo 항목을 추가하는 함수
  const addTodo = async ({ todo, desc }, successCallback) => {
    try {
      const payload = { todo, desc }; // 전송할 데이터 구성
      const response = await axios.post(BASEURI, payload); // POST 요청으로 새 항목 추가
      if (response.status === 201) {
        // 성공 시 응답 데이터를 리스트에 추가
        state.todoList.push({ ...response.data, done: false });
        successCallback(); // 성공 시 콜백 함수 실행
      } else {
        alert('Todo 추가 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };

  // ▶ 기존 Todo 항목을 수정하는 함수
  const updateTodo = async ({ id, todo, desc, done }, successCallback) => {
    try {
      const payload = { id, todo, desc, done }; // 수정할 데이터 구성
      const response = await axios.put(`${BASEURI}/${id}`, payload); // PUT 요청으로 항목 수정
      if (response.status === 200) {
        // 목록에서 해당 항목 찾아서 교체
        let index = state.todoList.findIndex((todo) => todo.id === id);
        state.todoList[index] = payload;
        successCallback(); // 성공 시 콜백 함수 실행
      } else {
        alert('Todo 변경 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };

  // ▶ 기존 Todo 항목을 삭제하는 함수
  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`${BASEURI}/${id}`); // DELETE 요청으로 삭제
      if (response.status === 200) {
        // 목록에서 해당 항목 삭제
        let index = state.todoList.findIndex((todo) => todo.id === id);
        state.todoList.splice(index, 1);
      } else {
        alert('Todo 삭제 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };

  // ▶ 완료 여부를 토글하는 함수 (true ↔ false)
  const toggleDone = async (id) => {
    try {
      let todo = state.todoList.find((todo) => todo.id === id);
      let payload = { ...todo, done: !todo.done }; // done 값을 반대로 변경
      const response = await axios.put(`${BASEURI}/${id}`, payload); // 서버에 수정 요청
      if (response.status === 200) {
        todo.done = payload.done; // 로컬 상태도 반영
      } else {
        alert('Todo 완료 변경 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };

  // ▶ 전체 todoList를 computed 속성으로 노출
  const todoList = computed(() => state.todoList);

  //  현재 isLoading은 정의되지 않았지만 computed로 선언되어 있음. 에러 방지하려면 state에 isLoading 추가 필요
  const isLoading = computed(() => state.isLoading);

  // ▶ 완료된 항목의 개수를 계산하는 computed 속성
  const doneCount = computed(() => {
    const filtered = state.todoList.filter(
      (todoItem) => todoItem.done === true
    );
    return filtered.length;
  });

  // store에서 사용할 변수와 함수들을 반환
  return {
    todoList, // 전체 목록
    isLoading, // 로딩 상태 (정의 필요)
    doneCount, // 완료된 항목 개수
    fetchTodoList, // 목록 조회 함수
    addTodo, // 항목 추가 함수
    deleteTodo, // 항목 삭제 함수
    updateTodo, // 항목 수정 함수
    toggleDone, // 완료 여부 토글 함수
  };
});
