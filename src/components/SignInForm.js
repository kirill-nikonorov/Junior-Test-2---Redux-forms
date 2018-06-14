import React from "react";
import {bindActionCreators, compose} from "redux"
import {connect} from "react-redux";
import {hot} from "react-hot-loader";
import namespace from "../containers/namespace"
import * as ActionsCreators from "../actions/actions"
import {Field, reduxForm} from "redux-form"
import axios from "axios";
import {Form, Icon, Input, Button, Select} from 'antd';
import 'antd/dist/antd.css';
import qs from 'qs';

const FormItem = Form.Item;


class UserForm extends React.Component {
    constructor(props) {
        super(props);

        const {actions} = this.props;

        this.state = {
            actions
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderField = this.renderField.bind(this);
        this.authorize = this.authorize.bind(this);
        this.handleSuccessAuthorization = this.handleSuccessAuthorization.bind(this);

    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.authorize(values);
            }
        });
    };

    authorize({Email: username, Password: password}) {

        const {actions} = this.props;

        const data = {
            username,
            password,
        };

        console.log(data);

        actions.authUser(data, this.handleSuccessAuthorization)
    }

    handleSuccessAuthorization() {
        const {history} = this.props;
        history.push("/");
        console.log("SUCCESS AUTHORIZATION")
    }

    renderField({
                    input,
                    input: {name},
                    meta,
                    formItemLayout,
                    type
                }) {
        delete input.value;

        const {getFieldDecorator} = this.props.form;
        return (
            <FormItem
                {...meta}
                {...formItemLayout}
            >
                {getFieldDecorator(`${name}`, {
                    rules: [{required: true, message: `Require`}]
                })(
                    <Input
                        {...input}
                        placeholder={name}
                        autoComplete="off"
                        type={type}
                    />
                )
                }
            </FormItem>
        )
    }

    render() {
        const formItemLayout = {
            style: {width: 150}
        };

        return (
            <div>
                <Form layout="vertical" onSubmit={this.handleSubmit}>

                    <Field name="Email"
                           component={this.renderField}
                           formItemLayout={formItemLayout}
                           type="text"
                    />
                    <Field name="Password"
                           component={this.renderField}
                           formItemLayout={formItemLayout}
                           type="password"
                    />

                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Log In
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(ActionsCreators, dispatch)
    }
};

export default compose(
    hot(module),
    connect(null, mapDispatchToProps),
    namespace("reduxForm", reduxForm({form: "CompanyForm"})),
    Form.create(),
)
(UserForm)



