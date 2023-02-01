import React, { Component } from 'react';
import './Home.css';
import PaletteList from './PaletteList';

class Home extends Component {

    render() {
        const paletteList = () => {
            this.props.palettes.map(pal => {

            })
        }
        return (
            <div className='home'>

            </div>
        )
    }
}

export default Home