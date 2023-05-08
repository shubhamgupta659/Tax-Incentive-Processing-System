import React from 'react';
import { Card, Col, Row, Collapse } from 'antd';
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
            <Row className="rowgap-vbox" gutter={[15]}>
                {navItems.map((c, index) => (
                    <Col
                        key={index}
                        xl={2}
                        className="mb-23"
                        onClick={() => onNavClick(c)}
                    >
                        <Card bordered={true} className="fiactionbox">
                            <div className="number" >
                                <Row align="middle" gutter={[10, 0]}>
                                    <Col className='card-content-container' xs={3}>
                                        <div className="icon-box">{c.label}</div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div >
    );
}

export default FIActionCards;