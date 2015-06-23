var WorkerConst = {
  GET: 'worker_get',
  UPDATE: 'worker_update',
  ERROR: 'worker_error'
};

if (typeof module !== 'undefined') {
  module.exports = WorkerConst;
}