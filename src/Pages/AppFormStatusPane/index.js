import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row, Collapse } from 'antd';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../AuthContext';
import CustomBgColorCard from '../../Components/CommonFunction/bgcolorcard';
const { Panel } = Collapse;

function AppFormStatusPane({ parentData, stage }) {
    const { accessToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [postResult, setPostResult] = useState([]);
    async function fetchStatusCount() {
        let msg = JSON.stringify({
            "dataSource": "Singapore-free-cluster",
            "database": "tipsWorkflow",
            "collection": "applications",
            "pipeline": [
                {
                    "$group": {
                        "_id": {
                            "appStatus": "$appStatus",
                            "appStatusId": "$appStatusId"
                        },
                        "count": { "$sum": 1 },
                    }
                },
                { "$sort": { "_id.appStatusId": 1 } }
            ],

        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-gqwih/endpoint/data/v1/action/aggregate',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
            },
            data: msg
        };

        await axios.request(config)
            .then((response) => {
                setPostResult(response.data.documents);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        if (parentData) {
            fetchStatusCount();
        }
    }, parentData);

    const onCardClick = (item) => {
        navigate(`/${stage}`);
    };

    return (
        <div className='status-main-container'>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Application Status Count" key="1">
                    <Row className="rowgap-vbox" gutter={[15]}>
                        {postResult.filter(o => {
                            if (stage === 'fiDash' && (o._id.appStatus === 'Submitted' || o._id.appStatus === 'FI Clarify' || o._id.appStatus === 'FI Clarified' || o._id.appStatus === 'OIC Released' || o._id.appStatus === 'Draft' || o._id.appStatus === 'Pending' || o._id.appStatus === 'LOA Released' || o._id.appStatus === 'LOA Ack')) {
                                return o;
                            } else if (stage === 'oicDash' && (o._id.appStatus === 'Submitted' || o._id.appStatus === 'FI Clarify' || o._id.appStatus === 'FI Clarified' || o._id.appStatus === 'OIC Released' || o._id.appStatus === 'Pending' || o._id.appStatus === 'Mgmt Approved' || o._id.appStatus === 'OIC Approved' || o._id.appStatus === 'LOA Generated' || o._id.appStatus === 'LOA Released' || o._id.appStatus === 'LOA Approved' || o._id.appStatus === 'LOA Ack')) {
                                return o;
                            } else if (stage === 'mgmtDash' && (o._id.appStatus === 'OIC Approved' || o._id.appStatus === 'Mgmt Approved' || o._id.appStatus === 'LOA Generated' || o._id.appStatus === 'LOA Approved' || o._id.appStatus === 'LOA Ack')) {
                                return o;
                            }
                        }).map((c, index) => (
                            <Col
                                key={index}
                                xs={2}
                                className="mb-24"
                                onClick={() => onCardClick(c)}
                            >
                                <CustomBgColorCard c={c} />
                            </Col>
                        ))}
                    </Row>
                </Panel>
            </Collapse>
        </div >);

}

export default AppFormStatusPane;