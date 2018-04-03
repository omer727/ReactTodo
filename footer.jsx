import React from 'react';
import {connect} from 'react-redux';

class Footer extends React.Component {
  constructor (props) {
    super (props);
    this.clearCompleted = this.clearCompleted.bind (this);
  }

  clearCompleted () {
    this.props.dispatch ({type: 'CLEAR_COMPLETED'});
  }

  itemsLeftStyle = {
    display: 'inline-block',
    marginLeft: '10px',
  };
  linksStyle = {
    display: 'inline-block',
  };

  render () {
    return (
      <footer className="footer">
        <div className="todo-count" style={this.itemsLeftStyle}>
          {this.props.rows.filter (todo => !todo.isDone).length} items left
        </div>
        <ul className="filters" style={this.linksStyle}>
          <li>
            <a>All</a>
          </li>
          <li>
            <a>Active</a>
          </li>
          <li>
            <a>Completed</a>
          </li>
        </ul>

        <div
          style={{
            display: 'inline',
            position: 'absolute',
            right: '15px',
          }}
        >
          <a
            className="clear-completed"
            style={this.linksStyle}
            href="#"
            onClick={this.clearCompleted}
          >
            Clear completed
          </a>
        </div>
      </footer>
    );
  }
}

function mapStateToProps (state) {
  return {
    rows: state.rows,
  };
}

export default connect (mapStateToProps) (Footer);
