// ==UserScript==
// @name        tranfer
// @namespace   javlib
// @include     https://www.javlibrary.com/cn/?v=*
// @version     1
// @grant       none
// ==/UserScript==allow pasting

let DEBUG = false;

function alertd(message)
{
    if (DEBUG)
    {
        alert(message);
    }
}

alertd('Starting debugging!');

function getVideoInfo(infoName)
{
    let infoDiv = document.getElementById(infoName);
    let infoRow = infoDiv.getElementsByTagName('tr')[0];
    let infoCell = infoRow.cells[1];
    const hasLink = false;
    let infoText = (hasLink ? infoCell.getElementsByTagName('a')[0] : infoCell).textContent.trim();
    alertd(infoName + ': ' + infoText);
    return {
        row: infoRow,
        text: infoText,
    };
}

alertd('Getting info!');

let { row: videoMakerRow, text: videoMaker } = getVideoInfo('video_maker');
let { row: videoLabelRow, text: videoLabel } = getVideoInfo('video_label');
let { row: videoIdRow, text: videoId } = getVideoInfo('video_id');
let { row: videoDateRow, text: videoDate } = getVideoInfo('video_date');
let { row: videoCastRow, text: videoCast } = getVideoInfo('video_cast');

alertd('Making links');

let links = [];

const RANK = {
    top: -1000,
    mhb: -400,
    dmb: -300,
    dm: -200,
    sm: -100,
    normal: 0,
    bottom: 1000,
};

let [videoIdPrefix, videoIdSuffix] = videoId.split('-');
let lowerVideoIdPrefix = videoIdPrefix.toLowerCase();

alertd('Making DMM links');
{
    let videoMakerPrefixMap = new Map([
        ['プレステージ', '118']
    ]);

    let videoIdPrefixMap = new Map([
        ['aby', '118'],
        ['abp', '118'],
        ['abs', '118'],
        ['abw', '118'],
        ['aka', '118'],
        ['dic', '118'],
        ['ppt', '118'],
        ['pxh', '118'],
        ['tem', '118'],
        ['bgn', '118'],
        ['mgt', '118'],
        ['dtt', '118'],
        ['kbi', '118'],
        ['wps', '118'],
        ['chn', '118'],
        ['sga', '118'],
        ['tre', '118'],
        ['onez', '118'],
        ['kpb', '118'],
        ['mkmp', '84'],
        ['star', '1'],
        ['stars', '1'],
        ['sdnm', '1'],
        ['sdab', '1'],
        ['fsdss', '1'],
        ['fcdss', '1'],
        ['fadss', '1'],
        ['dldss', '1'],
        ['kmhrs', '1'],
        ['msfh', '1'],
        ['sdmf', '1'],
        ['kire', '1'],
        ['gvh', '13'],
        ['nitr', '49'],
        ['honb', 'h_1133'],
        ['wfr', '2'],
        ['mxgs', 'h_068'],
        ['zex', 'h_720'],
        ['jrze', 'h_086'],
        ['dfdm', '2'],
        ['dfe', '2'],
        ['sdde', '1'],
        ['umd', '125'],
        ['hone', 'h_086'],
        ['clot', 'h_237'],
        ['sdjs', '1'],
        ['wfr', '2'],
        ['wkd', '2'],
        ['dkd', '24'],
        ['knmb', 'h_491'],
        ['hzgd', 'h_1100'],
        ['nacr', 'h_237'],
        ['skmj', 'h_1324'],
        ['hmnf', 'h_172'],
        ['xmom', 'h_086'],
        ['id', '5529'],
        ['sprd', '18'],
        ['macb', 'h_687']
    ]);
    alertd('DMM config done');

    let prefixes = new Set(['']);
    if (videoMakerPrefixMap.has(videoMaker))
    {
        prefixes.add(videoMakerPrefixMap.get(videoMaker));
    }
    if (videoIdPrefixMap.has(lowerVideoIdPrefix))
    {
        prefixes.add(videoIdPrefixMap.get(lowerVideoIdPrefix));
    }
    alertd('DMM prefix done');

    let dmmIds = [];
    for (let prefix of prefixes)
    {
        dmmIds.push({
            id: prefix + lowerVideoIdPrefix + videoIdSuffix,
            versionSuffix: prefix,
            rankBias: prefix !== '' ? -2 : 2
        });
        dmmIds.push({
            id: prefix + lowerVideoIdPrefix + videoIdSuffix.padStart(5, '0'),
            versionSuffix: prefix + '0',
            rankBias: prefix !== '' ? -1 : 1
        });
    }
    alertd('DMM ID done');

    for (let version of ['mhb', 'dmb', 'dm', 'sm'])
    {
        for (let dmmId of dmmIds)
        {
            let sid = dmmId.id;
            let rank = RANK[version] + dmmId.rankBias;
            links.push({
                name: version + dmmId.versionSuffix,
                url: `https://cc3001.dmm.co.jp/litevideo/freepv/${sid[0]}/${sid.substring(0, 3)}/${sid}/${sid}_${version}_w.mp4`,
                rank: rank
            });
            links.push({
                name: 'vp' + version + dmmId.versionSuffix,
                url: `https://videos.vpdmm.cc/litevideo/freepv/${sid[0]}/${sid.substring(0, 3)}/${sid}/${sid}_${version}_w.mp4`,
                rank: rank + (RANK.dm - RANK.dmb)
            });
        }
    }
}

