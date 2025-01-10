import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {exampleService} from "src/example/serviceCenter/example/exampleModel";
import {useReset, useSubscribe} from "@react-model";
import {subType} from "src/example/serviceCenter/subType";
import {storageModel, storageService} from "src/example/serviceCenter/storage/storageModel";

const Header = () => {
  return (
    <ul>
      <li>
        <Link to="/">home</Link>
      </li>
      <li>
        <Link to="/login">login</Link>
      </li>
    </ul>
  );
}

const Home = () => {
  return <div>
    <h1>Home</h1>
  </div>
}

const Login = () => {
  console.log('RENDER Login')

  const [ResetContext, reset] = useReset()
  useSubscribe(subType.RENDER_SEARCH_CONTROL, ({data}) => {
    if (data === 'SUBMIT') reset()
  })

  return <div>
    <h1>Login</h1>
    <ResetContext>
      <input type="text" placeholder={'name'} defaultValue={storageModel.nickname} onChange={ev => storageService.setStorage('nickname', ev.target.value)} />
      <input type="text" placeholder={'account(aaa)'} onChange={ev => exampleService.onValueChange('account', ev.target.value)}/>
      <input type="password" placeholder={'password(bbb)'} onChange={ev => exampleService.onValueChange('password', ev.target.value)} onKeyDown={ev => ev.key === 'Enter' && exampleService.onSubmit()}/>
    </ResetContext>
    <button onClick={exampleService.onSubmit}>submit</button>
  </div>
}

const App = () => {
  return (
    <Router>
      <Header/>
      <Route path="/" exact={true} component={Home}/>
      <Route path="/login" exact={true} component={Login}/>
    </Router>
  );
}

export default App;
