const root = ReactDOM.createRoot(document.getElementById('app'));

const App = () =>
    <>
        <form action="/" method="post">
            <div className="d-flex">
                <input type="text" name="text" id="url" placeholder="URL" className="form-control"/>
                <button className="ms-2 btn btn-primary disabled text-nowrap">短縮する</button>
            </div>
        </form>
    </>


root.render(<App />);