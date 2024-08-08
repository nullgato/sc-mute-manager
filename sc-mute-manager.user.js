// ==UserScript==
// @name        SoundCloud - Mute Manager
// @namespace   https://github.com/nullgato
// @match       https://soundcloud.com/*
// @run-at      document-idle
// @version     1.0
// @author      @embyrdot
// @description Hides popover comments and comments from muted people
// @downloadURL https://github.com/nullgato/sc-mute-manager/releases/latest/download/sc-mute-manager.user.js
// @homepageURL https://beacons.ai/embyrdot
// @grant GM.getValue
// @grant GM.setValue
// @grant GM.deleteValue
// ==/UserScript==

const GM_STORAGE_KEY = 'muted_users'
const USER = document.querySelector('.header__userNavButton.header__userNavUsernameButton').getAttribute('href').substring(1)
let mutedUsers = []

const log = (msg, color = null, isBigFont = false) => {
    const fontColorStyle = `color: ${color};`
    const fontSizeStyle = 'font-size: 24px;'
    console.log("%c" + `[SC - MM] ${msg}`, `${color !== null ? fontColorStyle : ''} ${isBigFont ? fontSizeStyle : ''} font-weight: bold;`);
}

const addMutedUser = async (user) => {
    mutedUsers.push(user)
    await GM.setValue(GM_STORAGE_KEY, mutedUsers)
    log(`${user} muted`, 'green')
}

const hideMutedContent = (commentItems) => {
    for (const commentItem of commentItems) {
        console.log(commentItem)
        for (const user of mutedUsers) {
            const anyReferencedElem = commentItem.querySelector(`a[href="/${user}"]`)
            if (anyReferencedElem === null) {
                continue
            }

            log(`Hid comment regarding ${user}...`, 'green')
            commentItem.remove()

            document.querySelector('span.commentsList__actualTitle').innerHTML = `${commentItems.length - 1} comments`
            break
        }

        const hrefValue = commentItem.querySelector('.commentItem__avatar').getAttribute('href').substring(1)
        if (hrefValue === USER)
            continue

        const commentControls = commentItem.querySelector('.commentItem__controls')
        if (commentControls.querySelector('.commentItem__muteBtn') !== null)
            continue

        const muteBtn = document.createElement('a')
        muteBtn.classList.add('commentItem__muteBtn')
        muteBtn.setAttribute('href', '#')
        muteBtn.innerText = 'MUTE'
        muteBtn.style = 'color: #dc3545; font-size; font-weight: bold; margin-left: 10px;'
        muteBtn.addEventListener('click', async (ev) => {
            if (confirm(`Are you positive you want to mute ${hrefValue}?`)) {
                await addMutedUser(hrefValue)
                hideMutedContent(commentItems)
            }

            e.preventDefault()
        })
        
        commentControls.appendChild(muteBtn)
    }
}

const hideCanvas = () => {
    const canvas = document.querySelector('.waveformCommentsNode')
    if (canvas === null) return

    isCanvasHidden = true

    const ctx = canvas.getContext("2d")
    ctx.globalAlpha = 0
}

const beginObservingComments = () => {
    const commentsList = document.querySelector('.lazyLoadingList')
    const config = { childList: true, subtree: true }

    const callback = (mutationList, observer) => {
        log('Change in comments detected, checking for muted users...', 'yellow')

        const commentItems = document.querySelectorAll('.commentsList__item')
        if (commentItems.length === 0) {
            document.querySelector('div.commentsList').remove()
            return
        }

        hideCanvas()
        hideMutedContent(commentItems)
    }

    const observer = new MutationObserver(callback)
    observer.observe(commentsList, config)
}

const run = async () => {
    log('SoundCloud - Mute Manager script running', 'pink', true)

    mutedUsers = await GM.getValue(GM_STORAGE_KEY, [])

    const intervalId = setInterval(() => {
        if (document.querySelector('.lazyLoadingList') !== null) {
            clearInterval(intervalId)            
            beginObservingComments()
        }
    }, 10)
}



(async() => {
    await run()
})()