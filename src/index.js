import { data } from "./data.js";

window.loadData = (json) => {
  const data = JSON.parse(json);

  const {
    alertTxt,
    LocationName,
    NameCustomer,
    Discount,
    DiscountPercent,
    Terms,
    __kp_Order,
    Tax,
    _kf_Customer,
    _kf_Location,
    _kf_Quote,
    cRepList,
    Pricing,
    BillAddress1,
    BillAddress2,
    Shipping_Cost,
    BillCityStateZip,
    BillContact,
    ShipAddress1,
    ShipAddress2,
    ShipCityStateZip,
    ShipContact,
    PhysicalAddress1,
    PhysicalAddress2,
    PhysicalCityStateZip,
  } = data.fieldData;
  const { ContactPortal } = data.portalData;
  const { OrdersLineItems } = data.portalData;

  const header = document.getElementById("header");
  const alertDiv = document.createElement("div");
  alertDiv.classList.add("alertDiv");
  alertDiv.innerHTML = "Alert: " + alertTxt;
  //header.insertAdjacentHTML =('afterend' , alertDiv);
  if (alertTxt.length > 0) {
    header.appendChild(alertDiv);
  }

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
  billingAdd.insertAdjacentHTML("beforeend", BillContact);
  billingAdd.insertAdjacentHTML("beforeend", "<br>" + BillAddress1);
  if (BillAddress2.length > 0) {
    billingAdd.insertAdjacentHTML("beforeend", "<br>" + BillAddress2);
  }
  billingAdd.insertAdjacentHTML("beforeend", "<br>" + BillCityStateZip);
  billingAddDivParent.appendChild(billingAddDiv);
  billingAddDivParent.appendChild(billingAdd);

  const shippingAddDivParent = document.getElementById("shippingAdd");
  const shippingAddDiv = document.createElement("div");
  shippingAddDiv.innerHTML = "<strong>Ship To:</strong>";
  shippingAddDiv.classList.add("AddressLabel");
  const shippingAdd = document.createElement("div");
  shippingAdd.classList.add("AddressDiv");
  shippingAdd.insertAdjacentHTML("beforeend", ShipContact);
  shippingAdd.insertAdjacentHTML("beforeend", "<br>" + ShipAddress1);
  if (ShipAddress2.length > 0) {
    shippingAdd.insertAdjacentHTML("beforeend", "<br>" + ShipAddress2);
  }
  shippingAdd.insertAdjacentHTML("beforeend", "<br>" + ShipCityStateZip);
  shippingAddDivParent.appendChild(shippingAddDiv);
  shippingAddDivParent.appendChild(shippingAdd);

  const installAddDivParent = document.getElementById("installAdd");
  const installAddDiv = document.createElement("div");
  installAddDiv.innerHTML = "<strong>Install At:</strong>";
  installAddDiv.classList.add("AddressLabel");
  const installAdd = document.createElement("div");
  installAdd.classList.add("AddressDiv");
  installAdd.insertAdjacentHTML("beforeend", PhysicalAddress1);
  if (PhysicalAddress2.length > 0) {
    installAdd.insertAdjacentHTML("beforeend", "<br>" + PhysicalAddress2);
  }
  installAdd.insertAdjacentHTML("beforeend", "<br>" + PhysicalCityStateZip);
  installAddDivParent.appendChild(installAddDiv);
  installAddDivParent.appendChild(installAdd);


// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

  Object.keys(ContactPortal).forEach((key) => {
    // get current asset data
    const contactData = ContactPortal[key];
    // create asset container
    const container = document.createElement("div");
    // create and append name
    const name = document.createElement("span");
    name.innerHTML =
      contactData.ContactPortalContactnameFull +
      " - " +
      contactData.ContactPortalContacttype +
      "<br>";
    // create and append name
    const phone = document.createElement("span");
    phone.innerHTML =
      "<a span href='javascript:runScript(\"contact|phone|" +
      contactData.ContactPortalPhoneData +
      '");\' class="link">' +
      contactData.ContactPortalPhoneData +
      "</a><br>";
    // create and append name
    const email = document.createElement("span");
    //    email.innerHTML = contactData.ContactPortalEmailData ;
    email.innerHTML =
      "<a span href='javascript:runScript(\"contact|email|" +
      contactData.ContactPortalEmailData +
      '");\' class="link">' +
      contactData.ContactPortalEmailData +
      "</a><br>";
    // create and append name
    const divider = document.createElement("div");
    divider.innerHTML =
      "-----------------------------------<br>-----------------------------------";

    // fill out the asset container
    container.appendChild(name);
    container.appendChild(email);
    container.appendChild(phone);
    container.appendChild(divider);
    // append the whole thing to the parent
    document.getElementById("all_contact").appendChild(container);
  });


  const totalDiv = document.getElementById("totals");
  totalDiv.classList.add("total");

  const priceDiv = document.createElement("div");
  const price = OrdersLineItems.map((item) => item.OrdersLineItemsOrderPrice);
  const totalPrice = price.reduce((acc, curr) => acc + curr); 
  priceDiv.innerHTML = 'Subtotal '+ totalPrice
 // totalDiv.appendChild(priceDiv)  
     
  const priceExtDiv = document.createElement("div");
  priceExtDiv.classList.add("priceChild");
  const priceExtSpan = document.createElement("span");
  const priceExt = OrdersLineItems.map((item) => item.OrdersLineItemsProfile_Extended_Price);  
  const totalPriceExt = priceExt.reduce((acc, curr) => acc + curr); 
  priceExtSpan.classList.add("priceList");
  priceExtDiv.innerHTML = '<strong>Subtotal </strong>';
  priceExtSpan.innerHTML = formatter.format(totalPriceExt);
  priceExtDiv.appendChild(priceExtSpan);
  totalDiv.appendChild(priceExtDiv);
  
  const discountDiv = document.createElement("div");
  discountDiv.classList.add("priceChild");
  const discountSpan = document.createElement("span");
  const discount = Discount;
  discountDiv.innerHTML = '<strong>Discount('+parseFloat(DiscountPercent).toFixed(0)+"%"+') </strong>';
  discountSpan.classList.add("priceList");
  discountSpan.innerHTML = formatter.format(discount);
  discountDiv.appendChild(discountSpan);
  totalDiv.appendChild(discountDiv);

  const taxDiv = document.createElement("div");
  taxDiv.classList.add("priceChild");
  const taxSpan = document.createElement("span");
  const tax = Tax;
  taxDiv.innerHTML = '<strong>Tax </strong>';
  taxSpan.classList.add("priceList");
  taxSpan.innerHTML = formatter.format(tax);
  taxDiv.appendChild(taxSpan);
  totalDiv.appendChild(taxDiv)  

  const shippingDiv = document.createElement("div");
  shippingDiv.classList.add("priceChild");
  const shippingSpan = document.createElement("span");
  const shipping = Shipping_Cost;
  shippingDiv.innerHTML = '<strong>Shipping </strong>' ;
  shippingSpan.classList.add("priceList");
  shippingSpan.innerHTML = formatter.format(shipping);
  shippingDiv.appendChild(shippingSpan);
  totalDiv.appendChild(shippingDiv);

  const orderTotalDiv = document.createElement("div");
  orderTotalDiv.classList.add("priceChild");
  const orderTotalSpan = document.createElement("span");
  const orderTotal = formatter.format(totalPriceExt - discount + tax + shipping);
  orderTotalDiv.innerHTML = '<strong>Total </strong>' ;
  orderTotalSpan.classList.add("priceList");
  orderTotalSpan.innerHTML = orderTotal;
  orderTotalDiv.appendChild(orderTotalSpan);
  totalDiv.appendChild(orderTotalDiv);


  const table = $("#table").DataTable({
    data: OrdersLineItems,
    paging: false,
    scrollResize: true,
    scrollCollapse: true,
    scrollY: "5000px",
    fixedHeader: true,
    searching: false,
    ordering: false,
    info: false, // Showing x to y of z entries
    columns: [
      {
        data: "OrdersLineItemsQty",
        name: "Qty",
        visible: true,
        title: "Qty",
      },
      {
        //Info
        render: function (data, type, row) {
          const descriptionDiv = document.createElement("div");
          const description = document.createElement("div");
          description.innerHTML = row.OrdersLineItemsdescriptionHTML;
          return description;
        },
        title: "Description",
      },
      {
        //WxH
        render: function (data, type, row) {
          const dimentions = document.createElement("div");
          if(row.OrdersLineItemsWidth_Decimal > 0  || row.OrdersLineItemsHeight_Decimal > 0 ){
          dimentions.textContent = row.OrdersLineItemsWidth_Decimal + ' x ' + row.OrdersLineItemsHeight_Decimal;};
          return dimentions;
        },
        title: "W x H",
      },{
        data: "OrdersLineItemsOrderPrice",
        name: "Price",
        visible: true,
        title: "Price",
        render: DataTable.render.number( null, null, 2, '$' )
      },{
        data: "OrdersLineItemsProfile_Extended_Price",
        name: "Amount",
        visible: true,
        title: "Amount",
        render: DataTable.render.number( null, null, 2, '$' )

      }
    ],
    "columnDefs": [
      {"className": "dt-center", "targets": [2]},
      {"className": "dt-right", "targets": [4,3]}
    ],
  });

  const btnStatus = document.getElementById("btnStatus");
  btnStatus.onclick = function () {
    runScript("btn|status");
  };

  const btnEmail = document.getElementById("btnEmail");
  btnEmail.onclick = function () {
    runScript("btn|email");
  };

  const btnShipping = document.getElementById("btnShipping");
  btnShipping.onclick = function () {
    runScript("btn|shipping");
  };

  const btnVersions = document.getElementById("btnVersions");
  btnVersions.onclick = function () {
    runScript("btn|versions");
  };

  const btnForms = document.getElementById("btnForms");
  btnForms.onclick = function () {
    runScript("btn|forms");
  };

  const btnNotes = document.getElementById("btnNotes");
  btnNotes.onclick = function () {
    runScript("btn|notes");
  };

  const btnSplitMerge = document.getElementById("btnSplitMerge");
  btnSplitMerge.onclick = function () {
    runScript("btn|splitMerge");
  };

  const btnInvoice = document.getElementById("btnInvoice");
  btnInvoice.onclick = function () {
    runScript("btn|invoice");
  };

  const btnDelete = document.getElementById("btnDelete");
  btnDelete.onclick = function () {
    runScript("btn|delete");
  };

  window.runScript = function (param) {
    function performFileMakerScript() {
      FileMaker.PerformScriptWithOption("processVWRequest", param, 0);
    }

    performFileMakerScript();
  };

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });



};


