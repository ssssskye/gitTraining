const Article = require('../model/article');
const {
    v4: uuidV4
} = require('node-uuid/uuid');
const reqMapping = (requestObject) => {
    const {
        article_id,
        author_id,
        body,
        title
    } = requestObject;

    return {
        article_id: uuidV4(),
        author_id,
        body,
        title,
        date: new Date()
    }
}

const addArticle = async (body) => {
    const newArticle = reqMapping(body);
    console.log("newArticle", newArticle)
    await Article.create(newArticle);
};

const getArticleList = async (query) => {
    console.log(1212,query)
    let filter = query;
    if(!(query.pageSize && query.pageNum)){
        
        return {
            error:'Missing parameters'
        };
    }
    if(query.filter){
        let filterQuery = [];
        filterQuery.push({'title':{$regex:query.filter}})
        filterQuery.push({'body':{$regex:query.filter}})
        filter = {$or:filterQuery};
    }
    let skipNum = query.pageSize * (query.pageNum - 1);
    let limitNum = parseInt(query.pageSize);
    console.log(1213,skipNum)
    const list = await Article.find(filter).sort({date:-1}).skip(skipNum).limit(limitNum).clone().catch(function(err){ console.log(err)});
    return {
        dataInfo: list,
        total: list.length
    }
}

const getArticleDetail = async (query) => {
    const filter = query;
    console.log(1313,filter)
    return await Article.find(filter,(err, res) => {
        if (!err) {
            return res;
        } else {
            throw err;
        }
    }).clone().catch(function(err){ console.log(err)})
}
const deleteArticle = async (query) => {
    const filter = query;
    return await Article.deleteOne(filter).clone().catch(function(err){ console.log(err)})
}

module.exports = {
    addArticle,
    getArticleList,
    getArticleDetail,
    deleteArticle
}