describe('Settings Panel', () => {
  it('should display a section', async () => {
    await page.goto('https://localhost:3100/settings/widget0');

    expect(await page.$$eval('#root', tab => tab.length)).toBe(1);
  });
});
