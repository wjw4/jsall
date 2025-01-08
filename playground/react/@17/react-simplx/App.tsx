import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Header} from "./src/component/Header";
import {CacheBody} from "./src/view/CacheBody";
import {CardList} from "./src/view/CardList";
import {Watcher} from "./src/view/Watcher";

function App() {
  console.log(`Component: <App /> 刷新`)
  return <main>
    <BrowserRouter>
      <Header/>
      <main>
        <Switch>
          <Route exact path="/">
            <CardList />
          </Route>
          <Route exact path="/cache-body">
            <CacheBody />
          </Route>
          <Route exact path="/watcher">
            <Watcher />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  </main>
}


ReactDOM.render(
  <App/>,
  document.getElementById('root'),
)
