import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
    handleChangeHandler = (event) => {
        this.setState({value: event.target.value});
    };
    
    onEnter = (event) => {
        if (event.key === 'Enter') {
            this.props.dispatch({type: 'NEW_TODO_ACTION', title: this.state.value});
            event.target.value = '';
        }
    };
    render = () => {
        return <header>
            <div className="title">todos</div>
            <div className="todos-header">
                <input
                    type="checkbox"
                    className="toggle-all"
                    onChange={this.props.onToggleDone}
                    checked={this.props.onIsAllDone}/>
                <input
                    type="text"
                    className="add-new-todo"
                    onKeyDown={this.onEnter}
                    onChange={this.handleChangeHandler}
                    placeholder="What's need to be done?"
                    autoFocus/>
            </div>
        </header>;
    }
    
    constructor(props) {
        super(props);
    }
    
}


function mapStateToProps(state) {
    return {
        rows: state.rows
    };
}

export default connect(mapStateToProps)(Header);