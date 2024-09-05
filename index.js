const http=require('http')
const { url } = require('inspector')
const nodemailer=require('nodemailer')
const fs=require('fs')
const SMTPConnection = require('nodemailer/lib/smtp-connection')
const { error } = require('console')
const { errorMonitor } = require('events')

const mailtransport=nodemailer.createTransport({
    host:`smtp.gmail.com`,
    port:465,
    auth:{
        user:'',
        pass:''
    }
})
const sendemail=(toEmail)=>{
const message={
    from:'jaharuddin269@gmail.com',
    to:toEmail,
    subject:'testing node_mailer',
    html:'first time i use node-mailer you also learn it essay way'
}
mailtransport.sendMail(message,(erro,info)=>{
    // console.log(erro);
})

fs.appendFile('store_mail.txt', ` ${toEmail},`,(error)=>{
    if(error){
        console.log(error);
    }

})
}

const server=http.createServer(function(req,res){
   
    let email=''
    if(req.url){
        idxofequall=req.url.indexOf('=');
        email=req.url.slice(idxofequall + 1,req.url.length)
    }
    sendemail(email)
    //  console.log(email)
    res.end('its work')
})
server.listen(8080,()=>console.log('server running'))
