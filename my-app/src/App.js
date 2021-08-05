import React, {Component,Fragment} from 'react';
import Menubar from "./components/Menubar";
import Homepage from "./pages/Homepage";
import {HashRouter} from "react-router-dom";
import AppRouting from "./Routing/AppRouting";

class App extends Component {
    render() {
        return (
            <Fragment>
               <HashRouter>
                   <AppRouting/>
               </HashRouter>
            </Fragment>
        );
    }
}

export default App;