const GetAppStatusId = (appStatus) => {
    return appStatus === 'Submitted' ? 1 : appStatus === 'Draft' ? 2 : appStatus === 'Pending' ? 3 : appStatus === 'FI Clarified' ? 4 : appStatus === 'LOA Ack' ? 5 : appStatus === 'OIC Released' ? 6 : appStatus === 'FI Clarify' ? 7 : appStatus === 'OIC Approved' ? 8 : appStatus === 'LOA Generated' ? 9 : appStatus === 'LOA Released' ? 10 : appStatus === 'Mgmt Approved' ? 11 : appStatus === 'LOA Approved' ? 12 : 13;
}

export default GetAppStatusId;