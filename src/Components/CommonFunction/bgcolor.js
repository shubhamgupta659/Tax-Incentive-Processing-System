const BgColorForAppStatus = (appStatus) => {
    return appStatus === 'Submitted'
        ? '#FFC107'
        : appStatus === 'Draft'
            ? '#8D6E63'
            : appStatus === 'Pending'
                ? '#FF7043'
                : appStatus === 'LOA Ack'
                    ? '#7CB342'
                    : appStatus === 'OIC Released'
                        ? '#4DB6AC'
                        : appStatus === 'FI Clarify'
                            ? '#E53935'
                            : appStatus === 'FI Clarified'
                                ? '#00BCD4'
                                : appStatus === 'OIC Approved'
                                    ? '#4DB6AC'
                                    : appStatus === 'LOA Generated'
                                        ? '#E91E63'
                                        : appStatus === 'LOA Released'
                                            ? '#9C27B0'
                                            : appStatus === 'Mgmt Approved'
                                                ? '#3949AB'
                                                : appStatus === 'LOA Approved'
                                                    ? '#1B5E20'
                                                    : '#757575';
}

export default BgColorForAppStatus;