
import PropTypes from 'prop-types'
import {  FaTrash } from 'react-icons/fa';
const MyBookingsRow = ({ index, payment }) => {
    const { date } = payment;
    const givenDate = new Date(date).toLocaleDateString();
    
    return (
      <tr key={payment._id}>
        <th>
          <label>
            <input
              type="number"
              value={index + 1}
            />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={
                    payment?.image
                      ? payment?.image
                      : "https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                  }
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{payment?.title}</div>
              <div className="text-sm opacity-50">
                {" "}
                Tour Guide: {payment?.tourGuideName}{" "}
              </div>
            </div>
          </div>
        </td>
        <td>
          {payment?.price} tk
          <br />
          <span className="badge badge-ghost badge-sm">{givenDate}</span>
        </td>
        <td>
          <p className="font-bold text-orange-400"  >{payment?.status}</p>
        </td>
        <th
          className="tooltip"
          data-tip="Delete"
        >
          <button className="btn btn-ghost ">
            {" "}
            <FaTrash className="text-red-500" />{" "}
          </button>
        </th>
      </tr>
    );
};

MyBookingsRow.propTypes = {
  index: PropTypes.number,
  payment: PropTypes.object
}
export default MyBookingsRow;