import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import DateHead from './components/DateHead';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AddTodo from './components/AddTodo';
import Empty from './components/Empty';
import TodoList from './components/TodoList';

function App() {
  const today = new Date();
  const [todos, setTodos] = useState([
    {id: 1, text: '작업환경 설정', done: true},
    {id: 2, text: '리액트 네이티브 기초 공부', done: false},
    {id: 3, text: '투두리스트 만들어보기', done: false}
  ]);

  const onInsert = text => {
    // 새로 등록할 항목의 id를 구합니다.
    // 등록된 항목 중에서 가장 큰 id를 구하고, 그 값에 1을 더합니다.
    // 만약 리스트가 비어있다면, 1을 id로 사용합니다.
    const nextId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo. id)) + 1 : 1;
    const todo = {
      id: nextId,
      text,
      done: false,
    };
    setTodos(todos.concat(todo));
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.select({ios: 'padding', android: undefined})}
          style={styles.avoid}>
          <DateHead date={today} />
          {todos.length === 0 ? <Empty /> : <TodoList todos={todos} /> }
          <AddTodo onInsert={onInsert} />
        </KeyboardAvoidingView>
      </SafeAreaView> 
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoid: {
    flex: 1,
  }
});
export default App;
