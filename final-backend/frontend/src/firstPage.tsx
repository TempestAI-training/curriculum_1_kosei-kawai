import React from 'react';

interface Props {
    onGo: () => void;
}
const FirstPage = ({onGo}:Props) => {
    return(
        <div className="container">
            <h1>早苗さんの政策について学ぼう！</h1>
            <p>任意のお問い合わせに対して早苗さんの考えを返答します。</p>
            <button onClick={onGo}>チャットを始める</button>
        </div>
    )
}
export default FirstPage;