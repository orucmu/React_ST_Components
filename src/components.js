var root = ReactDOM.createRoot(document.getElementById("root"));

//function component ve class component olarak iki ayrı component vardır.

class TodoApp extends React.Component {
    render() {
        const data = {
            title: "Todo Application",
            description: "Bekleyen Görevler",
            items: ['Görev 1', 'Görev 2', 'Görev 3']
        }
        return (
            <div>
                <Header title={data.title} description={data.description} />
                <TodoList items={data.items} />
            </div>
        )
    }
}

console.log(React.Component);

class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p>{this.props.description}</p>
            </div>)
    }
}

class TodoList extends React.Component {
    render() {
        return (
            <ul>
                {
                    this.props.items.map((item, index) => <TodoItem key={index} item={item} />)
                }
            </ul>
        )
    }
}

class TodoItem extends React.Component {
    render() {
        return <li>{this.props.item}</li>
    }
}


root.render(<TodoApp />);
