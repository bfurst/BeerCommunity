import React from 'react';
import { Dropdown } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <button
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        style={{ border: 'none', backgroundColor: 'transparent', padding: 0 }}
    >
        <Icon.ThreeDotsVertical size={24} color="white" />
    </button>
));

export default CustomToggle;
