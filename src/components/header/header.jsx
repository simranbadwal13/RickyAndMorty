import React, { Component } from 'react';
import { logo } from '../../image';
import './style.less';

export class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="img-container">
                    <img src={logo} alt='Ricky' className="morty-image img-fluid" />
                </div>
            </header>
        )
    }
}
