import { LightningElement } from 'lwc';
//access static resource
import IMAGE_INFO from '@salesforce/resourceUrl/Image';
import CSS_INFO from '@salesforce/resourceUrl/CSS';
import ZIP_INFO from '@salesforce/resourceUrl/SFStaticResource'; // Not working
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import USERID from '@salesforce/user/Id';
import TESTCUSTOMPERMISSION from '@salesforce/customPermission/Test_Customer_Permission';
import STANDARDPERMISSION from '@salesforce/userPermission/ViewSetup';
import LWC_LABEL from '@salesforce/label/c.LWC_Label';
import INFO_LABEL from '@salesforce/label/c.Info';
import FORM_FACTOR from '@salesforce/client/formFactor';
import lang from '@salesforce/i18n/lang';
import currency from '@salesforce/i18n/currency';
import timeZone from '@salesforce/i18n/timeZone';
/* POSSIBLE_VALUES => lang, dir, locale, currency, firstDayOfWeek, timeZone */
/*MORE: https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_i18n*/


export default class AccessSalesforceResource extends LightningElement {
 
    imageDetails = IMAGE_INFO;
    cssDetails = CSS_INFO;
    displayingScreen = FORM_FACTOR;
    get currentLang(){
        return lang;
    }
    get userInfo(){
        return USERID;
    }
    label = {
        lwcLabel : LWC_LABEL,
        infoLabel : INFO_LABEL
    }

    get isViewSetUpFound(){
        return STANDARDPERMISSION;
    }

    get hasCustomerPermission(){
        return TESTCUSTOMPERMISSION;
    }
  //  cssFromZip = ZIP_Info+'/SFCss';
    connectedCallback(){
          loadStyle(this, CSS_INFO)
            .then(()=>{
    
            })
            .catch((error)=>{
                console.info('error###',error);
            });
            //We can use above logic or below logic : For reference check dmlRecord Cmp
      /*  Promise.all(
            loadStyle(this, CSS_INFO)
        ).then(()=>{

        })
        .catch((error)=>{
 
        }) */
    }
   



}