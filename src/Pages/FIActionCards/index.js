import React from 'react';
import { Button, Row, Collapse } from 'antd';
import { useNavigate } from "react-router-dom";


function FIActionCards(props) {
    const { Panel } = Collapse;
    console.log(props.active);
    const navItems = [
        {
            label: "Apply New Incentive",
            key: "applyNewIncentive",
            id: 1,
        },
        {
            label: "Submit ARR",
            key: "submitArr",
            id: 2,
        },
        {
            label: "Renew Award",
            key: "renewAward",
            id: 3,
        },
        {
            label: "Notify Changes",
            key: "notifyChanges",
            id: 4,
        },
        {
            label: "Terminate Award",
            key: "saoc",
            id: 5,
        },
    ];

    const navigate = useNavigate();
    const onNavClick = (item) => {
        if (item.key === 'applyNewIncentive') {
            navigate(`/preAppForm/${props.parentData === null ? 1 : props.parentData.length + 1}`);
        } else {

        }
    };
    return (
        <div className='status-main-container'>
            <Row className="fi-action-container" gutter={[15]}>
                {navItems.map((c, index) => (
                    <Button onClick={() => onNavClick(c)} type="primary">{c.label}</Button>
                ))}
            </Row>
        </div >
    );
}

export default FIActionCards;