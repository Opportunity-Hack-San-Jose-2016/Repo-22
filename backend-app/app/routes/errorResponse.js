module.exports = function errorResponse(errorMessage, status) {
	var message = {
		error: {
			message: errorMessage,
			status: status
		}
	};
	return message;
}