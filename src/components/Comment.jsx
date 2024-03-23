// export default function Comment(props) {
//   const { name, message, time } = props.comment;

//   return (
//     <div className="media mb-3">
//       <div className="media-body p-2 shadow-sm rounded bg-light border">
//         <small className="float-right text-muted">{time}</small>
//         <h6 className="mt-0 mb-1 text-muted">{name}</h6>
//         {message}
//       </div>
//     </div>
//   );
// }

export default function Comment({ name, message, time }) {
  return (
    <div className="media mb-3">
      <div className="media-body p-2 shadow-sm rounded bg-gray-900 border">
        <small className="float-right text-gray-500">{time}</small>
        <h6 className="mt-0 mb-1 text-gray-500">{name}</h6>
        {message}
      </div>
    </div>
  );
}
