import React from 'react';
import Navigation from './Navigation';
import { DataSource } from './Data';

const App = () => {
    return (
        <DataSource>
            <Navigation />
        </DataSource>
    );
};

export default App;