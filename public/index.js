const root = ReactDOM.createRoot(document.getElementById('app'));

const App = () => {
    const [text, setText] = React.useState('')
    const [history, setHistory] = React.useState([])
    const isDisabled = !(text.startsWith('http://') || text.startsWith('https://'))
    const getDisabledClass = () => isDisabled ? 'disabled' : ''
    const handleInput = (e) => setText(e.target.value)
    const onSubmit = () => {
        axios.post('/', {
            text: text
        }).then((r) => {
            const alias = r.data
            const data = {
                url: text,
                alias: alias
            }
            if (!history.includes(data)) {
                setHistory([...history, data])
            }
        })
    }
    const ResultArea = () => {
        if (history.length <= 0) {
            return <></>
        }
        return (
            <>
                <table className={"table table-hover align-middle"}>
                    <thead>
                    <tr>
                        <th>URL</th>
                        <th>エイリアス</th>
                        <th>コピー</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        history.map(h =>
                            <tr key={h.url}>
                                <td className={"text-break"}>{h.url}</td>
                                <td>{h.alias}</td>
                                <td>
                                    <button className={`ms-2 btn btn-outline-primary text-nowrap`}>コピー</button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </>
        )
    }
    return (
        <>
            <div className="d-flex">
                <input type="text" name="text" id="url"
                       placeholder="URL" className="form-control" onChange={(e) => handleInput(e)}/>
                <button className={`ms-2 btn btn-primary ${getDisabledClass()} text-nowrap`}
                        onClick={() => onSubmit()}>短縮する
                </button>
            </div>
            <ResultArea/>
        </>
    )
}


root.render(<App/>);