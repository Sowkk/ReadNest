import { FiArrowLeftCircle } from 'react-icons/fi'; // Import the desired icon
import {Link} from 'react-router-dom'
const BackButton = ({destination= '/'}) => {
  return (
    <div className=''>
        <Link to={destination}
        className='text-sky-800 hover:text-sky-600' >
        <FiArrowLeftCircle className="text-2xl cursor-pointer"/>

        </Link>
    </div>
  )
}

export default BackButton