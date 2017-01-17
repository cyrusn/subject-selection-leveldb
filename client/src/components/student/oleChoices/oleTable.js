// import React, { Component } from 'react';
// import State from '../../../state';
// import Ole from './ole';

// export default class OleTable extends Component {
//   render () {
//     const {oles} = State.get().subjectPriority;
//     return (
//       <table className='table'>
//         <tbody>
//         <tr>
//           <th>年級</th>
//           <th>必修科</th>
//           <th>選修科目 (請排次序)</th>
//         </tr>
//         <tr>
//           <td>中四及中五</td>
//           <td>宗教<br />生涯規劃</td>
//           <td>
//             <ul className='list-group list-unstyled'>
//               {oles.map((ole, index) => {
//                 return <Ole key={index} ole={{id: ole, index}} />;
//               })}
//             </ul>
//           </td>
//         </tr>
//         </tbody>
//       </table>
//     );
//   }
// }
