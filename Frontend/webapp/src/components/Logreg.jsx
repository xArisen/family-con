import React from 'react'
import Login from './Login'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Register from './Register';

function Logreg(props) {
    const { setToken } = props;
    return (
        <Tabs>
            <TabList>
                <Tab>Logowanie</Tab>
                <Tab>Rejestracja</Tab>
            </TabList>

            <TabPanel>
                <Login setToken={setToken} />
            </TabPanel>
            <TabPanel>
                <Register></Register>
            </TabPanel>
        </Tabs>
    )
}

export default Logreg
