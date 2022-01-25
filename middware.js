function reply(fn) {
    return (req, res, next) => {
        return Promise.resolve(fn(req))
            .then((data) => {
                console.log(1212,data)
                const response = {
                    status: 'SUCCESS',
                    data
                };
                if(data.error){
                    response.status = 'ERROR';
                }
                res.send(response);
            })
            .catch((err) => {
                res.send(err);
            });
    }
}

function pageNotFound() {
    return (req, res, next) => {
        console.log({ module:'_pageNotFound' }, 'The client is requesting for a missing page');
        next();
    }
}

module.exports = {
    pageNotFound,
    reply,
}