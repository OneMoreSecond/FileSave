// ==UserScript==
// @name        tranfer
// @namespace   javlib
// @include     http://www.javlibrary.com/cn/?v=*
// @version     1
// @grant       none
// ==/UserScript==allow pasting
//alert('hello');
var idPrefixDict = {'aby':'118aby', 'abp':'118abp', 'abs':'118abs', 'star':'1star','stars':'1stars', 'ppt':'118ppt',  'tem':'118tem', 'bgn':'118bgn','mgt':'118mgt','dtt':'118dtt', 'kbi':'118kbi', 'chn':'118chn', 'sdnm':'1sdnm', 'fsdss':'1fsdss', 'gvh':'13gvh', 'msfh':'1msfh', 'dic':'118dic'};
//alert('hello');
var div = document.getElementById('video_id');
//alert(div.innerHTML);
var row = div.getElementsByTagName('tr')[0];
//alert(row.innerHTML);
var id = row.cells[1].textContent;
//alert(id);
var idPrefix = id.slice(0, -4).toLowerCase();
if(idPrefix in idPrefixDict)
{
  idPrefix = idPrefixDict[idPrefix];
}
else
{
  idPrefix += '00'
}
var idSuffix = id.slice(-3);

var newId = idPrefix + idSuffix;
//alert(newId);

var urlPrefix = 'http://cc3001.dmm.co.jp/litevideo/freepv/'
+ idPrefix[0] + '/'
+ idPrefix.substring(0,3) + '/'
+ newId + '/'
+ newId + '_';

function addLink(prefix)
{
  var url = urlPrefix + prefix + '_w.mp4';
  var cell = row.insertCell(-1);
  cell.innerHTML = '<a href="' + url + '">' + prefix + '</a>';
}

addLink('dmb');
addLink('dm');
addLink('sm');