var ranStr = ["wqewr", "bijcxzvc", "nhjidsbagv", "bigsadyfu"];
/*exports.getRanStr = function () {
    var str = ranStr[Math.floor(Math.random() * ranStr.length)]
    return str
}*/
function getRanStr() {
    var str = ranStr[Math.floor(Math.random() * ranStr.length)];
    return str;
}
exports.getRanStr = getRanStr;