const GetIncentiveTypeLabel = (value) => {
    return value === 'nmf' ? 'Non-Master Feeder' : value === 'ma' ? 'Managed Account' : value === 'mf' ? 'Master Feeder' : value === 'mspv' ? 'Master - Special Purpose Vehicle' : value === 'mfspv' ? 'Master Feeder - SPV' : 'Error';
}

export default GetIncentiveTypeLabel;