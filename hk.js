// HackerRank Automation

const puppeteer = require('puppeteer')
const codeObj = require('./codes')
const loginLink = 'https://www.hackerrank.com/auth/login'
const email = 'pjha181415@gmail.com'
const password = 'HackerRank@123'


let browserOpen = puppeteer.launch({
    headless : false,

    // To open the chromium browser on fullscreen
    arg :['--start-maximized'],

    defaultViewport : null
})

let page 

browserOpen.then(function(browserObj){

    let browserOpenPromise = browserObj.newPage()
    return browserOpenPromise

}).then(function(newTab){
    page = newTab 
    let HackerRankOpenPromise = newTab.goto(loginLink)
    return HackerRankOpenPromise
}).then(function(){
    let emailIsEntered = page.type("input[id='input-1']",email, {delay : 50})
    return emailIsEntered
}).then(function(){
    let passwordIsEntered = page.type("input[type ='password']",password, {delay : 50})
    return passwordIsEntered
}).then(function(){
    let loginButtonClick = page.click('button[data-analytics="LoginPassword"]',{delay : 50})
    return loginButtonClick
}).then(function(){
    let  clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page)
    return clickOnAlgoPromise
}).then(function(){
    let getToWarmUp = waitAndClick('input[value="warmup"]',page)
    return getToWarmUp
})
// .then(function(){
//     // ERROR
//     return  page.waitFor(3000)
// })
.then(function(){
    //$ --> this is used to select document.query selector
    // $$ --> this is used to select document.query selector all
    let allChallengesPrommise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', {delay:70})
    return allChallengesPrommise
}).then(function(questionsArr){
    console.log('number of questions', questionsArr.length)
    let questionWillBeSolved  = questionSolver(page, questionsArr[0], codeObj.answer[0])
    return questionWillBeSolved
})




function waitAndClick(selector, cPage){
    return new Promise(function(resolve , reject){
        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            let clickModal = cPage.click(selector)
            return clickModal
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })
    })
}

function questionSolver(page, question, answer){
    return new Promise(function(resolve, reject){
        let questionWillBeClicked = question.click()
        questionWillBeClicked.then(function(){
            let EditorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs', page)
            return EditorInFocusPromise
        }).then(function(){
            return waitAndClick('.checkbox-input', page)
        }).then(function(){
            return page.waitForSelector('textarea.custominput', page)
        }).then(function(){
                return page.type('textarea.custominput',answer, {delay:10 })
        }).then(function(){
              let ctrlIsPressed = page.keyboard.down('Control')
              return ctrlIsPressed
        }).then(function(){
            let AisPressed = page.keyboard.press('A',{delay:100})
            return AisPressed
        }).then(function(){
            let XisPressed = page.keyboard.press('X', {delay:100})
            return XisPressed
        }).then(function(){
            let CtrlIsUnpressed = page.keyboard.up('Control')
            return CtrlIsUnpressed 
        }).then(function(){
            let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs', page)
            return mainEditorInFocus
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function(){
            let AisPressed = page.keyboard.press('A',{delay:100})
            return AisPressed
        }).then(function(){
            let VisPressed = page.keyboard.press('V',{delay:100})
            return VisPressed
        }).then(function(){
            let CtrlIsUnpressed = page.keyboard.up('Control')
            return CtrlIsUnpressed
        }).then(function(){
            return page.click('.hr-monaco__run-code ',{delay:50})
        }).then(function(){
            
        })
        .then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })
    })
}