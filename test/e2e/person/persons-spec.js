describe('A persons app', function() {

  beforeEach(function () {
    browser.get('/');
  });

  it('should show title', function() {
    expect(browser.getTitle()).toEqual('A persons app');
  });

});