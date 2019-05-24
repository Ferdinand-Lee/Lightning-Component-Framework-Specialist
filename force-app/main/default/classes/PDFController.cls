global class PDFController {
    public PDFController(){
        this.ctrls = new Set<PRF_RegisterController>();
        this.query = 'SELECT Id, Name{0} FROM Account';
        String download = ApexPages.currentPage().getParameters().get('download');
        if(String.isNotBlank(download)) ApexPages.currentPage().getHeaders().put('content-disposition', 'attachment;filename=abc.pdf');
    }
    public PDFController getSelf() {
        return this;
    }
    private String query;
    
    Set<PRF_RegisterController> ctrls {get;set;}
    public void regist(PRF_RegisterController ctrl){
        system.debug('Regist---');
        ctrls.add(ctrl);
    }
  
    public Account record {get;set;}
    public String getExecute() {
        system.debug('Execute---');
        String subQuery = '';
        for(PRF_RegisterController ctrl : ctrls){
            subQuery += ',(SELECT '+ ctrl.fields + ' FROM ' + ctrl.RelationShipName +')';
        }
        query = String.format(query, new String[]{subQuery});
        system.debug('query---:' + query);
        record = DataBase.query(query);
        return null;
    }
    
    webservice static String getFileToDownload(){
        PageReference p = new PageReference('/apex/PDF?id=');
        Blob pdf = Page.PDF.getContentAsPDF();
        return EncodingUtil.base64Encode(pdf);
    }
    
    @AuraEnabled
    public static String getFileContent(){
        return getFileToDownload();
    }
    
    
}