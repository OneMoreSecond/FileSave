// ==UserScript==
// @name        tranfer
// @namespace   javlib
// @include     http://www.javlibrary.com/cn/?v=*
// @version     1
// @grant       none
// ==/UserScript==allow pasting

let DEBUG = false

function alertd(message)
{
    if (DEBUG)
    {
        alert(message)
    }
}

alertd('Starting debugging 1!')

let video_maker_dict = {
    'プレステージ': '118',
}

let video_id_prefix_dict = {
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
    //'mkmp': '84',
    'star': '1',
    'stars': '1',
    'sdnm': '1',
    'sdab': '1',
    'fsdss': '1',
    'fcdss': '1',
    'fadss': '1',
    'dldss': '1',
    'kmhrs': '1',
    'msfh': '1',
    'sdmf': '1',
    'kire': '1',
    'gvh': '13',
    'nitr': '49',
    'honb': 'h_1133',
    'wfr': '2',
    'mxgs': 'h_068',
    'zex': 'h_720',
    'jrze': 'h_086',
    'dfdm': '2',
    'dfe': '2',
    'sdde': '1',
    'umd': '125',
    'hone': 'h_086',
    'clot': 'h_237',
    'sdjs': '1',
    'wfr': '2',
    'wkd': '2',
    'knmb': 'h_491',
    'hzgd': 'h_1100',
    'macb': 'h_687',
}

has_zero_set = {
    'jrze': 0,
    'dfe': 0,
    'hone': 0,
    'wfr': 0,
    'hzgd': 0,
}

no_zero_set = {
    'sqte': 0,
    'pfes': 0,
    'mrss': 0,
    'usba': 0,
    'fcdc': 0,
    //'venx': 0,
    'avsa': 0,
    'dvaj': 0,
    'nitr': 0,
    'veo': 0,
    'flav': 0,
    'cemd': 0,
    'vec': 0,
    'cead': 0,
    'ekdv': 0,
    //'hzgd': 'h_1100',
    'bijn': 0,
    'real': 0,
    'mkmp': 0,
    'mdtm': 0,
    'lulu': 0,
    'homa': 0,
}

alertd('Starting debugging 2!')

function get_info(info_name, has_link)
{
    let info_div = document.getElementById(info_name)
    let info_row = info_div.getElementsByTagName('tr')[0]
    let info_cell = info_row.cells[1]
    let info_text = (has_link ? info_cell.getElementsByTagName('a')[0] : info_cell).textContent.trim()
    alertd(info_name + ': ' + info_text)
    return [info_row, info_text]
}

alertd('Starting getting info!')

let [video_maker_row, video_maker] = get_info('video_maker')
let [video_label_row, video_label] = get_info('video_label')
let [video_id_row, video_id] = get_info('video_id')

var video_id_prefix = video_id.split('-')[0].toLowerCase()
if (video_maker in video_maker_dict)
{
    video_id_prefix = video_maker_dict[video_maker] + video_id_prefix
}
else if (video_id_prefix in video_id_prefix_dict)
{
    need_zero = video_id_prefix in has_zero_set

    video_id_prefix = video_id_prefix_dict[video_id_prefix] + video_id_prefix

    if (need_zero)
    {
        video_id_prefix += '00'
    }
}
else if (!(video_id_prefix in no_zero_set))
{
    video_id_prefix += '00'
}

let video_id_suffix = video_id.split('-')[1]

let dmm_id = video_id_prefix + video_id_suffix

function addLink(version)
{
    let url = `http://cc3001.dmm.co.jp/litevideo/freepv/${dmm_id[0]}/${dmm_id.substring(0,3)}/${dmm_id}/${dmm_id}_${version}_w.mp4`
    if (video_maker == 'プレステージ')
    {
        url = `https://www.prestige-av.com/sample_movie/TKT${video_id.toUpperCase()}.mp4`
    }
    let link_tag = document.createElement('a')
    link_tag.href = url
    link_tag.innerHTML = version
    video_id_row.insertCell().appendChild(link_tag)
    return url
}

alertd('Starting adding links!')

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
        addLink('√')

        alertd('successful version: ' + version)
    }
}

if (!is_video_inserted)
{
    addLink('×')
}
