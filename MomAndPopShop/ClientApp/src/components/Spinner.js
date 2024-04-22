import { useState } from 'react';
import DotLoader from "react-spinners/DotLoader";


export const Spinner = () => {
    const [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#000");

    return (
        <div className="sweet-loading" >
            
            <DotLoader color={color} loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" />
        </div>
    );
};
export default Spinner;