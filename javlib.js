// ==UserScript==
// @name        tranfer
// @namespace   javlib
// @include     http://www.javlibrary.com/cn/?v=*
// @version     1
// @grant       none
// ==/UserScript==allow pasting

var jav_prefix_dict = {
    'aby': '118',
    'abp': '118',
    'abs': '118',
    'dic': '118',
    'ppt': '118',
    'tem': '118',
    'bgn': '118',
    'mgt': '118',
    'dtt': '118',
    'kbi': '118',
    'chn': '118',
    'star': '1',
    'stars': '1',
    'sdnm': '1',
    'fsdss': '1',
    'msfh': '1',
    'gvh': '13',
};

var div = document.getElementById('video_id');
//alert(div.innerHTML);
var row = div.getElementsByTagName('tr')[0];
//alert(row.innerHTML);
var jav_id = row.cells[1].textContent;
//alert(jav_id);

var jav_prefix = jav_id.slice(0, -4).toLowerCase();
if(jav_prefix in jav_prefix_dict)
{
    jav_prefix = jav_prefix_dict[jav_prefix] + jav_prefix;
}
else
{
    jav_prefix += '00'
}

var jav_number = jav_id.slice(-3);

var video_id = jav_prefix + jav_number;
//alert(video_id);

var urlPrefix = 'http://cc3001.dmm.co.jp/litevideo/freepv/'
    + jav_prefix[0] + '/'
    + jav_prefix.substring(0,3) + '/'
    + video_id + '/'
    + video_id + '_';

function addLink(prefix)
{
    var url = urlPrefix + prefix + '_w.mp4';
    var cell = row.insertCell(-1);
    javcell.innerHTML = '<a href="' + url + '">' + prefix + '</a>';
}

addLink('dmb');
addLink('dm');
addLink('sm');