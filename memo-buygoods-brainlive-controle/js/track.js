function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
}

// Adaptado com o SEU campaignID
var campaignID = "6a2c830b31d1d727c715fbc5";
var cachebuster = Math.round(new Date().getTime() / 1000);
var rtkClickID;
var rtkfbp = getCookie('_fbp') || '';
var rtkfbc = getCookie('_fbc') || '';
var locSearch = window.location.search;
var urlParams = new URLSearchParams(locSearch);
var pixelParams = "&" + locSearch.substr(1) + "&sub19=" + rtkfbp + "&sub20=" + rtkfbc
if (campaignID == "") {
    campaignID = urlParams.get('rtkcmpid')
}
// Adaptado com o SEU domínio
var initialSrc = "https://go.usfoxnews.site/" + campaignID + "?format=json";

function stripTrailingSlash(str) {
    return str.replace(/\/$/, "");
}

var rawData;

setTimeout(function () {
    if (!urlParams.get('rtkcid')) {
        xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                rawData = JSON.parse(xhr.responseText);
                rtkClickID = rawData.clickid
                setCookie();
                document.querySelectorAll('a').forEach(function (el) {
                    // Adaptado para monitorar o SEU domínio nos links
                    if (el.href.indexOf("go.usfoxnews.site/click") > -1) {
                        if (el.href.indexOf('?') > -1) {
                            el.href = stripTrailingSlash(el.href) + "&clickid=" + rawData.clickid + "&rtkck=" + cachebuster
                        } else {
                            el.href = stripTrailingSlash(el.href) + "?clickid=" + rawData.clickid + "&rtkck=" + cachebuster
                        }
                    }
                    if (el.href.indexOf("clickid={clickid}") > -1) {
                        el.href = el.href.replace(/{clickid}/, rawData.clickid) + "&rtkck=" + cachebuster;
                    }
                });
                xhrr = new XMLHttpRequest;
                // Adaptado com o SEU domínio
                xhrr.open("GET", "https://go.usfoxnews.site/view?clickid=" + rawData.clickid)
                xhrr.send();
            }
        }
        xhr.open("GET", initialSrc + pixelParams)
        xhr.send();
    } else {
        rtkClickID = urlParams.get('rtkcid')
        setCookie();
        xhrTrack = new XMLHttpRequest;
        // Adaptado com o SEU domínio
        xhrTrack.open("GET", "https://go.usfoxnews.site/view?clickid=" + rtkClickID)
        xhrTrack.send();
        document.querySelectorAll('a').forEach(function (el) {
            // Adaptado para monitorar o SEU domínio nos links
            if (el.href.indexOf("go.usfoxnews.site/click") > -1) {
                if (el.href.indexOf('?') > -1) {
                    el.href = stripTrailingSlash(el.href) + "&clickid=" + rtkClickID + "&rtkck=" + cachebuster
                } else {
                    el.href = stripTrailingSlash(el.href) + "?clickid=" + rtkClickID + "&rtkck=" + cachebuster
                }
            }
            if (el.href.indexOf("clickid={clickid}") > -1) {
                // Mantida a correção para usar rtkClickID e não quebrar quando a URL trouxer rtkcid
                el.href = el.href.replace(/{clickid}/, rtkClickID) + "&rtkck=" + cachebuster;
            }
        });
    }
}, 5e1)

function setCookie() {
    var cookieName = "rtkclickid-store", cookieValue = rtkClickID, expirationTime = 86400 * 30 * 1000,
        date = new Date(), dateTimeNow = date.getTime();
    date.setTime(dateTimeNow + expirationTime);
    var date = date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + "; expires=" + date + "; path=/;"
}
