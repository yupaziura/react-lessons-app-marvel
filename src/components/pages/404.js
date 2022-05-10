import { Link } from "react-router-dom";

import ErrorMessage from "../errorMessage/error";


const NotFoundPage = () => {
    return (
        <div>
            <ErrorMessage/>
            <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '24px'}}>
                Page does not exist
            </p>
            <Link style={{display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginTop: 30}} to='/'>
                Back to main page
            </Link>
        </div>
    )
}

export default NotFoundPage;