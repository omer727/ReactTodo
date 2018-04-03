import React from "react";
import { render } from "react-dom";
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import Todo from "./todo.jsx";
import { connect, Provider } from "react-redux";
import { createStore } from "redux";

class TodoWidget extends React.Component {
  render = () => {
    const todos = this.state.rows.map((row, i) => (
      <Todo isDone={row.isDone} number={row.title} key={i} index={i} />
    ));
    return (
      <main>
        <div>
          <ul className="todos">{todos}</ul>
        </div>
      </main>
    );
  };

  constructor(props) {
    super(props);
    this.state = {
      rows: this.props.rows
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ rows: nextProps.rows });
  }
}

class App extends React.Component {
  changeTodo = indexToChange => {
    let rows = this.props.rows;
    let row = rows[indexToChange];
    row.isDone = !row.isDone;
    this.setState({ rows: rows });
  };

  // deleteTodo = (indexToRemove) => {     const rowsAfterDelete =
  // this.props.rows;     rowsAfterDelete.splice(indexToRemove, 1);
  // this.setState({"rows": rowsAfterDelete}); };

  render = () => {
    return (
      <div>
        <Header />
        <TodoWidget rows={this.props.rows} />
        <Footer />
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { rows: state.rows };
};

const initialState = {
  rows: [
    {
      title: "Todo 1",
      isDone: true
    },
    {
      title: "Todo 2",
      isDone: false
    },
    {
      title: "Todo 3",
      isDone: true
    }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_TODO_ACTION":
      let newRow = {
        title: action.title,
        isDone: false
      };
      return {
        rows: [...state.rows, newRow]
      };

    case "CLEAR_COMPLETED":
      let unCompletedTodos = state.rows.filter(row => !row.isDone);
      return { rows: unCompletedTodos };
    case "TOGGLE_ALL":
      let toggledTodos = state.rows;
      const isAllDone = toggledTodos.every(todo => todo.isDone);
      toggledTodos.map(todo => (todo.isDone = !isAllDone));
      return {
        rows: [...toggledTodos]
      };

    case "DELETE_TODO_ACTION":
      let indexToRemove = action.index;
      const rowsAfterDelete = state.rows;
      rowsAfterDelete.splice(indexToRemove, 1);
      return {
        rows: [...rowsAfterDelete]
      };

    case "CHANGE_TODO_ACTION":
      let indexToChange = action.index;
      const rowsAfterChange = state.rows;
      rowsAfterChange[indexToChange].isDone = !rowsAfterChange[indexToChange]
        .isDone;
      return {
        rows: [...rowsAfterChange]
      };
  }
  return state;
};

const store = createStore(reducer);

let AppElement = connect(mapStateToProps)(App);

render(
  <Provider store={store}>
    <AppElement />
  </Provider>,
  document.querySelector(".app")
);
