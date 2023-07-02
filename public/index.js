const root = ReactDOM.createRoot(document.getElementById('app'));

const App = () => {
    const [disabled, setDisabled] = React.useState(true)
    const getDisabledClass = () => disabled ? 'disabled' : ''
    const handleInput = (e) => {
        const text = e.target.value
        setDisabled(!(text.startsWith('http://') || text.startsWith('https://')))
    }
    return (
        <>
            <form action="/" method="post">
                <div className="d-flex">
                    <input type="text" name="text" id="url"
                           placeholder="URL" className="form-control" onChange={(e) => handleInput(e)}/>
                    <button className={`ms-2 btn btn-primary ${getDisabledClass()} text-nowrap`}>短縮する</button>
                </div>
            </form>
        </>
    )
}


root.render(<App/>);