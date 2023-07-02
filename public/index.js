const root = ReactDOM.createRoot(document.getElementById('app'));

const App = () => {
    const [text, setText] = React.useState('')
    const isDisabled = !(text.startsWith('http://') || text.startsWith('https://'))
    const getDisabledClass = () => isDisabled ? 'disabled' : ''
    const handleInput = (e) => setText(e.target.value)
    const onSubmit = () => {
        console.log('post')
        axios.post('/', {
            text: text
        }).then((r) => {
            console.log(r)
        })
    }
    return (
        <>
            <form action="/" method="post">
                <div className="d-flex">
                    <input type="text" name="text" id="url"
                           placeholder="URL" className="form-control" onChange={(e) => handleInput(e)}/>
                    <button className={`ms-2 btn btn-primary ${getDisabledClass()} text-nowrap`}
                            onClick={() => onSubmit()}>短縮する
                    </button>
                </div>
            </form>
        </>
    )
}


root.render(<App/>);