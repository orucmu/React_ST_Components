var root = ReactDOM.createRoot(document.getElementById("root"));

//function component ve class component olarak iki ayrı component vardır.

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.clearItems = this.clearItems.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.state = {
            items: ['Görev 1', 'Görev 2', 'Görev 3']
        }
    }

    deleteItem(item) {
        this.setState((prevState) => {
            const arr = prevState.items.filter((i) => {
                return item != i; //silmek istemediklerimizi geriye gönderiyoruz
            });
            return {
                items: arr
            }
        });
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
                <TodoList items={this.state.items} clear={this.clearItems} deleteItem={this.deleteItem} />
                <NewItem addItem={this.addItem} />
            </div>
        )
    }

    componentDidMount() {
        const json_obj = localStorage.getItem("items");
        const items = JSON.parse(json_obj);

        if (items) {
            this.setState({
                items: items
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.items.length !== this.state.items.length) {
            const json_str = JSON.stringify(this.state.items);
            localStorage.setItem("items", json_str)
        }
    }
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
        </div>)
}

const TodoList = (props) => {
    return (
        <div>
            <ul>
                {
                    props.items.map((item, index) => <TodoItem key={index} item={item} deleteItem={props.deleteItem} />)
                }
            </ul>
            <button onClick={props.clear}>Temizle</button>
        </div>
    )
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
    componentDidUpdate() {
        console.log("NewItem componenti güncellendi.");
    }
}

const TodoItem = (props) => {
    return (
        <li>
            {props.item}
            <button onClick={() => { props.deleteItem(props.item) }}>X</button>
        </li>
    );
}

root.render(<TodoApp />);
