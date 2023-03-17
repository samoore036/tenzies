import React from 'react';

export default function DotDiv(props) {
    return(
        <div className={`dot-${props.className}`}>•</div>
    )
}