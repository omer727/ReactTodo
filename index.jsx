import React from 'react';
import {render} from 'react-dom';
import Header from './header.jsx';
import Todo from './todo.jsx';
import {connect, Provider} from 'react-redux';
import {createStore} from 'redux';


class TodoWidget extends React.Component {
    
    render = () => {
        const todos = this
            .state
            .rows
            .map((row, i) => <Todo
                onChangeTodo={this.props.onChangeTodo}
                onDelete={this.props.onDelete}
                isDone={row.isDone}
                number={row.title}
                key={i}
                index={i}/>);
        return <main>
            <div>
                <ul className="todos">{todos}</ul>
            </div>
        </main>;
    }
    
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({rows: nextProps.rows});
    }
}

class App extends React.Component {
    
    changeTodo = (indexToChange) => {
        let rows = this.props.rows;
        let row = rows[indexToChange];
        row.isDone = !row.isDone;
        this.setState({rows: rows});
        
    };
    
    deleteTodo = (indexToRemove) => {
        const rowsAfterDelete = this.props.rows;
        rowsAfterDelete.splice(indexToRemove, 1);
        console.log(rowsAfterDelete);
        this.setState({"rows": rowsAfterDelete});
    };
    
    newTodo = (todo) => {
        this.props.dispatch({type: 'NEW_TODO_ACTION', title: todo});
    };
    
    toggleDone = () => {
        let rows = this.props.rows;
        const isAllDone = rows.every(todo => todo.isDone);
        rows.map(todo => todo.isDone = !isAllDone);
        this.setState({rows: rows});
    };
    isAllDone = () => {
        let rows = this.props.rows;
        return rows.every((x) => x.isDone);
    };
    
    clearCompleted = () => {
        const rows = this.props.rows;
        const unCompletedTodos = rows.filter(row => !row.isDone);
        this.setState({rows: unCompletedTodos});
    };
    
    render = () => {
        return <div>
            <Header
                onNew={this.newTodo}
                onIsAllDone={this.isAllDone()}
                onToggleDone={this.toggleDone}/>
            <TodoWidget rows={this.props.rows} onChangeTodo={this.changeTodo} onDelete={this.deleteTodo}/>
            <Footer clearCompleted={this.clearCompleted}
                    rowsLength={this.props.rows.filter(todo => !todo.isDone).length}/>
        </div>
    }
}

let mapStateToProps = (state) => {
    // debugger;
    return {
        rows: state.rows
    };
};


const Footer = (props) => {
    let itemsLeftStyle = {
        display: "inline-block",
        "marginLeft": "10px"
    };
    let linksStyle = {
        display: "inline-block",
        "marginRight": "10px"
    };
    
    return <footer className="footer">
        <div className="todo-count" style={itemsLeftStyle}>{props.rowsLength} items left</div>
        <ul className="filters" style={linksStyle}>
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
        
        <div>
            <a className="clear-completed" style={linksStyle} href="#" onClick={props.clearCompleted}>Clear
                completed</a>
        </div>
    </footer>
};

const initialState = {
    rows: [
        {
            title: "Todo 1",
            isDone: true
        }, {
            title: "Todo 2",
            isDone: false
        }, {
            title: "Todo 3",
            isDone: true
        }
    ]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_TODO_ACTION':
            let newRow = {title: action.title, isDone: false};
            return {rows: [...state.rows, newRow]};
    }
    return state;
};

const store = createStore(reducer);

let XXX = connect(mapStateToProps)(App);

render(
    <Provider store={store}>
        <XXX></XXX>
    </Provider>, document.querySelector('.app'));
