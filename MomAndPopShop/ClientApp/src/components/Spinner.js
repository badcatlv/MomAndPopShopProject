import { useState } from 'react';
import DotLoader from "react-spinners/DotLoader";

export const Spinner = () => {
    const [loading, setLoading] = useState(true);
    let [color, setColor] = useState("pink");
    const override = ` display: block; margin: 0 auto; border-color: red;`

    return ( 
        loading ? 
        <div className="sweet-loading" >
            
                <DotLoader color={color} loading={loading} css={override} size={150} aria-label="Loading Spinner" data-testid="loader" />
        </div> : null
    );
};
export default Spinner;