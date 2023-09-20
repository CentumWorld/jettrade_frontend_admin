// 
import React from 'react';
import { Progress } from 'antd';
import '../css/RunningProgressiveBar.css';

const TrialProgressiveBar = ({ percent }) => {
  const progressColor = '#F6BE00';

  const getFormattedPercentage = () => {
    if (isNaN(percent.trialPercentage)) {
      return '0%';
    } else {
      return `${percent.trialPercentage}%`;
    }
  };

  return (
    <>
      <div className='progress-container'>
        <div style={{ textAlign: 'center', fontWeight: '500' }}>
          <p>Trial stage</p>
          <p>{percent.trialCount}/{percent.totalCount} Traders</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Progress
            type="circle"
            strokeColor={progressColor}
            percent={percent.trialPercentage}
            width={80}
            format={() => <span style={{ color: '#fff' }}>{getFormattedPercentage()}</span>}
          />
        </div>
      </div>
    </>
  );
};

export default TrialProgressiveBar;
