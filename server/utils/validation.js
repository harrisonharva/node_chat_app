var isRealString = (str) => {
    return typeof str === 'string' && str.trim(str).length > 0;
};

module.exports = {isRealString};
