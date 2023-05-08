const GetStructFundLabel = (value) => {
    return value === 'cvcc' ? 'Company / Variable Capital Company' : value === 'lp' ? 'Limited Partnership' : value === 't' ? 'Trust' : value === 'ma' ? 'Managed Account' : value === 'ov' ? 'Other Vehicles' : 'Error';
}

export default GetStructFundLabel;