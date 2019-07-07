
import { BasePgRouter, ExpressRPC, iAuth } from 'mbake/lib/Serv';


export class Setup extends BasePgRouter {


    setup(req, res) {
        const method = req.fields.method;
        let params = JSON.parse(req.fields.params)
  
        let email = params.email
        let password = params.password
        let emailjsService_id = params.emailjsService_id
        let emailjsTemplate_id = params.emailjsTemplate_id
        let emailjsUser_id = params.emailjsUser_id
  
        let resp: any = {}; // new response that will be set via the specific method passed
        if ('setup' == method) {
           resp.result = {}
           // res.send(resp)
           try {
              console.info('setup called ...');
              adbDB.addAdmin(email, password, emailjsService_id, emailjsTemplate_id, emailjsUser_id, '9081');
              console.info('db created  ...');
              let msg = 'Hi, your email and password are registered as login credentials for WebAdmin!';
              emailJs.send(email, emailjsService_id, emailjsTemplate_id, emailjsUser_id, msg);
              resp['result'] = 'OK'
              return res.json(resp)
  
           } catch (err) {
              console.warn(err)
              // next(err);
           }
        } else {
           return res.json(resp);
        }
    
  }//()

}//class


module.exports = {
    Setup
}