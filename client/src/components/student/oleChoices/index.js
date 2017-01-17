// import React, {Component} from 'react';
// import State from '../../../state';
// import OleTable from './oleTable';
// import ComfirmedText from '../letter/confirmedText';
// import LetterHead from '../letter/letterHead';

// class OleChoices extends Component {
//   render () {
//     const {isAdmin} = State.get().info;
//     const {oles, isConfirmed} = State.get().subjectPriority;
//     return (
//       (!isAdmin && oles)
//       ? <div>
//           <div className='visible-print-block'>
//             <LetterHead />
//           </div>
//           <div className='container'>
//             <h1>乙部：其他學習經歷科目</h1>
//             { (isConfirmed)
//               ? <ComfirmedText />
//               : <div />
//             }
//             <div className='panel panel-warning'>
//               <div className='panel-heading'>
//                 <h3 className='text-warning'>其他學習經歷項目{' '}
//                   <small className='text-warning hidden-print'>
//                   （請按優次將其他學習經驗意願排序。）
//                   </small>
//                 </h3>
//               </div>
//               <div className='panel-body'>
//                 <p>同學於中四及中五兩個學年必須修讀宗教科及生涯規劃科，其中一個學期可選讀其他科目。請同學按優次排列有意選讀之科目。</p>
//                 <OleTable />
//               </div>
//             </div>
//           </div>
//           <div className='page-header hidden-print' />
//         </div>
//       : null
//     );
//   }
// }

// export default OleChoices;
