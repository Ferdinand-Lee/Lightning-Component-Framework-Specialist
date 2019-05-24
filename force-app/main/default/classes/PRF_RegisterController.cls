public class PRF_RegisterController {

    public String getInit() {
        system.debug('init---');
        ((PDFController)this.Controller).regist(this);
        return null;
    }

    public Object Controller {get; set{
        system.debug('Controller--- :' + value);
        Controller = value;
    }}
    public String RelationShipName {get; set{
        system.debug('RelationShipName--- :' + value);
        RelationShipName = value;
    }}
    public String fields {get;set{
        system.debug('fields--- :' + value);
        fields = value;
    }}
}