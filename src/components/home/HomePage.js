import React from 'react';
import {Link} from 'react-router-dom';
import { Button, Radio, Icon } from 'antd';

class HomePage extends React.Component{
    state = {
        size: 'large',
    };
    
    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }
    render() {
        const size = this.state.size;
        return (
            <div class="body-bg">
                <div className="container">
                    <div className="row">
                        <div className="home-fluid">
                            <h1>Yummy recipes</h1>
                            <p>Keep track of your recipes and interesting ones to findout.</p>
                            <Link to="/ManageRegistrationPage">
                                <Button type="primary" icon="play-circle" size={size} className="button-border">
                                    Get started
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;