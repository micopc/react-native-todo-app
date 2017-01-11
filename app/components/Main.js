import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TextInput,
  ScrollView,
} from 'react-native';

import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const dismissKeyboard = require('dismissKeyboard')
const APIUrl = 'https://todo-api-course.herokuapp.com/999';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      todos: [],
    }
    this.onAddToDo = this.onAddToDo.bind(this);
  }

  onAddToDo() {
    dismissKeyboard();
    axios.post(APIUrl + '/todos', { text: this.state.newTodo })
    .then((response) => {
      const todos = this.state.todos;
      todos.push(response.data);
      this.setState({ todos: todos, newTodo: '' });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  toggleToDo(ToDo) {
    axios.put(APIUrl + '/todos/' + ToDo._id, { completed: !ToDo.completed })
    .then((response) => {
      const todos = this.state.todos;
      const foundIndex = todos.findIndex(elem => elem._id === ToDo._id);
      todos[foundIndex].completed = !todos[foundIndex].completed;
      this.setState({
        todos: todos
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onRemoveTodo(TodoID) {
    axios.delete(APIUrl + '/todos/' + TodoID)
    .then((response) => {
      const todos = this.state.todos.filter((elem) => {
        return elem._id !== TodoID;
      });
      this.setState({ todos: todos });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidMount() {
    axios.get(APIUrl + '/todos')
    .then((response) => {
      console.log(response);
      this.setState({ todos: response.data })
    })
    .catch((error) => {
      console.log(error, error.response);
    })
  }

  render() {
    const todos = this.state.todos.map((elem) => {
      const textDecorationLine = elem.completed ? 'line-through' : 'none';
      return (
        <TouchableNativeFeedback
          key={elem._id}
          onPress={() => this.toggleToDo(elem)}
        >
          <View style={styles.btnWrapper}>
            <Text style={[styles.todoText, { textDecorationLine }]}>{elem.text}</Text>
            <TouchableOpacity onPress={() => this.onRemoveTodo(elem._id)}>
              <Icon name="md-close" size={20} color="red" />
            </TouchableOpacity>
          </View>
        </TouchableNativeFeedback>
      );
    })

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.left}>
            <TouchableOpacity onPress={() => this.props.navigator.pop()} style={styles.backBtn}>
              <Icon name="md-arrow-back" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            <Text style={styles.pageTitle}>Todo's</Text>
          </View>
          <View style={styles.right} />
        </View>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder={'Ingrese la tarea'}
                onChangeText={(newTodo) => this.setState({ newTodo })}
                underlineColorAndroid={'transparent'}
                value={this.state.newTodo}
              />
              <TouchableOpacity
                onPress={this.onAddToDo}
              >
                <Icon name="md-add" size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            {todos}
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#3F51B5',
    // padding: 20,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    width: 40,
    alignItems: 'center',
  },
  center: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  right: {
    width: 40,
  },
  backBtn: {
    padding: 10,
  },
  pageTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#ddd',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  todos: {
    // padding: 20,
  },
  btnWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  todoText: {
    flex: 1,
  }
});

export default Main;
