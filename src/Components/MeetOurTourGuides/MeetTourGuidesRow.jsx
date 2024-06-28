import PropTypes from 'prop-types'

const MeetTourGuidesRow = ({ tourGuide, index, refetch }) => {
    refetch();
    return (
      <tr>
            <th>{ index + 1 }</th>
            <td>{ tourGuide?.name }</td>
            <td>{ tourGuide?.email }</td>
            <td>{ tourGuide?.status }</td>
      </tr>
    );
};


MeetTourGuidesRow.propTypes = {
  tourGuide: PropTypes.object,
  index: PropTypes.number,
  refetch: PropTypes.func
}
export default MeetTourGuidesRow;