var FindProxyForURL = function(init, profiles) {
    return function(url, host) {
        "use strict";
        var result = init, scheme = url.substr(0, url.indexOf(":"));
        do {
            result = profiles[result];
            if (typeof result === "function") result = result(url, host, scheme);
        } while (typeof result !== "string" || result.charCodeAt(0) === 43);
        return result;
    };
}("+AutoSwitch", {
    "+AutoSwitch": function(url, host, scheme) {
        "use strict";
        if (/(?:^|\.)w3schools\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)discourse-cdn\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)github\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)pornhub\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)tumblr\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)hrcdn\.net$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)hackerrank\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)googletagmanager\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)levels\.fyi$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)myworkdaygadgets\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)myworkdaycdn\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)myworkdayjobs\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)myworkday\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)imgur\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)khms0\.googleapis\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)unpkg\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)rawgit\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)bootstrapcdn\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)disney\.co\.jp$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)prestige-av\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)fontawesome\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)vimeo\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)hulu\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)github\.blog$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)gstatic\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)fonts\.googleapis\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)glassdoor\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)sbvideocdn\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)licdn\.cn$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)linkedin\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)redchinacn\.net$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)google\.co\.jp$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)gmail\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)doecdn\.me$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)phncdn\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)google-analytics\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)streamsb\.net$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)jquery\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)arxiv\.org$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)medium\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)avatars2\.githubusercontent\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)camo\.githubusercontent\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)raw\.githubusercontent\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)appledaily\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)nhentai\.net$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)theinitium\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)javdoe\.tv$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)playdoe\.xyz$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)jwpcdn\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)placeholder\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)maphuahin\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)google\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)playhydrax\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)javmost\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)iamcdn\.net$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)xcity\.jp$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)popads\.net$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)bp\.blogspot\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)hao\.ac$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)hedgehogrock\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)ciweiyuedui\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)arkoselabs\.cn$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)v2ray\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)t\.me$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)toutyrater\.github\.io$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)fextralife\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)trogg\.net$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)twitchcdn\.net$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)twitch\.tv$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)sentry\.io$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)imrworldwide\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)gog\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)quoracdn\.net$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)addthis\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)soulsplanner\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)amazon-adsystem\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)scorecardresearch\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)ttvnw\.net$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)twitter\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)wiktionary\.org$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)colorado\.edu$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)sstatic\.net$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)ajax\.googleapis\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)encyclopedia\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)garagebanduniversity\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)stumbleupon\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)steamdb\.info$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)youtu\.be$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)musescore\.org$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)wizards\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)phprcdn\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)maps\.googleapis\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)youtube\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)sod\.co\.jp$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)atrandys\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)proxifier\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)ytimg\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)ggpht\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)googlevideo\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)t\.co$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)wikimedia\.org$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)wikipedia\.org$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)reddit\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)pscp\.tv$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)twimg\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)facebook\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)fbcdn\.net$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)meiju22\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)live\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)akamaihd\.net$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)ubisoft\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)ubi\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)ycombinator\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)redditstatic\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)googletagservices\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)facebook\.net$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)steamcommunity\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)portalcdn\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)probiller\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)pornhubpremium\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)googleusercontent\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)slideshare\.net$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)cdninstagram\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)instagram\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)instgram\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)quora\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)disqus\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)www\.netlify\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)hexo\.io$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)bnbstatic\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)binance\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)nytimes\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)cloudfront\.net$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)snh48\.info$/.test(host)) return "+Shadowsocks";
        if (/^www\.javlibrary\.com$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)humblebundle\.com$/.test(host)) return "+Shadowsocks";
        if (/^snh48\.info$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)coursera\.org$/.test(host)) return "+Shadowsocks";
        if (/(?:^|\.)netflix\.com$/.test(host)) return "+Shadowsocks";
        return "DIRECT";
    },
    "+Shadowsocks": function(url, host, scheme) {
        "use strict";
        if (/^127\.0\.0\.1$/.test(host) || /^::1$/.test(host) || /^localhost$/.test(host)) return "DIRECT";
        return "SOCKS5 127.0.0.1:10025; SOCKS 127.0.0.1:10025";
    }
});