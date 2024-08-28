import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:3024')
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
            </header>
        </div>
    );
}

export default App;