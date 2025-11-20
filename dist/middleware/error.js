export function notFound(_req, res) {
    res.status(404).json({ message: "not found" });
}
export function errorHandler(err, _req, res, _next) {
    const status = typeof err?.status === "number" ? err.status : 500;
    const message = (err && err.message) ? err.message : "internal server error";
    res.status(status).json({ message });
}
//# sourceMappingURL=error.js.map