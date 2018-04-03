import React from 'react';
import {connect} from 'react-redux';

class Header extends React.Component {
  constructor (props) {
    super (props);
    this.onEnter = this.onEnter.bind (this);
    this.onToggleAll = this.onToggleAll.bind (this);
  }

  onToggleAll (event) {
    this.props.dispatch ({type: 'TOGGLE_ALL'});
  }

  onEnter (event) {
    if (event.key === 'Enter' && event.target.value !== '') {
      this.props.dispatch ({
        type: 'NEW_TODO_ACTION',
        title: event.target.value,
      });
      event.target.value = '';
    }
  }

  render () {
    return (
      <header>
        <div className="title">todos</div>
        <div className="todos-header">
          <input
            type="checkbox"
            className="toggle-all"
            onChange={this.onToggleAll}
            checked={this.props.rows.every (x => x.isDone)}
          />
          <input
            type="text"
            className="add-new-todo"
            onKeyDown={this.onEnter}
            placeholder="What's need to be done?"
            autoFocus
          />
        </div>
      </header>
    );
  }
}

function mapStateToProps (state) {
  return {
    rows: state.rows,
  };
}

export default connect (mapStateToProps) (Header);
