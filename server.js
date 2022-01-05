const cluster = require('cluster');
const numCpus = require('os').cpus().length;

const port = process.env.NODE_PORT || 3000;

if (cluster.isMaster) {
    setupMaster();
} else {
    setupWorker();
}

/**
 * Setup the cluster master. It will fork the worker process.
 */
function setupMaster() {
    let numWorkersDefault = Math.min(numCpus, 4);
    let numWorkers = parseInt(process.env.NODE_WORKER);
    numWorkers = Number.isInteger(numWorkers) ? numWorkers : numWorkersDefault;
    if (numWorkers > numCpus) {
        console.log('[master] number of workers must not be greater than the number of CPUs');
        numWorkers = numCpus;
    }

    if (numWorkers < 2) {
        setupWorker();
        return;
    }

    console.log(`[master] Forking ${numWorkers} worker processes...`);
    let restart = true;
    let shutdown = () => { };

    for (let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        if (restart) {
            console.log(`[master] Worker (pid: ${worker.process.pid}) died. Forking new worker process...`);
            cluster.fork();
        } else {
            console.log(`[master] Worker (pid: ${worker.process.pid}) is shutdown.`);
            if (Object.keys(cluster.workers).length === 0) {
                shutdown();
            }
        }
    });
}

/**
 * Setup the cluster worker. It will start the server.
 */
function setupWorker() {
    const app = require('./app');
    const server = app.listen(port, () => {
        console.log(`[worker] Application is running on port ${port}...`);
    });
}

module.exports = cluster;