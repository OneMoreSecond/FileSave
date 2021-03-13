function FindProxyForURL(url, host)
{
	proxy = 'SOCKS5 127.0.0.1:10025';
    if (host === 'javlibrary.com') {
        return proxy;
    }
    /*
    if (shExpMatch(url, "*://javlibrary.com/*")) {
        return proxy;
    }
    */
    return 'DIRECT';
}
