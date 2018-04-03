import React from "react";
import { connect } from "react-redux";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.deleteTodoHandler = this.deleteTodoHandler.bind(this);
    this.handleChangeHandler = this.handleChangeHandler.bind(this);

    this.state = {
      isDone: props.isDone
    };
  }

  deleteTodoHandler(event) {
    this.props.dispatch({
      type: "DELETE_TODO_ACTION",
      index: event.target.getAttribute("data-key")
    });
  }
  handleChangeHandler = event => {
    this.props.dispatch({
      type: "CHANGE_TODO_ACTION",
      index: event.target.getAttribute("data-key")
    });
  };

  render() {
    return (
      <li
        style={{
          position: "relative"
        }}
      >
        <input
          type="checkbox"
          data-key={this.props.index}
          onChange={this.handleChangeHandler}
          checked={this.props.isDone}
        />
        <label
          style={{
            position: "relative",
            left: "60px"
          }}
          className={"completed-" + this.props.isDone}
        >
          {this.props.number}
        </label>
        <input
          type="button"
          className="destroy"
          value="X"
          data-key={this.props.index}
          onClick={this.deleteTodoHandler}
        />
      </li>
    );
  }
}

function mapStateToProps(state) {
  return {
    rows: state.rows
  };
}

export default connect(mapStateToProps)(Todo);
