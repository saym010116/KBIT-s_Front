<template>
  <!-- 입력창 영역 (Bootstrap 사용) -->
  <div class="row mb-3">
    <div class="col">
      <div class="input-group">
        <!-- 사용자 입력창 -->
        <input
          id="msg"
          type="text"
          class="form-control"
          name="msg"
          placeholder="할일을 여기에 입력!"
          v-model.trim="todo"
        />
        @keyup.enter="addTodoHandler"
        <!-- 엔터 키 입력 시 할일 추가 -->
        />
        <!-- 추가 버튼 -->
        <span class="btn btn-primary input-group-addon" @click="addTodoHandler">
          추가
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 부모 컴포넌트로 이벤트를 보내기 위한 정의
const emit = defineEmits(['add-todo']);

// 입력된 할 일 내용 저장
const todo = ref('');

// 입력값을 검증한 후 부모에게 'add-todo' 이벤트 전달
const addTodoHandler = () => {
  if (todo.value.length >= 3) {
    emit('add-todo', todo.value); // 부모에 전달
    todo.value = ''; // 입력창 초기화
  }
};
</script>
