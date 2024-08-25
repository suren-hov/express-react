import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000')
            .then(res => res.json())
            .then(data => setMessage(data.message));
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    {message}
                </p>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;