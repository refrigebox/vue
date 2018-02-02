let gulp = require('gulp');
let fs=require('fs');
let path=require('path');
let webserver=require('gulp-webserver');
gulp.task("webserver",function(){
    gulp.src("./")
        .pipe(webserver({
            host:"localhost",
            port:8080,
            open:true,
            fallback:"index.html",
            livereload:true
        }))
});
gulp.task("httpServer",function(){
    gulp.src("./")
        .pipe(webserver({
            host:"localhost",
            port:8090,
            middleware:function(req,res){
                if(req.url==='/data'){
                    res.writeHead(200,{
                        "content-type":"text/plain",
                        "access-control-allow-origin":"*"
                    })
                    var file=path.join(__dirname,"data/data.json");
                    fs.readFile(file,function(err,data){
                        if(err){
                            throw err;
                        }
                        res.end(data);
                    })
                }
            }
        }))
});
gulp.task("default",function(){
    gulp.start("webserver","httpServer");
});