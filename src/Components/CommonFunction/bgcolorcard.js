import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import DraftsIcon from '@mui/icons-material/Drafts';
import ArchiveIcon from '@mui/icons-material/Archive';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
import EscalatorIcon from '@mui/icons-material/Escalator';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, Col, Row } from 'antd';
import BgColorForAppStatus from './bgcolor';
const CustomBgColorCard = ({ c }) => {
    return (
        <Card bordered={true} className="criclebox" style={{
            backgroundColor: BgColorForAppStatus(c._id.appStatus),
            color: '#ffffff',
            textAlign: 'center',
        }}>
            <div className="number" >
                <Row align="middle" gutter={[10, 0]}>
                    <Col className='card-content-container' xs={3}>
                        <div className='card-title-container'>
                            <div className='card-icon-container'>{c._id.appStatus === 'Draft' ? <DraftsIcon /> : c._id.appStatus === 'Open' ? <FileOpenIcon /> : c._id.appStatus === 'Re-Assign' ? <AssignmentIndIcon /> : c._id.appStatus === 'Escalated' ? <EscalatorIcon /> : c._id.appStatus === 'Temp CFF' ? < DeleteIcon /> : c._id.appStatus === 'CFF' ? < RuleFolderIcon /> : <ArchiveIcon />}</div>
                            <div className="icon-box">{c._id.appStatus}</div>
                        </div>
                        <div className='box-line'><hr></hr></div>
                        <div>{c.count}</div>
                    </Col>
                </Row>
            </div>
        </Card>);
}

export default CustomBgColorCard;