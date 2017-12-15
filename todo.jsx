import React from 'react';

export default class Todo extends React.Component {
    deleteTodoHandler = (event) => {
        const indexToRemove = event
            .target
            .getAttribute("data-key");
        this
            .props
            .onDelete(indexToRemove);
    };
    handleChangeHandler = (event) => {
        const indexToChange = event
            .target
            .getAttribute("data-key");
        this
            .props
            .onChangeTodo(indexToChange);
    };
    
    constructor(props) {
        super(props);
        this.state = {
            isDone: props.isDone
        };
    }
    
    render() {
        return <li style={{
            position: "relative"
        }}>
            <input
                type="checkbox"
                data-key={this.props.index}
                onChange={this.handleChangeHandler}
                checked={this.props.isDone}/>
            <label
                style={{
                    position: "relative",
                    left: "60px"
                }}
                className={"completed-" + this.props.isDone}>{this.props.number}</label>
            <input
                type="button"
                className="destroy"
                value="X"
                data-key={this.props.index}
                onClick={this.deleteTodoHandler}/>
        </li>;
    }
}

