const Comment = require('../model/comment');
const User = require('../model/user');
const {
    v4: uuidV4
} = require('node-uuid/uuid');
const reqMapping = (requestObject) => {
    const {
        comment_id,
        article_id,
        commentAuthor_id,
        content
    } = requestObject;

    return {
        comment_id: uuidV4(),
        article_id,
        commentAuthor_id,
        content,
        date: new Date()
    }
}

const addComment = async (body) => {
    const newComment = reqMapping(body);
    console.log("newComment", newComment)
    await Comment.create(newComment);
};

const getComment = async (query) => {
    if(!(query.pageSize && query.pageNum)){
        
        return {
            error:'Missing parameters'
        };
    }
    let filter = query;
    console.log(query)
    if(query.name){
        let filterQuery = [];
        let userInfo = await User.find({"name":{$regex:query.name||''}},{user_id:1}) 
        console.log(userInfo)
        filterQuery.push({"article_id":query.article_id})
        filterQuery.push({"commentAuthor_id":userInfo[0].user_id})
        filter = {$and:filterQuery};
    }
    console.log("213234",filter)
    let skipNum = query.pageSize * (query.pageNum - 1);
    let limitNum = parseInt(query.pageSize);
    const list =  await Comment.find(filter).sort({date:-1}).skip(skipNum).limit(limitNum).clone().catch(function(err){ console.log(err)})
     console.log(list)

    return {
        dataInfo: list,
        total: list.length
    };
}

const deleteComment = async (query) => {
    const filter = query;
    return await Comment.deleteOne(filter).clone().catch(function(err){ console.log(err)})
}

module.exports = {
    addComment,
    getComment,
    deleteComment
}