// import React from 'react'
// import { Progress } from 'antd';
// import '../css/RunningProgressiveBar.css'

// const RunningProgressiveBar = ({ percent }) => {
//     const progressColor = '#00FF00'
//     return (
//         <>
//             <div className='progress-container'>
//                 <div style={{ textAlign: 'center', fontWeight: '500' }}>
//                     <p>Runing stage</p>
//                     <p>{percent.runningCount}/{percent.totalCount} Traders</p>
//                 </div>
//                 <div style={{ textAlign: 'center' }}>
//                     <Progress  type="circle" strokeColor={progressColor} percent={percent.runnigPercentage} width={80} format={() => <span style={{ color:'#fff' }}>{`${percent.runnigPercentage}%`}</span>} />
//                 </div>
//             </div>
//         </>
//     )
// }

// export default RunningProgressiveBar
import React from 'react';
import { Progress } from 'antd';
import '../css/RunningProgressiveBar.css';

const RunningProgressiveBar = ({ percent }) => {
  const progressColor = '#00FF00';

  const getFormattedPercentage = () => {
    if (isNaN(percent.runnigPercentage)) {
      return '0%';
    } else {
      return `${percent.runnigPercentage}%`;
    }
  };

  return (
    <>
      <div className='progress-container'>
        <div style={{ textAlign: 'center', fontWeight: '500' }}>
          <p>Running stage</p>
          <p>{percent.runningCount}/{percent.totalCount} Traders</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Progress
            type="circle"
            strokeColor={progressColor}
            percent={percent.runnigPercentage}
            width={80}
            format={() => <span style={{ color: '#fff' }}>{getFormattedPercentage()}</span>}
          />
        </div>
      </div>
    </>
  );
};

export default RunningProgressiveBar;
