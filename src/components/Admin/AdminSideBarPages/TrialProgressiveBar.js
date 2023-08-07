import React from 'react'
import { Progress } from 'antd';
import '../css/RunningProgressiveBar.css'
const TrialProgressiveBar = ({percent}) => {
    const progressColor = '#F6BE00'
    return (
        <>
            <div className='progress-container'>
                <div style={{ textAlign: 'center', fontWeight: '500' }}>
                    <p>Trial stage</p>
                    <p>25/100 Traders</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Progress  type="circle" strokeColor={progressColor} percent={percent} width={80} format={() => <span style={{ color:'#fff' }}>{`${percent}%`}</span>} />
                </div>
            </div>
        </>
    )
}

export default TrialProgressiveBar
