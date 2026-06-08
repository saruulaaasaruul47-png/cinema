const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 10;
const MAX_SIZE = 50;

function parsePagination(query = {}) {
  const page = Math.max(parseInt(query.page, 10) || DEFAULT_PAGE, 1);
  const requestedSize = parseInt(query.size, 10) || DEFAULT_SIZE;
  const size = Math.min(Math.max(requestedSize, 1), MAX_SIZE);
  const offset = (page - 1) * size;

  return { page, size, offset };
}

function buildPagination(content, page, size, totalElements) {
  return {
    content,
    page,
    size,
    totalElements,
    totalPages: Math.ceil(totalElements / size) || 0,
  };
}

function apiResponse(res, statusCode, message, data = null, errors = null) {
  return res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
    errors,
    timestamp: new Date().toISOString(),
  });
}

module.exports = {
  parsePagination,
  buildPagination,
  apiResponse,
};
