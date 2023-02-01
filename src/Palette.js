import React, { Component } from 'react';
import ColorBox from './Colorbox';
import './Palette.css';
import Navbar from './Navbar';

import { generatePalette } from './colorHelpers';

class Palette extends Component {

    constructor(props) {
        super(props);
        this.state = {
            level: 400,
            format: 'hex'
        }
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeLevel(level) {
        this.setState({ level })
    }

    changeFormat(val) {
        this.setState({ format: val })
    }


    render() {
        const palettes = Object.values(this.props)
        const paletteId = this.props.location.pathname.slice('/palette/'.length);
        const [rawPalette] = palettes.filter(pal => pal.id === paletteId);
        const palette = generatePalette(rawPalette);
        const { colors, paletteName, emoji } = palette;
        const { level, format } = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox
                background={color[format]}
                name={color.name}
                key={color.id}
                id={color.id}
                paletteId={paletteId}
                paletteName={paletteName}
                emoji={emoji}
            />
        ))
        return (
            <div className='Palette'>
                <Navbar
                    level={level}
                    changeLevel={this.changeLevel}
                    handleChange={this.changeFormat}
                    isPaletteNav={true}
                />
                <div className='Palette-colors'>{colorBoxes}</div>
                <footer className='Palette-footer'>
                    {paletteName}
                    <span className='emoji'>{emoji}</span>
                </footer>
            </div >
        )
    }
}

export default Palette