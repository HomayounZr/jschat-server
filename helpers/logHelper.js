const logError = (path, message) => {
    console.log(
        `ERROR OCCURED\n
        PATH: ${path}\n
        MESSAGE: ${message}\n`
    );
}

module.exports = {
    logError,
}