// ==UserScript==
// @name        tranfer
// @namespace   javlib
// @include     http://www.javlibrary.com/cn/?v=*
// @version     1
// @grant       none
// ==/UserScript==allow pasting

let jav_prefix_dict = {
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

let div = document.getElementById('video_id');
//alert(div.innerHTML);
let row = div.getElementsByTagName('tr')[0];
//alert(row.innerHTML);
let jav_id = row.cells[1].textContent;
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

let jav_number = jav_id.slice(-3);

let video_id = jav_prefix + jav_number;
//alert(video_id);

function addLink(version)
{
    let url = `http://cc3001.dmm.co.jp/litevideo/freepv/${video_id[0]}/${video_id.substring(0,3)}/${video_id}/${video_id}_${version}_w.mp4`
    var cell = row.insertCell(-1);
    cell.innerHTML = '<a href="' + url + '">' + version + '</a>';
}

addLink('dmb');
addLink('dm');
addLink('sm');