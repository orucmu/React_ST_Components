var root = ReactDOM.createRoot(document.getElementById("root"));

//function component ve class component olarak iki ayrı component vardır.

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.clearItems = this.clearItems.bind(this);
        this.addItem = this.addItem.bind(this);
        this.state = {
            items: ['Görev 1', 'Görev 2', 'Görev 3']
        }
    }

    clearItems() {
        this.setState({
            items: []
        })
    }

    addItem(item) {
        if (this.state.items.indexOf(item) > -1) {
            return "Aynı elemanı ekleyemezsiniz."
        }

        this.setState((prevState) => {
            return { items: prevState.items.concat(item) }
        })
    }

    render() {
        const data = {
            title: "Todo Application",
            description: "Bekleyen Görevler",
        }
        return (
            <div>
                <Header title={data.title} description={data.description} />
                <TodoList items={this.state.items} clear={this.clearItems} />
                <NewItem addItem={this.addItem} />
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
            <div>
                <ul>
                    {
                        this.props.items.map((item, index) => <TodoItem key={index} item={item} />)
                    }
                </ul>
                <button onClick={this.props.clear}>Temizle</button>
            </div>
        )
    }
}

class NewItem extends React.Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            error: ''
        }
    }
    onFormSubmit(e) {
        e.preventDefault();
        const item = e.target.elements.txtItem.value.trim();
        if (item) {
            e.target.elements.txtItem.value = "";
            const error = this.props.addItem(item);
            this.setState({
                error: error
            })
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onFormSubmit}>
                    <input type="text" name="txtItem" />
                    <button type="submit">Ekle</button>
                </form>
            </div>
        )
    }
}

class TodoItem extends React.Component {
    render() {
        return <li>{this.props.item}</li>
    }
}


root.render(<TodoApp />);
