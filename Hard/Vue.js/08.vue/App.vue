<template>
  <div class="container">
    <!-- 앱 헤더 -->
    <div class="card card-body bg-light">
      <div class="title">:: Todolist App</div>
    </div>

    <!-- 입력창 + 할일 목록 -->
    <div class="card card-default card-borderless">
      <div class="card-body">
        <!-- 할일 입력 컴포넌트 (이벤트 emit: add-todo) -->
        <InputTodo @add-todo="addTodo" />

        <!-- 할일 리스트 컴포넌트 (props 전달 + 이벤트 emit: delete-todo, toggle-completed) -->
        <TodoList
          :todoList="state.todoList"
          @delete-todo="deleteTodo"
          @toggle-completed="toggleCompleted"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import InputTodo from './components/InputTodo.vue';
import TodoList from './components/TodoList.vue';

// 고유 ID 생성을 위한 타임스탬프
const ts = new Date().getTime();

// 상태 저장용 반응형 객체
const state = reactive({
  todoList: [],
});

// 컴포넌트 마운트 시 초기 할일 목록 추가
onMounted(() => {
  state.todoList.push({ id: ts, todo: '자전거 타기', completed: false });
  state.todoList.push({ id: ts + 1, todo: '딸과 공원 산책', completed: true });
  state.todoList.push({
    id: ts + 2,
    todo: '일요일 애견 카페',
    completed: false,
  });
  state.todoList.push({ id: ts + 3, todo: 'Vue 원고 집필', completed: false });
});

// 할일 추가 메서드
const addTodo = (todo) => {
  if (todo.length >= 2) {
    state.todoList.push({
      id: new Date().getTime(),
      todo: todo,
      completed: false,
    });
  }
};

// 할일 삭제 메서드
const deleteTodo = (id) => {
  const index = state.todoList.findIndex((item) => id === item.id);
  if (index !== -1) {
    state.todoList.splice(index, 1);
  }
};

// 완료 상태 토글 메서드
const toggleCompleted = (id) => {
  const index = state.todoList.findIndex((item) => id === item.id);
  if (index !== -1) {
    state.todoList[index].completed = !state.todoList[index].completed;
  }
};
</script>

<style scoped>
.title {
  text-align: center;
  font-weight: bold;
  font-size: 20pt;
}
</style>
