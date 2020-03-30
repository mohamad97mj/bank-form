import React from 'react';

import styles from './Toolbar.module.css';
import './Toolbar.css';
import Nav from "react-bootstrap/Nav";
import Logo from '../../Logo/Loog';
import Aux from '../../../hoc/Aux/Aux';
import Auth from "../../../containers/Forms/Auth/Auth";
import {NavLink} from "react-router-dom";

const toolbar = (props) => (

    <header>
        <div className={styles.Toolbar}>

            <Nav>
                <Nav.Item>
                    <Nav.Link exact as={NavLink} to="/">
                        <Logo/>
                    </Nav.Link>
                </Nav.Item>

                {!props.isAuth ?

                    <Aux>


                        <Nav.Item>
                            <Nav.Link exact as={NavLink} to="/">
                                صفحه نخست

                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link exact as={NavLink} to="/login">
                                ورود
                            </Nav.Link>
                        </Nav.Item>


                        <Nav.Item>
                            <Nav.Link exact as={NavLink} to="/about" disabled>
                                درباره ما
                            </Nav.Link>
                        </Nav.Item>
                    </Aux> :

                    <Aux>

                        {/*<Nav.Item>*/}
                        {/*    < Nav.Link exact as={NavLink} to="/profile">*/}
                        {/*        پروفایل*/}
                        {/*    </Nav.Link>*/}
                        {/*</Nav.Item>*/}

                        <Nav.Item>
                            < Nav.Link exact as={NavLink} to="/form">
                                فرم
                            </Nav.Link>
                        </Nav.Item>


                        <Nav.Item>
                            <Nav.Link exact as={NavLink} to="/logout">
                                خروج
                            </Nav.Link>
                        </Nav.Item>
                    </Aux>
                }

            </Nav>
        </div>
    </header>
);

{/*<Nav.Item>*/
}
{/*    <Nav.Link eventKey="3" href="/signin">*/
}
{/*        ثبت نام*/
}
{/*    </Nav.Link>*/
}
{/*</Nav.Item>*/
}

export default toolbar;