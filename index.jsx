import React from 'react';
import {render} from 'react-dom';
import Header from './header.jsx';
import Todo from './todo.jsx';

class TodoWidget extends React.Component {

    componentWillReceiveProps(nextProps) {
        this.setState({rows: nextProps.rows});
    }

    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows
        }
    }

    

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
}

class App extends React.Component {

    changeTodo = (indexToChange) => {        
        let rows = this.state.rows;
        let row = rows[indexToChange];
        row.isDone = !row.isDone;
        this.setState({rows: rows});

    };

    deleteTodo = (indexToRemove) => {
        const rowsAfterDelete = this.state.rows;
        rowsAfterDelete.splice(indexToRemove, 1);
        console.log(rowsAfterDelete);
        this.setState({"rows": rowsAfterDelete});
    };

    newTodo = (todo) => {
        let rows = this.state.rows;
        rows.push({title: todo, isDone: false});
        this.setState({rows: rows});
    };
    
    toggleDone = () => {
        let rows = this.state.rows;
        const isAllDone = rows.every(todo => todo.isDone);        
        rows.map(todo => todo.isDone = !isAllDone);
        this.setState({rows: rows});
    };
    isAllDone = () => {
        let rows = this.state.rows;
        return rows.every((x) => x.isDone);
    };

    clearCompleted= () => {        
        const rows = this.state.rows;
        const unCompletedTodos = rows.filter(row => !row.isDone);
        this.setState({rows:unCompletedTodos});
    };

    state = {
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
    
    render = () => {
        return <div>
            <Header
                onNew={this.newTodo}
                onIsAllDone={this.isAllDone()}
                onToggleDone={this.toggleDone}/>
            <TodoWidget rows={this.state.rows} onChangeTodo={this.changeTodo} onDelete={this.deleteTodo}/>
            <Footer clearCompleted={this.clearCompleted} rowsLength={this.state.rows.filter(todo => !todo.isDone).length}/>                        
        </div>
    }
}

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
            <a  className="clear-completed" style={linksStyle} href="#" onClick={props.clearCompleted}>Clear completed</a>
        </div>
     </footer>
};

render(
    <App/>, document.querySelector('.app'));
