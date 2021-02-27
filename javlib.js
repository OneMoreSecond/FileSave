// ==UserScript==
// @name        tranfer
// @namespace   javlib
// @include     http://www.javlibrary.com/cn/?v=*
// @version     1
// @grant       none
// ==/UserScript==allow pasting

let DEBUG = false

if (DEBUG)
{
    alert('Starting debugging!')
}

let video_maker_dict = {
    'プレステージ': '118',
}

let video_id_prefix_dict = {
    /*
    'aby': '118',
    'abp': '118',
    'abs': '118',
    'abw': '118',
    'aka': '118',
    'dic': '118',
    'ppt': '118',
    'pxh': '118',
    'tem': '118',
    'bgn': '118',
    'mgt': '118',
    'dtt': '118',
    'kbi': '118',
    'wps': '118',
    'chn': '118',
    'sga': '118',
    'tre': '118',
    'onez': '118',
    'kpb': '118',
    */
    'mkmp': '84',
    'star': '1',
    'stars': '1',
    'sdnm': '1',
    'sdab': '1',
    'fsdss': '1',
    'fcdss': '1',
    'fadss': '1',
    'fsdss': '1',
    'kmhrs': '1',
    'msfh': '1',
    'sdmf': '1',
    'kire': '1',
    'gvh': '13',
    'nitr': '49',
}

no_zero_set = {
    'sqte': 0,
  	'pfes': 0,
}

let video_maker_div = document.getElementById('video_maker')
let video_maker_row = video_maker_div.getElementsByTagName('tr')[0]
let video_maker = video_maker_row.cells[1].getElementsByTagName('a')[0].textContent

if (DEBUG)
{
    alert('video_maker: ' + video_maker)
}

let video_id_div = document.getElementById('video_id')
let video_id_row = video_id_div.getElementsByTagName('tr')[0]
let video_id = video_id_row.cells[1].textContent

if (DEBUG)
{
    alert('video_id: ' + video_id)
}

var video_id_prefix = video_id.slice(0, -4).toLowerCase()
if (video_maker in video_maker_dict)
{
    video_id_prefix = video_maker_dict[video_maker] + video_id_prefix
}
if (video_id_prefix in video_id_prefix_dict)
{
    video_id_prefix = video_id_prefix_dict[video_id_prefix] + video_id_prefix
}
else if (!(video_id_prefix in no_zero_set))
{
    video_id_prefix += '00'
}

let video_id_suffix = video_id.slice(-3)

let dmm_id = video_id_prefix + video_id_suffix

function addLink(version)
{
    let url = `http://cc3001.dmm.co.jp/litevideo/freepv/${dmm_id[0]}/${dmm_id.substring(0,3)}/${dmm_id}/${dmm_id}_${version}_w.mp4`
    let link_tag = document.createElement('a')
    link_tag.href = url
    link_tag.innerHTML = version
    video_id_row.insertCell().appendChild(link_tag)
    return url
}

right_column_div = document.getElementById('rightcolumn')
is_video_inserted = false
for (version of ['mhb', 'dmb', 'dm', 'sm'])
{
    url = addLink(version)

    if (is_video_inserted)
    {
        continue;
    }

    let http = new XMLHttpRequest()
    http.open('HEAD', url, false)
    http.send();
    if (http.status < 400)
    {
        let preview_row = document.getElementById('video_jacket_info').insertRow()

        let video_tag = document.createElement('video')
        video_tag.src = url
        video_tag.controls = true
        preview_row.insertCell().appendChild(video_tag)

        let preview_thumbs = document.getElementsByClassName('previewthumbs')[0]
        if (preview_thumbs)
        {
            right_column_div.removeChild(preview_thumbs)
            preview_row.insertCell().appendChild(preview_thumbs)
        }

        is_video_inserted = true

        if (DEBUG)
        {
            alert('successful version: ' + version)
        }
    }
}

if (!is_video_inserted)
{
    addLink('bad')
}
