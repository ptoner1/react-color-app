import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import './ColorBox.css';

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCopied: false
        }
        this.handleCopy = this.handleCopy.bind(this);
    }

    handleCopy() {
        this.setState({ isCopied: true }, () => {
            setTimeout(() => this.setState({ isCopied: false }), 1200)
        })
    }

    render() {
        const { name, background, paletteId, id, emoji, paletteName, height } = this.props;

        const isLight = chroma(background).luminance() >= 0.6;
        const isDark = chroma(background).luminance() < 0.09;

        const moreButton = (
            <Link to={`/palette/${paletteId}/${id}`} state={{ id, paletteId, name, emoji, paletteName, color: background }}>
                <span className={`see-more ${isLight && 'dark-text'}`}>More</span>
            </Link>
        )
        return (
            <CopyToClipboard text={background} onCopy={this.handleCopy}>
                <div className='ColorBox' style={{ background, height }} >
                    <div
                        style={{ background }}
                        className={`copy-overlay ${this.state.isCopied && 'show'}`}
                    />
                    <div className={`
                    copy-msg 
                    ${this.state.isCopied && 'show'} 
                    ${isDark && 'light-text'}
                    `} >
                        <h1>Copied!</h1>
                        <p>{background}</p>
                    </div>
                    <div className='copy-container'>
                        <div className='box-content'>
                            <span className={isDark && 'light-text'}>{name}</span>
                        </div>
                        <button className={`copy-button ${isLight && 'dark-text'}`}>
                            Copy
                        </button>
                    </div>
                    {!height ? moreButton : ''}
                </div>
            </CopyToClipboard >
        )
    }
}

export default ColorBox