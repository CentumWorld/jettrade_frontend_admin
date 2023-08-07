import React from 'react'
import { Progress } from 'antd';
import '../css/RunningProgressiveBar.css'

const ExpireProgressiveBar = ({percent}) => {
    const progressColor ='#FF0000';
    return (
        <>
            <div className='progress-container'>
                <div style={{ textAlign: 'center', fontWeight: '500' }}>
                    <p>Expired stage</p>
                    <p>25/100 Traders</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Progress  type="circle" strokeColor={progressColor} percent={percent} width={80} format={() => <span style={{ color:'#fff' }}>{`${percent}%`}</span>} />
                </div>
            </div>
        </>
    )
}

export default ExpireProgressiveBar
