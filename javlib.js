// ==UserScript==
// @name        tranfer
// @namespace   javlib
// @include     http://www.javlibrary.com/cn/?v=*
// @version     1
// @grant       none
// ==/UserScript==allow pasting

let video_id_prefix_dict = {
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
}

let video_id_div = document.getElementById('video_id')
let video_id_row = video_id_div.getElementsByTagName('tr')[0]
let video_id = video_id_row.cells[1].textContent

var video_id_prefix = video_id.slice(0, -4).toLowerCase()
if(video_id_prefix in video_id_prefix_dict)
{
    video_id_prefix = video_id_prefix_dict[video_id_prefix] + video_id_prefix
}
else
{
    video_id_prefix += '00'
}

let video_id_suffix = video_id.slice(-3)

let dmm_id = video_id_prefix + video_id_suffix
//alert(video_id);

function addLink(version)
{
    let url = `http://cc3001.dmm.co.jp/litevideo/freepv/${dmm_id[0]}/${dmm_id.substring(0,3)}/${dmm_id}/${dmm_id}_${version}_w.mp4`
    var cell = video_id_row.insertCell()
    let link_tag = document.createElement('a')
    link_tag.href = url
    link_tag.innerHTML = version
    cell.appendChild(link_tag)
    return url
}

let urls = []
for (version of ['dmb', 'dm', 'sm'])
{
    urls.push(addLink(version))
}

for (url of urls)
{
    let http = new XMLHttpRequest()
    http.open('HEAD', url, false)
    http.send();
    if (http.status != 404)
    {
        let video_tag = document.createElement('video')
        video_tag.src = url
        video_tag.controls = true

        let preview_thumbs = document.getElementsByClassName('previewthumbs')[0]
        right_column_div.removeChild(preview_thumbs)

        let preview_row = document.getElementById('video_jacket_info').insertRow()
        preview_row.insertCell().appendChild(video_tag)
        preview_row.insertCell().appendChild(preview_thumbs)

        break;
    }
}
