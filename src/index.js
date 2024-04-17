
import {data} from "./data.js";





window.loadData = (json) => {
  const data = JSON.parse(json);



const {alertTxt,LocationName,NameCustomer,Terms,__kp_Order,_kf_Customer,_kf_Location,_kf_Quote,cRepList,Pricing,BillAddress1,BillAddress2,BillCityStateZip,BillContact,ShipAddress1,ShipAddress2,ShipCityStateZip,ShipContact,PhysicalAddress1,PhysicalAddress2,PhysicalCityStateZip} = data.fieldData;
const {ContactPortal} = data.portalData;
const {OrdersLineItems} = data.portalData;



const header = document.getElementById("header");
const alertDiv = document.createElement("div");
alertDiv.classList.add("alertDiv");
alertDiv.innerHTML = "Alert: "+alertTxt;
//header.insertAdjacentHTML =('afterend' , alertDiv);
if(alertTxt.length>0) {header.appendChild(alertDiv);};






const quoId = document.getElementById("quoId");
quoId.innerHTML = _kf_Quote;

const locId = document.getElementById("locId");
locId.innerHTML = _kf_Location;

const custId = document.getElementById("custId");
custId.innerHTML = _kf_Customer;

const terms = document.getElementById("terms");
terms.innerHTML = Terms;

const pricing = document.getElementById("pricing");
pricing.innerHTML = Pricing;

const mps = document.getElementById("mps");
mps.innerHTML = cRepList;

const fms = document.getElementById("fms");
fms.innerHTML = cRepList;

const billingAddDivParent = document.getElementById("billingAdd");
const billingAddDiv = document.createElement("div");
billingAddDiv.innerHTML = "<strong>Bill To:</strong>";
billingAddDiv.classList.add("AddressLabel");
const billingAdd = document.createElement("div");
billingAdd.classList.add("AddressDiv");
billingAdd.insertAdjacentHTML("beforeend",BillContact);
billingAdd.insertAdjacentHTML("beforeend",'<br>'+BillAddress1);
if(BillAddress2.length > 0) {billingAdd.insertAdjacentHTML("beforeend",'<br>'+BillAddress2);};
billingAdd.insertAdjacentHTML("beforeend",'<br>'+BillCityStateZip);
billingAddDivParent.appendChild(billingAddDiv);
billingAddDivParent.appendChild(billingAdd);


const shippingAddDivParent = document.getElementById("shippingAdd");
const shippingAddDiv = document.createElement("div");
shippingAddDiv.innerHTML = "<strong>Ship To:</strong>";
shippingAddDiv.classList.add("AddressLabel");
const shippingAdd = document.createElement("div");
shippingAdd.classList.add("AddressDiv");
shippingAdd.insertAdjacentHTML("beforeend",ShipContact);
shippingAdd.insertAdjacentHTML("beforeend",'<br>'+ShipAddress1);
if(ShipAddress2.length > 0) {shippingAdd.insertAdjacentHTML("beforeend",'<br>'+ShipAddress2);};
shippingAdd.insertAdjacentHTML("beforeend",'<br>'+ShipCityStateZip);
shippingAddDivParent.appendChild(shippingAddDiv);
shippingAddDivParent.appendChild(shippingAdd);



const installAddDivParent = document.getElementById("installAdd");
const installAddDiv = document.createElement("div");
installAddDiv.innerHTML = "<strong>Install At:</strong>";
installAddDiv.classList.add("AddressLabel")
const installAdd = document.createElement("div");
installAdd.classList.add("AddressDiv")
installAdd.insertAdjacentHTML("beforeend",PhysicalAddress1);
if(PhysicalAddress2.length > 0) {installAdd.insertAdjacentHTML("beforeend",'<br>'+PhysicalAddress2);};
installAdd.insertAdjacentHTML("beforeend",'<br>'+PhysicalCityStateZip);
installAddDivParent.appendChild(installAddDiv);
installAddDivParent.appendChild(installAdd);



  Object.keys(ContactPortal).forEach(key => {
    // get current asset data
    const contactData = ContactPortal[key];
    // create asset container
    const container = document.createElement("div");
    // create and append name 
    const name = document.createElement('span');
    name.innerHTML = contactData.ContactPortalContactnameFull + ' - ' + contactData.ContactPortalContacttype + '<br>' ;
    // create and append name 
    const phone = document.createElement('span');
    phone.innerHTML = '<a span href=\'javascript:runScript("nav|phone|' + contactData.ContactPortalPhoneData +'");\' class="link">' + contactData.ContactPortalPhoneData + '</a><br>' ;
    // create and append name 
    const email = document.createElement('span');
//    email.innerHTML = contactData.ContactPortalEmailData ;
    email.innerHTML = '<a span href=\'javascript:runScript("nav|email|' + contactData.ContactPortalEmailData +'");\' class="link">' + contactData.ContactPortalEmailData + '</a><br>' ;
    // create and append name 
    const divider = document.createElement('div');
    divider.innerHTML = '-----------------------------------<br>-----------------------------------';

    // fill out the asset container
    container.appendChild(name)
    container.appendChild(email)
    container.appendChild(phone)
    container.appendChild(divider)
    // append the whole thing to the parent
    document.getElementById("all_contact").appendChild(container);
  })

  
  Object.keys(OrdersLineItems).forEach(key => {
    // get current asset data
    const itemData = OrdersLineItems[key];
    // create asset container
    const containerLine = document.createElement("li");

    // create and append name 
    const qty = document.createElement('span');
    qty.classList.add('list-inline-item');
    qty.classList.add('col-1');
    qty.classList.add('align-top');
    qty.innerHTML = itemData.OrdersLineItemsQty ;  

    // create and append name 
    const description = document.createElement('span');
    description.classList.add('list-inline-item');
    description.classList.add('col-6');
    description.innerHTML = itemData.OrdersLineItemsdescriptionHTML ;  

    // create and append name 
    const dimension = document.createElement('span');
    dimension.classList.add('list-inline-item');
    dimension.classList.add('col-2');
    dimension.classList.add('align-top');
    if (itemData.OrdersLineItemsWidth_Decimal.length ) {dimension.innerHTML = itemData.OrdersLineItemsWidth_Decimal +' x '+ itemData.OrdersLineItemsHeight_Decimal} ; 

    // create and append name 
    const price = document.createElement('div');
    price.classList.add('list-inline-item');
    price.classList.add('col-1');
    price.classList.add('align-top');
    price.classList.add('align-right');
    //price.innerHTML = USDollar.format(itemData.OrdersLineItemsOrderPrice) ;  
    let formattedPrice = itemData.OrdersLineItemsOrderPrice.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    price.innerHTML = formattedPrice ; 

    // create and append name 
    const priceExt = document.createElement('div');
    priceExt.classList.add('list-inline-item');
    priceExt.classList.add('col-1');
    priceExt.classList.add('align-top');
    priceExt.classList.add('align-right');
    let formattedXPrice = itemData.OrdersLineItemsProfile_Extended_Price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    priceExt.innerHTML = formattedXPrice ; 

    // fill out the asset container
    containerLine.appendChild(qty)
    containerLine.appendChild(description)
    containerLine.appendChild(dimension)
    containerLine.appendChild(price)
    containerLine.appendChild(priceExt)
    // append the whole thing to the parent
    document.getElementById("lineItems").appendChild(containerLine);
    console.log(containerLine);
  });

const btnStatus = document.getElementById("btnStatus");
btnStatus.onclick = function(){
  runScript("btn|status");
};


const btnEmail = document.getElementById("btnEmail");
btnEmail.onclick = function(){
  runScript("btn|email");
};

const btnShipping = document.getElementById("btnShipping");
btnShipping.onclick = function(){
  runScript("btn|shipping");
};

const btnVersions = document.getElementById("btnVersions");
btnVersions.onclick = function(){
  runScript("btn|versions");
};

const btnForms = document.getElementById("btnForms");
btnForms.onclick = function(){
  runScript("btn|forms");
};

const btnNotes = document.getElementById("btnNotes");
btnNotes.onclick = function(){
  runScript("btn|notes");
};

const btnSplitMerge = document.getElementById("btnSplitMerge");
btnSplitMerge.onclick = function(){
  runScript("btn|splitMerge");
};

const btnInvoice = document.getElementById("btnInvoice");
btnInvoice.onclick = function(){
  runScript("btn|invoice");
};

const btnDelete = document.getElementById("btnDelete");
btnDelete.onclick = function(){
  runScript("btn|delete");
};





window.runScript = function (param) {
  function performFileMakerScript() {
    FileMaker.PerformScriptWithOption("processVWRequest",param,0);
  }
 
  performFileMakerScript();
};


let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

};