alertd('Making Prestige links');
{
    if (videoMaker == 'プレステージ')
    {
        links.push({
            name: "prestige",
            url: `https://www.prestige-av.com/sample_movie/${videoId.toUpperCase()}.mp4`,
            rank: RANK.top
        });
        links.push({
            name: "prestigeTKT",
            url: `https://www.prestige-av.com/sample_movie/TKT${videoId.toUpperCase()}.mp4`,
            rank: RANK.top
        });
    }
}

alertd('Making SOD links');
{
    if (videoMaker == 'SOD Create')
    {
        let [year, month, day] = videoDate.split('-');
        let sodVideoDate = year + month;
        let sodVideoId = lowerVideoIdPrefix + '_' + videoIdSuffix;

        // Originally from https://ec.sod.co.jp/prime/videos/sample.php?id=STARS-485
        // Install a browser extension to modify the Referer header to https://ec.sod.co.jp/
        links.push({
            name: "sod",
            url: `https://dy43ylo5q3vt8.cloudfront.net/_sample/${sodVideoDate}/${sodVideoId}/${sodVideoId}_sample.mp4`,
            rank: RANK.top
        })
    }
}

alertd('Making HMP links');
{
    links.push({
        name: "hmp",
        url: `https://sample.hmp.jp/movie01/${videoId.toUpperCase()}.mp4`,
        rank: RANK.dm
    });
}

alertd('Adding links!');

async function tryAccessLink(url)
{
    let response = await fetch(url, {
        method: 'HEAD'
    });
    return response.ok;
}

function addLinkTag(link)
{
    let linkTag = document.createElement('a');
    linkTag.href = link.url;
    linkTag.innerHTML = link.name;
    if (link.accessible !== undefined)
    {
        linkTag.innerHTML += link.accessible ? '√' : '×';
    }
    linkTag.innerHTML += '  ';
    if (videoIdRow.childElementCount == 2)
    {
        videoIdRow.style = "width: 100%;"
        videoIdRow.insertCell().appendChild(linkTag);
    }
    else if (videoIdRow.childElementCount == 3)
    {
        videoIdRow.cells[2].appendChild(linkTag);
    }
    else
    {
        alert('Video ID row has invalid cell number' + videoIdRow.childElementCount.toString());
    }
}

let videoTag = null;
function addVideoTag(url)
{
    videoTag = document.createElement('video');
    videoTag.src = url;
    videoTag.controls = true;
    let maxHeight = window.innerHeight;
    videoTag.style = `width: 100%; max-height: ${maxHeight}px;`;

    let videoJacketTag = document.getElementById('video_jacket_info');
    videoJacketTag.parentNode.insertBefore(videoTag, videoJacketTag.nextSibling);

    videoTag.addEventListener('keydown', function (e)
    {
        if (e.key == 'ArrowRight')
        {
            videoTag.currentTime += 5;
            e.preventDefault();
        }
        else if (e.key == 'ArrowLeft')
        {
            videoTag.currentTime -= 5;
            e.preventDefault();
        }
        else if (e.key == 'ArrowUp')
        {
            let castLinks = videoCastRow.getElementsByTagName('a');
            let castLink = castLinks[0];
            if (castLinks.length == 1)
            {
                window.location = castLink.href;
            }
            else
            {
                castLink.scrollIntoView(true);
                castLink.focus();
            }
            e.preventDefault();
        }
    })
}

links.sort((a, b) => a.rank - b.rank);
async function modifyPage()
{
    var isVideoInserted = false;
    for (let link of links)
    {
        if (!isVideoInserted)
        {
            link.accessible = await tryAccessLink(link.url);
            if (link.accessible)
            {
                addVideoTag(link.url);
                isVideoInserted = true;
            }
        }
        addLinkTag(link);
    }
}
modifyPage();

document.body.addEventListener('keydown', function (e)
{
    if (e.key == ' ' && videoTag !== null)
    {
        videoTag.scrollIntoView(true);
        if (document.activeElement !== videoTag)
        {
            videoTag.play();
            videoTag.focus();
            e.preventDefault();
        }
    }
})

alertd('all done');
