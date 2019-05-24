@RestResource(urlMapping='/UploadMedia/v1/*')
global with sharing class UploadMediaRest
{
    @HttpPost
    global static String attachDoc(){
        RestRequest req = RestContext.request;
        RestResponse res = Restcontext.response;
 
        String fName = req.params.get('FileName');
        String parId = req.params.get('parId');
        String fType = req.Params.get('fType');
        Blob postContent = req.requestBody;
        // System.debug('-------> ' + EncodingUtil.base64Encode( postContent ) );
        Attachment a = new Attachment (ParentId = parId,
                                       Body = postContent,
                                       Name = fName);
 
        insert a;
        Account acc = new Account(Id = parId);
        acc.put(fType + '__c', true);
        update acc;
        return a.Id;
   }
}