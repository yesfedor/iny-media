const Share = {
  vk: (purl, ptitle, pimg, text) => {
    let url = 'https://vk.com/share.php?'
    url += 'url=' + encodeURIComponent(purl)
    url += '&title=' + encodeURIComponent(ptitle)
    url += '&description=' + encodeURIComponent(text)
    url += '&image=' + encodeURIComponent(pimg)
    url += '&noparse=true'
    Share.popup(url)
  },
  telegram: (purl, text) => {
    const url = `https://t.me/share/url?url=${purl}&text=${text}`
    Share.popup(url)
  },
  twitter: (purl, ptitle) => {
    let url = 'https://twitter.com/share?'
    url += 'text=' + encodeURIComponent(ptitle)
    url += '&url=' + encodeURIComponent(purl)
    url += '&counturl=' + encodeURIComponent(purl)
    Share.popup(url)
  },

  popup: (url) => {
    window.open(url, '', 'toolbar=0,status=0,width=626,height=436')
  }
}

export default Share
