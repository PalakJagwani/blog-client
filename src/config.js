//Api notification messages : 
export const API_NOTIFICATION_MESSAGES = {
    loading : {
        title : "Loading..." ,
        message : "Data is being loaded, Please wait!"
    },
    success : {
        title : "Success",
        message : "Data loaded successfully"
    },
    responseFailures : {
        title : "Error" ,
        message : "Error occured while fetching response form the server, please try again"
    },
    requestFailures : {
        title : "Error" ,
        message : "Error occured while parsing request data"
    },
    networkErrors : {
        title : "Error" ,
        message : "Unable to connect, please check internet connectivity!"
    }
}

export const SERVICE_URLS = {
    userSignup : {url : "/signup", method : 'POST'},
    userLogin : {url : "/login", method : 'POST'},
    uploadFile : {url : "/file/upload", method : 'POST'},
    createPost : {url : "/createPost", method : 'POST'},
    getAllPosts : {url : '/posts', method : 'GET', params : true},
    getPostData : {url : '/postview', method : 'GET', query : true},
    updatePost : {url : '/update', method : 'PUT', query : true},
    deletePost : {url : '/delete', method : 'DELETE', query : true},
    newComment : {url : '/comment/new', method : 'POST'},
    getAllComments : {url : '/comments', method : 'GET', query : true},
    deleteComment : {url : '/comment/delete', method : 'DELETE', query : true }
}