<template>
  <div class="container">
    <!-- 상단 헤더 컴포넌트 -->
    <Header />

    <!-- 라우터로 등록된 페이지 출력 영역 -->
    <router-view />
  </div>
</template>

<script setup>
import { reactive, provide, computed } from 'vue';
import Header from '@/components/Header.vue';
import axios from 'axios';

// API 기본 경로
const BASEURI = '/api/todos';

// 전역 상태 객체 (할 일 목록 관리)
const states = reactive({
  todoList: [], // 서버에서 받아올 할 일 리스트 저장
});

//  할 일 목록 불러오기 (페이지 진입 시 자동 호출)
const fetchTodoList = async () => {
  try {
    const response = await axios.get(BASEURI);
    if (response.status === 200) {
      states.todoList = response.data;
    } else {
      alert('데이터조회실패');
    }
  } catch (error) {
    alert('에러발생:' + error);
  }
};

//  할 일 추가 함수
const addTodo = async ({ todo, desc }, successCallback) => {
  try {
    const payload = { todo, desc };
    const response = await axios.post(BASEURI, payload);
    if (response.status === 201) {
      // 추가된 항목을 상태에 반영
      states.todoList.push({ ...response.data, done: false });
      successCallback(); // 입력 폼 초기화 등 후처리용 콜백 실행
    } else {
      alert('Todo 추가 실패');
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
};

//  할 일 수정 함수
const updateTodo = async ({ id, todo, desc, done }, successCallback) => {
  try {
    const payload = { id, todo, desc, done };
    const response = await axios.put(BASEURI + `/${id}`, payload);
    if (response.status === 200) {
      let index = states.todoList.findIndex((todo) => todo.id === id);
      states.todoList[index] = payload;
      successCallback(); // 수정 후 후처리 (예: 모달 닫기)
    } else {
      alert('Todo 변경 실패');
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
};

//  할 일 삭제 함수
const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(BASEURI + `/${id}`);
    if (response.status === 200) {
      let index = states.todoList.findIndex((todo) => todo.id === id);
      states.todoList.splice(index, 1);
    } else {
      alert('Todo 삭제 실패');
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
};

//  완료 상태 토글 함수
const toggleDone = async (id) => {
  try {
    let todo = states.todoList.find((todo) => todo.id === id);
    let payload = { ...todo, done: !todo.done };
    const response = await axios.put(BASEURI + `/${id}`, payload);
    if (response.status === 200) {
      todo.done = payload.done;
    } else {
      alert('Todo 완료 변경 실패');
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
};

//  전역으로 상태 및 메서드 공유 (자식 컴포넌트에서 inject로 사용 가능)
provide(
  'todoList',
  computed(() => states.todoList)
);
provide('actions', {
  addTodo,
  deleteTodo,
  toggleDone,
  updateTodo,
  fetchTodoList,
});

// 최초 진입 시 데이터 조회
fetchTodoList();
</script>
