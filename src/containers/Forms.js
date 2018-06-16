import React from "react"
import {Route, Switch, Link} from 'react-router-dom';

import SingUpForm from "../components/SingUpForm";
import NewCompanyForm from "../components/NewCompanyForm";
import SignInForm from "../components/SignInForm";
import SignUpCompleteForm from "../components/SignUpCompleteForm";

import {hot} from "react-hot-loader";

import {Row, Col, Layout} from 'antd';

const {Header, Content} = Layout;


const App = () => (
    <Row type="flex" justify="center">
        <Col span={20}>
            <Header style={{background: 'white'}}>
                <Link to={"/"}>
                    Konnex
                </Link>
            </Header>
            <Content>
                <Switch>
                    <Route exact path="/" component={SignInForm}/>
                    <Route exact path="/createnewcompany" component={NewCompanyForm}/>
                    <Route exact path="/signup" component={SingUpForm}/>
                    <Route exact path="/signupcomplete" component={SignUpCompleteForm}/>
                </Switch>
            </Content>
            <div>
                <Link to={"/"}>Авторизация</Link>
                <br/>
                <Link to={"/signup?"}>Регистрация</Link>
                <br/>
                <Link to={"/signupcomplete?username=11"}>Подтверждение регистрации</Link>
                <br/>
                <Link to={"/createnewcompany"}>Создать Команию</Link>
            </div>
        </Col>
    </Row>
);


export default hot(module)((
    App)
);