export class ApplicationNamePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('application-name-app h1')).getText();
  }
}
