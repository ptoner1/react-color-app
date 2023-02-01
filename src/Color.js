import React, { Component } from 'react';
import Navbar from './Navbar';
import './Color.css';
import { generateColor } from './colorHelpers';
import ColorBox from './Colorbox';
import { Link } from 'react-router-dom';

class Color extends Component {

    constructor(props) {
        super(props);
        this.state = {
            format: 'hex'
        }
        this.changeFormat = this.changeFormat.bind(this)
    }

    changeFormat(format) {
        this.setState({ format })
    }

    render() {
        const { emoji, id, name, paletteName, paletteId } = this.props.location.state;
        let color = this.props.location.state;
        let attributedColor = generateColor(color);
        const colorBoxes = attributedColor.map(color => (
            <ColorBox
                background={color[this.state.format]}
                name={color.name}
                key={color.name}
                height='50%'
            />
        ))
        const backBox =
            (
                <Link to={`/palette/${paletteId}`}>
                    <div className='back-box'>
                        <button className='back-button'>
                            Go Back
                        </button>
                    </div>
                </Link>
            )
        return (
            <div className='Color'>
                <Navbar
                    handleChange={this.changeFormat}
                />
                <div className='Color-boxes'>{colorBoxes}{backBox}</div>
                <footer className='Color-footer'>
                    {paletteName}
                    <span className='emoji'>{emoji}</span>
                </footer>
            </div>
        )
    }
}

export default Color