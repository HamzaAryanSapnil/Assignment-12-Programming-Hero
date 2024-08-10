import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import CommonBtn from "../../../Components/Buttons/CommonBtn";
import { Link } from "react-router-dom";
const MyBookingsRow = ({ index, payment, handleDelete }) => {
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
        <p
          className={
            payment?.status === "pending"
              ? "text-orange-500"
              : payment?.status === "approved"
              ? "text-green-500"
              : "text-red-500"
          }
        >
          {payment?.status}
        </p>
      </td>
      <th
        className="tooltip"
        data-tip="Delete"
      >
        <button
          onClick={() => handleDelete(payment?._id)}
          className="btn btn-ghost "
        >
          {" "}
          <FaTrash className="text-red-500" />{" "}
        </button>
      </th>
      <td>
        <button
          disabled={payment?.status !== "approved"}
          className="btn btn-outline rounded-full font-libre-franklin  font-medium  text-vdo-btn "
        >
          {" "}
          <Link to={`/tourist_story/${payment?._id}`}>Share Your Story </Link>
        </button>
      </td>
    </tr>
  );
};

MyBookingsRow.propTypes = {
  index: PropTypes.number,
  payment: PropTypes.object,
  handleDelete: PropTypes.func,
};
export default MyBookingsRow;
