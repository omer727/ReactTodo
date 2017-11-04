import React from 'react';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChangeHandler = (event) => {
        this.setState({value: event.target.value});
    }

    newTodoHandler = (event) => {
        this
            .props
            .onNew(this.state.value);
    }

    onEnter = (event) => {
        if (event.key === 'Enter') {
            this.newTodoHandler(event);
            console.log(event.target.value);
            event.target.value = '';
        }
    }

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

}


